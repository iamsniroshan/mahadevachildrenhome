import AdminLayout from '@/Layouts/AdminLayout';
import StatusBadge from '@/Components/Admin/StatusBadge';
import { Head, Link, router } from '@inertiajs/react';

const statusMap = {
    active: { label: 'Active', className: 'bg-emerald-100 text-emerald-800' },
    inactive: { label: 'Inactive', className: 'bg-slate-100 text-slate-600' },
};

export default function Index({ teams }) {
    const handleDelete = (team) => {
        if (confirm(`Remove ${team.name} from the team?`)) {
            router.delete(route('admin.teams.destroy', team.id));
        }
    };

    return (
        <AdminLayout header="Team Members">
            <Head title="Team Members" />

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="font-bold text-lg text-slate-900">Committee, Executives & Staff</h2>
                    <Link
                        href={route('admin.teams.create')}
                        className="bg-rose-900 hover:bg-rose-950 text-white font-semibold px-5 py-2 rounded-full text-xs transition"
                    >
                        + Add Member
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                <th className="pb-3">Name</th>
                                <th className="pb-3">Position</th>
                                <th className="pb-3">Type</th>
                                <th className="pb-3">Status</th>
                                <th className="pb-3">Order</th>
                                <th className="pb-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {teams.map((team) => (
                                <tr key={team.id}>
                                    <td className="py-4 font-semibold text-slate-800">{team.name}</td>
                                    <td className="py-4 text-slate-600">{team.position}</td>
                                    <td className="py-4 text-slate-600 capitalize">{team.team_type}</td>
                                    <td className="py-4">
                                        <StatusBadge value={team.status} map={statusMap} />
                                    </td>
                                    <td className="py-4 text-slate-600">{team.display_order}</td>
                                    <td className="py-4 text-right space-x-3">
                                        <Link
                                            href={route('admin.teams.edit', team.id)}
                                            className="text-xs font-bold text-rose-900 hover:underline"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(team)}
                                            className="text-xs font-bold text-slate-400 hover:text-rose-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {teams.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="py-8 text-center text-sm text-slate-400">
                                        No team members yet.
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
