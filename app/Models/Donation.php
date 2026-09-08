<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'donor_name', 'email', 'phone', 'address', 'donation_type', 'amount',
    'currency', 'category', 'message', 'payment_method',
    'payment_reference', 'invoice_number', 'invoice_path', 'invoice_source_path', 'document_path', 'status', 'mail_sent_at',
])]
class Donation extends Model
{
    protected function casts(): array
    {
        return [
            'amount' => 'decimal:2',
        ];
    }
}
