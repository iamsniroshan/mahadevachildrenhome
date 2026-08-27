import AdminLayout from '@/Layouts/AdminLayout';
import Field from '@/Components/Admin/Field';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Form({ slider }) {
    const isEdit = !!slider;

    const { data, setData, post, put, processing, errors } = useForm({
        title: slider?.title ?? '',
        image: slider?.image ?? '',
        display_order: slider?.display_order ?? 0,
        status: slider?.status ?? 'active',
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.sliders.update', slider.id));
        } else {
            post(route('admin.sliders.store'));
        }
    };

    return (
        <AdminLayout header={isEdit ? 'Edit Slider' : 'Add Slider'}>
            <Head title={isEdit ? 'Edit Slider' : 'Add Slider'} />

            <form onSubmit={submit} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6 max-w-3xl">
                <div className="grid md:grid-cols-2 gap-6">
                    <Field label="Title" name="title" value={data.title} onChange={(v) => setData('title', v)} error={errors.title} required />
                    <Field label="Image Path" name="image" value={data.image} onChange={(v) => setData('image', v)} error={errors.image} required />
                    <Field label="Display Order" name="display_order" type="number" value={data.display_order} onChange={(v) => setData('display_order', v)} error={errors.display_order} />
                    <Field
                        label="Status"
                        name="status"
                        type="select"
                        value={data.status}
                        onChange={(v) => setData('status', v)}
                        error={errors.status}
                        options={[
                            { value: 'active', label: 'Active' },
                            { value: 'inactive', label: 'Inactive' },
                        ]}
                    />
                </div>

                <div className="flex items-center gap-3 pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition disabled:opacity-50"
                    >
                        {isEdit ? 'Save Changes' : 'Create Slider'}
                    </button>
                    <Link href={route('admin.sliders.index')} className="text-sm font-semibold text-slate-500 hover:text-slate-700">
                        Cancel
                    </Link>
                </div>
            </form>
        </AdminLayout>
    );
}
