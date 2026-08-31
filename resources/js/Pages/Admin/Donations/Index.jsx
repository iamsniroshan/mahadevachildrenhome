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
    processing: { label: 'Processing', className: 'bg-sky-100 text-sky-800' },
    completed: { label: 'Completed', className: 'bg-emerald-100 text-emerald-800' },
    cancelled: { label: 'Cancelled', className: 'bg-rose-100 text-rose-800' },
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
    const [editingDonation, setEditingDonation] = useState(null);
    const [viewingDonation, setViewingDonation] = useState(null);

    const statusForm = useForm({ status: 'pending' });

    const form = useForm(editingDonation ? {
        donor_name: editingDonation.donor_name ?? '',
        email: editingDonation.email ?? '',
        phone: editingDonation.phone ?? '',
        address: editingDonation.address ?? '',
        donation_type: editingDonation.donation_type ?? 'one_time',
        amount: editingDonation.amount ?? '',
        currency: editingDonation.currency ?? 'LKR',
        category: editingDonation.category ?? 'general',
        message: editingDonation.message ?? '',
        is_anonymous: editingDonation.is_anonymous ?? false,
        payment_method: editingDonation.payment_method ?? '',
        payment_reference: editingDonation.payment_reference ?? '',
        status: editingDonation.status ?? 'pending',
        admin_notes: editingDonation.admin_notes ?? '',
    } : emptyDonation);

    const openCreateModal = () => {
        setEditingDonation(null);
        form.reset();
        form.setData(emptyDonation);
        setIsModalOpen(true);
    };

    const openEditModal = (donation) => {
        setEditingDonation(donation);
        form.reset();
        form.setData({
            donor_name: donation.donor_name ?? '',
            email: donation.email ?? '',
            phone: donation.phone ?? '',
            address: donation.address ?? '',
            donation_type: donation.donation_type ?? 'one_time',
            amount: donation.amount ?? '',
            currency: donation.currency ?? 'LKR',
            category: donation.category ?? 'general',
            message: donation.message ?? '',
            is_anonymous: donation.is_anonymous ?? false,
            payment_method: donation.payment_method ?? '',
            payment_reference: donation.payment_reference ?? '',
            status: donation.status ?? 'pending',
            admin_notes: donation.admin_notes ?? '',
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingDonation(null);
        form.reset();
    };

    const openViewModal = (donation) => {
        setViewingDonation(donation);
        statusForm.setData('status', donation.status ?? 'pending');
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

        if (editingDonation) {
            form.put(route('admin.donations.update', editingDonation.id), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
            return;
        }

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
                    onEdit={() => openEditModal(donation)}
                    onDelete={() => handleDelete(donation)}
                />
            ),
        },
    ];

    return (
        <AdminLayout header="Donations">
            <Head title="Donations" />

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6 space-y-5 sm:space-y-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="font-bold text-lg text-slate-900">All Donations</h2>
                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2 rounded-full text-xs transition flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path d="M12 4v16m8-8H4" />
                        </svg>
                        Record New Donation
                    </button>
                </div>

                <DataTable columns={columns} data={donations} emptyMessage="No donations recorded yet." />
            </div>

            <Modal
                open={isModalOpen}
                onClose={closeModal}
                eyebrow="Donation"
                title={editingDonation ? 'Edit Donation' : 'Record New Donation'}
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
                                        { value: 'processing', label: 'Processing' },
                                        { value: 'completed', label: 'Completed' },
                                        { value: 'cancelled', label: 'Cancelled' },
                                    ]}
                                />
                                <Field label="Anonymous" name="is_anonymous" type="checkbox" value={form.data.is_anonymous} onChange={(v) => form.setData('is_anonymous', v)} error={form.errors.is_anonymous} />
                            </div>

                    <Field label="Address" name="address" type="textarea" rows={2} value={form.data.address} onChange={(v) => form.setData('address', v)} error={form.errors.address} />
                    <Field label="Message" name="message" type="textarea" rows={2} value={form.data.message} onChange={(v) => form.setData('message', v)} error={form.errors.message} />
                    <Field label="Admin Notes" name="admin_notes" type="textarea" rows={2} value={form.data.admin_notes} onChange={(v) => form.setData('admin_notes', v)} error={form.errors.admin_notes} />

                    <FormActions onCancel={closeModal} processing={form.processing} submitLabel={editingDonation ? 'Save Changes' : 'Record Donation'} />
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

                        {viewingDonation.admin_notes && (
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Admin Notes</p>
                                <p className="mt-1 text-sm text-slate-700 whitespace-pre-line">{viewingDonation.admin_notes}</p>
                            </div>
                        )}

                        <form onSubmit={submitStatus} className="border-t border-slate-100 pt-4">
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
                                    { value: 'processing', label: 'Processing' },
                                    { value: 'completed', label: 'Completed' },
                                    { value: 'cancelled', label: 'Cancelled' },
                                ]}
                            />
                            <FormActions onCancel={closeViewModal} processing={statusForm.processing} submitLabel="Update Status" />
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
