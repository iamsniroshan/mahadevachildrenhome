import AdminLayout from '@/Layouts/AdminLayout';
import Field from '@/Components/Admin/Field';
import StatusBadge from '@/Components/Admin/StatusBadge';
import DataTable from '@/Components/Admin/DataTable';
import ActionButtons from '@/Components/Admin/ActionButtons';
import Modal from '@/Components/Admin/Modal';
import FormActions from '@/Components/Admin/FormActions';
import { MEAL_OPTIONS } from '@/constants/donations';
import { convertBaminiToUnicode } from '@/utils/bamini';
import { Head, router, useForm } from '@inertiajs/react';
import { Input } from 'antd';
import { useState } from 'react';

const statusMap = {
    pending: { label: 'Pending', className: 'bg-amber-100 text-amber-800' },
    confirmed: { label: 'Confirmed', className: 'bg-teal-100 text-teal-800' },
};

const emptyDonation = {
    donor_name: '',
    email: '',
    phone: '',
    address: '',
    donation_type: 'one_time',
    contribution_date: new Date().toISOString().slice(0, 10),
    amount: '',
    currency: 'ரூபா',
    message: '',
    reason: '',
    meal_option: '',
    meal_options: [''],
    meal_amounts: [''],
    payment_method: '',
    payment_reference: '',
    status: 'pending',
};

export default function Index({ donations, confirmationMailEnabled, mailTemplates = [] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewingDonation, setViewingDonation] = useState(null);
    const [confirmingDonation, setConfirmingDonation] = useState(null);
    const [mailPreview, setMailPreview] = useState(null);
    const [attachmentPreview, setAttachmentPreview] = useState(null);
    const [previewLoading, setPreviewLoading] = useState(false);
    const [previewError, setPreviewError] = useState(null);
    const [createStep, setCreateStep] = useState(1);
    const [selectedTemplateId, setSelectedTemplateId] = useState(mailTemplates[0]?.id ?? '');

    const statusForm = useForm({ status: 'pending', invoice_number: '', invoice_file: null });
    const confirmForm = useForm({ invoice_number: '', invoice_file: null, template_id: mailTemplates[0]?.id ?? '' });

    const form = useForm(emptyDonation);

    const openCreateModal = () => {
        form.reset();
        form.setData(emptyDonation);
        setCreateStep(1);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCreateStep(1);
        form.reset();
    };

    const validateCreateStep = (step) => {
        const requiredFields = step === 1
            ? [
                ['donor_name', 'Enter the donor name.'],
                ['email', 'Enter the donor email.'],
            ]
            : step === 2
                ? [
                    ['contribution_date', 'Select the contribution date.'],
                ]
                : step === 3
                    ? [
                        ['amount', 'Enter the total amount.'],
                    ]
                : [];
        const missingFields = requiredFields.filter(([field]) => !String(form.data[field] ?? '').trim());

        form.clearErrors(...requiredFields.map(([field]) => field));
        missingFields.forEach(([field, message]) => form.setError(field, message));

        return missingFields.length === 0;
    };

    const submitDonation = () => {
        form.post(route('admin.donations.store'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    const moveToCreateStep = (step) => {
        if (step > createStep) {
            for (let currentStep = createStep; currentStep < step; currentStep += 1) {
                if (!validateCreateStep(currentStep)) {
                    setCreateStep(currentStep);
                    return;
                }
            }
        }

        setCreateStep(step);
    };

    const updateMealOptions = (mealOptions, mealAmounts = form.data.meal_amounts) => {
        const selectedMeals = mealOptions
            .map((value, index) => ({
                option: MEAL_OPTIONS.find((meal) => meal.value === value),
                amount: mealAmounts[index],
            }))
            .filter((meal) => meal.option);

        form.setData((data) => ({
            ...data,
            meal_options: mealOptions,
            meal_amounts: mealAmounts,
            meal_option: selectedMeals.map((meal) => meal.option.label).join(', '),
            amount: selectedMeals.reduce((total, meal) => total + (Number(meal.amount) || 0), 0) || data.amount,
        }));
    };

    const handleMealOptionChange = (index, value) => {
        const mealOptions = [...form.data.meal_options];
        const mealAmounts = [...form.data.meal_amounts];
        mealOptions[index] = value;
        mealAmounts[index] = MEAL_OPTIONS.find((option) => option.value === value)?.amount ?? '';
        updateMealOptions(mealOptions, mealAmounts);
    };

    const handleMealAmountChange = (index, value) => {
        const mealAmounts = [...form.data.meal_amounts];
        mealAmounts[index] = value;
        updateMealOptions(form.data.meal_options, mealAmounts);
    };

    const addMealOption = () => {
        form.setData((data) => ({
            ...data,
            meal_options: [...data.meal_options, ''],
            meal_amounts: [...data.meal_amounts, ''],
        }));
    };

    const removeMealOption = (index) => {
        const mealOptions = form.data.meal_options.filter((_, optionIndex) => optionIndex !== index);
        const mealAmounts = form.data.meal_amounts.filter((_, optionIndex) => optionIndex !== index);
        updateMealOptions(mealOptions.length ? mealOptions : [''], mealAmounts.length ? mealAmounts : ['']);
    };

    const convertReasonToUnicode = () => {
        form.setData('reason', convertBaminiToUnicode(form.data.reason));
    };

    const convertDonorNameToUnicode = () => {
        form.setData('donor_name', convertBaminiToUnicode(form.data.donor_name));
    };

    const openViewModal = (donation) => {
        setViewingDonation(donation);
        statusForm.setData({
            status: donation.status ?? 'pending',
            invoice_number: donation.invoice_number ?? '',
        });
    };

    const closeViewModal = () => {
        setViewingDonation(null);
        statusForm.reset();
        statusForm.clearErrors();
    };

    const submitStatus = (e) => {
        e.preventDefault();

        // When confirming, show the email preview first so the admin can review before sending.
        if (confirmationMailEnabled && statusForm.data.status === 'confirmed' && viewingDonation.status !== 'confirmed') {
            openConfirmModal(viewingDonation);
            return;
        }

        statusForm.patch(route('admin.donations.update-status', viewingDonation.id), {
            preserveScroll: true,
            onSuccess: () => closeViewModal(),
        });
    };

    const loadMailPreview = async (donation, templateId, invoiceNumber, invoiceFile) => {
        setMailPreview(null);
        setPreviewError(null);
        setPreviewLoading(true);

        try {
            if (!invoiceNumber) {
                throw new Error('Enter an invoice number before reviewing the email.');
            }

            const formData = new FormData();
            formData.append('invoice_number', invoiceNumber);
            if (invoiceFile) {
                formData.append('invoice_file', invoiceFile);
            }
            if (templateId) formData.append('template_id', templateId);

            const response = await fetch(route('admin.donations.confirmation-preview', donation.id), {
                method: 'POST',
                body: formData,
                credentials: 'same-origin',
                headers: {
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content ?? '',
                },
            });

            if (!response.ok) {
                const errorBody = await response.json().catch(() => null);
                const validationMessage = errorBody?.errors
                    ? Object.values(errorBody.errors).flat().join(' ')
                    : errorBody?.message;
                throw new Error(validationMessage || 'Failed to generate preview');
            }

            setMailPreview(await response.json());
        } catch (err) {
            setPreviewError(err.message || 'Could not load the email preview. Please try again.');
        } finally {
            setPreviewLoading(false);
        }
    };

    const openConfirmModal = async (donation) => {
        setConfirmingDonation(donation);
        const templateId = mailTemplates[0]?.id ?? '';
        setSelectedTemplateId(templateId);
        await loadMailPreview(donation, templateId, statusForm.data.invoice_number, statusForm.data.invoice_file);
    };

    const closeConfirmModal = () => {
        setConfirmingDonation(null);
        setMailPreview(null);
        setPreviewError(null);
        confirmForm.reset();
        confirmForm.clearErrors();
    };

    const submitConfirmAndSend = (e) => {
        e.preventDefault();
        confirmForm.transform(() => {
            const data = {
                invoice_number: statusForm.data.invoice_number,
                template_id: selectedTemplateId,
            };

            if (statusForm.data.invoice_file) {
                data.invoice_file = statusForm.data.invoice_file;
            }

            return data;
        });
        confirmForm.post(route('admin.donations.confirm-send', confirmingDonation.id), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                closeConfirmModal();
                closeViewModal();
            },
        });
    };

    const submit = (e) => {
        e.preventDefault();
    };

    const handleDelete = (donation) => {
        if (confirm(`Delete donation from ${donation.donor_name}?`)) {
            router.delete(route('admin.donations.destroy', donation.id));
        }
    };

    const columns = [
        {
            key: 'donor',
            header: 'Donor',
            render: (donation) => (
                <span className="font-semibold text-slate-800">
                    {donation.donor_name}
                </span>
            ),
        },
        {
            key: 'source',
            header: 'Source',
            render: (donation) => (
                <span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${donation.source === 'web' ? 'bg-sky-100 text-sky-700' : 'bg-amber-100 text-amber-800'}`}>
                    {donation.source === 'web' ? 'Web' : 'Admin'}
                </span>
            ),
        },
        {
            key: 'amount',
            header: 'Amount',
            className: 'font-bold text-slate-900',
            render: (d) => `${d.currency} ${Number(d.amount).toLocaleString()}`,
        },
        { key: 'status', header: 'Status', render: (d) => <StatusBadge value={d.status} map={statusMap} /> },
        {
            key: 'mail',
            header: 'Mail',
            render: (donation) => donation.mail_sent_at
                ? <span className="font-semibold text-teal-700">Sent</span>
                : <span className="text-slate-400">Not sent</span>,
        },
        {
            key: 'attachment',
            header: 'Attachment',
            render: (donation) => (
                <div className="flex items-center gap-2">
                    {donation.invoice_path && (
                        <a
                            href={`/storage/${donation.invoice_path}`}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(event) => {
                                event.preventDefault();
                                setAttachmentPreview({ url: `/storage/${donation.invoice_path}`, title: 'Generated PDF' });
                            }}
                            title="Open generated PDF"
                            aria-label="Open generated PDF"
                                className="flex items-center gap-1 text-rose-900 hover:text-rose-700"
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                <path d="M6 3h8l4 4v14H6z" />
                                <path d="M14 3v5h5M8.5 14h2a1.5 1.5 0 0 0 0-3h-2v6M14 17v-6h1.5a3 3 0 0 1 0 6H14M19 11h-3v6" />
                            </svg>
                                <span className="text-xs font-semibold">PDF</span>
                        </a>
                    )}
                    {donation.invoice_source_path && (
                        <a
                            href={`/storage/${donation.invoice_source_path}`}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(event) => {
                                event.preventDefault();
                                setAttachmentPreview({ url: `/storage/${donation.invoice_source_path}`, title: 'Attached Invoice' });
                            }}
                            title="Open attached invoice"
                            aria-label="Open attached invoice"
                                className="flex items-center gap-1 text-teal-700 hover:text-teal-600"
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                <path d="M7 3h7l4 4v14H7z" />
                                <path d="M14 3v5h5M9.5 13.5h5M9.5 17h5" />
                            </svg>
                                <span className="text-xs font-semibold">Invoice</span>
                        </a>
                    )}
                    {!donation.invoice_path && !donation.invoice_source_path && <span className="text-slate-400">—</span>}
                </div>
            ),
        },
        {
            key: 'actions',
            header: 'Actions',
            align: 'right',
            render: (donation) => (
                <ActionButtons
                    onView={() => openViewModal(donation)}
                    onDelete={() => handleDelete(donation)}
                />
            ),
        },
    ];

    return (
        <AdminLayout header="Donations">
            <Head title="Donations" />

            <DataTable
                columns={columns}
                data={donations}
                emptyMessage="No donations recorded yet."
                actions={(
                        <button type="button" onClick={openCreateModal} className="flex items-center gap-2 whitespace-nowrap rounded-lg bg-rose-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-rose-950">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path d="M12 4v16m8-8H4" />
                        </svg>
                        Record New Donation
                    </button>
                )}
            />

            <Modal
                open={isModalOpen}
                onClose={closeModal}
                eyebrow="Donation"
                title="Record New Donation"
            >
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-4 gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2">
                        {['Donor', 'Contribution', 'Meal & Occasion', 'Payment'].map((step, index) => (
                            <button
                                key={step}
                                type="button"
                                onClick={() => moveToCreateStep(index + 1)}
                                className={`rounded-lg px-3 py-2 text-xs font-bold transition ${createStep === index + 1 ? 'bg-rose-900 text-white shadow-sm' : 'text-slate-500 hover:bg-white hover:text-slate-800'}`}
                            >
                                <span className="mr-1.5">{index + 1}.</span>{step}
                            </button>
                        ))}
                    </div>

                    {createStep === 1 && (
                        <div className="space-y-5">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Donor details</h3>
                                <p className="mt-1 text-sm text-slate-500">Add the person or family making this contribution.</p>
                            </div>
                            <div className="grid gap-5 md:grid-cols-2">
                                <div className="space-y-1.5 md:col-span-2">
                                    <label htmlFor="donor_name" className="block text-xs font-bold uppercase tracking-wide text-slate-600">Donor Name <span className="text-rose-600">*</span></label>
                                    <div className="flex items-center gap-2">
                                        <Input id="donor_name" name="donor_name" value={form.data.donor_name ?? ''} onChange={(event) => form.setData('donor_name', event.target.value)} placeholder="Type Bamini text" required className="flex-1" />
                                        <button type="button" onClick={convertDonorNameToUnicode} className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-amber-500 bg-amber-400 text-xs font-bold text-amber-950 transition hover:border-amber-600 hover:bg-amber-500" title="Convert Bamini to Tamil Unicode" aria-label="Convert Bamini to Tamil Unicode">அ⇄</button>
                                    </div>
                                    {form.errors.donor_name && <p className="text-xs font-semibold text-rose-600">{form.errors.donor_name}</p>}
                                </div>
                                <Field label="Email" name="email" type="email" value={form.data.email} onChange={(v) => form.setData('email', v)} error={form.errors.email} required />
                                <Field label="Phone" name="phone" value={form.data.phone} onChange={(v) => form.setData('phone', v)} error={form.errors.phone} />
                                <div className="md:col-span-2">
                                    <Field label="Address" name="address" type="textarea" rows={3} value={form.data.address} onChange={(v) => form.setData('address', v)} error={form.errors.address} />
                                </div>
                            </div>
                        </div>
                    )}

                    {createStep === 2 && (
                        <div className="space-y-5">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Contribution details</h3>
                                <p className="mt-1 text-sm text-slate-500">Choose the meal service and confirm the contribution amount.</p>
                            </div>
                            <div className="grid gap-5 md:grid-cols-2">
                                <Field label="Contribution Date" name="contribution_date" type="date" value={form.data.contribution_date} onChange={(v) => form.setData('contribution_date', v)} error={form.errors.contribution_date} required />
                                <Field label="Currency" name="currency" type="select" value={form.data.currency} onChange={(v) => form.setData('currency', v)} error={form.errors.currency} options={[{ value: 'ரூபா', label: 'ரூபா (LKR / Rupees)' }]} />
                                <Field label="Donation Type" name="donation_type" type="select" value={form.data.donation_type} onChange={(v) => form.setData('donation_type', v)} error={form.errors.donation_type} options={[{ value: 'one_time', label: 'One Time' }, { value: 'monthly', label: 'Monthly' }, { value: 'yearly', label: 'Yearly' }]} />
                            </div>
                        </div>
                    )}

                    {createStep === 3 && (
                        <div className="space-y-5">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Meal and occasion</h3>
                                <p className="mt-1 text-sm text-slate-500">Add the reason and select one or more meal services.</p>
                            </div>
                            <div className="space-y-5">
                                <div className="space-y-1.5">
                                    <label htmlFor="reason" className="block text-xs font-bold uppercase tracking-wide text-slate-600">Reason / Occasion</label>
                                    <div className="flex items-center gap-2">
                                        <Input.TextArea id="reason" name="reason" value={form.data.reason ?? ''} onChange={(event) => form.setData('reason', event.target.value)} placeholder="Type Bamini text" rows={3} className="flex-1" />
                                        <button type="button" onClick={convertReasonToUnicode} className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-amber-500 bg-amber-400 text-xs font-bold text-amber-950 transition hover:border-amber-600 hover:bg-amber-500" title="Convert Bamini to Tamil Unicode" aria-label="Convert Bamini to Tamil Unicode">அ⇄</button>
                                    </div>
                                    {form.errors.reason && <p className="text-xs font-semibold text-rose-600">{form.errors.reason}</p>}
                                </div>
                                <div>
                                    <div className="mb-2 flex items-center justify-between gap-3"><label className="text-sm font-semibold text-slate-700">Meal Option / Reason</label></div>
                                    <div className="space-y-2">
                                        {form.data.meal_options.map((mealOption, index) => (
                                            <div key={`meal-option-${index}`} className="flex items-center gap-2">
                                                <select value={mealOption} onChange={(event) => handleMealOptionChange(index, event.target.value)} className="block w-full rounded-lg border-slate-300 text-sm shadow-sm focus:border-rose-500 focus:ring-rose-500">
                                                    <option value="">Select meal option</option>
                                                    {MEAL_OPTIONS.map((option) => <option key={option.value} value={option.value} disabled={form.data.meal_options.includes(option.value) && option.value !== mealOption}>{option.label} - {option.amount.toLocaleString()}</option>)}
                                                </select>
                                                <input type="number" min="0" value={form.data.meal_amounts[index] ?? ''} onChange={(event) => handleMealAmountChange(index, event.target.value)} placeholder="Amount" aria-label={`Amount for meal option ${index + 1}`} className="w-32 rounded-lg border-slate-300 text-sm shadow-sm focus:border-rose-500 focus:ring-rose-500" />
                                                <div className="flex w-[4.25rem] shrink-0 items-center justify-start gap-1">
                                                    {form.data.meal_options.length > 1 && <button type="button" onClick={() => removeMealOption(index)} className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-300 text-lg text-slate-500 hover:border-rose-300 hover:text-rose-700" title="Remove meal option" aria-label="Remove meal option">−</button>}
                                                    {form.data.meal_options.length === 1 && <span className="h-8 w-8 shrink-0" aria-hidden="true" />}
                                                    {index === form.data.meal_options.length - 1 && <button type="button" onClick={addMealOption} className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-900 text-lg font-semibold leading-none text-white hover:bg-rose-950" title="Add another meal option" aria-label="Add another meal option">+</button>}
                                                </div>
                                            </div>
                                        ))}
                                        <div className="flex justify-end border-t border-slate-100 pt-3">
                                            <div className="w-full md:w-56">
                                                <Field label="Total Amount" name="amount" type="number" value={form.data.amount} onChange={(v) => form.setData('amount', v)} error={form.errors.amount} required />
                                            </div>
                                        </div>
                                    </div>
                                    {form.errors.meal_option && <p className="mt-1 text-sm text-red-600">{form.errors.meal_option}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {createStep === 4 && (
                        <div className="space-y-5">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Payment and review</h3>
                                <p className="mt-1 text-sm text-slate-500">Choose how the donation was received, then save the record.</p>
                            </div>
                            <div className="grid gap-5 md:grid-cols-2">
                                <Field label="Payment Method" name="payment_method" type="select" value={form.data.payment_method} onChange={(v) => form.setData('payment_method', v)} error={form.errors.payment_method} options={[{ value: '', label: 'Select method' }, { value: 'bank_transfer', label: 'Bank Transfer' }, { value: 'credit_card', label: 'Credit Card' }, { value: 'paypal', label: 'PayPal' }, { value: 'cash', label: 'Cash' }, { value: 'check', label: 'Check' }, { value: 'other', label: 'Other' }]} />
                                <Field label="Payment Reference" name="payment_reference" value={form.data.payment_reference} onChange={(v) => form.setData('payment_reference', v)} error={form.errors.payment_reference} />
                            </div>
                            <div className="grid gap-3 rounded-xl border border-rose-100 bg-rose-50 p-4 sm:grid-cols-3">
                                <DetailItem label="Donor" value={form.data.donor_name || 'Not entered'} />
                                <DetailItem label="Amount" value={`${form.data.currency} ${Number(form.data.amount || 0).toLocaleString()}`} />
                                <DetailItem label="Meal" value={form.data.meal_option || 'Not selected'} />
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                        <button type="button" onClick={createStep === 1 ? closeModal : () => setCreateStep((step) => step - 1)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">{createStep === 1 ? 'Cancel' : 'Back'}</button>
                        {createStep < 4 ? <button type="button" onClick={() => moveToCreateStep(createStep + 1)} className="rounded-lg bg-rose-900 px-5 py-2 text-sm font-semibold text-white hover:bg-rose-950">Continue</button> : <button type="button" onClick={submitDonation} disabled={form.processing} className="rounded-lg bg-rose-900 px-5 py-2 text-sm font-semibold text-white hover:bg-rose-950 disabled:opacity-50">{form.processing ? 'Saving...' : 'Record Donation'}</button>}
                    </div>
                </form>
            </Modal>

            <Modal
                open={!!viewingDonation || !!confirmingDonation}
                onClose={confirmingDonation ? closeConfirmModal : closeViewModal}
                eyebrow="Donation"
                title={confirmingDonation ? 'Review Confirmation Email' : 'Donation Details'}
            >
                {confirmingDonation ? (
                    <div className="space-y-4">
                        <p className="text-sm text-slate-600">
                            The following email will be sent to{' '}
                            <span className="font-semibold text-slate-800">{confirmingDonation.email}</span> when you
                            confirm this donation. Please review it before sending.
                        </p>

                        {previewLoading && (
                            <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 py-12 text-sm text-slate-500">
                                Generating preview…
                            </div>
                        )}

                        {previewError && (
                            <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                                {previewError}
                            </div>
                        )}

                        {mailPreview && !previewLoading && (
                            <>
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold uppercase tracking-wide text-slate-400">Email Template</label>
                                    <p className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800">
                                        {mailTemplates.find((template) => String(template.id) === String(selectedTemplateId))?.name ?? 'No template available'}
                                    </p>
                                    <p className="text-xs text-slate-400">The default active donation template is selected automatically.</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Subject</p>
                                    <p className="mt-1 text-sm font-semibold text-slate-800">{mailPreview.subject}</p>
                                </div>
                                <div className="overflow-hidden rounded-xl border border-slate-200 p-3">
                                    <iframe
                                        title="Confirmation email preview"
                                        srcDoc={mailPreview.html}
                                        className="h-96 w-full bg-white"
                                        sandbox=""
                                    />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Generated Letterhead PDF</p>
                                        <a
                                            href={mailPreview.pdf_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-xs font-semibold text-rose-900 hover:underline"
                                        >
                                            Open PDF
                                        </a>
                                    </div>
                                    <div className="overflow-hidden rounded-xl border border-slate-200">
                                        <iframe
                                            title="Generated letterhead PDF preview"
                                            src={mailPreview.pdf_url}
                                            className="h-96 w-full bg-white"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Attached Invoice</p>
                                        <p className="text-sm font-semibold text-slate-800">{mailPreview.invoice_name}</p>
                                    </div>
                                    <a
                                        href={mailPreview.invoice_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-xs font-semibold text-rose-900 hover:underline"
                                    >
                                        Open Invoice
                                    </a>
                                </div>
                            </>
                        )}

                        <form onSubmit={submitConfirmAndSend}>
                            <FormActions
                                onCancel={closeConfirmModal}
                                processing={confirmForm.processing || previewLoading}
                                submitLabel="Confirm & Send Email"
                            />
                        </form>
                    </div>
                ) : viewingDonation && (
                    <div className="space-y-4">
                        <div className="grid gap-3 sm:grid-cols-2">
                            <DetailItem label="Donor Name" value={viewingDonation.donor_name} />
                            <DetailItem label="Email" value={viewingDonation.email} />
                            <DetailItem label="Phone" value={viewingDonation.phone || '—'} />
                            <DetailItem label="Address" value={viewingDonation.address || '—'} />
                            <DetailItem label="Donation Type" value={viewingDonation.donation_type} className="capitalize" />
                            <DetailItem
                                label="Source"
                                value={(
                                    <span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${viewingDonation.source === 'web' ? 'bg-sky-100 text-sky-700' : 'bg-amber-100 text-amber-800'}`}>
                                        {viewingDonation.source === 'web' ? 'Web' : 'Admin'}
                                    </span>
                                )}
                            />
                            <DetailItem label="Amount" value={`${viewingDonation.currency} ${Number(viewingDonation.amount).toLocaleString()}`} />
                            <DetailItem label="Payment Method" value={viewingDonation.payment_method || '—'} className="capitalize" />
                            <DetailItem label="Payment Reference" value={viewingDonation.payment_reference || '—'} />
                            <DetailItem label="Status" value={<StatusBadge value={viewingDonation.status} map={statusMap} />} />
                            <DetailItem label="Confirmation Mail" value={viewingDonation.mail_sent_at ? 'Sent' : 'Not sent'} />
                            <DetailItem
                                label="Receipt"
                                value={
                                    viewingDonation.document_path ? (
                                        <a
                                            href={`/storage/${viewingDonation.document_path}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-rose-900 font-semibold hover:underline"
                                        >
                                            View Document
                                        </a>
                                    ) : '—'
                                }
                            />
                        </div>

                        {viewingDonation.message && (
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Message</p>
                                <p className="mt-1 text-sm text-slate-700 whitespace-pre-line">{viewingDonation.message}</p>
                            </div>
                        )}

                        {viewingDonation.status === 'confirmed' && (
                            <div className="grid gap-3 border-t border-slate-100 pt-3 pb-3 sm:grid-cols-2 bg-slate-50">
                                <DetailItem
                                    label="Generated Invoice"
                                    value={viewingDonation.invoice_path ? <a href={`/storage/${viewingDonation.invoice_path}`} target="_blank" rel="noreferrer" className="text-rose-900 hover:underline">Open PDF</a> : '—'}
                                />
                                <DetailItem
                                    label="Attached Invoice"
                                    value={viewingDonation.invoice_source_path ? <a href={`/storage/${viewingDonation.invoice_source_path}`} target="_blank" rel="noreferrer" className="text-rose-900 hover:underline">Open Attachment</a> : '—'}
                                />
                            </div>
                        )}

                        <form onSubmit={submitStatus} className="space-y-3 border-t border-slate-100 pt-3">
                            <Field
                                label="Status"
                                name="status"
                                type="select"
                                value={statusForm.data.status}
                                onChange={(v) => statusForm.setData('status', v)}
                                error={statusForm.errors.status}
                                disabled={viewingDonation.status === 'confirmed'}
                                options={[
                                    { value: 'pending', label: 'Pending' },
                                    { value: 'confirmed', label: 'Confirmed' },
                                ]}
                            />
                            {statusForm.data.status === 'confirmed' && viewingDonation.status !== 'confirmed' && (
                                <>
                                    <Field
                                        label="Invoice Number"
                                        name="invoice_number"
                                        type="text"
                                        placeholder="e.g. INV-1045"
                                        value={statusForm.data.invoice_number}
                                        onChange={(v) => statusForm.setData('invoice_number', v)}
                                        error={statusForm.errors.invoice_number}
                                        required
                                    />
                                    <Field
                                        label="Invoice File"
                                        name="invoice_file"
                                        type="file"
                                        accept="application/pdf,image/jpeg,image/png"
                                        value={statusForm.data.invoice_file}
                                        onChange={(v) => statusForm.setData('invoice_file', v)}
                                        error={statusForm.errors.invoice_file}
                                    />
                                    <p className="text-xs text-slate-500">Optional: PDF, JPG, JPEG, or PNG up to 10 MB.</p>
                                </>
                            )}
                            <FormActions
                                onCancel={closeViewModal}
                                processing={statusForm.processing}
                                showSubmit={viewingDonation.status !== 'confirmed'}
                                submitLabel={statusForm.data.status === 'confirmed' && viewingDonation.status !== 'confirmed' ? 'Review Mail & Confirm' : 'Save Changes'}
                            />
                        </form>
                    </div>
                )}
            </Modal>

            <Modal
                open={!!attachmentPreview}
                onClose={() => setAttachmentPreview(null)}
                eyebrow="Attachment"
                title={attachmentPreview?.title ?? 'Document'}
            >
                {attachmentPreview && (
                    <div className="space-y-3">
                        <div className="flex justify-end">
                            <a
                                href={attachmentPreview.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs font-semibold text-rose-900 hover:underline"
                            >
                                Open in New Tab
                            </a>
                        </div>
                        <iframe
                            title={`${attachmentPreview.title} preview`}
                            src={attachmentPreview.url}
                            className="h-[70vh] w-full rounded-xl border border-slate-200 bg-white"
                        />
                    </div>
                )}
            </Modal>
        </AdminLayout>
    );
}

function DetailItem({ label, value, className = '' }) {
    return (
        <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</p>
            <p className={`mt-1 text-sm font-semibold text-slate-800 ${className}`}>{value}</p>
        </div>
    );
}
