import { Link, router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import Seo from '@/Components/Seo';
import SiteNav from '@/Components/Site/SiteNav';
import SiteFooter from '@/Components/Site/SiteFooter';

export default function Index({ newsItems }) {
    const [items, setItems] = useState(newsItems?.data ?? []);
    const [nextPageUrl, setNextPageUrl] = useState(newsItems?.next_page_url ?? null);
    const [loading, setLoading] = useState(false);
    const sentinelRef = useRef(null);

    useEffect(() => {
        setItems(newsItems?.data ?? []);
        setNextPageUrl(newsItems?.next_page_url ?? null);
    }, [newsItems]);

    const loadMore = () => {
        if (!nextPageUrl || loading) return;
        setLoading(true);

        router.visit(nextPageUrl, {
            preserveState: true,
            preserveScroll: true,
            only: ['newsItems'],
            onSuccess: (page) => {
                const fresh = page.props.newsItems;
                setItems((prev) => [...prev, ...(fresh?.data ?? [])]);
                setNextPageUrl(fresh?.next_page_url ?? null);
                setLoading(false);
            },
            onError: () => setLoading(false),
        });
    };

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            },
            { rootMargin: '300px' }
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nextPageUrl, loading]);

    return (
        <>
            <Seo
                title="News & Updates"
                description="Read the latest news and updates from Mahadeva Swamigal Children Home in Kilinochchi, Sri Lanka."
            />
            <div className="bg-amber-50/20 text-slate-800 font-sans antialiased">
                <SiteNav />

                <section className="bg-blue-950 text-white pt-16 pb-16 rounded-b-[3rem]">
                    <div className="max-w-7xl mx-auto px-6 text-center space-y-3">
                        <span className="bg-rose-900/60 text-rose-200 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full inline-block">
                            Updates
                        </span>
                        <h1 className="text-4xl font-extrabold tracking-tight">Latest News & Stories</h1>
                        <p className="text-rose-100/80 max-w-xl mx-auto">
                            Read about our recent activities, events, and milestones at Mahadeva Children Home.
                        </p>
                    </div>
                </section>

                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-6 space-y-10">
                        <div className="grid md:grid-cols-3 gap-8">
                            {items.map((item) => (
                                <Link
                                    key={item.id}
                                    href={route('news.show', item.id)}
                                    className="block bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
                                >
                                    <img src={item.image} alt={item.title} className="h-48 w-full object-cover bg-slate-100" />
                                    <div className="p-5 space-y-2">
                                        {item.category && (
                                            <span className="text-xs font-bold uppercase tracking-wide text-rose-900">{item.category}</span>
                                        )}
                                        <h3 className="font-bold text-lg text-slate-900">{item.title}</h3>
                                        {item.excerpt && <p className="text-sm text-slate-600 line-clamp-3">{item.excerpt}</p>}
                                    </div>
                                </Link>
                            ))}
                            {items.length === 0 && (
                                <p className="col-span-3 text-center text-slate-400 py-12">No news articles published yet.</p>
                            )}
                        </div>

                        <div ref={sentinelRef} className="h-4" />

                        {loading && (
                            <p className="text-center text-sm font-semibold text-slate-400">Loading more stories…</p>
                        )}
                        {!nextPageUrl && items.length > 0 && (
                            <p className="text-center text-sm text-slate-400">You've reached the end.</p>
                        )}
                    </div>
                </section>

                <SiteFooter />
            </div>
        </>
    );
}
