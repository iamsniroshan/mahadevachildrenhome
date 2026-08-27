<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['title', 'youtube_url', 'display_order', 'status'])]
class Video extends Model
{
    protected $appends = ['youtube_id', 'thumbnail_url'];

    protected function casts(): array
    {
        return [
            'display_order' => 'integer',
        ];
    }

    protected function youtubeId(): Attribute
    {
        return Attribute::make(
            get: function () {
                $url = $this->youtube_url ?? '';

                if (preg_match('/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/', $url, $matches)) {
                    return $matches[1];
                }

                return null;
            },
        );
    }

    protected function thumbnailUrl(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->youtube_id
                ? "https://img.youtube.com/vi/{$this->youtube_id}/hqdefault.jpg"
                : null,
        );
    }
}
