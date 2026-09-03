<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'title', 'content', 'excerpt', 'image', 'images', 'author',
    'category', 'tags', 'status', 'featured', 'publish_date',
])]
class Blog extends Model
{
    protected function casts(): array
    {
        return [
            'images' => 'array',
            'tags' => 'array',
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
}
