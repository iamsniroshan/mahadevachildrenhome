import AdminLayout from '@/Layouts/AdminLayout';
import StatusBadge from '@/Components/Admin/StatusBadge';
import { Head, Link, router } from '@inertiajs/react';

const statusMap = {
    active: { label: 'Active', className: 'bg-emerald-100 text-emerald-800' },
    inactive: { label: 'Inactive', className: 'bg-slate-100 text-slate-600' },
};

export default function Index({ sliders }) {
    const handleDelete = (slider) => {
        if (confirm(`Remove slider "${slider.title}"?`)) {
            router.delete(route('admin.sliders.destroy', slider.id));
        }
    };

    return (
        <AdminLayout header="Homepage Sliders">
            <Head title="Sliders" />

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="font-bold text-lg text-slate-900">Slider Images</h2>
                    <Link
                        href={route('admin.sliders.create')}
                        className="bg-rose-900 hover:bg-rose-950 text-white font-semibold px-5 py-2 rounded-full text-xs transition"
                    >
                        + Add Slider
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                <th className="pb-3">Preview</th>
                                <th className="pb-3">Title</th>
                                <th className="pb-3">Order</th>
                                <th className="pb-3">Status</th>
                                <th className="pb-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {sliders.map((slider) => (
                                <tr key={slider.id}>
                                    <td className="py-4">
                                        <img src={slider.image} alt={slider.title} className="w-16 h-10 object-cover rounded-md bg-slate-100" />
                                    </td>
                                    <td className="py-4 font-semibold text-slate-800">{slider.title}</td>
                                    <td className="py-4 text-slate-600">{slider.display_order}</td>
                                    <td className="py-4">
                                        <StatusBadge value={slider.status} map={statusMap} />
                                    </td>
                                    <td className="py-4 text-right space-x-3">
                                        <Link
                                            href={route('admin.sliders.edit', slider.id)}
                                            className="text-xs font-bold text-rose-900 hover:underline"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(slider)}
                                            className="text-xs font-bold text-slate-400 hover:text-rose-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {sliders.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-sm text-slate-400">
                                        No sliders yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
