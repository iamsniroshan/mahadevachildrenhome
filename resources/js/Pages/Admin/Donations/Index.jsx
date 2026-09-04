import AdminLayout from '@/Layouts/AdminLayout';
import Field from '@/Components/Admin/Field';
import StatusBadge from '@/Components/Admin/StatusBadge';
import DataTable from '@/Components/Admin/DataTable';
import ActionButtons from '@/Components/Admin/ActionButtons';
import Modal from '@/Components/Admin/Modal';
import FormActions from '@/Components/Admin/FormActions';
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
    is_anonymous: false,
    payment_method: '',
    payment_reference: '',
    status: 'pending',
    admin_notes: '',
};

export default function Index({ donations }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewingDonation, setViewingDonation] = useState(null);

    const statusForm = useForm({ status: 'pending', admin_notes: '' });

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
            admin_notes: donation.admin_notes ?? '',
        });
    };

    const closeViewModal = () => {
        setViewingDonation(null);
        statusForm.reset();
        statusForm.clearErrors();
    };

    const submitStatus = (e) => {
        e.preventDefault();
        statusForm.patch(route('admin.donations.update-status', viewingDonation.id), {
            preserveScroll: true,
            onSuccess: () => closeViewModal(),
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
                    {donation.is_anonymous ? 'Anonymous Donor' : donation.donor_name}
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
                            label="Category"
                            name="category"
                            type="select"
                            value={form.data.category}
                            onChange={(v) => form.setData('category', v)}
                            error={form.errors.category}
                            options={[
                                { value: 'general', label: 'General' },
                                { value: 'education', label: 'Education' },
                                { value: 'healthcare', label: 'Healthcare' },
                                { value: 'shelter', label: 'Shelter' },
                                { value: 'food', label: 'Food' },
                                { value: 'emergency', label: 'Emergency' },
                            ]}
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
                        <Field label="Payment Reference" name="payment_reference" value={form.data.payment_reference} onChange={(v) => form.setData('payment_reference', v)} error={form.errors.payment_reference} />
                        <Field
                            label="Status"
                            name="status"
                            type="select"
                            value={form.data.status}
                            onChange={(v) => form.setData('status', v)}
                            error={form.errors.status}
                            options={[
                                { value: 'pending', label: 'Pending' },
                                { value: 'confirmed', label: 'Confirmed' },
                            ]}
                        />
                        <Field label="Anonymous" name="is_anonymous" type="checkbox" value={form.data.is_anonymous} onChange={(v) => form.setData('is_anonymous', v)} error={form.errors.is_anonymous} />
                    </div>

                    <Field label="Address" name="address" type="textarea" rows={2} value={form.data.address} onChange={(v) => form.setData('address', v)} error={form.errors.address} />
                    <Field label="Message" name="message" type="textarea" rows={2} value={form.data.message} onChange={(v) => form.setData('message', v)} error={form.errors.message} />
                    <Field label="Admin Notes" name="admin_notes" type="textarea" rows={2} value={form.data.admin_notes} onChange={(v) => form.setData('admin_notes', v)} error={form.errors.admin_notes} />

                    <FormActions onCancel={closeModal} processing={form.processing} submitLabel="Record Donation" />
                </form>
            </Modal>

            <Modal
                open={!!viewingDonation}
                onClose={closeViewModal}
                eyebrow="Donation"
                title="Donation Details"
            >
                {viewingDonation && (
                    <div className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <DetailItem label="Donor Name" value={viewingDonation.is_anonymous ? 'Anonymous Donor' : viewingDonation.donor_name} />
                            <DetailItem label="Email" value={viewingDonation.email} />
                            <DetailItem label="Phone" value={viewingDonation.phone || '—'} />
                            <DetailItem label="Address" value={viewingDonation.address || '—'} />
                            <DetailItem label="Donation Type" value={viewingDonation.donation_type} className="capitalize" />
                            <DetailItem label="Category" value={viewingDonation.category} className="capitalize" />
                            <DetailItem label="Amount" value={`${viewingDonation.currency} ${Number(viewingDonation.amount).toLocaleString()}`} />
                            <DetailItem label="Payment Method" value={viewingDonation.payment_method || '—'} className="capitalize" />
                            <DetailItem label="Payment Reference" value={viewingDonation.payment_reference || '—'} />
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

                        <form onSubmit={submitStatus} className="space-y-4 border-t border-slate-100 pt-4">
                            <Field
                                label="Status"
                                name="status"
                                type="select"
                                value={statusForm.data.status}
                                onChange={(v) => statusForm.setData('status', v)}
                                error={statusForm.errors.status}
                                options={[
                                    { value: 'pending', label: 'Pending' },
                                    { value: 'confirmed', label: 'Confirmed' },
                                ]}
                            />
                            <Field
                                label="Admin Notes"
                                name="admin_notes"
                                type="textarea"
                                rows={3}
                                value={statusForm.data.admin_notes}
                                onChange={(v) => statusForm.setData('admin_notes', v)}
                                error={statusForm.errors.admin_notes}
                            />
                            <FormActions onCancel={closeViewModal} processing={statusForm.processing} submitLabel="Save Changes" />
                        </form>
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
