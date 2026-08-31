import { Link } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import Seo from '@/Components/Seo';
import SiteNav from '@/Components/Site/SiteNav';
import SiteFooter from '@/Components/Site/SiteFooter';

const impactBadges = [
    {
        bg: '#9F1239',
        label: (
            <>
                Safe Shelter
                <br />
                & Care
            </>
        ),
        path: (
            <>
                <path d="M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.5z" />
                <path d="M9 21v-6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6" />
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
                Healthcare
                <br />
                & Wellbeing
            </>
        ),
        path: (
            <>
                <path d="M12 21s-7.5-4.9-9.8-9.4C.6 8 2 4.5 5.3 3.7c2-.5 3.9.4 5.2 2 .5.6.5.6 1 1.2 1.3-1.6 3.2-2.5 5.2-2 3.3.8 4.7 4.3 3.1 7.9C19.5 16.1 12 21 12 21z" />
                <path d="M4 12h3l1.5-3 2 6 1.5-3H20" />
            </>
        ),
    },
    {
        bg: '#E19E16',
        label: (
            <>
                Quality
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
        bg: '#6D28D9',
        label: (
            <>
                Community
                <br />
                & Family Support
            </>
        ),
        path: (
            <>
                <circle cx="8.5" cy="8" r="2.5" />
                <circle cx="15.5" cy="8" r="2.5" />
                <path d="M2.5 20v-1.5A4.5 4.5 0 0 1 7 14h3a4.5 4.5 0 0 1 4.5 4.5V20" />
                <path d="M13 14.2a4.5 4.5 0 0 1 8.5 4.3V20" />
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
            className="relative w-72 h-72 md:w-[26rem] md:h-[26rem] rounded-full border-8 border-rose-900/40 overflow-hidden shadow-2xl touch-pan-y"
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
            <Seo
                title="Home"
                description="Mahadeva Swamigal Children Home provides shelter, education, healthcare, and holistic care for orphaned and vulnerable children in Kilinochchi, Sri Lanka."
                jsonLd={{
                    '@context': 'https://schema.org',
                    '@type': 'NGO',
                    name: 'Mahadeva Swamigal Children Home',
                    url: typeof window !== 'undefined' ? window.location.origin : '',
                    logo: typeof window !== 'undefined' ? `${window.location.origin}/storage/users/logo.jpg` : '/storage/users/logo.jpg',
                    address: {
                        '@type': 'PostalAddress',
                        streetAddress: 'Jayanthi Nagar',
                        addressLocality: 'Kilinochchi',
                        addressCountry: 'LK',
                    },
                }}
            />
            <div className="bg-amber-50/20 text-slate-800 font-sans antialiased">
                <SiteNav />

                {/* 1. Hero Section */}
                <section className="bg-rose-950 text-white pt-10 pb-14 rounded-b-[2rem] relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <div className="space-y-5 text-center lg:text-left">
                            <span className="bg-rose-900/60 text-rose-200 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full inline-block">
                                Kilinochchi, Sri Lanka
                            </span>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                                Empowering & Nurturing Disadvantaged Children
                            </h1>
                            <p className="text-rose-100/80 text-base sm:text-lg leading-relaxed">
                                Providing education, shelter, holistic healthcare, and hope for orphaned and vulnerable children in Northern Sri Lanka.
                            </p>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                                <Link
                                    href={route('donate')}
                                    className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-6 sm:px-8 py-3 rounded-full transition shadow-lg text-sm sm:text-base"
                                >
                                    Sponsor a Child
                                </Link>
                                <a
                                    href="#programs"
                                    className="border border-white/30 hover:bg-white/10 text-white font-semibold px-6 sm:px-8 py-3 rounded-full transition text-sm sm:text-base"
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
                <div className="bg-white font-sans">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                            {impactBadges.map((badge, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center justify-center w-[44vw] max-w-[180px] h-[44vw] max-h-[180px] sm:w-44 sm:h-44 lg:w-52 lg:h-52 text-white rounded-xl sm:rounded-lg p-4 sm:p-6 text-center hover:opacity-95 transition-opacity cursor-pointer"
                                    style={{ backgroundColor: badge.bg }}
                                >
                                    <svg
                                        className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mb-2 sm:mb-4 stroke-current stroke-2 fill-none"
                                        viewBox="0 0 24 24"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        {badge.path}
                                    </svg>
                                    <span className="font-semibold text-xs sm:text-sm lg:text-lg leading-tight">{badge.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. Impact Pillars */}
                <section id="programs" className="py-14 sm:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
                            <span className="text-rose-900 font-bold text-sm uppercase tracking-wider">
                                Our Core Pillars
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-slate-900">
                                Comprehensive Support Services
                            </h2>
                            <p className="text-slate-600 mt-2 text-sm sm:text-base">
                                Support one of our active causes and help us continue this work.
                            </p>
                        </div>

                        {causes.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8">
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
                                                <Link
                                                    href={route('donate')}
                                                    className="block text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-full text-sm transition mt-3"
                                                >
                                                    Donate Now
                                                </Link>
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
                <section className="bg-amber-500 text-slate-900 py-12 sm:py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4 text-center lg:text-left">
                            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                                Be Part of Their Journey to a Brighter Future
                            </h2>
                            <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
                                Every contribution helps provide a safe home, balanced nutrition, and high-quality education for over 200 children in need.
                            </p>
                            <Link
                                href={route('donate')}
                                className="inline-block bg-teal-950 text-white font-bold px-6 sm:px-8 py-3 sm:py-3.5 rounded-full hover:bg-slate-900 transition text-sm sm:text-base"
                            >
                                Donate Today
                            </Link>
                        </div>
                        <div className="rounded-2xl overflow-hidden shadow-lg h-56 sm:h-64 lg:h-72">
                            <img
                                src="/images/home/priya-journey.webp"
                                alt="Child on their journey to a brighter future"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </section>

                {/* 4. Organization History & Stats */}
                <section id="about" className="py-14 sm:py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 lg:mb-16">
                            <div className="grid grid-cols-2 gap-4">
                                <img
                                    src="/images/home/educational-excellence.jpg"
                                    className="rounded-2xl h-40 sm:h-48 w-full object-cover"
                                    alt="Children home"
                                />
                                <img
                                    src="/images/home/health-wellness.jpg"
                                    className="rounded-2xl h-40 sm:h-48 w-full object-cover mt-8"
                                    alt="Healthcare support"
                                />
                            </div>
                            <div className="space-y-4 text-center lg:text-left">
                                <span className="text-rose-900 font-bold text-sm uppercase tracking-wider">
                                    Our History
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                                    Supporting Vulnerable Children Since 2004
                                </h2>
                                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                                    Founded to care for children affected by conflict and severe hardship, Mahadeva Swamigal Children Home offers an oasis of safety, holistic care, and continuous educational advancement in Kilinochchi.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center pt-8 border-t border-slate-100">
                            <div>
                                <span className="block text-2xl sm:text-4xl font-extrabold text-teal-900">200+</span>
                                <span className="text-xs sm:text-sm font-medium text-slate-500">Children Supported</span>
                            </div>
                            <div>
                                <span className="block text-2xl sm:text-4xl font-extrabold text-teal-900">100%</span>
                                <span className="text-xs sm:text-sm font-medium text-slate-500">School Enrollment</span>
                            </div>
                            <div>
                                <span className="block text-2xl sm:text-4xl font-extrabold text-teal-900">20+</span>
                                <span className="text-xs sm:text-sm font-medium text-slate-500">Years of Service</span>
                            </div>
                            <div>
                                <span className="block text-2xl sm:text-4xl font-extrabold text-teal-900">3</span>
                                <span className="text-xs sm:text-sm font-medium text-slate-500">Sustainable Farms</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. Vision Statement & Testimonial */}
                <section className="py-10 sm:py-14 bg-rose-950 text-white rounded-t-[3rem]">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-[0.75fr_1.25fr] gap-6 items-center">
                        <div className="relative mx-auto w-full max-w-[280px] md:max-w-[280px]">
                            <div className="absolute -inset-2 rounded-[1.4rem] bg-amber-500/20 blur-xl" />
                            <div className="relative overflow-hidden rounded-[1.4rem] border-4 border-amber-400/80 shadow-lg shadow-amber-950/30">
                                <img
                                    src="/images/home/Priya.jpg"
                                    className="w-full h-[240px] sm:h-[270px] md:h-[200px] object-cover object-center"
                                    alt="Former resident"
                                />
                            </div>
                        </div>

                        <div className="space-y-3 text-center md:text-left md:pl-1">
                            <span className="inline-block bg-rose-800/70 text-amber-200 text-[9px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full">
                                Our Mission
                            </span>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight">
                                A Future Where Every Child Thrives
                            </h2>
                            <div className="border-l-4 border-amber-400 pl-3 text-left">
                                <p className="text-sm sm:text-base md:text-lg italic text-rose-100 leading-relaxed">
                                    "Mahadeva Home provided me not just with shelter and schooling, but with a supportive family that believed in my dreams."
                                </p>
                            </div>
                            <span className="block text-xs sm:text-sm font-semibold text-amber-300">
                                — Former Resident & University Graduate
                            </span>
                        </div>
                    </div>
                </section>

                {/* 7. Quick Donation Form */}
                <section id="donate" className="py-12 sm:py-16 bg-amber-500">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <div className="h-64 sm:h-80 rounded-2xl overflow-hidden shadow-md">
                            <img
                                src="/images/home/emotional-support.jpg"
                                className="w-full h-full object-cover"
                                alt="Children"
                            />
                        </div>
                        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">Support Us! Every Contribution Counts</h3>
                            <div className="grid grid-cols-3 gap-2 sm:gap-3">
                                <button className="py-2.5 border border-slate-300 rounded-lg text-xs sm:text-sm font-semibold hover:border-emerald-600 hover:text-emerald-600">
                                    LKR 2,500
                                </button>
                                <button className="py-2.5 bg-emerald-600 text-white rounded-lg text-xs sm:text-sm font-semibold">
                                    LKR 5,000
                                </button>
                                <button className="py-2.5 border border-slate-300 rounded-lg text-xs sm:text-sm font-semibold hover:border-emerald-600 hover:text-emerald-600">
                                    LKR 10,000
                                </button>
                            </div>
                            <Link
                                href={route('donate')}
                                className="block text-center w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition"
                            >
                                Complete Donation
                            </Link>
                        </div>
                    </div>
                </section>

                {/* 8. Latest News & Alert */}
                <section id="news" className="py-14 sm:py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-12">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">See the Latest Stories & News</h2>
                            <Link href={route('news.index')} className="text-sm font-bold text-rose-900 hover:underline flex-shrink-0">
                                View All News →
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                            {newsItems.map((item) => (
                                <Link
                                    key={item.id}
                                    href={route('news.show', item.id)}
                                    className="block border border-slate-100 rounded-2xl overflow-hidden p-4 space-y-3 hover:shadow-md transition"
                                >
                                    <img src={item.image} className="rounded-xl h-40 sm:h-44 w-full object-cover bg-slate-100" alt={item.title} />
                                    <h4 className="font-bold text-base">{item.title}</h4>
                                </Link>
                            ))}
                            {newsItems.length === 0 && (
                                <p className="col-span-full text-center text-slate-400 text-sm">No news articles published yet.</p>
                            )}
                        </div>

                        <div className="bg-teal-950 text-white rounded-2xl p-6 sm:p-8 text-center space-y-3">
                            <h3 className="text-xl sm:text-2xl font-bold">Want to volunteer or visit our home?</h3>
                            <Link
                                href={route('contact')}
                                className="inline-block bg-white text-rose-950 font-bold px-6 py-2.5 rounded-full text-sm hover:bg-slate-100 transition"
                            >
                                Get In Touch
                            </Link>
                        </div>
                    </div>
                </section>

                <SiteFooter />
            </div>
        </>
    );
}
