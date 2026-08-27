<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['title', 'image', 'display_order', 'status'])]
class Slider extends Model
{
    protected function casts(): array
    {
        return [
            'display_order' => 'integer',
        ];
    }

    protected function image(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value) => $value && !str_starts_with($value, 'http')
                ? asset('storage/'.ltrim($value, '/'))
                : $value,
        );
    }
}
