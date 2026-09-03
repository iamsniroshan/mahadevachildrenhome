<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
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
        $data = $this->validated($request);

        if ($request->hasFile('image')) {
            $this->deleteImage($team);
            $data['image'] = $this->storeImage($request, $data['name']);
        } elseif ($request->boolean('remove_image')) {
            $this->deleteImage($team);
            $data['image'] = null;
        } else {
            unset($data['image']);
        }

        Team::create($data);

        return redirect()->route('admin.teams.index')->with('success', 'Team member added.');
    }

    public function edit(Team $team): Response
    {
        return Inertia::render('Admin/Teams/Form', ['team' => $team]);
    }

    public function update(Request $request, Team $team): RedirectResponse
    {
        $data = $this->validated($request);

        if ($request->hasFile('image')) {
            $data['image'] = $this->storeImage($request, $data['name']);
        } else {
            unset($data['image']);
        }

        $team->update($data);

        return redirect()->route('admin.teams.index')->with('success', 'Team member updated.');
    }

    public function destroy(Team $team): RedirectResponse
    {
        $this->deleteImage($team);
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
            'image' => ['nullable', 'file', 'image', 'max:5120'],
            'remove_image' => ['nullable', 'boolean'],
            'team_type' => ['required', 'in:committee,executive,staff'],
            'status' => ['required', 'in:active,inactive'],
            'display_order' => ['nullable', 'integer'],
        ]);
    }

    private function storeImage(Request $request, string $name): string
    {
        $image = $request->file('image');
        $filename = Str::slug($name).'.'.$image->extension();

        return $image->storeAs('uploads/teams', $filename, 'public');
    }

    private function deleteImage(Team $team): void
    {
        if ($team->getRawOriginal('image')) {
            Storage::disk('public')->delete($team->getRawOriginal('image'));
        }
    }
}
