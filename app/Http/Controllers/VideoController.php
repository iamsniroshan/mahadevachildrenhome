<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Inertia\Inertia;
use Inertia\Response;

class VideoController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Videos/Index', [
            'videos' => Video::where('status', 'active')->orderBy('display_order')->get(),
        ]);
    }
}
