import { Head, Link } from '@inertiajs/react';
import SiteNav from '@/Components/Site/SiteNav';
import SiteFooter from '@/Components/Site/SiteFooter';

export default function Show({ newsItem, relatedNews = [] }) {
    return (
        <>
            <Head title={newsItem.title} />
            <div className="bg-amber-50/20 text-slate-800 font-sans antialiased">
                <SiteNav />

                <article className="py-16">
                    <div className="max-w-3xl mx-auto px-6 space-y-6">
                        <Link href={route('news.index')} className="text-sm font-bold text-rose-900 hover:underline">
                            ← Back to News
                        </Link>

                        {newsItem.category && (
                            <span className="text-xs font-bold uppercase tracking-wide text-rose-900">{newsItem.category}</span>
                        )}
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">{newsItem.title}</h1>
                        <div className="flex items-center gap-3 text-sm text-slate-500">
                            {newsItem.author && <span>By {newsItem.author}</span>}
                            {newsItem.publish_date && (
                                <span>
                                    {new Date(newsItem.publish_date).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </span>
                            )}
                        </div>

                        {newsItem.image && (
                            <img src={newsItem.image} alt={newsItem.title} className="rounded-2xl w-full h-80 object-cover bg-slate-100" />
                        )}

                        <div className="prose max-w-none text-slate-700 leading-relaxed whitespace-pre-line">
                            {newsItem.content}
                        </div>

                        {newsItem.images?.length > 0 && (
                            <div className="space-y-3 pt-4">
                                <h2 className="text-lg font-bold text-slate-900">Gallery</h2>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {newsItem.images.map((src, index) => (
                                        <img
                                            key={index}
                                            src={src}
                                            alt={`${newsItem.title} additional image ${index + 1}`}
                                            className="h-32 w-full rounded-xl object-cover bg-slate-100"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </article>

                {relatedNews.length > 0 && (
                    <section className="py-16 bg-white border-t border-slate-100">
                        <div className="max-w-7xl mx-auto px-6 space-y-8">
                            <h2 className="text-2xl font-bold text-slate-900 text-center">More Stories</h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                {relatedNews.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={route('news.show', item.id)}
                                        className="block border border-slate-100 rounded-2xl overflow-hidden p-4 space-y-3 hover:shadow-md transition"
                                    >
                                        <img src={item.image} className="rounded-xl h-40 w-full object-cover bg-slate-100" alt={item.title} />
                                        <h4 className="font-bold text-base">{item.title}</h4>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <SiteFooter />
            </div>
        </>
    );
}
