<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/News/Index', [
            'newsItems' => News::latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/News/Form');
    }

    public function store(Request $request): RedirectResponse
    {
        News::create($this->validated($request));

        return redirect()->route('admin.news.index')->with('success', 'News article created.');
    }

    public function edit(News $news): Response
    {
        return Inertia::render('Admin/News/Form', ['newsItem' => $news]);
    }

    public function update(Request $request, News $news): RedirectResponse
    {
        $news->update($this->validated($request));

        return redirect()->route('admin.news.index')->with('success', 'News article updated.');
    }

    public function destroy(News $news): RedirectResponse
    {
        $news->delete();

        return redirect()->route('admin.news.index')->with('success', 'News article removed.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:500'],
            'content' => ['required', 'string'],
            'excerpt' => ['nullable', 'string'],
            'image' => ['nullable', 'string', 'max:255'],
            'author' => ['nullable', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:100'],
            'status' => ['required', 'in:draft,published,archived'],
            'featured' => ['nullable', 'boolean'],
            'publish_date' => ['nullable', 'date'],
        ]);
    }
}
