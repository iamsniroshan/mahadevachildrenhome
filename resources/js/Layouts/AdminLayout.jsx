import { Link, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Drawer, Button } from 'antd';
import { MenuOutlined, DownOutlined } from '@ant-design/icons';

const { Sider, Header, Content } = Layout;

const getInitials = (name = 'Administrator') => {
    return name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('') || 'AD';
};

const NavIcon = ({ path }) => (
    <svg className="w-5 h-5 stroke-current" fill="none" strokeWidth={2} viewBox="0 0 24 24">
        <path d={path} />
    </svg>
);

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
        name: 'Videos',
        routeName: 'admin.videos.index',
        icon: 'M15.75 10.5l4.72-2.36a.75.75 0 011.03.67v9.38a.75.75 0 01-1.03.67l-4.72-2.36M4.5 6.75h9a1.5 1.5 0 011.5 1.5v7.5a1.5 1.5 0 01-1.5 1.5h-9a1.5 1.5 0 01-1.5-1.5v-7.5a1.5 1.5 0 011.5-1.5z',
    },
    {
        name: 'Contact Messages',
        routeName: 'admin.contacts.index',
        icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    },
    {
        name: 'Users',
        routeName: 'admin.users.index',
        icon: 'M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975M15 6.75a3 3 0 11-6 0 3 3 0 016 0zM21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
        name: 'Activity Logs',
        routeName: 'admin.activity-logs.index',
        icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    },
    {
        name: 'Mail Settings',
        routeName: 'admin.settings.mail.edit',
        icon: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75',
    },
    {
        name: 'Mail Templates',
        routeName: 'admin.settings.mail.templates.index',
        icon: 'M4 7.5A2.5 2.5 0 016.5 5h11A2.5 2.5 0 0120 7.5v9A2.5 2.5 0 0117.5 19h-11A2.5 2.5 0 014 16.5v-9zm2 0h12m-7 4h4M6 15h4',
    },
];

export default function AdminLayout({ header, children, headerAction = null, fullHeight = false }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const initials = getInitials(user?.name ?? 'Administrator');
    const roleLabel = user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Admin';
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const activeKey = useMemo(
        () => navItems.find((item) => route().current(`${item.routeName.replace(/\.index$/, '')}*`))?.routeName ?? '',
        [route().current()]
    );

    const menuItems = navItems.map((item) => ({
        key: item.routeName,
        icon: <NavIcon path={item.icon} />,
        label: (
            <Link href={route(item.routeName)} onClick={() => setIsSidebarOpen(false)}>
                {item.name}
            </Link>
        ),
    }));

    const sidebarContent = (
        <div className="flex h-full flex-col bg-[#3b0a24] text-white">
            <div className="h-20 flex items-center gap-3 px-6 border-b border-rose-900/40 flex-shrink-0">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img src="/storage/users/logo.jpg" alt="Mahadeva Home logo" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                    <span className="font-bold text-base text-rose-100 block leading-tight truncate">Mahadeva Home</span>
                    <span className="text-[11px] text-amber-500 font-medium uppercase tracking-wider">Admin Portal</span>
                </div>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto py-2">
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[activeKey]}
                    items={menuItems}
                    className="!bg-transparent !border-none"
                />
            </div>
        </div>
    );

    const userMenuItems = [
        {
            key: 'header',
            label: (
                <div className="px-1 py-1">
                    <p className="text-sm font-semibold text-slate-800">{user?.name ?? 'Administrator'}</p>
                    <p className="text-xs text-slate-500">{user?.email ?? 'admin@mahadevachildrenhome.com'}</p>
                </div>
            ),
            disabled: true,
        },
        { type: 'divider' },
        { key: 'profile', label: <Link href={route('profile.edit')}>Profile</Link> },
        { key: 'logout', label: <Link href={route('logout')} method="post" as="button">Log Out</Link> },
    ];

    return (
        <Layout className="!bg-amber-50/20 !min-h-screen h-screen overflow-hidden font-sans antialiased">
            <Sider width={256} className="hidden lg:block" style={{ background: '#3b0a24' }}>
                {sidebarContent}
            </Sider>

            <Drawer
                placement="left"
                open={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                closable={false}
                width={256}
                styles={{ body: { padding: 0, background: '#3b0a24' } }}
                className="lg:hidden"
            >
                {sidebarContent}
            </Drawer>

            <Layout className="!bg-transparent min-w-0 overflow-hidden">
                <Header className="!h-16 lg:!h-20 !bg-white !border-b !border-slate-100 flex items-center justify-between gap-3 !px-4 sm:!px-6 lg:!px-8 flex-shrink-0 !leading-normal">
                    <div className="flex items-center gap-3 min-w-0">
                        <Button
                            type="text"
                            className="lg:hidden flex-shrink-0"
                            icon={<MenuOutlined />}
                            onClick={() => setIsSidebarOpen(true)}
                            aria-label="Open menu"
                        />
                        <h1 className="text-base sm:text-xl font-bold text-rose-950 truncate m-0">{header}</h1>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                        {headerAction && headerAction}

                        <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
                            <button
                                type="button"
                                className="flex items-center gap-2 sm:gap-3 rounded-full border border-slate-200 bg-slate-50 px-2 py-1.5 sm:pr-3 text-left transition hover:border-rose-200 hover:bg-rose-50"
                            >
                                <Avatar
                                    size={36}
                                    src={user?.profile_pic ? `/storage/${user.profile_pic}` : undefined}
                                    style={{ backgroundColor: '#881337' }}
                                >
                                    {initials}
                                </Avatar>
                                <div className="hidden sm:block">
                                    <div className="text-sm font-semibold text-slate-800">{user?.name ?? 'Administrator'}</div>
                                    <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">{roleLabel}</div>
                                </div>
                                <DownOutlined className="hidden sm:block text-slate-500" style={{ fontSize: 12 }} />
                            </button>
                        </Dropdown>
                    </div>
                </Header>

                <Content className={fullHeight ? 'min-h-0 overflow-y-auto p-3 sm:p-6 lg:overflow-hidden' : 'overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8'}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}
