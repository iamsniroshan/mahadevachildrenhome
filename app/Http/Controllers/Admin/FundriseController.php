<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Fundrise;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FundriseController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Fundrise/Index', [
            'causes' => Fundrise::latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Fundrise/Form');
    }

    public function store(Request $request): RedirectResponse
    {
        Fundrise::create($this->validated($request));

        return redirect()->route('admin.fundrise.index')->with('success', 'Cause created.');
    }

    public function edit(Fundrise $fundrise): Response
    {
        return Inertia::render('Admin/Fundrise/Form', ['cause' => $fundrise]);
    }

    public function update(Request $request, Fundrise $fundrise): RedirectResponse
    {
        $fundrise->update($this->validated($request));

        return redirect()->route('admin.fundrise.index')->with('success', 'Cause updated.');
    }

    public function destroy(Fundrise $fundrise): RedirectResponse
    {
        $fundrise->delete();

        return redirect()->route('admin.fundrise.index')->with('success', 'Cause removed.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:500'],
            'content' => ['required', 'string'],
            'excerpt' => ['nullable', 'string'],
            'image' => ['nullable', 'string', 'max:255'],
            'goal_amount' => ['nullable', 'numeric'],
            'current_amount' => ['nullable', 'numeric'],
            'currency' => ['nullable', 'string', 'max:3'],
            'category' => ['nullable', 'string', 'max:100'],
            'tags' => ['nullable', 'string'],
            'status' => ['required', 'in:draft,active,paused,completed,archived'],
            'featured' => ['nullable', 'boolean'],
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date'],
        ]);
    }
}
