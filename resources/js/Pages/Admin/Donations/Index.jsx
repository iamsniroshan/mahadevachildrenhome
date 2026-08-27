import AdminLayout from '@/Layouts/AdminLayout';
import StatusBadge from '@/Components/Admin/StatusBadge';
import { Head, Link, router } from '@inertiajs/react';

const statusMap = {
    pending: { label: 'Pending', className: 'bg-amber-100 text-amber-800' },
    confirmed: { label: 'Confirmed', className: 'bg-teal-100 text-teal-800' },
    processing: { label: 'Processing', className: 'bg-sky-100 text-sky-800' },
    completed: { label: 'Completed', className: 'bg-emerald-100 text-emerald-800' },
    cancelled: { label: 'Cancelled', className: 'bg-rose-100 text-rose-800' },
};

export default function Index({ donations }) {
    const handleDelete = (donation) => {
        if (confirm(`Delete donation from ${donation.donor_name}?`)) {
            router.delete(route('admin.donations.destroy', donation.id));
        }
    };

    return (
        <AdminLayout header="Donations">
            <Head title="Donations" />

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="font-bold text-lg text-slate-900">All Donations</h2>
                    <Link
                        href={route('admin.donations.create')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2 rounded-full text-xs transition"
                    >
                        + Record Donation
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                <th className="pb-3">Donor</th>
                                <th className="pb-3">Category</th>
                                <th className="pb-3">Amount</th>
                                <th className="pb-3">Status</th>
                                <th className="pb-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {donations.map((donation) => (
                                <tr key={donation.id}>
                                    <td className="py-4 font-semibold text-slate-800">
                                        {donation.is_anonymous ? 'Anonymous Donor' : donation.donor_name}
                                    </td>
                                    <td className="py-4 text-slate-600 capitalize">{donation.category}</td>
                                    <td className="py-4 font-bold text-slate-900">
                                        {donation.currency} {Number(donation.amount).toLocaleString()}
                                    </td>
                                    <td className="py-4">
                                        <StatusBadge value={donation.status} map={statusMap} />
                                    </td>
                                    <td className="py-4 text-right space-x-3">
                                        <Link
                                            href={route('admin.donations.edit', donation.id)}
                                            className="text-xs font-bold text-rose-900 hover:underline"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(donation)}
                                            className="text-xs font-bold text-slate-400 hover:text-rose-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {donations.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-sm text-slate-400">
                                        No donations recorded yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
