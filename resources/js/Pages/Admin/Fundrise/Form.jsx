import AdminLayout from '@/Layouts/AdminLayout';
import Field from '@/Components/Admin/Field';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Form({ cause }) {
    const isEdit = !!cause;

    const { data, setData, post, put, processing, errors } = useForm({
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

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.fundrise.update', cause.id));
        } else {
            post(route('admin.fundrise.store'));
        }
    };

    return (
        <AdminLayout header={isEdit ? 'Edit Cause' : 'New Cause'}>
            <Head title={isEdit ? 'Edit Cause' : 'New Cause'} />

            <form onSubmit={submit} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6 max-w-3xl">
                <Field label="Title" name="title" value={data.title} onChange={(v) => setData('title', v)} error={errors.title} required />

                <div className="grid md:grid-cols-2 gap-6">
                    <Field label="Image Path" name="image" value={data.image} onChange={(v) => setData('image', v)} error={errors.image} />
                    <Field label="Category" name="category" value={data.category} onChange={(v) => setData('category', v)} error={errors.category} />
                    <Field label="Goal Amount" name="goal_amount" type="number" value={data.goal_amount} onChange={(v) => setData('goal_amount', v)} error={errors.goal_amount} />
                    <Field label="Current Amount" name="current_amount" type="number" value={data.current_amount} onChange={(v) => setData('current_amount', v)} error={errors.current_amount} />
                    <Field label="Currency" name="currency" value={data.currency} onChange={(v) => setData('currency', v)} error={errors.currency} />
                    <Field
                        label="Status"
                        name="status"
                        type="select"
                        value={data.status}
                        onChange={(v) => setData('status', v)}
                        error={errors.status}
                        options={[
                            { value: 'draft', label: 'Draft' },
                            { value: 'active', label: 'Active' },
                            { value: 'paused', label: 'Paused' },
                            { value: 'completed', label: 'Completed' },
                            { value: 'archived', label: 'Archived' },
                        ]}
                    />
                    <Field label="Start Date" name="start_date" type="datetime-local" value={data.start_date} onChange={(v) => setData('start_date', v)} error={errors.start_date} />
                    <Field label="End Date" name="end_date" type="datetime-local" value={data.end_date} onChange={(v) => setData('end_date', v)} error={errors.end_date} />
                    <Field label="Featured" name="featured" type="checkbox" value={data.featured} onChange={(v) => setData('featured', v)} error={errors.featured} />
                </div>

                <Field label="Excerpt" name="excerpt" type="textarea" rows={2} value={data.excerpt} onChange={(v) => setData('excerpt', v)} error={errors.excerpt} />
                <Field label="Content" name="content" type="textarea" rows={8} value={data.content} onChange={(v) => setData('content', v)} error={errors.content} required />
                <Field label="Tags (comma separated)" name="tags" value={data.tags} onChange={(v) => setData('tags', v)} error={errors.tags} />

                <div className="flex items-center gap-3 pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition disabled:opacity-50"
                    >
                        {isEdit ? 'Save Changes' : 'Create Cause'}
                    </button>
                    <Link href={route('admin.fundrise.index')} className="text-sm font-semibold text-slate-500 hover:text-slate-700">
                        Cancel
                    </Link>
                </div>
            </form>
        </AdminLayout>
    );
}
