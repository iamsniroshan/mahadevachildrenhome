import AdminLayout from '@/Layouts/AdminLayout';
import StatusBadge from '@/Components/Admin/StatusBadge';
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

    return (
        <AdminLayout header="Contact Messages">
            <Head title="Contacts" />

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
                <h2 className="font-bold text-lg text-slate-900">Inbound Messages</h2>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                <th className="pb-3">Name</th>
                                <th className="pb-3">Subject</th>
                                <th className="pb-3">Message</th>
                                <th className="pb-3">Status</th>
                                <th className="pb-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {contacts.map((contact) => (
                                <tr key={contact.id}>
                                    <td className="py-4 font-semibold text-slate-800">
                                        {contact.first_name} {contact.last_name}
                                        <span className="block text-xs font-normal text-slate-400">{contact.email}</span>
                                    </td>
                                    <td className="py-4 text-slate-600">{contact.subject}</td>
                                    <td className="py-4 text-slate-600 max-w-sm truncate">{contact.message}</td>
                                    <td className="py-4">
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
                                    </td>
                                    <td className="py-4 text-right">
                                        <button
                                            onClick={() => handleDelete(contact)}
                                            className="text-xs font-bold text-slate-400 hover:text-rose-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {contacts.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-sm text-slate-400">
                                        No messages yet.
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
