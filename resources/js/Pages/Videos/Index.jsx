import { useState } from 'react';
import Seo from '@/Components/Seo';
import SiteNav from '@/Components/Site/SiteNav';
import SiteFooter from '@/Components/Site/SiteFooter';

function VideoModal({ videos, index, onClose, onPrev, onNext }) {
    if (index === null) return null;
    const video = videos[index];

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

            {videos.length > 1 && (
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

            <div className="w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
                <div className="aspect-video bg-black rounded-xl overflow-hidden">
                    {video.youtube_id ? (
                        <iframe
                            src={`https://www.youtube.com/embed/${video.youtube_id}?autoplay=1`}
                            title={video.title}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm text-slate-400">
                            Video unavailable
                        </div>
                    )}
                </div>
                <h3 className="mt-3 text-center font-bold text-lg text-white">{video.title}</h3>
            </div>

            {videos.length > 1 && (
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

export default function Index({ videos = [] }) {
    const [activeIndex, setActiveIndex] = useState(null);

    const showPrev = () => setActiveIndex((i) => (i - 1 + videos.length) % videos.length);
    const showNext = () => setActiveIndex((i) => (i + 1) % videos.length);

    return (
        <>
            <Seo
                title="Videos"
                description="Watch stories, events, and moments from Mahadeva Swamigal Children Home in Kilinochchi, Sri Lanka."
            />
            <div className="bg-amber-50/20 text-slate-800 font-sans antialiased">
                <SiteNav />

                <section className="bg-rose-950 text-white pt-16 pb-16 rounded-b-[3rem]">
                    <div className="max-w-7xl mx-auto px-6 text-center space-y-3">
                        <span className="bg-rose-900/60 text-rose-200 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full inline-block">
                            Watch & Learn
                        </span>
                        <h1 className="text-4xl font-extrabold tracking-tight">Our Videos</h1>
                        <p className="text-rose-100/80 max-w-xl mx-auto">
                            Stories, events, and moments from Mahadeva Children Home captured on camera.
                        </p>
                    </div>
                </section>

                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-6">
                        {videos.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {videos.map((video, index) => (
                                    <button
                                        type="button"
                                        key={video.id}
                                        onClick={() => setActiveIndex(index)}
                                        className="text-left bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition"
                                    >
                                        <div className="relative aspect-video bg-slate-100 group">
                                            <img
                                                src={video.thumbnail_url || (video.youtube_id ? `https://img.youtube.com/vi/${video.youtube_id}/hqdefault.jpg` : undefined)}
                                                alt={video.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/40 transition-colors flex items-center justify-center">
                                                <span className="absolute w-16 h-16 rounded-full bg-white/30 opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
                                                <span className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 fill-rose-700 translate-x-0.5" aria-hidden="true">
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <h3 className="font-bold text-lg text-slate-900">{video.title}</h3>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-slate-400">No videos published yet.</p>
                        )}
                    </div>
                </section>

                <SiteFooter />
            </div>

            <VideoModal
                videos={videos}
                index={activeIndex}
                onClose={() => setActiveIndex(null)}
                onPrev={showPrev}
                onNext={showNext}
            />
        </>
    );
}
