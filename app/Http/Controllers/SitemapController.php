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

        $xml = '<?xml version="1.0" encoding="UTF-8"?>'."\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'."\n";

        foreach ($urls as $url) {
            $xml .= '<url>'
                .'<loc>'.htmlspecialchars($url['loc'], ENT_XML1 | ENT_QUOTES).'</loc>'
                .'<lastmod>'.htmlspecialchars($url['lastmod'], ENT_XML1 | ENT_QUOTES).'</lastmod>'
                .'<changefreq>'.htmlspecialchars($url['changefreq'], ENT_XML1 | ENT_QUOTES).'</changefreq>'
                .'<priority>'.htmlspecialchars($url['priority'], ENT_XML1 | ENT_QUOTES).'</priority>'
                .'</url>'."\n";
        }

        $xml .= '</urlset>';

        return response($xml, 200)->header('Content-Type', 'application/xml');
    }
}
