<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'title', 'content', 'excerpt', 'image', 'goal_amount', 'current_amount',
    'currency', 'category', 'tags', 'status', 'featured', 'start_date', 'end_date',
])]
class Fundrise extends Model
{
    protected $table = 'fundrise';

    protected function casts(): array
    {
        return [
            'goal_amount' => 'decimal:2',
            'current_amount' => 'decimal:2',
            'featured' => 'boolean',
            'start_date' => 'datetime',
            'end_date' => 'datetime',
        ];
    }

    protected function image(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value) => $value && !str_starts_with($value, 'http') && !str_starts_with($value, '/storage')
                ? asset('storage'.$value)
                : $value,
        );
    }
}
