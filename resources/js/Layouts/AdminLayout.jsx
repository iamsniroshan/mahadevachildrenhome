import { Link, usePage } from '@inertiajs/react';

const navItems = [
    {
        name: 'Dashboard',
        routeName: 'admin.dashboard',
        icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    },
    {
        name: 'Team Members',
        routeName: 'admin.teams.index',
        icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    },
    {
        name: 'Donations',
        routeName: 'admin.donations.index',
        icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
        name: 'Fundraising Causes',
        routeName: 'admin.fundrise.index',
        icon: 'M11 20A7 7 0 019.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z',
    },
    {
        name: 'News',
        routeName: 'admin.news.index',
        icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z',
    },
    {
        name: 'Blog Posts',
        routeName: 'admin.blogs.index',
        icon: 'M4 19.5v-15A2.5 2.5 0 016.5 2H19a1 1 0 011 1v18a1 1 0 01-1 1H6.5a2.5 2.5 0 01-2.5-2.5Z M6 6h10M6 10h10',
    },
    {
        name: 'Sliders',
        routeName: 'admin.sliders.index',
        icon: 'M3 7.5h18M3 12h18M3 16.5h18',
    },
    {
        name: 'Contact Messages',
        routeName: 'admin.contacts.index',
        icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    },
];

export default function AdminLayout({ header, children }) {
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <div className="bg-amber-50/20 text-slate-800 font-sans antialiased flex h-screen overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-[#3b0a24] text-white flex flex-col justify-between flex-shrink-0">
                <div>
                    <div className="h-20 flex items-center gap-3 px-6 border-b border-rose-900/40">
                        <div className="w-10 h-10 bg-rose-900 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            M
                        </div>
                        <div>
                            <span className="font-bold text-base text-rose-100 block leading-tight">Mahadeva Home</span>
                            <span className="text-[11px] text-amber-500 font-medium uppercase tracking-wider">Admin Portal</span>
                        </div>
                    </div>

                    <nav className="p-4 space-y-1">
                        {navItems.map((item) => {
                            const base = item.routeName.replace(/\.index$/, '');
                            const isActive = route().current(`${base}*`);

                            return (
                                <Link
                                    key={item.name}
                                    href={route(item.routeName)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition ${
                                        isActive
                                            ? 'bg-rose-900/50 text-amber-400 font-semibold'
                                            : 'text-rose-100/70 hover:bg-rose-900/30 hover:text-white font-medium'
                                    }`}
                                >
                                    <svg className="w-5 h-5 stroke-current" fill="none" strokeWidth={2} viewBox="0 0 24 24">
                                        <path d={item.icon} />
                                    </svg>
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="p-4 border-t border-rose-900/40">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-amber-500 text-slate-900 font-bold flex items-center justify-center text-sm">
                            AD
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-white truncate">{user?.name ?? 'Administrator'}</p>
                            <p className="text-[10px] text-rose-200/60 truncate">{user?.email ?? 'admin@mahadevachildrenhome.com'}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 flex-shrink-0">
                    <h1 className="text-xl font-bold text-rose-950">{header}</h1>
                    <div className="flex items-center gap-4">
                        <Link
                            href={route('admin.donations.create')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2 rounded-full text-xs transition flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path d="M12 4v16m8-8H4" />
                            </svg>
                            Record New Donation
                        </Link>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-8 space-y-8">{children}</main>
            </div>
        </div>
    );
}
