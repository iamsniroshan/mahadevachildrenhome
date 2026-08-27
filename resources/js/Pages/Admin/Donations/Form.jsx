import AdminLayout from '@/Layouts/AdminLayout';
import Field from '@/Components/Admin/Field';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Form({ donation }) {
    const isEdit = !!donation;

    const { data, setData, post, put, processing, errors } = useForm({
        donor_name: donation?.donor_name ?? '',
        email: donation?.email ?? '',
        phone: donation?.phone ?? '',
        address: donation?.address ?? '',
        donation_type: donation?.donation_type ?? 'one_time',
        amount: donation?.amount ?? '',
        currency: donation?.currency ?? 'LKR',
        category: donation?.category ?? 'general',
        message: donation?.message ?? '',
        is_anonymous: donation?.is_anonymous ?? false,
        payment_method: donation?.payment_method ?? '',
        payment_reference: donation?.payment_reference ?? '',
        status: donation?.status ?? 'pending',
        admin_notes: donation?.admin_notes ?? '',
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.donations.update', donation.id));
        } else {
            post(route('admin.donations.store'));
        }
    };

    return (
        <AdminLayout header={isEdit ? 'Edit Donation' : 'Record New Donation'}>
            <Head title={isEdit ? 'Edit Donation' : 'Record New Donation'} />

            <form onSubmit={submit} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6 max-w-3xl">
                <div className="grid md:grid-cols-2 gap-6">
                    <Field label="Donor Name" name="donor_name" value={data.donor_name} onChange={(v) => setData('donor_name', v)} error={errors.donor_name} required />
                    <Field label="Email" name="email" type="email" value={data.email} onChange={(v) => setData('email', v)} error={errors.email} required />
                    <Field label="Phone" name="phone" value={data.phone} onChange={(v) => setData('phone', v)} error={errors.phone} />
                    <Field label="Amount" name="amount" type="number" value={data.amount} onChange={(v) => setData('amount', v)} error={errors.amount} required />
                    <Field label="Currency" name="currency" value={data.currency} onChange={(v) => setData('currency', v)} error={errors.currency} />
                    <Field
                        label="Donation Type"
                        name="donation_type"
                        type="select"
                        value={data.donation_type}
                        onChange={(v) => setData('donation_type', v)}
                        error={errors.donation_type}
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
                        value={data.category}
                        onChange={(v) => setData('category', v)}
                        error={errors.category}
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
                        value={data.payment_method}
                        onChange={(v) => setData('payment_method', v)}
                        error={errors.payment_method}
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
                    <Field label="Payment Reference" name="payment_reference" value={data.payment_reference} onChange={(v) => setData('payment_reference', v)} error={errors.payment_reference} />
                    <Field
                        label="Status"
                        name="status"
                        type="select"
                        value={data.status}
                        onChange={(v) => setData('status', v)}
                        error={errors.status}
                        options={[
                            { value: 'pending', label: 'Pending' },
                            { value: 'confirmed', label: 'Confirmed' },
                            { value: 'processing', label: 'Processing' },
                            { value: 'completed', label: 'Completed' },
                            { value: 'cancelled', label: 'Cancelled' },
                        ]}
                    />
                    <Field label="Anonymous" name="is_anonymous" type="checkbox" value={data.is_anonymous} onChange={(v) => setData('is_anonymous', v)} error={errors.is_anonymous} />
                </div>

                <Field label="Address" name="address" type="textarea" rows={2} value={data.address} onChange={(v) => setData('address', v)} error={errors.address} />
                <Field label="Message" name="message" type="textarea" rows={2} value={data.message} onChange={(v) => setData('message', v)} error={errors.message} />
                <Field label="Admin Notes" name="admin_notes" type="textarea" rows={2} value={data.admin_notes} onChange={(v) => setData('admin_notes', v)} error={errors.admin_notes} />

                <div className="flex items-center gap-3 pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition disabled:opacity-50"
                    >
                        {isEdit ? 'Save Changes' : 'Record Donation'}
                    </button>
                    <Link href={route('admin.donations.index')} className="text-sm font-semibold text-slate-500 hover:text-slate-700">
                        Cancel
                    </Link>
                </div>
            </form>
        </AdminLayout>
    );
}
