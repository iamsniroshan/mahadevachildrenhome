<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'title', 'content', 'excerpt', 'image', 'images', 'author',
    'category', 'tags', 'status', 'featured', 'publish_date',
])]
class News extends Model
{
    protected function casts(): array
    {
        return [
            'featured' => 'boolean',
            'publish_date' => 'datetime',
        ];
    }

    protected function image(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value) => $value && !str_starts_with($value, 'http') && !str_starts_with($value, '/storage')
                ? asset('storage/'.ltrim($value, '/'))
                : $value,
        );
    }

    protected function images(): Attribute
    {
        return Attribute::make(
            get: function (?string $value) {
                if (!$value) {
                    return [];
                }

                $paths = json_decode($value, true);

                // legacy rows were saved with an extra layer of escaping (invalid JSON)
                if (!is_array($paths)) {
                    $paths = json_decode(stripslashes($value), true);
                }

                if (!is_array($paths)) {
                    return [];
                }

                return array_values(array_map(
                    fn ($path) => $path && !str_starts_with($path, 'http') && !str_starts_with($path, '/storage')
                        ? asset('storage/'.ltrim($path, '/'))
                        : $path,
                    $paths
                ));
            },
            set: fn (?array $value) => json_encode($value ?? []),
        );
    }
}
