import AdminLayout from '@/Layouts/AdminLayout';
import DataTable from '@/Components/Admin/DataTable';
import StatusBadge from '@/Components/Admin/StatusBadge';
import { Head } from '@inertiajs/react';

const actionMap = {
    created: { label: 'Created', className: 'bg-emerald-100 text-emerald-800' },
    updated: { label: 'Updated', className: 'bg-amber-100 text-amber-800' },
    deleted: { label: 'Deleted', className: 'bg-rose-100 text-rose-800' },
};

export default function Index({ logs }) {
    const entries = logs ?? [];

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
            <DataTable
                columns={columns}
                data={entries}
                emptyMessage="No activity recorded yet."
                actions={<span className="whitespace-nowrap text-xs font-semibold text-slate-400">Read-only · records cannot be deleted</span>}
            />
        </AdminLayout>
    );
}
