<?php

namespace App\Providers;

use App\Models\Blog;
use App\Models\Contact;
use App\Models\Donation;
use App\Models\Fundrise;
use App\Models\News;
use App\Models\Slider;
use App\Models\Team;
use App\Models\User;
use App\Observers\LogsActivityObserver;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        foreach ([Team::class, Slider::class, Blog::class, News::class, Fundrise::class, Donation::class, Contact::class, User::class] as $model) {
            $model::observe(LogsActivityObserver::class);
        }
    }
}
