import AdminLayout from '@/Layouts/AdminLayout';
import DataTable from '@/Components/Admin/DataTable';
import StatusBadge from '@/Components/Admin/StatusBadge';
import { Head, Link } from '@inertiajs/react';

const actionMap = {
    created: { label: 'Created', className: 'bg-emerald-100 text-emerald-800' },
    updated: { label: 'Updated', className: 'bg-amber-100 text-amber-800' },
    deleted: { label: 'Deleted', className: 'bg-rose-100 text-rose-800' },
};

export default function Index({ logs }) {
    const entries = logs?.data ?? [];
    const links = logs?.links ?? [];

    const columns = [
        {
            key: 'created_at',
            header: 'Date & Time',
            className: 'text-slate-600 whitespace-nowrap',
            render: (log) => new Date(log.created_at).toLocaleString(),
        },
        {
            key: 'user',
            header: 'User',
            render: (log) => (
                <>
                    <span className="font-semibold text-slate-800">{log.user_name ?? 'System'}</span>
                    {log.user?.email && <span className="block text-xs font-normal text-slate-400">{log.user.email}</span>}
                </>
            ),
        },
        { key: 'action', header: 'Action', render: (log) => <StatusBadge value={log.action} map={actionMap} /> },
        { key: 'subject_type', header: 'Subject', className: 'text-slate-600', render: (log) => log.subject_type },
        { key: 'description', header: 'Details', className: 'text-slate-600 max-w-md', render: (log) => log.description },
        { key: 'ip_address', header: 'IP Address', className: 'text-slate-400 text-xs', render: (log) => log.ip_address ?? '—' },
    ];

    return (
        <AdminLayout header="Activity Logs">
            <Head title="Activity Logs" />

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="font-bold text-lg text-slate-900">All User Actions</h2>
                    <span className="text-xs font-semibold text-slate-400">Read-only · records cannot be deleted</span>
                </div>

                <DataTable columns={columns} data={entries} emptyMessage="No activity recorded yet." />

                {links.length > 3 && (
                    <div className="flex flex-wrap justify-center gap-2 pt-2">
                        {links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                preserveScroll
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                                    link.active
                                        ? 'bg-rose-900 text-white'
                                        : link.url
                                        ? 'bg-white border border-slate-200 text-slate-600 hover:border-rose-900'
                                        : 'bg-slate-100 text-slate-300 pointer-events-none'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
