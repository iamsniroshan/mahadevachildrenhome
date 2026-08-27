<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
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
}
