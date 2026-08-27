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

const emptySlider = {
    title: '',
    image: null,
    display_order: 0,
    status: 'active',
};

const toFormData = (slider) => ({
    title: slider?.title ?? '',
    image: null,
    display_order: slider?.display_order ?? 0,
    status: slider?.status ?? 'active',
});

export default function Index({ sliders }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSlider, setEditingSlider] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const form = useForm(emptySlider);

    const openCreateModal = () => {
        setEditingSlider(null);
        form.reset();
        form.setData(emptySlider);
        setPreviewUrl(null);
        setIsModalOpen(true);
    };

    const openEditModal = (slider) => {
        setEditingSlider(slider);
        form.reset();
        form.setData(toFormData(slider));
        setPreviewUrl(slider.image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingSlider(null);
        setPreviewUrl(null);
        form.reset();
    };

    const handleImageChange = (file) => {
        form.setData('image', file);
        setPreviewUrl(file ? URL.createObjectURL(file) : editingSlider?.image ?? null);
    };

    const submit = (e) => {
        e.preventDefault();

        if (editingSlider) {
            form.transform((data) => ({ ...data, _method: 'put' }));
            form.post(route('admin.sliders.update', editingSlider.id), {
                preserveScroll: true,
                forceFormData: true,
                onSuccess: () => closeModal(),
            });
            return;
        }

        form.transform((data) => data);
        form.post(route('admin.sliders.store'), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => closeModal(),
        });
    };

    const handleDelete = (slider) => {
        if (confirm(`Remove slider "${slider.title}"?`)) {
            router.delete(route('admin.sliders.destroy', slider.id));
        }
    };

    const columns = [
        {
            key: 'preview',
            header: 'Preview',
            render: (slider) => (
                <img src={slider.image} alt={slider.title} className="w-16 h-10 object-cover rounded-md bg-slate-100" />
            ),
        },
        { key: 'title', header: 'Title', className: 'font-semibold text-slate-800', render: (s) => s.title },
        { key: 'display_order', header: 'Order', className: 'text-slate-600', render: (s) => s.display_order },
        { key: 'status', header: 'Status', render: (s) => <StatusBadge value={s.status} map={statusMap} /> },
        {
            key: 'actions',
            header: 'Actions',
            align: 'right',
            render: (slider) => <ActionButtons onEdit={() => openEditModal(slider)} onDelete={() => handleDelete(slider)} />,
        },
    ];

    return (
        <AdminLayout header="Homepage Sliders">
            <Head title="Sliders" />

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="font-bold text-lg text-slate-900">Slider Images</h2>
                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="bg-rose-900 hover:bg-rose-950 text-white font-semibold px-5 py-2 rounded-full text-xs transition"
                    >
                        + Add Slider
                    </button>
                </div>

                <DataTable columns={columns} data={sliders} emptyMessage="No sliders yet." />
            </div>

            <Modal open={isModalOpen} onClose={closeModal} eyebrow="Slider" title={editingSlider ? 'Edit Slider' : 'Add Slider'}>
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Field label="Title" name="title" value={form.data.title} onChange={(v) => form.setData('title', v)} error={form.errors.title} required />
                        <div className="space-y-1.5">
                            <Field
                                label="Slider Image"
                                name="image"
                                type="file"
                                onChange={handleImageChange}
                                error={form.errors.image}
                                required={!editingSlider}
                            />
                            {previewUrl && (
                                <img src={previewUrl} alt="Preview" className="h-20 w-32 rounded-md object-cover border border-slate-200" />
                            )}
                        </div>
                        <Field label="Display Order" name="display_order" type="number" value={form.data.display_order} onChange={(v) => form.setData('display_order', v)} error={form.errors.display_order} />
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
                    </div>

                    <FormActions onCancel={closeModal} processing={form.processing} submitLabel={editingSlider ? 'Save Changes' : 'Create Slider'} />
                </form>
            </Modal>
        </AdminLayout>
    );
}
