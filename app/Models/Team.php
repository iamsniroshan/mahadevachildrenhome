<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'name', 'position', 'qualifications', 'phone', 'email', 'image',
    'team_type', 'status', 'display_order',
])]
class Team extends Model
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
            get: fn (?string $value) => $value && !str_starts_with($value, 'http') && !str_starts_with($value, '/storage')
                ? asset('storage'.$value)
                : $value,
        );
    }
}
