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
            gradient: 'from-teal-600 to-teal-800',
        },
        {
            label: 'Active Team Members',
            value: kpis.activeChildrenCare ?? 0,
            note: 'Committee, executives & staff',
            gradient: 'from-rose-600 to-rose-900',
        },
        {
            label: 'Active Causes',
            value: `${kpis.activeCausesCount ?? 0} Campaigns`,
            note: `Average ${kpis.avgFunded ?? 0}% funded`,
            gradient: 'from-amber-500 to-amber-700',
        },
        {
            label: 'New Contact Messages',
            value: kpis.newContacts ?? 0,
            note: 'Awaiting response',
            gradient: 'from-sky-600 to-sky-800',
        },
    ];

    return (
        <AdminLayout header="Overview Dashboard" fullHeight>
            <Head title="Admin Dashboard" />

            <div className="h-full min-h-0 grid grid-rows-[auto_1fr_1fr] gap-4">
                {/* Key Performance Indicators */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 flex-shrink-0">
                    {kpiCards.map((kpi) => (
                        <div key={kpi.label} className={`bg-gradient-to-br ${kpi.gradient} text-white p-4 rounded-2xl shadow-sm space-y-1`}>
                            <span className="text-[11px] font-bold text-white/70 uppercase tracking-wider">{kpi.label}</span>
                            <div className="text-xl font-extrabold">{kpi.value}</div>
                            {kpi.note && <span className="inline-block text-[11px] font-medium text-white/80">{kpi.note}</span>}
                        </div>
                    ))}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0">
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col min-h-0">
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

                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col min-h-0">
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
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col min-h-0">
                        <h2 className="font-bold text-sm text-slate-900 mb-2 flex-shrink-0">Recent Contributions</h2>
                        <div className="flex-1 min-h-0 overflow-y-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="sticky top-0 bg-white">
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

                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col min-h-0">
                        <h2 className="font-bold text-sm text-slate-900 mb-2 flex-shrink-0">Cause Goals Progress</h2>
                        <div className="flex-1 min-h-0 overflow-y-auto space-y-3">
                            {causeGoals.map((goal) => (
                                <div key={goal.name} className="space-y-1">
                                    <div className="flex justify-between text-[11px] font-bold">
                                        <span className="text-slate-800 truncate pr-2">{goal.name}</span>
                                        <span className="text-emerald-600 flex-shrink-0">{goal.percent}%</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                                        <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${goal.percent}%` }} />
                                    </div>
                                </div>
                            ))}
                            {causeGoals.length === 0 && (
                                <p className="text-xs text-slate-400">No active causes right now.</p>
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col min-h-0">
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
        </AdminLayout>
    );
}
