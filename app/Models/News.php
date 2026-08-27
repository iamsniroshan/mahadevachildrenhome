<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
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
}
