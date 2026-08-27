<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'donor_name', 'email', 'phone', 'address', 'donation_type', 'amount',
    'currency', 'category', 'message', 'is_anonymous', 'payment_method',
    'payment_reference', 'document_path', 'status', 'admin_notes',
])]
class Donation extends Model
{
    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
            'is_anonymous' => 'boolean',
        ];
    }
}
