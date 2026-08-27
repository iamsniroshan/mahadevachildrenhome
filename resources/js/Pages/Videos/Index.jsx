import { Head } from '@inertiajs/react';
import SiteNav from '@/Components/Site/SiteNav';
import SiteFooter from '@/Components/Site/SiteFooter';

export default function Index({ videos = [] }) {
    return (
        <>
            <Head title="Videos" />
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
                                {videos.map((video) => (
                                    <div
                                        key={video.id}
                                        className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition"
                                    >
                                        <div className="aspect-video bg-slate-100">
                                            {video.youtube_id ? (
                                                <iframe
                                                    src={`https://www.youtube.com/embed/${video.youtube_id}`}
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
                                        <div className="p-5">
                                            <h3 className="font-bold text-lg text-slate-900">{video.title}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-slate-400">No videos published yet.</p>
                        )}
                    </div>
                </section>

                <SiteFooter />
            </div>
        </>
    );
}
