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

const emptyVideo = {
    title: '',
    youtube_url: '',
    display_order: 0,
    status: 'active',
};

const toFormData = (video) => ({
    title: video?.title ?? '',
    youtube_url: video?.youtube_url ?? '',
    display_order: video?.display_order ?? 0,
    status: video?.status ?? 'active',
});

export default function Index({ videos }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingVideo, setEditingVideo] = useState(null);
    const form = useForm(emptyVideo);

    const openCreateModal = () => {
        setEditingVideo(null);
        form.reset();
        form.setData(emptyVideo);
        setIsModalOpen(true);
    };

    const openEditModal = (video) => {
        setEditingVideo(video);
        form.reset();
        form.setData(toFormData(video));
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingVideo(null);
        form.reset();
    };

    const submit = (e) => {
        e.preventDefault();

        if (editingVideo) {
            form.put(route('admin.videos.update', editingVideo.id), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
            return;
        }

        form.post(route('admin.videos.store'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    const handleDelete = (video) => {
        if (confirm(`Remove video "${video.title}"?`)) {
            router.delete(route('admin.videos.destroy', video.id));
        }
    };

    const columns = [
        {
            key: 'preview',
            header: 'Preview',
            render: (video) =>
                video.thumbnail_url ? (
                    <img src={video.thumbnail_url} alt={video.title} className="w-20 h-12 object-cover rounded-md bg-slate-100" />
                ) : (
                    <span className="text-xs text-slate-400">No preview</span>
                ),
        },
        { key: 'title', header: 'Title', className: 'font-semibold text-slate-800', render: (v) => v.title },
        { key: 'display_order', header: 'Order', className: 'text-slate-600', render: (v) => v.display_order },
        { key: 'status', header: 'Status', render: (v) => <StatusBadge value={v.status} map={statusMap} /> },
        {
            key: 'actions',
            header: 'Actions',
            align: 'right',
            render: (video) => <ActionButtons onEdit={() => openEditModal(video)} onDelete={() => handleDelete(video)} />,
        },
    ];

    return (
        <AdminLayout header="Videos">
            <Head title="Videos" />

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-6 space-y-5 sm:space-y-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="font-bold text-lg text-slate-900">Homepage Videos</h2>
                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="bg-rose-900 hover:bg-rose-950 text-white font-semibold px-5 py-2 rounded-full text-xs transition"
                    >
                        + Add Video
                    </button>
                </div>

                <DataTable columns={columns} data={videos} emptyMessage="No videos yet." />
            </div>

            <Modal open={isModalOpen} onClose={closeModal} eyebrow="Video" title={editingVideo ? 'Edit Video' : 'Add Video'}>
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Field label="Title" name="title" value={form.data.title} onChange={(v) => form.setData('title', v)} error={form.errors.title} required />
                        <Field
                            label="YouTube URL"
                            name="youtube_url"
                            value={form.data.youtube_url}
                            onChange={(v) => form.setData('youtube_url', v)}
                            error={form.errors.youtube_url}
                            required
                        />
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

                    <FormActions onCancel={closeModal} processing={form.processing} submitLabel={editingVideo ? 'Save Changes' : 'Add Video'} />
                </form>
            </Modal>
        </AdminLayout>
    );
}
