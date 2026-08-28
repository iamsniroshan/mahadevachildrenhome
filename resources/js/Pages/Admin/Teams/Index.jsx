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
    active: { label: 'Active', className: 'bg-emerald-100 text-emerald-800' },
    inactive: { label: 'Inactive', className: 'bg-slate-100 text-slate-600' },
};

const emptyTeam = {
    name: '',
    position: '',
    qualifications: '',
    phone: '',
    email: '',
    image: '',
    team_type: 'staff',
    status: 'active',
    display_order: 0,
};

const toFormData = (team) => ({
    name: team?.name ?? '',
    position: team?.position ?? '',
    qualifications: team?.qualifications ?? '',
    phone: team?.phone ?? '',
    email: team?.email ?? '',
    image: team?.image ?? '',
    team_type: team?.team_type ?? 'staff',
    status: team?.status ?? 'active',
    display_order: team?.display_order ?? 0,
});

export default function Index({ teams }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTeam, setEditingTeam] = useState(null);
    const form = useForm(emptyTeam);

    const openCreateModal = () => {
        setEditingTeam(null);
        form.reset();
        form.setData(emptyTeam);
        setIsModalOpen(true);
    };

    const openEditModal = (team) => {
        setEditingTeam(team);
        form.reset();
        form.setData(toFormData(team));
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingTeam(null);
        form.reset();
    };

    const submit = (e) => {
        e.preventDefault();

        if (editingTeam) {
            form.put(route('admin.teams.update', editingTeam.id), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
            return;
        }

        form.post(route('admin.teams.store'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    const handleDelete = (team) => {
        if (confirm(`Remove ${team.name} from the team?`)) {
            router.delete(route('admin.teams.destroy', team.id));
        }
    };

    const columns = [
        { key: 'name', header: 'Name', className: 'font-semibold text-slate-800', render: (t) => t.name },
        { key: 'position', header: 'Position', className: 'text-slate-600', render: (t) => t.position },
        { key: 'team_type', header: 'Type', className: 'text-slate-600 capitalize', render: (t) => t.team_type },
        { key: 'status', header: 'Status', render: (t) => <StatusBadge value={t.status} map={statusMap} /> },
        { key: 'display_order', header: 'Order', className: 'text-slate-600', render: (t) => t.display_order },
        {
            key: 'actions',
            header: 'Actions',
            align: 'right',
            render: (team) => <ActionButtons onEdit={() => openEditModal(team)} onDelete={() => handleDelete(team)} />,
        },
    ];

    return (
        <AdminLayout header="Team Members">
            <Head title="Team Members" />

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6 space-y-5 sm:space-y-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="font-bold text-lg text-slate-900">Committee, Executives & Staff</h2>
                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="bg-rose-900 hover:bg-rose-950 text-white font-semibold px-5 py-2 rounded-full text-xs transition"
                    >
                        + Add Member
                    </button>
                </div>

                <DataTable columns={columns} data={teams} emptyMessage="No team members yet." />
            </div>

            <Modal open={isModalOpen} onClose={closeModal} eyebrow="Team Member" title={editingTeam ? 'Edit Team Member' : 'Add Team Member'}>
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Field label="Name" name="name" value={form.data.name} onChange={(v) => form.setData('name', v)} error={form.errors.name} required />
                        <Field label="Position" name="position" value={form.data.position} onChange={(v) => form.setData('position', v)} error={form.errors.position} required />
                        <Field label="Phone" name="phone" value={form.data.phone} onChange={(v) => form.setData('phone', v)} error={form.errors.phone} />
                        <Field label="Email" name="email" type="email" value={form.data.email} onChange={(v) => form.setData('email', v)} error={form.errors.email} />
                        <Field label="Image Path" name="image" value={form.data.image} onChange={(v) => form.setData('image', v)} error={form.errors.image} />
                        <Field
                            label="Team Type"
                            name="team_type"
                            type="select"
                            value={form.data.team_type}
                            onChange={(v) => form.setData('team_type', v)}
                            error={form.errors.team_type}
                            options={[
                                { value: 'committee', label: 'Committee' },
                                { value: 'executive', label: 'Executive' },
                                { value: 'staff', label: 'Staff' },
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
                            ]}
                        />
                        <Field label="Display Order" name="display_order" type="number" value={form.data.display_order} onChange={(v) => form.setData('display_order', v)} error={form.errors.display_order} />
                    </div>

                    <Field label="Qualifications" name="qualifications" type="textarea" value={form.data.qualifications} onChange={(v) => form.setData('qualifications', v)} error={form.errors.qualifications} />

                    <FormActions onCancel={closeModal} processing={form.processing} submitLabel={editingTeam ? 'Save Changes' : 'Create Member'} />
                </form>
            </Modal>
        </AdminLayout>
    );
}
