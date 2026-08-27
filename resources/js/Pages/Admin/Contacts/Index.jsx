import AdminLayout from '@/Layouts/AdminLayout';
import StatusBadge from '@/Components/Admin/StatusBadge';
import DataTable from '@/Components/Admin/DataTable';
import ActionButtons from '@/Components/Admin/ActionButtons';
import { Head, router } from '@inertiajs/react';

const statusMap = {
    new: { label: 'New', className: 'bg-rose-100 text-rose-800' },
    read: { label: 'Read', className: 'bg-slate-100 text-slate-600' },
    responded: { label: 'Responded', className: 'bg-emerald-100 text-emerald-800' },
    closed: { label: 'Closed', className: 'bg-amber-100 text-amber-800' },
};

export default function Index({ contacts }) {
    const updateStatus = (contact, status) => {
        router.put(route('admin.contacts.update', contact.id), { status }, { preserveScroll: true });
    };

    const handleDelete = (contact) => {
        if (confirm(`Delete message from ${contact.first_name} ${contact.last_name}?`)) {
            router.delete(route('admin.contacts.destroy', contact.id));
        }
    };

    const columns = [
        {
            key: 'name',
            header: 'Name',
            render: (contact) => (
                <>
                    <span className="font-semibold text-slate-800">{contact.first_name} {contact.last_name}</span>
                    <span className="block text-xs font-normal text-slate-400">{contact.email}</span>
                </>
            ),
        },
        { key: 'subject', header: 'Subject', className: 'text-slate-600', render: (c) => c.subject },
        { key: 'message', header: 'Message', className: 'text-slate-600 max-w-sm truncate', render: (c) => c.message },
        {
            key: 'status',
            header: 'Status',
            render: (contact) => (
                <select
                    value={contact.status}
                    onChange={(e) => updateStatus(contact, e.target.value)}
                    className="text-xs font-bold rounded-full border-slate-200 focus:ring-rose-900 focus:border-rose-900"
                >
                    {Object.keys(statusMap).map((key) => (
                        <option key={key} value={key}>
                            {statusMap[key].label}
                        </option>
                    ))}
                </select>
            ),
        },
        {
            key: 'actions',
            header: 'Actions',
            align: 'right',
            render: (contact) => <ActionButtons onDelete={() => handleDelete(contact)} />,
        },
    ];

    return (
        <AdminLayout header="Contact Messages">
            <Head title="Contacts" />

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
                <h2 className="font-bold text-lg text-slate-900">Inbound Messages</h2>

                <DataTable columns={columns} data={contacts} emptyMessage="No messages yet." />
            </div>
        </AdminLayout>
    );
}
