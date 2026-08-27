import AdminLayout from '@/Layouts/AdminLayout';
import StatusBadge from '@/Components/Admin/StatusBadge';
import { Head, Link, router } from '@inertiajs/react';

const statusMap = {
    draft: { label: 'Draft', className: 'bg-slate-100 text-slate-600' },
    active: { label: 'Active', className: 'bg-emerald-100 text-emerald-800' },
    paused: { label: 'Paused', className: 'bg-amber-100 text-amber-800' },
    completed: { label: 'Completed', className: 'bg-teal-100 text-teal-800' },
    archived: { label: 'Archived', className: 'bg-slate-200 text-slate-600' },
};

export default function Index({ causes }) {
    const handleDelete = (cause) => {
        if (confirm(`Delete cause "${cause.title}"?`)) {
            router.delete(route('admin.fundrise.destroy', cause.id));
        }
    };

    const percent = (cause) => {
        if (!cause.goal_amount || cause.goal_amount <= 0) return 0;
        return Math.min(100, Math.round((cause.current_amount / cause.goal_amount) * 100));
    };

    return (
        <AdminLayout header="Fundraising Causes">
            <Head title="Causes" />

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="font-bold text-lg text-slate-900">All Causes</h2>
                    <Link
                        href={route('admin.fundrise.create')}
                        className="bg-rose-900 hover:bg-rose-950 text-white font-semibold px-5 py-2 rounded-full text-xs transition"
                    >
                        + New Cause
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                <th className="pb-3">Title</th>
                                <th className="pb-3">Progress</th>
                                <th className="pb-3">Goal</th>
                                <th className="pb-3">Status</th>
                                <th className="pb-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {causes.map((cause) => (
                                <tr key={cause.id}>
                                    <td className="py-4 font-semibold text-slate-800 max-w-xs truncate">{cause.title}</td>
                                    <td className="py-4 text-slate-600 w-48">
                                        <div className="w-full bg-slate-100 rounded-full h-2 mb-1">
                                            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${percent(cause)}%` }} />
                                        </div>
                                        <span className="text-xs font-semibold text-slate-500">{percent(cause)}%</span>
                                    </td>
                                    <td className="py-4 text-slate-600">
                                        {cause.currency} {Number(cause.goal_amount ?? 0).toLocaleString()}
                                    </td>
                                    <td className="py-4">
                                        <StatusBadge value={cause.status} map={statusMap} />
                                    </td>
                                    <td className="py-4 text-right space-x-3">
                                        <Link
                                            href={route('admin.fundrise.edit', cause.id)}
                                            className="text-xs font-bold text-rose-900 hover:underline"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(cause)}
                                            className="text-xs font-bold text-slate-400 hover:text-rose-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {causes.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-sm text-slate-400">
                                        No causes yet.
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
