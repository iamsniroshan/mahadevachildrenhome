<?php

use App\Http\Controllers\Admin\BlogController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\DonationController;
use App\Http\Controllers\Admin\FundriseController;
use App\Http\Controllers\Admin\NewsController as AdminNewsController;
use App\Http\Controllers\Admin\SliderController;
use App\Http\Controllers\Admin\TeamController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\ProfileController;
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
    ]);
})->name('home');

Route::get('/news', [NewsController::class, 'index'])->name('news.index');
Route::get('/news/{news}', [NewsController::class, 'show'])->name('news.show');

Route::get('/dashboard', function () {
    return Inertia::render('Admin/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::prefix('admin')->name('admin.')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');

    Route::resource('teams', TeamController::class);
    Route::resource('sliders', SliderController::class);
    Route::resource('blogs', BlogController::class);
    Route::resource('news', AdminNewsController::class);
    Route::resource('fundrise', FundriseController::class);
    Route::resource('donations', DonationController::class);

    Route::get('contacts', [ContactController::class, 'index'])->name('contacts.index');
    Route::put('contacts/{contact}', [ContactController::class, 'update'])->name('contacts.update');
    Route::delete('contacts/{contact}', [ContactController::class, 'destroy'])->name('contacts.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
