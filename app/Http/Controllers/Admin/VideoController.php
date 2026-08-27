<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Video;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VideoController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Videos/Index', [
            'videos' => Video::orderBy('display_order')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Video::create($this->validated($request));

        return redirect()->route('admin.videos.index')->with('success', 'Video added.');
    }

    public function update(Request $request, Video $video): RedirectResponse
    {
        $video->update($this->validated($request));

        return redirect()->route('admin.videos.index')->with('success', 'Video updated.');
    }

    public function destroy(Video $video): RedirectResponse
    {
        $video->delete();

        return redirect()->route('admin.videos.index')->with('success', 'Video removed.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'youtube_url' => ['required', 'string', 'max:500', 'regex:/(youtu\.be\/|youtube\.com\/(watch\?v=|embed\/|shorts\/))[A-Za-z0-9_-]{11}/'],
            'display_order' => ['nullable', 'integer'],
            'status' => ['required', 'in:active,inactive'],
        ]);
    }
}
