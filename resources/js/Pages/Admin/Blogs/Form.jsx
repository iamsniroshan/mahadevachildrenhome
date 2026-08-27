import AdminLayout from '@/Layouts/AdminLayout';
import Field from '@/Components/Admin/Field';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Form({ blog }) {
    const isEdit = !!blog;

    const { data, setData, post, put, processing, errors } = useForm({
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

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.blogs.update', blog.id));
        } else {
            post(route('admin.blogs.store'));
        }
    };

    return (
        <AdminLayout header={isEdit ? 'Edit Blog Post' : 'New Blog Post'}>
            <Head title={isEdit ? 'Edit Blog Post' : 'New Blog Post'} />

            <form onSubmit={submit} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6 max-w-3xl">
                <Field label="Title" name="title" value={data.title} onChange={(v) => setData('title', v)} error={errors.title} required />

                <div className="grid md:grid-cols-2 gap-6">
                    <Field label="Author" name="author" value={data.author} onChange={(v) => setData('author', v)} error={errors.author} />
                    <Field label="Category" name="category" value={data.category} onChange={(v) => setData('category', v)} error={errors.category} />
                    <Field label="Image Path" name="image" value={data.image} onChange={(v) => setData('image', v)} error={errors.image} />
                    <Field
                        label="Status"
                        name="status"
                        type="select"
                        value={data.status}
                        onChange={(v) => setData('status', v)}
                        error={errors.status}
                        options={[
                            { value: 'draft', label: 'Draft' },
                            { value: 'published', label: 'Published' },
                            { value: 'archived', label: 'Archived' },
                        ]}
                    />
                    <Field label="Publish Date" name="publish_date" type="datetime-local" value={data.publish_date} onChange={(v) => setData('publish_date', v)} error={errors.publish_date} />
                    <Field label="Featured" name="featured" type="checkbox" value={data.featured} onChange={(v) => setData('featured', v)} error={errors.featured} />
                </div>

                <Field label="Excerpt" name="excerpt" type="textarea" rows={2} value={data.excerpt} onChange={(v) => setData('excerpt', v)} error={errors.excerpt} />
                <Field label="Content" name="content" type="textarea" rows={8} value={data.content} onChange={(v) => setData('content', v)} error={errors.content} required />

                <div className="flex items-center gap-3 pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition disabled:opacity-50"
                    >
                        {isEdit ? 'Save Changes' : 'Publish Post'}
                    </button>
                    <Link href={route('admin.blogs.index')} className="text-sm font-semibold text-slate-500 hover:text-slate-700">
                        Cancel
                    </Link>
                </div>
            </form>
        </AdminLayout>
    );
}
