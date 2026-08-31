import AdminLayout from '@/Layouts/AdminLayout';
import StatusBadge from '@/Components/Admin/StatusBadge';
import { Head } from '@inertiajs/react';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    Legend,
} from 'recharts';

const donationStatusMap = {
    pending: { label: 'Pending', className: 'bg-amber-100 text-amber-800' },
    confirmed: { label: 'Confirmed', className: 'bg-teal-100 text-teal-800' },
    processing: { label: 'Processing', className: 'bg-sky-100 text-sky-800' },
    completed: { label: 'Completed', className: 'bg-emerald-100 text-emerald-800' },
    cancelled: { label: 'Cancelled', className: 'bg-rose-100 text-rose-800' },
};

const actionMap = {
    created: { label: 'Created', className: 'bg-emerald-100 text-emerald-800' },
    updated: { label: 'Updated', className: 'bg-amber-100 text-amber-800' },
    deleted: { label: 'Deleted', className: 'bg-rose-100 text-rose-800' },
};

const PIE_COLORS = ['#0f766e', '#e11d48', '#d97706', '#0284c7', '#7c3aed', '#65a30d'];

const currency = (value) => `LKR ${Number(value ?? 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

export default function Dashboard({
    kpis = {},
    monthlyTrend = [],
    categoryBreakdown = [],
    causeGoals = [],
    recentDonations = [],
    recentLogs = [],
}) {
    const kpiCards = [
        {
            label: 'Total Donated',
            value: currency(kpis.totalDonated),
            note: `${kpis.donationsCount ?? 0} total donations`,
            gradient: 'from-teal-500 via-teal-600 to-emerald-700',
            icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
        },
        {
            label: 'Active Team Members',
            value: kpis.activeChildrenCare ?? 0,
            note: 'Committee, executives & staff',
            gradient: 'from-rose-500 via-rose-700 to-fuchsia-800',
            icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
        },
        {
            label: 'Active Causes',
            value: `${kpis.activeCausesCount ?? 0} Campaigns`,
            note: `Average ${kpis.avgFunded ?? 0}% funded`,
            gradient: 'from-amber-400 via-orange-500 to-rose-600',
            icon: 'M11 20A7 7 0 019.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z',
        },
        {
            label: 'New Contact Messages',
            value: kpis.newContacts ?? 0,
            note: 'Awaiting response',
            gradient: 'from-sky-500 via-blue-600 to-indigo-700',
            icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
        },
    ];

    const panelAccents = ['border-teal-400', 'border-rose-400', 'border-amber-400', 'border-sky-400', 'border-emerald-400', 'border-fuchsia-400'];

    return (
        <AdminLayout header="Overview Dashboard" fullHeight>
            <Head title="Admin Dashboard" />

            <div className="relative h-full min-h-0">
                {/* Decorative crystal glow blobs */}
                <div className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 rounded-full bg-teal-300/25 blur-3xl" />
                <div className="pointer-events-none absolute right-0 top-1/4 h-64 w-64 rounded-full bg-rose-300/25 blur-3xl" />
                <div className="pointer-events-none absolute bottom-0 left-1/3 h-52 w-52 rounded-full bg-amber-300/25 blur-3xl" />
                <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-48 w-48 rounded-full bg-sky-300/20 blur-3xl" />

                <div className="relative h-full min-h-0 grid grid-rows-[auto_1fr_1fr] gap-4">
                    {/* Key Performance Indicators */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 flex-shrink-0">
                        {kpiCards.map((kpi) => (
                            <div
                                key={kpi.label}
                                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${kpi.gradient} p-4 space-y-1 text-white shadow-[0_10px_30px_rgba(15,23,42,0.18)]`}
                            >
                                <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/15 blur-2xl" />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent" />
                                <div className="relative flex items-center justify-between">
                                    <span className="block text-[11px] font-bold text-white/80 uppercase tracking-wider">{kpi.label}</span>
                                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
                                        <svg className="h-4 w-4 stroke-current" fill="none" strokeWidth={2} viewBox="0 0 24 24">
                                            <path d={kpi.icon} />
                                        </svg>
                                    </div>
                                </div>
                                <div className="relative text-xl font-extrabold">{kpi.value}</div>
                                {kpi.note && <span className="relative inline-block text-[11px] font-medium text-white/85">{kpi.note}</span>}
                            </div>
                        ))}
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0">
                        <div className={`lg:col-span-2 rounded-2xl border-t-4 ${panelAccents[0]} bg-white/70 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl p-4 flex flex-col min-h-0`}>
                            <h2 className="font-bold text-sm text-slate-900 mb-2 flex-shrink-0">Donations Trend (Last 6 Months)</h2>
                            <div className="flex-1 min-h-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={monthlyTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="donationFill" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#0f766e" stopOpacity={0.4} />
                                                <stop offset="95%" stopColor="#0f766e" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                        <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                                        <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} width={70} />
                                        <Tooltip formatter={(value) => currency(value)} />
                                        <Area type="monotone" dataKey="total" stroke="#0f766e" strokeWidth={2} fill="url(#donationFill)" name="Amount" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className={`rounded-2xl border-t-4 ${panelAccents[1]} bg-white/70 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl p-4 flex flex-col min-h-0`}>
                            <h2 className="font-bold text-sm text-slate-900 mb-2 flex-shrink-0">Donations by Category</h2>
                            <div className="flex-1 min-h-0">
                                {categoryBreakdown.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={categoryBreakdown}
                                                dataKey="value"
                                                nameKey="name"
                                                innerRadius="45%"
                                                outerRadius="70%"
                                                paddingAngle={2}
                                            >
                                                {categoryBreakdown.map((entry, index) => (
                                                    <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(value) => currency(value)} />
                                            <Legend wrapperStyle={{ fontSize: 11 }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="h-full flex items-center justify-center text-xs text-slate-400">
                                        No completed donations yet.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Recent Contributions, Cause Goals & Activity */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0">
                        <div className={`rounded-2xl border-t-4 ${panelAccents[2]} bg-white/70 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl p-4 flex flex-col min-h-0`}>
                            <h2 className="font-bold text-sm text-slate-900 mb-2 flex-shrink-0">Recent Contributions</h2>
                            <div className="flex-1 min-h-0 overflow-y-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead className="sticky top-0 bg-white/80 backdrop-blur">
                                        <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                            <th className="pb-2">Donor</th>
                                            <th className="pb-2">Amount</th>
                                            <th className="pb-2">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 text-xs">
                                        {recentDonations.map((donation, index) => (
                                            <tr key={index}>
                                                <td className="py-2 font-semibold text-slate-800">{donation.donor}</td>
                                                <td className="py-2 font-bold text-slate-900">{donation.amount}</td>
                                                <td className="py-2">
                                                    <StatusBadge value={donation.status} map={donationStatusMap} />
                                                </td>
                                            </tr>
                                        ))}
                                        {recentDonations.length === 0 && (
                                            <tr>
                                                <td colSpan={3} className="py-4 text-center text-xs text-slate-400">
                                                    No donations yet.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className={`rounded-2xl border-t-4 ${panelAccents[4]} bg-white/70 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl p-4 flex flex-col min-h-0`}>
                            <h2 className="font-bold text-sm text-slate-900 mb-2 flex-shrink-0">Cause Goals Progress</h2>
                            <div className="flex-1 min-h-0">
                                {causeGoals.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={causeGoals}
                                                dataKey="percent"
                                                nameKey="name"
                                                innerRadius="45%"
                                                outerRadius="70%"
                                                paddingAngle={2}
                                            >
                                                {causeGoals.map((goal, index) => (
                                                    <Cell key={goal.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(value) => `${value}% funded`} />
                                            <Legend wrapperStyle={{ fontSize: 11 }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="h-full flex items-center justify-center text-xs text-slate-400">
                                        No active causes right now.
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={`rounded-2xl border-t-4 ${panelAccents[5]} bg-white/70 shadow-[0_8px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl p-4 flex flex-col min-h-0`}>
                            <div className="flex items-center justify-between flex-shrink-0 mb-2">
                                <h2 className="font-bold text-sm text-slate-900">Recent Activity</h2>
                                <a href={route('admin.activity-logs.index')} className="text-[10px] font-bold text-rose-900 hover:underline">
                                    View All
                                </a>
                            </div>
                            <div className="flex-1 min-h-0 overflow-y-auto space-y-2">
                                {recentLogs.map((log) => (
                                    <div key={log.id} className="flex items-center justify-between gap-2 text-xs border-b border-slate-50 pb-2">
                                        <div className="min-w-0">
                                            <p className="font-semibold text-slate-800 truncate">{log.user_name ?? 'System'}</p>
                                            <p className="text-slate-500 truncate">{log.description}</p>
                                        </div>
                                        <StatusBadge value={log.action} map={actionMap} />
                                    </div>
                                ))}
                                {recentLogs.length === 0 && (
                                    <p className="text-xs text-slate-400">No activity recorded yet.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
