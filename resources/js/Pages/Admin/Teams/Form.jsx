import AdminLayout from '@/Layouts/AdminLayout';
import Field from '@/Components/Admin/Field';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Form({ team }) {
    const isEdit = !!team;

    const { data, setData, post, put, processing, errors } = useForm({
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

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.teams.update', team.id));
        } else {
            post(route('admin.teams.store'));
        }
    };

    return (
        <AdminLayout header={isEdit ? 'Edit Team Member' : 'Add Team Member'}>
            <Head title={isEdit ? 'Edit Team Member' : 'Add Team Member'} />

            <form onSubmit={submit} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6 max-w-3xl">
                <div className="grid md:grid-cols-2 gap-6">
                    <Field label="Name" name="name" value={data.name} onChange={(v) => setData('name', v)} error={errors.name} required />
                    <Field label="Position" name="position" value={data.position} onChange={(v) => setData('position', v)} error={errors.position} required />
                    <Field label="Phone" name="phone" value={data.phone} onChange={(v) => setData('phone', v)} error={errors.phone} />
                    <Field label="Email" name="email" type="email" value={data.email} onChange={(v) => setData('email', v)} error={errors.email} />
                    <Field label="Image Path" name="image" value={data.image} onChange={(v) => setData('image', v)} error={errors.image} />
                    <Field
                        label="Team Type"
                        name="team_type"
                        type="select"
                        value={data.team_type}
                        onChange={(v) => setData('team_type', v)}
                        error={errors.team_type}
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
                        value={data.status}
                        onChange={(v) => setData('status', v)}
                        error={errors.status}
                        options={[
                            { value: 'active', label: 'Active' },
                            { value: 'inactive', label: 'Inactive' },
                        ]}
                    />
                    <Field label="Display Order" name="display_order" type="number" value={data.display_order} onChange={(v) => setData('display_order', v)} error={errors.display_order} />
                </div>

                <Field label="Qualifications" name="qualifications" type="textarea" value={data.qualifications} onChange={(v) => setData('qualifications', v)} error={errors.qualifications} />

                <div className="flex items-center gap-3 pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition disabled:opacity-50"
                    >
                        {isEdit ? 'Save Changes' : 'Create Member'}
                    </button>
                    <Link href={route('admin.teams.index')} className="text-sm font-semibold text-slate-500 hover:text-slate-700">
                        Cancel
                    </Link>
                </div>
            </form>
        </AdminLayout>
    );
}
