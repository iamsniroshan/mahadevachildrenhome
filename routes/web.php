<?php

use App\Http\Controllers\Admin\ActivityLogController;
use App\Http\Controllers\Admin\BlogController;
use App\Http\Controllers\Admin\ContactController as AdminContactController;
use App\Http\Controllers\Admin\DonationController;
use App\Http\Controllers\Admin\FundriseController;
use App\Http\Controllers\Admin\NewsController as AdminNewsController;
use App\Http\Controllers\Admin\SliderController;
use App\Http\Controllers\Admin\TeamController as AdminTeamController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Admin\VideoController as AdminVideoController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\VideoController;
use App\Models\Fundrise;
use App\Models\News;
use App\Models\Slider;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'sliders' => Slider::where('status', 'active')->orderBy('display_order')->get(),
        'newsItems' => News::where('status', 'published')
            ->orderByDesc('publish_date')
            ->orderByDesc('created_at')
            ->limit(3)
            ->get(),
        'causes' => Fundrise::where('status', 'active')
            ->orderByDesc('featured')
            ->orderByDesc('created_at')
            ->limit(3)
            ->get(),
    ]);
})->name('home');

Route::get('/news', [NewsController::class, 'index'])->name('news.index');
Route::get('/news/{news}', [NewsController::class, 'show'])->name('news.show');
Route::get('/team', [TeamController::class, 'index'])->name('team.index');
Route::get('/videos', [VideoController::class, 'index'])->name('videos.index');
Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])
    ->middleware('throttle:5,1')
    ->name('contact.store');

Route::get('/dashboard', function () {
    return Inertia::render('Admin/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::prefix('admin')->name('admin.')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');

    Route::resource('teams', AdminTeamController::class);
    Route::resource('sliders', SliderController::class);
    Route::resource('blogs', BlogController::class);
    Route::resource('news', AdminNewsController::class);
    Route::resource('fundrise', FundriseController::class);
    Route::resource('donations', DonationController::class);
    Route::resource('users', AdminUserController::class)->except(['create', 'edit', 'show']);
    Route::resource('videos', AdminVideoController::class)->except(['create', 'edit', 'show']);

    Route::get('activity-logs', [ActivityLogController::class, 'index'])->name('activity-logs.index');

    Route::get('contacts', [AdminContactController::class, 'index'])->name('contacts.index');
    Route::put('contacts/{contact}', [AdminContactController::class, 'update'])->name('contacts.update');
    Route::delete('contacts/{contact}', [AdminContactController::class, 'destroy'])->name('contacts.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
