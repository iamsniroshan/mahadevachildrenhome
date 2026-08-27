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
    published: { label: 'Published', className: 'bg-emerald-100 text-emerald-800' },
    archived: { label: 'Archived', className: 'bg-amber-100 text-amber-800' },
};

const emptyNews = {
    title: '',
    content: '',
    excerpt: '',
    image: null,
    images: [],
    existing_images: [],
    author: '',
    category: 'general',
    status: 'draft',
    featured: false,
    publish_date: '',
};

const toFormData = (item) => ({
    title: item?.title ?? '',
    content: item?.content ?? '',
    excerpt: item?.excerpt ?? '',
    image: null,
    images: [],
    existing_images: item?.images ?? [],
    author: item?.author ?? '',
    category: item?.category ?? 'general',
    status: item?.status ?? 'draft',
    featured: item?.featured ?? false,
    publish_date: item?.publish_date ?? '',
});

export default function Index({ newsItems }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [featuredPreview, setFeaturedPreview] = useState(null);
    const [newImagePreviews, setNewImagePreviews] = useState([]);
    const form = useForm(emptyNews);

    const openCreateModal = () => {
        setEditingItem(null);
        form.reset();
        form.setData(emptyNews);
        setFeaturedPreview(null);
        setNewImagePreviews([]);
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditingItem(item);
        form.reset();
        form.setData(toFormData(item));
        setFeaturedPreview(item.image ?? null);
        setNewImagePreviews([]);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
        setFeaturedPreview(null);
        setNewImagePreviews([]);
        form.reset();
    };

    const handleFeaturedChange = (file) => {
        form.setData('image', file);
        setFeaturedPreview(file ? URL.createObjectURL(file) : editingItem?.image ?? null);
    };

    const handleAdditionalImagesChange = (files) => {
        form.setData('images', files);
        setNewImagePreviews(files.map((file) => URL.createObjectURL(file)));
    };

    const removeExistingImage = (index) => {
        form.setData('existing_images', form.data.existing_images.filter((_, i) => i !== index));
    };

    const submit = (e) => {
        e.preventDefault();

        if (editingItem) {
            form.transform((data) => ({ ...data, _method: 'put' }));
            form.post(route('admin.news.update', editingItem.id), {
                preserveScroll: true,
                forceFormData: true,
                onSuccess: () => closeModal(),
            });
            return;
        }

        form.transform((data) => data);
        form.post(route('admin.news.store'), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => closeModal(),
        });
    };

    const handleDelete = (item) => {
        if (confirm(`Delete news article "${item.title}"?`)) {
            router.delete(route('admin.news.destroy', item.id));
        }
    };

    const columns = [
        { key: 'title', header: 'Title', className: 'font-semibold text-slate-800 max-w-md truncate', render: (n) => n.title },
        { key: 'author', header: 'Author', className: 'text-slate-600', render: (n) => n.author ?? '—' },
        { key: 'category', header: 'Category', className: 'text-slate-600 capitalize', render: (n) => n.category },
        { key: 'status', header: 'Status', render: (n) => <StatusBadge value={n.status} map={statusMap} /> },
        {
            key: 'actions',
            header: 'Actions',
            align: 'right',
            render: (item) => <ActionButtons onEdit={() => openEditModal(item)} onDelete={() => handleDelete(item)} />,
        },
    ];

    return (
        <AdminLayout header="News & Updates">
            <Head title="News" />

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="font-bold text-lg text-slate-900">All News Articles</h2>
                    <button
                        type="button"
                        onClick={openCreateModal}
                        className="bg-rose-900 hover:bg-rose-950 text-white font-semibold px-5 py-2 rounded-full text-xs transition"
                    >
                        + New Article
                    </button>
                </div>

                <DataTable columns={columns} data={newsItems} emptyMessage="No news articles yet." />
            </div>

            <Modal open={isModalOpen} onClose={closeModal} eyebrow="News Article" title={editingItem ? 'Edit News Article' : 'New News Article'}>
                <form onSubmit={submit} className="space-y-6">
                    <Field label="Title" name="title" value={form.data.title} onChange={(v) => form.setData('title', v)} error={form.errors.title} required />

                    <div className="grid md:grid-cols-2 gap-6">
                        <Field label="Author" name="author" value={form.data.author} onChange={(v) => form.setData('author', v)} error={form.errors.author} />
                        <Field label="Category" name="category" value={form.data.category} onChange={(v) => form.setData('category', v)} error={form.errors.category} />
                        <div className="space-y-1.5">
                            <Field
                                label="Featured Image"
                                name="image"
                                type="file"
                                onChange={handleFeaturedChange}
                                error={form.errors.image}
                            />
                            {featuredPreview && (
                                <img src={featuredPreview} alt="Featured preview" className="h-20 w-32 rounded-md object-cover border border-slate-200" />
                            )}
                        </div>
                        <Field
                            label="Status"
                            name="status"
                            type="select"
                            value={form.data.status}
                            onChange={(v) => form.setData('status', v)}
                            error={form.errors.status}
                            options={[
                                { value: 'draft', label: 'Draft' },
                                { value: 'published', label: 'Published' },
                                { value: 'archived', label: 'Archived' },
                            ]}
                        />
                        <Field label="Publish Date" name="publish_date" type="datetime-local" value={form.data.publish_date} onChange={(v) => form.setData('publish_date', v)} error={form.errors.publish_date} />
                        <Field label="Featured" name="featured" type="checkbox" value={form.data.featured} onChange={(v) => form.setData('featured', v)} error={form.errors.featured} />
                    </div>

                    <div className="space-y-2">
                        <Field
                            label="Additional Images"
                            name="images"
                            type="file-multi"
                            onChange={handleAdditionalImagesChange}
                            error={form.errors.images}
                        />
                        {(form.data.existing_images.length > 0 || newImagePreviews.length > 0) && (
                            <div className="flex flex-wrap gap-3">
                                {form.data.existing_images.map((src, index) => (
                                    <div key={`existing-${index}`} className="relative">
                                        <img src={src} alt={`Additional ${index + 1}`} className="h-20 w-20 rounded-md object-cover border border-slate-200" />
                                        <button
                                            type="button"
                                            onClick={() => removeExistingImage(index)}
                                            className="absolute -top-2 -right-2 bg-rose-600 text-white rounded-full w-5 h-5 text-xs font-bold flex items-center justify-center"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                                {newImagePreviews.map((src, index) => (
                                    <img key={`new-${index}`} src={src} alt={`New upload ${index + 1}`} className="h-20 w-20 rounded-md object-cover border border-emerald-300" />
                                ))}
                            </div>
                        )}
                    </div>

                    <Field label="Excerpt" name="excerpt" type="textarea" rows={2} value={form.data.excerpt} onChange={(v) => form.setData('excerpt', v)} error={form.errors.excerpt} />
                    <Field label="Content" name="content" type="textarea" rows={8} value={form.data.content} onChange={(v) => form.setData('content', v)} error={form.errors.content} required />

                    <FormActions onCancel={closeModal} processing={form.processing} submitLabel={editingItem ? 'Save Changes' : 'Publish Article'} />
                </form>
            </Modal>
        </AdminLayout>
    );
}
