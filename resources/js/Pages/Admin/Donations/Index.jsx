import AdminLayout from '@/Layouts/AdminLayout';
import Field from '@/Components/Admin/Field';
import StatusBadge from '@/Components/Admin/StatusBadge';
import DataTable from '@/Components/Admin/DataTable';
import ActionButtons from '@/Components/Admin/ActionButtons';
import Modal from '@/Components/Admin/Modal';
import FormActions from '@/Components/Admin/FormActions';
import { DONATION_CATEGORIES } from '@/constants/donations';
import { Head, router, useForm } from '@inertiajs/react';
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
    amount: '',
    currency: 'LKR',
    category: 'general',
    message: '',
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
    const [selectedTemplateId, setSelectedTemplateId] = useState(mailTemplates[0]?.id ?? '');

    const statusForm = useForm({ status: 'pending', invoice_number: '', invoice_file: null });
    const confirmForm = useForm({ invoice_number: '', invoice_file: null, template_id: mailTemplates[0]?.id ?? '' });

    const form = useForm(emptyDonation);

    const openCreateModal = () => {
        form.reset();
        form.setData(emptyDonation);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        form.reset();
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
        const matchedTemplate = mailTemplates.find((template) => template.category === donation.category);
        const templateId = matchedTemplate?.id ?? mailTemplates[0]?.id ?? '';
        setSelectedTemplateId(templateId);
        await loadMailPreview(donation, templateId, statusForm.data.invoice_number, statusForm.data.invoice_file);
    };

    const changeTemplate = async (templateId) => {
        setSelectedTemplateId(templateId);

        if (confirmingDonation) {
            await loadMailPreview(confirmingDonation, templateId, statusForm.data.invoice_number, statusForm.data.invoice_file);
        }
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

        form.post(route('admin.donations.store'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
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
        { key: 'category', header: 'Category', className: 'text-slate-600 capitalize', render: (d) => d.category },
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
                    <div className="grid gap-6 md:grid-cols-2">
                        <Field label="Donor Name" name="donor_name" value={form.data.donor_name} onChange={(v) => form.setData('donor_name', v)} error={form.errors.donor_name} required />
                        <Field label="Email" name="email" type="email" value={form.data.email} onChange={(v) => form.setData('email', v)} error={form.errors.email} required />
                        <Field label="Phone" name="phone" value={form.data.phone} onChange={(v) => form.setData('phone', v)} error={form.errors.phone} />
                        <Field label="Amount" name="amount" type="number" value={form.data.amount} onChange={(v) => form.setData('amount', v)} error={form.errors.amount} required />
                        <Field label="Currency" name="currency" value={form.data.currency} onChange={(v) => form.setData('currency', v)} error={form.errors.currency} />
                        <Field
                            label="Donation Type"
                            name="donation_type"
                            type="select"
                            value={form.data.donation_type}
                            onChange={(v) => form.setData('donation_type', v)}
                            error={form.errors.donation_type}
                            options={[
                                { value: 'one_time', label: 'One Time' },
                                { value: 'monthly', label: 'Monthly' },
                                { value: 'yearly', label: 'Yearly' },
                            ]}
                        />
                        <Field
                            label="Donation Category"
                            name="Donation Category"
                            type="select"
                            value={form.data.category}
                            onChange={(v) => form.setData('category', v)}
                            error={form.errors.category}
                            options={DONATION_CATEGORIES}
                        />
                        <Field
                            label="Payment Method"
                            name="payment_method"
                            type="select"
                            value={form.data.payment_method}
                            onChange={(v) => form.setData('payment_method', v)}
                            error={form.errors.payment_method}
                            options={[
                                { value: '', label: 'Select method' },
                                { value: 'bank_transfer', label: 'Bank Transfer' },
                                { value: 'credit_card', label: 'Credit Card' },
                                { value: 'paypal', label: 'PayPal' },
                                { value: 'cash', label: 'Cash' },
                                { value: 'check', label: 'Check' },
                                { value: 'other', label: 'Other' },
                            ]}
                        />
                    </div>

                    <Field label="Address" name="address" type="textarea" rows={2} value={form.data.address} onChange={(v) => form.setData('address', v)} error={form.errors.address} />

                    <FormActions onCancel={closeModal} processing={form.processing} submitLabel="Record Donation" />
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
                                    <select
                                        value={selectedTemplateId}
                                        onChange={(e) => changeTemplate(e.target.value)}
                                        disabled={previewLoading}
                                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800"
                                    >
                                        {mailTemplates.length === 0 ? (
                                            <option value="">No templates available</option>
                                        ) : (
                                            mailTemplates.map((template) => (
                                                <option key={template.id} value={template.id}>{template.name}</option>
                                            ))
                                        )}
                                    </select>
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
                            <DetailItem label="Category" value={viewingDonation.category} className="capitalize" />
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
