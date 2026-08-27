import { Link } from '@inertiajs/react';

export default function SiteNav() {
    return (
        <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-end justify-between">
                <div className="flex items-end gap-4">
                    <div className="relative w-24 h-24 md:w-28 md:h-28 translate-y-8 md:translate-y-10 rounded-full overflow-hidden ring-4 ring-white shadow-xl bg-white flex-shrink-0">
                        <img src="/storage/users/logo.jpg" alt="Mahadeva Home logo" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-center pb-4 leading-tight">
                        <Link href={route('home')} className="font-serif font-extrabold text-xl md:text-2xl text-blue-900 tracking-tight">
                            Mahadeva Children Home
                        </Link>
                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-600">
                            Kilinochchi, Sri Lanka
                        </span>
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 self-center">
                    <Link href={route('home')} className="hover:text-rose-900 transition">Home</Link>
                    <Link href={route('about')} className="hover:text-rose-900 transition">About Us</Link>
                    <Link href={route('team.index')} className="hover:text-rose-900 transition">Our Team</Link>
                    <Link href={route('news.index')} className="hover:text-rose-900 transition">News</Link>
                    <Link href={route('contact')} className="hover:text-rose-900 transition">Contact</Link>
                </div>
                <a
                    href={`${route('home')}#donate`}
                    className="self-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 rounded-full text-sm transition"
                >
                    Donate Now
                </a>
            </div>
        </nav>
    );
}
