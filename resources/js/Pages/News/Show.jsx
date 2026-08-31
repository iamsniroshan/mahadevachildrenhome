import { useState } from 'react';
import { Link } from '@inertiajs/react';
import Seo from '@/Components/Seo';
import SiteNav from '@/Components/Site/SiteNav';
import SiteFooter from '@/Components/Site/SiteFooter';

function GalleryLightbox({ images, index, onClose, onPrev, onNext }) {
    if (index === null) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white text-slate-700 rounded-full w-9 h-9 flex items-center justify-center text-lg font-bold shadow"
            >
                ×
            </button>

            {images.length > 1 && (
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onPrev();
                    }}
                    className="absolute left-2 sm:left-6 bg-white/90 hover:bg-white text-slate-700 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold shadow"
                >
                    ‹
                </button>
            )}

            <img
                src={images[index]}
                alt={`Gallery image ${index + 1}`}
                className="max-h-[85vh] max-w-full rounded-xl object-contain"
                onClick={(e) => e.stopPropagation()}
            />

            {images.length > 1 && (
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onNext();
                    }}
                    className="absolute right-2 sm:right-6 bg-white/90 hover:bg-white text-slate-700 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold shadow"
                >
                    ›
                </button>
            )}
        </div>
    );
}

export default function Show({ newsItem, relatedNews = [] }) {
    const [activeImageIndex, setActiveImageIndex] = useState(null);
    const galleryImages = newsItem.images || [];

    const showPrev = () => setActiveImageIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);
    const showNext = () => setActiveImageIndex((i) => (i + 1) % galleryImages.length);

    return (
        <>
            <Seo
                title={newsItem.title}
                description={newsItem.excerpt || `Read the latest news from Mahadeva Swamigal Children Home: ${newsItem.title}.`}
                type="article"
                image={newsItem.image}
                jsonLd={{
                    '@context': 'https://schema.org',
                    '@type': 'NewsArticle',
                    headline: newsItem.title,
                    description: newsItem.excerpt || undefined,
                    image: newsItem.image || undefined,
                    datePublished: newsItem.publish_date || undefined,
                    dateModified: newsItem.updated_at || newsItem.publish_date || undefined,
                    author: newsItem.author ? { '@type': 'Person', name: newsItem.author } : undefined,
                }}
            />
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
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => setActiveImageIndex(index)}
                                            className="block"
                                        >
                                            <img
                                                src={src}
                                                alt={`${newsItem.title} additional image ${index + 1}`}
                                                className="h-32 w-full rounded-xl object-cover bg-slate-100 hover:opacity-80 transition"
                                            />
                                        </button>
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

            <GalleryLightbox
                images={galleryImages}
                index={activeImageIndex}
                onClose={() => setActiveImageIndex(null)}
                onPrev={showPrev}
                onNext={showNext}
            />
        </>
    );
}
