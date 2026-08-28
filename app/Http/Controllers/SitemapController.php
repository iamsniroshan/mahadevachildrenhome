<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\URL;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $staticUrls = [
            ['route' => 'home', 'priority' => '1.0', 'changefreq' => 'weekly'],
            ['route' => 'about', 'priority' => '0.8', 'changefreq' => 'monthly'],
            ['route' => 'team.index', 'priority' => '0.6', 'changefreq' => 'monthly'],
            ['route' => 'news.index', 'priority' => '0.8', 'changefreq' => 'daily'],
            ['route' => 'videos.index', 'priority' => '0.5', 'changefreq' => 'monthly'],
            ['route' => 'donate', 'priority' => '0.9', 'changefreq' => 'monthly'],
            ['route' => 'contact', 'priority' => '0.5', 'changefreq' => 'yearly'],
        ];

        $urls = collect($staticUrls)->map(fn (array $entry) => [
            'loc' => URL::route($entry['route']),
            'lastmod' => now()->toAtomString(),
            'changefreq' => $entry['changefreq'],
            'priority' => $entry['priority'],
        ]);

        $newsUrls = News::where('status', 'published')
            ->orderByDesc('publish_date')
            ->get()
            ->map(fn (News $news) => [
                'loc' => URL::route('news.show', $news),
                'lastmod' => $news->updated_at?->toAtomString() ?? now()->toAtomString(),
                'changefreq' => 'monthly',
                'priority' => '0.7',
            ]);

        $urls = $urls->concat($newsUrls);

        return response()
            ->view('sitemap', ['urls' => $urls])
            ->header('Content-Type', 'application/xml');
    }
}
