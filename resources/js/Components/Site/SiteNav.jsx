import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const navItems = [
    { label: 'Home', routeName: 'home' },
    { label: 'About Us', routeName: 'about' },
    { label: 'Our Team', routeName: 'team.index' },
    { label: 'News', routeName: 'news.index' },
    { label: 'Videos', routeName: 'videos.index' },
    { label: 'Contact', routeName: 'contact' },
];

export default function SiteNav() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <nav className="sticky top-0 z-50 border-b border-sky-100 bg-[aliceblue]/90 backdrop-blur-md shadow-[0_10px_25px_rgba(148,163,184,0.12)]">
            <div className="mx-auto flex h-16 md:h-20 max-w-7xl items-center md:items-end justify-between px-4 sm:px-6">
                <div className="flex items-center md:items-end gap-2 sm:gap-4 min-w-0">
                    <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-28 md:h-28 md:translate-y-10 rounded-full overflow-hidden ring-2 md:ring-4 ring-white shadow-xl bg-white flex-shrink-0">
                        <img src="/storage/users/logo.jpg" alt="Mahadeva Home logo" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-center md:pb-4 leading-tight min-w-0">
                        <Link href={route('home')} className="font-serif font-extrabold text-sm sm:text-lg md:text-2xl text-blue-900 tracking-tight truncate">
                            Mahadeva Children Home
                        </Link>
                        <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] text-blue-700 truncate">
                            Kilinochchi, Sri Lanka
                        </span>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-700 self-center">
                    {navItems.map((item) => (
                        <Link key={item.routeName} href={route(item.routeName)} className="hover:text-rose-900 transition">
                            {item.label}
                        </Link>
                    ))}
                </div>

                <Link
                    href={route('donate')}
                    className="hidden md:inline-flex self-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-full text-sm transition shadow-sm"
                >
                    Donate Now
                </Link>

                <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                    aria-expanded={isOpen}
                    className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-blue-900 hover:bg-blue-900/10 transition flex-shrink-0"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            <div
                className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out border-t border-sky-100 bg-[aliceblue] ${
                    isOpen ? 'max-h-96' : 'max-h-0 border-t-0'
                }`}
            >
                <div className="flex flex-col px-4 py-3 gap-1 text-sm font-bold text-slate-700">
                    {navItems.map((item) => (
                        <Link
                            key={item.routeName}
                            href={route(item.routeName)}
                            onClick={() => setIsOpen(false)}
                            className="py-2.5 px-2 rounded-lg hover:bg-blue-900/5 hover:text-rose-900 transition"
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link
                        href={route('donate')}
                        onClick={() => setIsOpen(false)}
                        className="mt-2 text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-full text-sm transition shadow-sm"
                    >
                        Donate Now
                    </Link>
                </div>
            </div>
        </nav>
    );
}
