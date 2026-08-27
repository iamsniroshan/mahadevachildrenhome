import AdminLayout from '@/Layouts/AdminLayout';
import StatusBadge from '@/Components/Admin/StatusBadge';
import { Head, Link, router } from '@inertiajs/react';

const statusMap = {
    draft: { label: 'Draft', className: 'bg-slate-100 text-slate-600' },
    published: { label: 'Published', className: 'bg-emerald-100 text-emerald-800' },
    archived: { label: 'Archived', className: 'bg-amber-100 text-amber-800' },
};

export default function Index({ newsItems }) {
    const handleDelete = (item) => {
        if (confirm(`Delete news article "${item.title}"?`)) {
            router.delete(route('admin.news.destroy', item.id));
        }
    };

    return (
        <AdminLayout header="News & Updates">
            <Head title="News" />

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="font-bold text-lg text-slate-900">All News Articles</h2>
                    <Link
                        href={route('admin.news.create')}
                        className="bg-rose-900 hover:bg-rose-950 text-white font-semibold px-5 py-2 rounded-full text-xs transition"
                    >
                        + New Article
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                <th className="pb-3">Title</th>
                                <th className="pb-3">Author</th>
                                <th className="pb-3">Category</th>
                                <th className="pb-3">Status</th>
                                <th className="pb-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {newsItems.map((item) => (
                                <tr key={item.id}>
                                    <td className="py-4 font-semibold text-slate-800 max-w-md truncate">{item.title}</td>
                                    <td className="py-4 text-slate-600">{item.author ?? '—'}</td>
                                    <td className="py-4 text-slate-600 capitalize">{item.category}</td>
                                    <td className="py-4">
                                        <StatusBadge value={item.status} map={statusMap} />
                                    </td>
                                    <td className="py-4 text-right space-x-3">
                                        <Link
                                            href={route('admin.news.edit', item.id)}
                                            className="text-xs font-bold text-rose-900 hover:underline"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(item)}
                                            className="text-xs font-bold text-slate-400 hover:text-rose-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {newsItems.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-sm text-slate-400">
                                        No news articles yet.
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
