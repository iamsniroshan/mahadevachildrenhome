import { Head, Link } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import SiteNav from '@/Components/Site/SiteNav';
import SiteFooter from '@/Components/Site/SiteFooter';

const impactBadges = [
    {
        bg: '#C01C28',
        label: (
            <>
                Halting Global
                <br />
                Warming
            </>
        ),
        path: (
            <>
                <circle cx="12" cy="12" r="9" />
                <path d="M3.6 9h16.8M3.6 15h16.8" />
                <path d="M11.5 3a17 17 0 0 0 0 18M12.5 3a17 17 0 0 1 0 18" />
            </>
        ),
    },
    {
        bg: '#0E8A44',
        label: (
            <>
                Adopt Orphans
                <br />
                and Nurture
            </>
        ),
        path: (
            <>
                <path d="M7 11v8a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-8" />
                <path d="M12 3a4 4 0 0 0-4 4v4h8V7a4 4 0 0 0-4-4z" />
                <path d="M10 14h4" />
            </>
        ),
    },
    {
        bg: '#1F75A8',
        label: (
            <>
                Save
                <br />
                Environment
            </>
        ),
        path: (
            <>
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </>
        ),
    },
    {
        bg: '#E19E16',
        label: (
            <>
                Kids for
                <br />
                Education
            </>
        ),
        path: (
            <>
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                <path d="M6 6h10M6 10h10" />
            </>
        ),
    },
    {
        bg: '#1E1E1E',
        label: (
            <>
                Support
                <br />
                Homeless
            </>
        ),
        path: (
            <>
                <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5z" />
                <path d="M12 11a2.5 2.5 0 0 0-2.5 2.5c0 2 2.5 4.5 2.5 4.5s2.5-2.5 2.5-4.5A2.5 2.5 0 0 0 12 11z" />
            </>
        ),
    },
];

const causePercent = (cause) => {
    if (!cause.goal_amount || cause.goal_amount <= 0) return 0;
    return Math.min(100, Math.round((cause.current_amount / cause.goal_amount) * 100));
};

const fallbackHeroSlides = [
    { image: '/images/home/emotional-support.jpg', title: 'Children smiling' },
];

function HeroSlider({ slides }) {
    const [active, setActive] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const items = slides && slides.length > 0 ? slides : fallbackHeroSlides;
    const touchState = useRef({ startX: 0, dragging: false });

    useEffect(() => {
        if (items.length <= 1) return;
        const timer = setInterval(() => {
            setActive((prev) => (prev + 1) % items.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [items.length]);

    const goTo = (index) => {
        setActive((index + items.length) % items.length);
    };

    const handleTouchStart = (e) => {
        touchState.current = { startX: e.touches[0].clientX, dragging: true };
    };

    const handleTouchMove = (e) => {
        if (!touchState.current.dragging) return;
        setDragOffset(e.touches[0].clientX - touchState.current.startX);
    };

    const handleTouchEnd = () => {
        if (!touchState.current.dragging) return;
        touchState.current.dragging = false;

        if (dragOffset < -50) {
            goTo(active + 1);
        } else if (dragOffset > 50) {
            goTo(active - 1);
        }
        setDragOffset(0);
    };

    return (
        <div
            className="relative w-72 h-72 md:w-96 md:h-96 rounded-full border-8 border-rose-900/40 overflow-hidden shadow-2xl touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div
                className="absolute inset-0 flex h-full transition-transform duration-500 ease-out"
                style={{
                    width: `${items.length * 100}%`,
                    transform: `translateX(calc(${-active * (100 / items.length)}% + ${dragOffset}px))`,
                }}
            >
                {items.map((slide, index) => (
                    <img
                        key={slide.id ?? index}
                        src={slide.image}
                        alt={slide.title || 'Children smiling'}
                        className="h-full w-full object-cover flex-shrink-0"
                        style={{ width: `${100 / items.length}%` }}
                        draggable={false}
                    />
                ))}
            </div>
            {items.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {items.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goTo(index)}
                            aria-label={`Show slide ${index + 1}`}
                            className={`w-2 h-2 rounded-full transition ${
                                index === active ? 'bg-amber-500' : 'bg-white/50'
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function Home({ sliders = [], newsItems = [], causes = [] }) {
    return (
        <>
            <Head title="Mahadeva Swamigal Children Home" />
            <div className="bg-amber-50/20 text-slate-800 font-sans antialiased">
                <SiteNav />

                {/* 1. Hero Section */}
                <section className="bg-rose-950 text-white pt-16 pb-24 rounded-b-[3rem] relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <span className="bg-rose-900/60 text-rose-200 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full inline-block">
                                Kilinochchi, Sri Lanka
                            </span>
                            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                                Empowering & Nurturing Disadvantaged Children
                            </h1>
                            <p className="text-rose-100/80 text-lg leading-relaxed">
                                Providing education, shelter, holistic healthcare, and hope for orphaned and vulnerable children in Northern Sri Lanka.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-2">
                                <a
                                    href="#donate"
                                    className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-8 py-3.5 rounded-full transition shadow-lg"
                                >
                                    Sponsor a Child
                                </a>
                                <a
                                    href="#programs"
                                    className="border border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-3.5 rounded-full transition"
                                >
                                    Our Programs
                                </a>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <HeroSlider slides={sliders} />
                        </div>
                    </div>
                </section>

                {/* Impact Badges */}
                <div className="flex flex-wrap justify-center gap-4 p-8 bg-white font-sans">
                    {impactBadges.map((badge, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center w-52 h-52 text-white rounded-lg p-6 text-center hover:opacity-95 transition-opacity cursor-pointer"
                            style={{ backgroundColor: badge.bg }}
                        >
                            <svg
                                className="w-16 h-16 mb-4 stroke-current stroke-2 fill-none"
                                viewBox="0 0 24 24"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                {badge.path}
                            </svg>
                            <span className="font-semibold text-lg leading-tight">{badge.label}</span>
                        </div>
                    ))}
                </div>

                {/* 2. Impact Pillars */}
                <section id="programs" className="py-20">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <span className="text-rose-900 font-bold text-sm uppercase tracking-wider">
                                Our Core Pillars
                            </span>
                            <h2 className="text-3xl font-bold mt-2 text-slate-900">
                                Comprehensive Support Services
                            </h2>
                            <p className="text-slate-600 mt-2">
                                Support one of our active causes and help us continue this work.
                            </p>
                        </div>

                        {causes.length > 0 ? (
                            <div className="grid md:grid-cols-3 gap-8">
                                {causes.map((cause) => (
                                    <div
                                        key={cause.id}
                                        className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition flex flex-col"
                                    >
                                        <img src={cause.image} alt={cause.title} className="h-48 w-full object-cover bg-slate-100" />
                                        <div className="p-6 flex flex-col flex-1">
                                            {cause.category && (
                                                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded self-start capitalize">
                                                    {cause.category}
                                                </span>
                                            )}
                                            <h3 className="text-xl font-bold mt-3 mb-2">{cause.title}</h3>
                                            {cause.excerpt && (
                                                <p className="text-slate-600 text-sm leading-relaxed flex-1">{cause.excerpt}</p>
                                            )}

                                            <div className="mt-4 space-y-2">
                                                <div className="w-full bg-slate-100 rounded-full h-2.5">
                                                    <div
                                                        className="bg-emerald-500 h-2.5 rounded-full"
                                                        style={{ width: `${causePercent(cause)}%` }}
                                                    />
                                                </div>
                                                <div className="flex justify-between text-xs font-semibold text-slate-500">
                                                    <span>Raised: {cause.currency} {Number(cause.current_amount ?? 0).toLocaleString()}</span>
                                                    <span>Goal: {cause.currency} {Number(cause.goal_amount ?? 0).toLocaleString()}</span>
                                                </div>
                                                <a
                                                    href="#donate"
                                                    className="block text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-full text-sm transition mt-3"
                                                >
                                                    Donate Now
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-slate-400">No active causes at the moment. Please check back soon.</p>
                        )}
                    </div>
                </section>

                {/* 3. Secondary Hero Banner */}
                <section className="bg-amber-500 text-slate-900 py-16">
                    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-extrabold tracking-tight">
                                Be Part of Their Journey to a Brighter Future
                            </h2>
                            <p className="text-slate-800 text-base leading-relaxed">
                                Every contribution helps provide a safe home, balanced nutrition, and high-quality education for over 200 children in need.
                            </p>
                            <a
                                href="#donate"
                                className="inline-block bg-teal-950 text-white font-bold px-8 py-3.5 rounded-full hover:bg-slate-900 transition"
                            >
                                Donate Today
                            </a>
                        </div>
                        <div className="rounded-2xl overflow-hidden shadow-lg h-64">
                            <img
                                src="/images/home/life-skills.jpg"
                                alt="Children outdoors"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </section>

                {/* 4. Organization History & Stats */}
                <section id="about" className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                            <div className="grid grid-cols-2 gap-4">
                                <img
                                    src="/images/home/educational-excellence.jpg"
                                    className="rounded-2xl h-48 w-full object-cover"
                                    alt="Children home"
                                />
                                <img
                                    src="/images/home/health-wellness.jpg"
                                    className="rounded-2xl h-48 w-full object-cover mt-8"
                                    alt="Healthcare support"
                                />
                            </div>
                            <div className="space-y-4">
                                <span className="text-rose-900 font-bold text-sm uppercase tracking-wider">
                                    Our History
                                </span>
                                <h2 className="text-3xl font-bold text-slate-900">
                                    Supporting Vulnerable Children Since 2004
                                </h2>
                                <p className="text-slate-600 leading-relaxed">
                                    Founded to care for children affected by conflict and severe hardship, Mahadeva Swamigal Children Home offers an oasis of safety, holistic care, and continuous educational advancement in Kilinochchi.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center pt-8 border-t border-slate-100">
                            <div>
                                <span className="block text-4xl font-extrabold text-teal-900">200+</span>
                                <span className="text-sm font-medium text-slate-500">Children Supported</span>
                            </div>
                            <div>
                                <span className="block text-4xl font-extrabold text-teal-900">100%</span>
                                <span className="text-sm font-medium text-slate-500">School Enrollment</span>
                            </div>
                            <div>
                                <span className="block text-4xl font-extrabold text-teal-900">20+</span>
                                <span className="text-sm font-medium text-slate-500">Years of Service</span>
                            </div>
                            <div>
                                <span className="block text-4xl font-extrabold text-teal-900">3</span>
                                <span className="text-sm font-medium text-slate-500">Sustainable Farms</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. Vision Statement & Testimonial */}
                <section className="py-20 bg-rose-950 text-white rounded-t-[3rem] text-center">
                    <div className="max-w-3xl mx-auto px-6 space-y-8">
                        <h2 className="text-3xl md:text-4xl font-extrabold">A Future Where Every Child Thrives</h2>
                        <div className="relative pt-6">
                            <div className="w-20 h-20 rounded-full border-4 border-amber-500 mx-auto overflow-hidden mb-4">
                                <img
                                    src="/images/home/Priya.jpg"
                                    className="w-full h-full object-cover"
                                    alt="Former resident"
                                />
                            </div>
                            <p className="text-lg italic text-rose-100">
                                "Mahadeva Home provided me not just with shelter and schooling, but with a supportive family that believed in my dreams."
                            </p>
                            <span className="block text-sm font-semibold text-amber-400 mt-3">
                                — Former Resident & University Graduate
                            </span>
                        </div>
                    </div>
                </section>

                {/* 7. Quick Donation Form */}
                <section id="donate" className="py-16 bg-amber-500">
                    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                        <div className="h-80 rounded-2xl overflow-hidden shadow-md">
                            <img
                                src="/images/home/emotional-support.jpg"
                                className="w-full h-full object-cover"
                                alt="Children"
                            />
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-xl space-y-6">
                            <h3 className="text-2xl font-bold text-slate-900">Support Us! Every Contribution Counts</h3>
                            <div className="flex gap-3">
                                <button className="flex-1 py-2.5 border border-slate-300 rounded-lg text-sm font-semibold hover:border-emerald-600 hover:text-emerald-600">
                                    LKR 2,500
                                </button>
                                <button className="flex-1 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-semibold">
                                    LKR 5,000
                                </button>
                                <button className="flex-1 py-2.5 border border-slate-300 rounded-lg text-sm font-semibold hover:border-emerald-600 hover:text-emerald-600">
                                    LKR 10,000
                                </button>
                            </div>
                            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition">
                                Complete Donation
                            </button>
                        </div>
                    </div>
                </section>

                {/* 8. Latest News & Alert */}
                <section id="news" className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-6 space-y-12">
                        <div className="flex items-center justify-between gap-4">
                            <h2 className="text-3xl font-bold text-slate-900">See the Latest Stories & News</h2>
                            <Link href={route('news.index')} className="text-sm font-bold text-rose-900 hover:underline flex-shrink-0">
                                View All News →
                            </Link>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {newsItems.map((item) => (
                                <Link
                                    key={item.id}
                                    href={route('news.show', item.id)}
                                    className="block border border-slate-100 rounded-2xl overflow-hidden p-4 space-y-3 hover:shadow-md transition"
                                >
                                    <img src={item.image} className="rounded-xl h-40 w-full object-cover bg-slate-100" alt={item.title} />
                                    <h4 className="font-bold text-base">{item.title}</h4>
                                </Link>
                            ))}
                            {newsItems.length === 0 && (
                                <p className="col-span-3 text-center text-slate-400 text-sm">No news articles published yet.</p>
                            )}
                        </div>

                        <div className="bg-rose-500 text-white rounded-2xl p-8 text-center space-y-3">
                            <h3 className="text-2xl font-bold">Want to volunteer or visit our home?</h3>
                            <a
                                href="#contact"
                                className="inline-block bg-white text-rose-950 font-bold px-6 py-2.5 rounded-full text-sm hover:bg-slate-100 transition"
                            >
                                Get In Touch
                            </a>
                        </div>
                    </div>
                </section>

                <SiteFooter />
            </div>
        </>
    );
}
