<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TeamController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Teams/Index', [
            'teams' => Team::orderBy('team_type')->orderBy('display_order')->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Teams/Form');
    }

    public function store(Request $request): RedirectResponse
    {
        Team::create($this->validated($request));

        return redirect()->route('admin.teams.index')->with('success', 'Team member added.');
    }

    public function edit(Team $team): Response
    {
        return Inertia::render('Admin/Teams/Form', ['team' => $team]);
    }

    public function update(Request $request, Team $team): RedirectResponse
    {
        $team->update($this->validated($request));

        return redirect()->route('admin.teams.index')->with('success', 'Team member updated.');
    }

    public function destroy(Team $team): RedirectResponse
    {
        $team->delete();

        return redirect()->route('admin.teams.index')->with('success', 'Team member removed.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'position' => ['required', 'string', 'max:255'],
            'qualifications' => ['nullable', 'string'],
            'phone' => ['nullable', 'string', 'max:20'],
            'email' => ['nullable', 'string', 'email', 'max:255'],
            'image' => ['nullable', 'string', 'max:255'],
            'team_type' => ['required', 'in:committee,executive,staff'],
            'status' => ['required', 'in:active,inactive'],
            'display_order' => ['nullable', 'integer'],
        ]);
    }
}
