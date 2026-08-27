import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

const kpis = [
    {
        label: 'Total Donated (MTD)',
        value: 'LKR 2,050,000',
        valueClass: 'text-teal-900',
        badge: '+14% vs last month',
        badgeClass: 'text-emerald-600 bg-emerald-50',
    },
    {
        label: 'Active Children Care',
        value: '214',
        valueClass: 'text-rose-950',
        note: '100% School Enrollment',
    },
    {
        label: 'Active Causes',
        value: '3 Campaigns',
        valueClass: 'text-amber-600',
        note: 'Average 60% funded',
    },
    {
        label: 'Farm Operations',
        value: '3 Farms',
        valueClass: 'text-slate-800',
        badge: '100% Self-Sustainable',
        badgeClass: 'text-emerald-600 bg-emerald-50',
    },
];

const donations = [
    { donor: 'S. Tharmalingam', cause: 'Sponsor Daily Meals', amount: 'LKR 10,000', status: 'Completed', statusClass: 'bg-emerald-100 text-emerald-800' },
    { donor: 'Anonymous Donor', cause: 'Playground & Infra', amount: 'LKR 2,500', status: 'Completed', statusClass: 'bg-emerald-100 text-emerald-800' },
    { donor: 'K. Ratnarajah', cause: 'Medical Care Fund', amount: 'LKR 25,000', status: 'Pending Bank', statusClass: 'bg-amber-100 text-amber-800' },
];

const causeGoals = [
    { name: 'Daily Meals & Nutrition', percent: 65, barClass: 'bg-emerald-500', textClass: 'text-emerald-600' },
    { name: 'Playground Infrastructure', percent: 77, barClass: 'bg-emerald-500', textClass: 'text-emerald-600' },
    { name: 'Medical Rehab Fund', percent: 38, barClass: 'bg-amber-500', textClass: 'text-amber-500' },
];

export default function Dashboard() {
    return (
        <AdminLayout header="Overview Dashboard">
            <Head title="Admin Dashboard" />

            {/* Key Performance Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {kpis.map((kpi) => (
                    <div key={kpi.label} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{kpi.label}</span>
                        <div className={`text-2xl font-extrabold ${kpi.valueClass}`}>{kpi.value}</div>
                        {kpi.badge && (
                            <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${kpi.badgeClass}`}>
                                {kpi.badge}
                            </span>
                        )}
                        {kpi.note && <span className="inline-block text-xs font-medium text-slate-500">{kpi.note}</span>}
                    </div>
                ))}
            </div>

            {/* Recent Donations & Active Causes Management */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Donations Table */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="font-bold text-lg text-slate-900">Recent Contributions</h2>
                        <a href="#" className="text-xs font-bold text-rose-900 hover:underline">View All</a>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                    <th className="pb-3">Donor Name</th>
                                    <th className="pb-3">Target Cause</th>
                                    <th className="pb-3">Amount</th>
                                    <th className="pb-3">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm">
                                {donations.map((donation) => (
                                    <tr key={donation.donor}>
                                        <td className="py-4 font-semibold text-slate-800">{donation.donor}</td>
                                        <td className="py-4 text-slate-600">{donation.cause}</td>
                                        <td className="py-4 font-bold text-slate-900">{donation.amount}</td>
                                        <td className="py-4">
                                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${donation.statusClass}`}>
                                                {donation.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Active Causes Trackers */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
                    <h2 className="font-bold text-lg text-slate-900">Cause Goals Progress</h2>

                    <div className="space-y-5">
                        {causeGoals.map((goal) => (
                            <div key={goal.name} className="space-y-2">
                                <div className="flex justify-between text-xs font-bold">
                                    <span className="text-slate-800">{goal.name}</span>
                                    <span className={goal.textClass}>{goal.percent}%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2">
                                    <div className={`${goal.barClass} h-2 rounded-full`} style={{ width: `${goal.percent}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
