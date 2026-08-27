import { Head } from '@inertiajs/react';

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

const pillars = [
    {
        img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=600',
        alt: 'Education',
        badge: 'Education',
        badgeClass: 'bg-amber-100 text-amber-800',
        title: 'Schooling & Tutoring',
        text: 'Providing formal school materials, daily study hall support, and specialized tutoring for academic success.',
    },
    {
        img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600',
        alt: 'Healthcare',
        badge: 'Healthcare',
        badgeClass: 'bg-emerald-100 text-emerald-800',
        title: 'Medical & Trauma Care',
        text: 'On-site medical checkups, health management, and dedicated psychological counseling for emotional recovery.',
    },
    {
        img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=600',
        alt: 'Agriculture',
        badge: 'Sustainability',
        badgeClass: 'bg-teal-100 text-teal-800',
        title: 'Farming & Nutrition',
        text: 'Operating integrated dairy farms and agriculture to ensure fresh, daily nutritious meals for every child.',
    },
];

const causes = [
    {
        img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=500',
        title: 'Sponsor Daily Meals & Nutrition',
        percent: 65,
        raised: 'LKR 980,000',
        goal: 'LKR 1,500,000',
    },
    {
        img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=500',
        title: 'Playground & Infrastructure',
        percent: 77,
        raised: 'LKR 620,000',
        goal: 'LKR 800,000',
    },
    {
        img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=500',
        title: 'Medical Care & Rehab Fund',
        percent: 38,
        raised: 'LKR 450,000',
        goal: 'LKR 1,200,000',
    },
];

const newsItems = [
    {
        img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=500',
        title: 'Annual Sports & Cultural Meet Success',
    },
    {
        img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=500',
        title: 'Harvest Season at Our Sustainable Farm',
    },
    {
        img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=500',
        title: 'Educational Workshop Hosted by Volunteers',
    },
];

const galleryPhotos = [
    { src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=200', alt: 'Children home activity' },
    { src: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=200', alt: 'Education support' },
    { src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=200', alt: 'Medical care' },
    { src: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=200', alt: 'Farm project' },
    { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', alt: 'Volunteer work' },
    { src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=200', alt: 'Daily life at home' },
];

export default function Home() {
    return (
        <>
            <Head title="Mahadeva Swamigal Children Home" />
            <div className="bg-amber-50/20 text-slate-800 font-sans antialiased">
                {/* Navigation */}
                <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-rose-900 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                M
                            </div>
                            <span className="font-bold text-lg text-rose-950 tracking-tight">
                                Mahadeva Children Home
                            </span>
                        </div>
                        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                            <a href="#about" className="hover:text-rose-900 transition">About Us</a>
                            <a href="#programs" className="hover:text-rose-900 transition">Our Team</a>
                            <a href="#news" className="hover:text-rose-900 transition">News</a>
                            <a href="#videos" className="hover:text-rose-900 transition">Videos</a>
                            <a href="#contact" className="hover:text-rose-900 transition">Contact</a>
                        </div>
                        <a
                            href="#donate"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 rounded-full text-sm transition"
                        >
                            Donate Now
                        </a>
                    </div>
                </nav>

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
                            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full border-8 border-rose-900/40 overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800"
                                    alt="Children smiling"
                                    className="w-full h-full object-cover"
                                />
                            </div>
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
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {pillars.map((pillar) => (
                                <div
                                    key={pillar.title}
                                    className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition"
                                >
                                    <img src={pillar.img} alt={pillar.alt} className="h-48 w-full object-cover" />
                                    <div className="p-6">
                                        <span className={`${pillar.badgeClass} text-xs font-bold px-2.5 py-1 rounded`}>
                                            {pillar.badge}
                                        </span>
                                        <h3 className="text-xl font-bold mt-3 mb-2">{pillar.title}</h3>
                                        <p className="text-slate-600 text-sm leading-relaxed">{pillar.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
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
                                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800"
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
                                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=400"
                                    className="rounded-2xl h-48 w-full object-cover"
                                    alt="Children home"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400"
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

                {/* 5. Active Fundraising Projects */}
                <section id="causes" className="bg-teal-950 text-white py-20">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <h2 className="text-3xl font-bold">Join Our Mission by Supporting Our Causes</h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {causes.map((cause) => (
                                <div key={cause.title} className="bg-white text-slate-900 rounded-2xl p-6 space-y-4">
                                    <img src={cause.img} className="rounded-xl h-40 w-full object-cover" alt={cause.title} />
                                    <h3 className="font-bold text-lg">{cause.title}</h3>
                                    <div className="w-full bg-slate-100 rounded-full h-2.5">
                                        <div
                                            className="bg-emerald-500 h-2.5 rounded-full"
                                            style={{ width: `${cause.percent}%` }}
                                        />
                                    </div>
                                    <div className="flex justify-between text-xs font-semibold text-slate-500">
                                        <span>Raised: {cause.raised}</span>
                                        <span>Goal: {cause.goal}</span>
                                    </div>
                                </div>
                            ))}
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
                                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
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
                                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800"
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
                        <h2 className="text-3xl font-bold text-slate-900 text-center">See the Latest Stories & News</h2>

                        <div className="grid md:grid-cols-3 gap-8">
                            {newsItems.map((item) => (
                                <div key={item.title} className="border border-slate-100 rounded-2xl overflow-hidden p-4 space-y-3">
                                    <img src={item.img} className="rounded-xl h-40 w-full object-cover" alt={item.title} />
                                    <h4 className="font-bold text-base">{item.title}</h4>
                                </div>
                            ))}
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

                {/* 9. Footer with Authentic Contact Details */}
                <footer id="contact" className="bg-[#3b0a24] text-white pt-16 pb-8 border-t border-rose-900/40">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-rose-900/30">
                            {/* Column 1: About */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-rose-100">About Mahadeva Home</h3>
                                <p className="text-xs text-rose-100/70 leading-relaxed font-light">
                                    <span className="text-2xl font-serif font-bold float-left mr-2 leading-none text-amber-500">M</span>
                                    ahadeva Swamigal Children Home (Mahadeva Achchirama Children Home) provides shelter, education, healthcare, and self-sustaining vocational development for over 200 orphaned and vulnerable children in Northern Sri Lanka.
                                </p>
                                <div className="pt-2">
                                    <span className="block text-sm font-bold text-white">Mahadeva Swamigal Children Home</span>
                                    <span className="block text-xs text-rose-300">Kilinochchi, Sri Lanka</span>
                                </div>
                            </div>

                            {/* Column 2: Contact */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-rose-100">Contact Us</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <div className="bg-amber-500 text-slate-900 p-2.5 rounded-full flex-shrink-0">
                                            <svg className="w-4 h-4 stroke-current" fill="none" strokeWidth={2} viewBox="0 0 24 24">
                                                <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <span className="block text-[11px] font-bold uppercase text-amber-500 tracking-wide">ADDRESS</span>
                                            <span className="text-xs text-rose-100/80">Jayanthi Nagar, Kilinochchi, Northern Province, Sri Lanka</span>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <div className="bg-amber-500 text-slate-900 p-2.5 rounded-full flex-shrink-0">
                                            <svg className="w-4 h-4 stroke-current" fill="none" strokeWidth={2} viewBox="0 0 24 24">
                                                <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.17-5.116-3.462-6.286-6.286l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <span className="block text-[11px] font-bold uppercase text-amber-500 tracking-wide">PHONE NO</span>
                                            <span className="text-xs text-rose-100/80">+94 21 492 3118</span>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-3">
                                        <div className="bg-amber-500 text-slate-900 p-2.5 rounded-full flex-shrink-0">
                                            <svg className="w-4 h-4 stroke-current" fill="none" strokeWidth={2} viewBox="0 0 24 24">
                                                <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                            </svg>
                                        </div>
                                        <div>
                                            <span className="block text-[11px] font-bold uppercase text-amber-500 tracking-wide">WEBSITE & CONTACT</span>
                                            <span className="text-xs text-rose-100/80">www.mahadevachildrenhome.com</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Column 3: Gallery */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-rose-100">Gallery Photos</h3>
                                <div className="grid grid-cols-3 gap-2">
                                    {galleryPhotos.map((photo, index) => (
                                        <img
                                            key={index}
                                            src={photo.src}
                                            alt={photo.alt}
                                            className="w-full h-16 object-cover rounded-md hover:opacity-80 transition cursor-pointer"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 text-center text-xs text-rose-200/50">
                            © 2004 - 2026 Mahadeva Swamigal Children Home - All Rights Reserved | Probation Reg: NP/24/2/1/CH/13
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
