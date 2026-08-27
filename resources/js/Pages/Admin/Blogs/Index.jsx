import AdminLayout from '@/Layouts/AdminLayout';
import StatusBadge from '@/Components/Admin/StatusBadge';
import { Head, Link, router } from '@inertiajs/react';

const statusMap = {
    draft: { label: 'Draft', className: 'bg-slate-100 text-slate-600' },
    published: { label: 'Published', className: 'bg-emerald-100 text-emerald-800' },
    archived: { label: 'Archived', className: 'bg-amber-100 text-amber-800' },
};

export default function Index({ blogs }) {
    const handleDelete = (blog) => {
        if (confirm(`Delete blog post "${blog.title}"?`)) {
            router.delete(route('admin.blogs.destroy', blog.id));
        }
    };

    return (
        <AdminLayout header="Blog Posts">
            <Head title="Blogs" />

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="font-bold text-lg text-slate-900">All Blog Posts</h2>
                    <Link
                        href={route('admin.blogs.create')}
                        className="bg-rose-900 hover:bg-rose-950 text-white font-semibold px-5 py-2 rounded-full text-xs transition"
                    >
                        + New Post
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
                            {blogs.map((blog) => (
                                <tr key={blog.id}>
                                    <td className="py-4 font-semibold text-slate-800">{blog.title}</td>
                                    <td className="py-4 text-slate-600">{blog.author ?? '—'}</td>
                                    <td className="py-4 text-slate-600 capitalize">{blog.category}</td>
                                    <td className="py-4">
                                        <StatusBadge value={blog.status} map={statusMap} />
                                    </td>
                                    <td className="py-4 text-right space-x-3">
                                        <Link
                                            href={route('admin.blogs.edit', blog.id)}
                                            className="text-xs font-bold text-rose-900 hover:underline"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(blog)}
                                            className="text-xs font-bold text-slate-400 hover:text-rose-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {blogs.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-sm text-slate-400">
                                        No blog posts yet.
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
