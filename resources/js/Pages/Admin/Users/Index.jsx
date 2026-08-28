import AdminLayout from '@/Layouts/AdminLayout';
import Field from '@/Components/Admin/Field';
import StatusBadge from '@/Components/Admin/StatusBadge';
import DataTable from '@/Components/Admin/DataTable';
import ActionButtons from '@/Components/Admin/ActionButtons';
import Modal from '@/Components/Admin/Modal';
import FormActions from '@/Components/Admin/FormActions';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

const statusMap = {
    active: { label: 'Active', className: 'bg-emerald-100 text-emerald-800' },
    inactive: { label: 'Inactive', className: 'bg-slate-100 text-slate-600' },
    pending: { label: 'Pending', className: 'bg-amber-100 text-amber-800' },
};

const roleMap = {
    superadmin: { label: 'Super Admin', className: 'bg-purple-100 text-purple-800' },
    admin: { label: 'Admin', className: 'bg-rose-100 text-rose-800' },
    manager: { label: 'Manager', className: 'bg-sky-100 text-sky-800' },
    user: { label: 'User', className: 'bg-slate-100 text-slate-600' },
    viewer: { label: 'Viewer', className: 'bg-slate-100 text-slate-500' },
};

const emptyUser = {
    name: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    title: '',
    department: '',
    role: 'user',
    status: 'active',
};

const toFormData = (user) => ({
    name: user?.name ?? '',
    email: user?.email ?? '',
    password: '',
    first_name: user?.first_name ?? '',
    last_name: user?.last_name ?? '',
    title: user?.title ?? '',
    department: user?.department ?? '',
    role: user?.role ?? 'user',
    status: user?.status ?? 'active',
});

export default function Index({ users }) {
    const { auth } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const form = useForm(emptyUser);

    const openCreateModal = () => {
        setEditingUser(null);
        form.reset();
        form.setData(emptyUser);
        setIsModalOpen(true);
    };

    const openEditModal = (user) => {
        setEditingUser(user);
        form.reset();
        form.setData(toFormData(user));
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingUser(null);
        form.reset();
    };

    const submit = (e) => {
        e.preventDefault();

        if (editingUser) {
            form.put(route('admin.users.update', editingUser.id), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
            return;
        }

        form.post(route('admin.users.store'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    const handleDelete = (user) => {
        if (confirm(`Remove user "${user.name}"?`)) {
            router.delete(route('admin.users.destroy', user.id));
        }
    };

    const columns = [
        {
            key: 'name',
            header: 'Name',
            render: (user) => (
                <>
                    <span className="font-semibold text-slate-800">{user.name}</span>
                    <span className="block text-xs font-normal text-slate-400">{user.email}</span>
                </>
            ),
        },
        { key: 'department', header: 'Department', className: 'text-slate-600', render: (u) => u.department ?? '—' },
        { key: 'role', header: 'Role', render: (u) => <StatusBadge value={u.role} map={roleMap} /> },
        { key: 'status', header: 'Status', render: (u) => <StatusBadge value={u.status} map={statusMap} /> },
        {
            key: 'actions',
            header: 'Actions',
            align: 'right',
            render: (user) => {
                const isLockedSuperAdmin = user.role === 'superadmin' && auth?.user?.role !== 'superadmin';
                return (
                    <ActionButtons
                        onEdit={isLockedSuperAdmin ? undefined : () => openEditModal(user)}
                        onDelete={isLockedSuperAdmin || user.id === auth?.user?.id ? undefined : () => handleDelete(user)}
                    />
                );
            },
        },
    ];

    return (
        <AdminLayout header="Users">
            <Head title="Users" />

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6 space-y-5 sm:space-y-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="font-bold text-lg text-slate-900">All Users</h2>
                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="bg-rose-900 hover:bg-rose-950 text-white font-semibold px-5 py-2 rounded-full text-xs transition"
                    >
                        + Add User
                    </button>
                </div>

                <DataTable columns={columns} data={users} emptyMessage="No users yet." />
            </div>

            <Modal open={isModalOpen} onClose={closeModal} eyebrow="User" title={editingUser ? 'Edit User' : 'Add User'}>
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Field label="Full Name" name="name" value={form.data.name} onChange={(v) => form.setData('name', v)} error={form.errors.name} required />
                        <Field label="Email" name="email" type="email" value={form.data.email} onChange={(v) => form.setData('email', v)} error={form.errors.email} required />
                        <Field
                            label={editingUser ? 'New Password (optional)' : 'Password'}
                            name="password"
                            type="password"
                            value={form.data.password}
                            onChange={(v) => form.setData('password', v)}
                            error={form.errors.password}
                            required={!editingUser}
                        />
                        <Field label="Title" name="title" value={form.data.title} onChange={(v) => form.setData('title', v)} error={form.errors.title} />
                        <Field label="First Name" name="first_name" value={form.data.first_name} onChange={(v) => form.setData('first_name', v)} error={form.errors.first_name} />
                        <Field label="Last Name" name="last_name" value={form.data.last_name} onChange={(v) => form.setData('last_name', v)} error={form.errors.last_name} />
                        <Field label="Department" name="department" value={form.data.department} onChange={(v) => form.setData('department', v)} error={form.errors.department} />
                        <Field
                            label="Role"
                            name="role"
                            type="select"
                            value={form.data.role}
                            onChange={(v) => form.setData('role', v)}
                            error={form.errors.role}
                            options={[
                                { value: 'admin', label: 'Admin' },
                                { value: 'manager', label: 'Manager' },
                                { value: 'user', label: 'User' },
                                { value: 'viewer', label: 'Viewer' },
                            ]}
                        />
                        <Field
                            label="Status"
                            name="status"
                            type="select"
                            value={form.data.status}
                            onChange={(v) => form.setData('status', v)}
                            error={form.errors.status}
                            options={[
                                { value: 'active', label: 'Active' },
                                { value: 'inactive', label: 'Inactive' },
                                { value: 'pending', label: 'Pending' },
                            ]}
                        />
                    </div>

                    <FormActions onCancel={closeModal} processing={form.processing} submitLabel={editingUser ? 'Save Changes' : 'Create User'} />
                </form>
            </Modal>
        </AdminLayout>
    );
}
