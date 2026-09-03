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

const emptyBlog = {
    title: '',
    content: '',
    excerpt: '',
    image: '',
    author: '',
    category: 'general',
    status: 'draft',
    featured: false,
    publish_date: '',
};

const toFormData = (blog) => ({
    title: blog?.title ?? '',
    content: blog?.content ?? '',
    excerpt: blog?.excerpt ?? '',
    image: blog?.image ?? '',
    author: blog?.author ?? '',
    category: blog?.category ?? 'general',
    status: blog?.status ?? 'draft',
    featured: blog?.featured ?? false,
    publish_date: blog?.publish_date ?? '',
});

export default function Index({ blogs }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const form = useForm(emptyBlog);

    const openCreateModal = () => {
        setEditingBlog(null);
        form.reset();
        form.setData(emptyBlog);
        setIsModalOpen(true);
    };

    const openEditModal = (blog) => {
        setEditingBlog(blog);
        form.reset();
        form.setData(toFormData(blog));
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingBlog(null);
        form.reset();
    };

    const submit = (e) => {
        e.preventDefault();

        if (editingBlog) {
            form.put(route('admin.blogs.update', editingBlog.id), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            });
            return;
        }

        form.post(route('admin.blogs.store'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    const handleDelete = (blog) => {
        if (confirm(`Delete blog post "${blog.title}"?`)) {
            router.delete(route('admin.blogs.destroy', blog.id));
        }
    };

    const columns = [
        { key: 'title', header: 'Title', className: 'font-semibold text-slate-800', render: (b) => b.title },
        { key: 'author', header: 'Author', className: 'text-slate-600', render: (b) => b.author ?? '—' },
        { key: 'category', header: 'Category', className: 'text-slate-600 capitalize', render: (b) => b.category },
        { key: 'status', header: 'Status', render: (b) => <StatusBadge value={b.status} map={statusMap} /> },
        {
            key: 'actions',
            header: 'Actions',
            align: 'right',
            render: (blog) => <ActionButtons onEdit={() => openEditModal(blog)} onDelete={() => handleDelete(blog)} />,
        },
    ];

    return (
        <AdminLayout header="Blog Posts">
            <Head title="Blogs" />

            <DataTable
                columns={columns}
                data={blogs}
                emptyMessage="No blog posts yet."
                actions={(
                    <button type="button" onClick={openCreateModal} className="whitespace-nowrap rounded-lg bg-rose-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-rose-950">
                        + New Post
                    </button>
                )}
            />

            <Modal open={isModalOpen} onClose={closeModal} eyebrow="Blog Post" title={editingBlog ? 'Edit Blog Post' : 'New Blog Post'}>
                <form onSubmit={submit} className="space-y-6">
                    <Field label="Title" name="title" value={form.data.title} onChange={(v) => form.setData('title', v)} error={form.errors.title} required />

                    <div className="grid md:grid-cols-2 gap-6">
                        <Field label="Author" name="author" value={form.data.author} onChange={(v) => form.setData('author', v)} error={form.errors.author} />
                        <Field label="Category" name="category" value={form.data.category} onChange={(v) => form.setData('category', v)} error={form.errors.category} />
                        <Field label="Image Path" name="image" value={form.data.image} onChange={(v) => form.setData('image', v)} error={form.errors.image} />
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

                    <Field label="Excerpt" name="excerpt" type="textarea" rows={2} value={form.data.excerpt} onChange={(v) => form.setData('excerpt', v)} error={form.errors.excerpt} />
                    <Field label="Content" name="content" type="textarea" rows={8} value={form.data.content} onChange={(v) => form.setData('content', v)} error={form.errors.content} required />

                    <FormActions onCancel={closeModal} processing={form.processing} submitLabel={editingBlog ? 'Save Changes' : 'Publish Post'} />
                </form>
            </Modal>
        </AdminLayout>
    );
}
