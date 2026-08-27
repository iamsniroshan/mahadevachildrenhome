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
    draft: { label: 'Draft', className: 'bg-slate-100 text-slate-600' },
    active: { label: 'Active', className: 'bg-emerald-100 text-emerald-800' },
    paused: { label: 'Paused', className: 'bg-amber-100 text-amber-800' },
    completed: { label: 'Completed', className: 'bg-teal-100 text-teal-800' },
    archived: { label: 'Archived', className: 'bg-slate-200 text-slate-600' },
};

const emptyCause = {
    title: '',
    content: '',
    excerpt: '',
    image: '',
    goal_amount: '',
    current_amount: 0,
    currency: 'LKR',
    category: 'general',
    tags: '',
    status: 'draft',
    featured: false,
    start_date: '',
    end_date: '',
};

const toFormData = (cause) => ({
    title: cause?.title ?? '',
    content: cause?.content ?? '',
    excerpt: cause?.excerpt ?? '',
    image: cause?.image ?? '',
    goal_amount: cause?.goal_amount ?? '',
    current_amount: cause?.current_amount ?? 0,
    currency: cause?.currency ?? 'LKR',
    category: cause?.category ?? 'general',
    tags: cause?.tags ?? '',
    status: cause?.status ?? 'draft',
    featured: cause?.featured ?? false,
    start_date: cause?.start_date ?? '',
    end_date: cause?.end_date ?? '',
});

const percent = (cause) => {
    if (!cause.goal_amount || cause.goal_amount <= 0) return 0;
    return Math.min(100, Math.round((cause.current_amount / cause.goal_amount) * 100));
};

export default function Index({ causes }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCause, setEditingCause] = useState(null);
    const form = useForm(emptyCause);

    const openCreateModal = () => {
        setEditingCause(null);
        form.reset();
        form.setData(emptyCause);
        setIsModalOpen(true);
    };

    const openEditModal = (cause) => {
        setEditingCause(cause);
        form.reset();
        form.setData(toFormData(cause));
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingCause(null);
        form.reset();
    };

    const submit = (e) => {
        e.preventDefault();

        if (editingCause) {
            form.put(route('admin.fundrise.update', editingCause.id), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
            return;
        }

        form.post(route('admin.fundrise.store'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    const handleDelete = (cause) => {
        if (confirm(`Delete cause "${cause.title}"?`)) {
            router.delete(route('admin.fundrise.destroy', cause.id));
        }
    };

    const columns = [
        { key: 'title', header: 'Title', className: 'font-semibold text-slate-800 max-w-xs truncate', render: (c) => c.title },
        {
            key: 'progress',
            header: 'Progress',
            className: 'text-slate-600 w-48',
            render: (cause) => (
                <>
                    <div className="w-full bg-slate-100 rounded-full h-2 mb-1">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${percent(cause)}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-slate-500">{percent(cause)}%</span>
                </>
            ),
        },
        {
            key: 'goal',
            header: 'Goal',
            className: 'text-slate-600',
            render: (cause) => `${cause.currency} ${Number(cause.goal_amount ?? 0).toLocaleString()}`,
        },
        { key: 'status', header: 'Status', render: (cause) => <StatusBadge value={cause.status} map={statusMap} /> },
        {
            key: 'actions',
            header: 'Actions',
            align: 'right',
            render: (cause) => <ActionButtons onEdit={() => openEditModal(cause)} onDelete={() => handleDelete(cause)} />,
        },
    ];

    return (
        <AdminLayout header="Fundraising Causes">
            <Head title="Causes" />

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="font-bold text-lg text-slate-900">All Causes</h2>
                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="bg-rose-900 hover:bg-rose-950 text-white font-semibold px-5 py-2 rounded-full text-xs transition"
                    >
                        + New Cause
                    </button>
                </div>

                <DataTable columns={columns} data={causes} emptyMessage="No causes yet." />
            </div>

            <Modal open={isModalOpen} onClose={closeModal} eyebrow="Fundraising Cause" title={editingCause ? 'Edit Cause' : 'New Cause'}>
                <form onSubmit={submit} className="space-y-6">
                    <Field label="Title" name="title" value={form.data.title} onChange={(v) => form.setData('title', v)} error={form.errors.title} required />

                    <div className="grid md:grid-cols-2 gap-6">
                        <Field label="Image Path" name="image" value={form.data.image} onChange={(v) => form.setData('image', v)} error={form.errors.image} />
                        <Field label="Category" name="category" value={form.data.category} onChange={(v) => form.setData('category', v)} error={form.errors.category} />
                        <Field label="Goal Amount" name="goal_amount" type="number" value={form.data.goal_amount} onChange={(v) => form.setData('goal_amount', v)} error={form.errors.goal_amount} />
                        <Field label="Current Amount" name="current_amount" type="number" value={form.data.current_amount} onChange={(v) => form.setData('current_amount', v)} error={form.errors.current_amount} />
                        <Field label="Currency" name="currency" value={form.data.currency} onChange={(v) => form.setData('currency', v)} error={form.errors.currency} />
                        <Field
                            label="Status"
                            name="status"
                            type="select"
                            value={form.data.status}
                            onChange={(v) => form.setData('status', v)}
                            error={form.errors.status}
                            options={[
                                { value: 'draft', label: 'Draft' },
                                { value: 'active', label: 'Active' },
                                { value: 'paused', label: 'Paused' },
                                { value: 'completed', label: 'Completed' },
                                { value: 'archived', label: 'Archived' },
                            ]}
                        />
                        <Field label="Start Date" name="start_date" type="datetime-local" value={form.data.start_date} onChange={(v) => form.setData('start_date', v)} error={form.errors.start_date} />
                        <Field label="End Date" name="end_date" type="datetime-local" value={form.data.end_date} onChange={(v) => form.setData('end_date', v)} error={form.errors.end_date} />
                        <Field label="Featured" name="featured" type="checkbox" value={form.data.featured} onChange={(v) => form.setData('featured', v)} error={form.errors.featured} />
                    </div>

                    <Field label="Excerpt" name="excerpt" type="textarea" rows={2} value={form.data.excerpt} onChange={(v) => form.setData('excerpt', v)} error={form.errors.excerpt} />
                    <Field label="Content" name="content" type="textarea" rows={8} value={form.data.content} onChange={(v) => form.setData('content', v)} error={form.errors.content} required />
                    <Field label="Tags (comma separated)" name="tags" value={form.data.tags} onChange={(v) => form.setData('tags', v)} error={form.errors.tags} />

                    <FormActions onCancel={closeModal} processing={form.processing} submitLabel={editingCause ? 'Save Changes' : 'Create Cause'} />
                </form>
            </Modal>
        </AdminLayout>
    );
}
