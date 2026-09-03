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
        $data = $this->validated($request);
        unset($data['existing_images']);

        if ($request->hasFile('image')) {
            $data['image'] = '/'.$request->file('image')->store('uploads/news', 'public');
        } else {
            unset($data['image']);
        }

        $data['images'] = $request->hasFile('images')
            ? collect($request->file('images'))->map(fn ($file) => '/'.$file->store('uploads/news', 'public'))->values()->all()
            : [];

        News::create($data);

        return redirect()->route('admin.news.index')->with('success', 'News article created.');
    }

    public function edit(News $news): Response
    {
        return Inertia::render('Admin/News/Form', ['newsItem' => $news]);
    }

    public function update(Request $request, News $news): RedirectResponse
    {
        $data = $this->validated($request);

        if ($request->hasFile('image')) {
            $data['image'] = '/'.$request->file('image')->store('uploads/news', 'public');
        } else {
            unset($data['image']);
        }

        $existingImages = $data['existing_images'] ?? [];
        unset($data['existing_images']);

        $newImages = $request->hasFile('images')
            ? collect($request->file('images'))->map(fn ($file) => '/'.$file->store('uploads/news', 'public'))->values()->all()
            : [];

        $data['images'] = array_values(array_merge($existingImages, $newImages));

        $news->update($data);

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
            'image' => ['nullable', 'file', 'image', 'max:5120'],
            'images' => ['nullable', 'array'],
            'images.*' => ['file', 'image', 'max:5120'],
            'existing_images' => ['nullable', 'array'],
            'existing_images.*' => ['string'],
            'author' => ['nullable', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:100'],
            'status' => ['required', 'in:draft,published,archived'],
            'featured' => ['nullable', 'boolean'],
            'publish_date' => ['nullable', 'date'],
        ]);
    }
}
