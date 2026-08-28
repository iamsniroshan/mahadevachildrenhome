import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-amber-50/20 font-sans antialiased">
            {/* Left showcase panel */}
            <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-rose-950 via-rose-900 to-red-950 p-12 text-white lg:flex">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-25"
                    style={{ backgroundImage: "url('/images/home/emotional-support.jpg')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-950 via-rose-950/70 to-rose-950/40" />
                <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />
                <div className="pointer-events-none absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />

                <Link href="/" className="relative flex items-center gap-3">
                    <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-full ring-4 ring-white/80 shadow-xl bg-white">
                        <img src="/storage/users/logo.jpg" alt="Mahadeva Home logo" className="h-full w-full object-cover" />
                    </div>
                    <div className="leading-tight">
                        <span className="block font-serif text-lg font-extrabold">Mahadeva Children Home</span>
                        <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-amber-300">
                            Kilinochchi, Sri Lanka
                        </span>
                    </div>
                </Link>

                <div className="relative space-y-4 max-w-md">
                    <span className="inline-block rounded-full bg-rose-900/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-rose-200">
                        Admin Portal
                    </span>
                    <h1 className="text-3xl font-extrabold leading-tight tracking-tight xl:text-4xl">
                        Empowering & Nurturing Disadvantaged Children
                    </h1>
                    <p className="text-rose-100/80">
                        Sign in to manage donations, causes, news, and the stories that keep our community connected to the children of Mahadeva Home.
                    </p>
                </div>

                <p className="relative text-xs text-rose-200/60">
                    © 2004 - 2026 Mahadeva Swamigal Children Home - All Rights Reserved
                </p>
            </div>

            {/* Right form panel */}
            <div className="flex w-full flex-col items-center justify-center px-6 py-12 lg:w-1/2">
                <Link href="/" className="mb-6 flex items-center gap-3 lg:hidden">
                    <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-full ring-4 ring-white shadow-xl bg-white">
                        <img src="/storage/users/logo.jpg" alt="Mahadeva Home logo" className="h-full w-full object-cover" />
                    </div>
                    <div className="leading-tight">
                        <span className="block font-serif text-lg font-extrabold text-blue-900">Mahadeva Children Home</span>
                        <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-blue-700">
                            Kilinochchi, Sri Lanka
                        </span>
                    </div>
                </Link>

                <div className="w-full overflow-hidden rounded-2xl bg-white px-6 py-8 shadow-xl shadow-rose-950/5 sm:max-w-md sm:px-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
