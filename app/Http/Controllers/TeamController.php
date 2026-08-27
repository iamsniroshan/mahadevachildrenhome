<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Inertia\Inertia;
use Inertia\Response;

class TeamController extends Controller
{
    public function index(): Response
    {
        $teams = Team::where('status', 'active')
            ->orderBy('display_order')
            ->get()
            ->groupBy('team_type');

        return Inertia::render('Team/Index', [
            'committee' => $teams->get('committee', collect())->values(),
            'executive' => $teams->get('executive', collect())->values(),
            'staff' => $teams->get('staff', collect())->values(),
        ]);
    }
}
