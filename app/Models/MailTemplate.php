<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'name',
    'subject',
    'body',
    'type',
    'is_active',
])]
class MailTemplate extends Model
{
    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
        ];
    }

    public static function donationTemplates(): Builder
    {
        return static::query()
            ->where('type', 'donation_confirmation')
            ->where('is_active', true)
            ->orderBy('name');
    }

    public function renderForDonation(Donation $donation): string
    {
        $placeholders = [
            'donor_name' => $donation->is_anonymous ? 'Anonymous Donor' : ($donation->donor_name ?? 'Donor'),
            'email' => $donation->email ?? '',
            'amount' => number_format((float) $donation->amount, 2, '.', ','),
            'currency' => $donation->currency ?? 'LKR',
            'category' => ucfirst((string) ($donation->category ?? '')),
            'donation_type' => str_replace('_', ' ', (string) ($donation->donation_type ?? '')),
            'payment_reference' => $donation->payment_reference ?? 'N/A',
            'invoice_number' => $donation->invoice_number ?? 'N/A',
            'status' => ucfirst((string) ($donation->status ?? 'pending')),
            'date' => $donation->created_at ? $donation->created_at->format('d M Y') : now()->format('d M Y'),
            'app_name' => config('app.name'),
        ];

        $body = (string) $this->body;

        foreach ($placeholders as $key => $value) {
            $body = str_replace([
                '{{ '.$key.' }}',
                '{{'.$key.'}}',
                '{{ '.$key.'}}',
                '{{'.$key.' }}',
            ], (string) $value, $body);
        }

        return $body;
    }
}
