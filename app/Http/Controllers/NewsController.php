<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('News/Index', [
            'newsItems' => News::where('status', 'published')
                ->orderByDesc('publish_date')
                ->orderByDesc('created_at')
                ->get(),
        ]);
    }

    public function show(News $news): Response
    {
        abort_unless($news->status === 'published', 404);

        return Inertia::render('News/Show', [
            'newsItem' => $news,
            'relatedNews' => News::where('status', 'published')
                ->where('id', '!=', $news->id)
                ->orderByDesc('publish_date')
                ->limit(3)
                ->get(),
        ]);
    }
}
