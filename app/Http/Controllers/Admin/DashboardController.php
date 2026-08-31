<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\Contact;
use App\Models\Donation;
use App\Models\Fundrise;
use App\Models\Team;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $completedStatuses = ['completed', 'confirmed'];

        $totalDonated = Donation::whereIn('status', $completedStatuses)->sum('amount');
        $donationsCount = Donation::count();
        $activeChildrenCare = Team::where('status', 'active')->count();
        $activeCauses = Fundrise::where('status', 'active')->get();
        $avgFunded = $activeCauses->count() > 0
            ? (int) round($activeCauses->avg(fn ($cause) => $cause->goal_amount > 0
                ? min(100, ($cause->current_amount / $cause->goal_amount) * 100)
                : 0))
            : 0;
        $newContacts = Contact::where('status', 'new')->count();

        $monthlyTrend = collect(range(5, 0))->map(function ($monthsAgo) use ($completedStatuses) {
            $month = Carbon::now()->subMonths($monthsAgo);

            return [
                'month' => $month->format('M Y'),
                'total' => (float) Donation::whereIn('status', $completedStatuses)
                    ->whereYear('created_at', $month->year)
                    ->whereMonth('created_at', $month->month)
                    ->sum('amount'),
                'count' => Donation::whereYear('created_at', $month->year)
                    ->whereMonth('created_at', $month->month)
                    ->count(),
            ];
        })->values();

        $categoryBreakdown = Donation::whereIn('status', $completedStatuses)
            ->selectRaw('category, SUM(amount) as total')
            ->groupBy('category')
            ->orderByDesc('total')
            ->get()
            ->map(fn ($row) => ['name' => ucfirst($row->category), 'value' => (float) $row->total]);

        $causeGoals = $activeCauses->map(fn ($cause) => [
            'name' => $cause->title,
            'percent' => $cause->goal_amount > 0
                ? min(100, (int) round(($cause->current_amount / $cause->goal_amount) * 100))
                : 0,
        ])->values();

        $recentDonations = Donation::latest()->limit(5)->get()->map(fn ($donation) => [
            'donor' => $donation->is_anonymous ? 'Anonymous Donor' : $donation->donor_name,
            'category' => $donation->category,
            'amount' => "{$donation->currency} ".number_format((float) $donation->amount),
            'status' => $donation->status,
        ]);

        $recentLogs = ActivityLog::with('user:id,name')
            ->whereDoesntHave('user', fn ($query) => $query->where('role', 'superadmin'))
            ->latest('created_at')
            ->limit(10)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'kpis' => [
                'totalDonated' => (float) $totalDonated,
                'donationsCount' => $donationsCount,
                'activeChildrenCare' => $activeChildrenCare,
                'activeCausesCount' => $activeCauses->count(),
                'avgFunded' => $avgFunded,
                'newContacts' => $newContacts,
            ],
            'monthlyTrend' => $monthlyTrend,
            'categoryBreakdown' => $categoryBreakdown,
            'causeGoals' => $causeGoals,
            'recentDonations' => $recentDonations,
            'recentLogs' => $recentLogs,
        ]);
    }
}
