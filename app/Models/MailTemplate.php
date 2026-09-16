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

    /**
     * Resolve the default active donation template.
     */
    public static function defaultTemplate(): ?self
    {
        return static::donationTemplates()->first();
    }

    public function renderForDonation(Donation $donation): string
    {
        $placeholders = [
            'donor_name' => $donation->donor_name ?? 'Donor',
            'email' => $donation->email ?? '',
            'amount' => number_format((float) $donation->amount, 0, '.', ','),
            'currency' => $donation->currency ?? 'ரூபா',
            'donation_type' => str_replace('_', ' ', (string) ($donation->donation_type ?? '')),
            'contribution_date' => $donation->contribution_date?->format('d/m/Y') ?? ($donation->created_at?->format('d/m/Y') ?? now()->format('d/m/Y')),
            'reason' => $donation->reason ?? '',
            'meal_option' => $donation->meal_option ?? '',
            'payment_reference' => $donation->payment_reference ?? 'N/A',
            'invoice_number' => $donation->invoice_number ?? 'N/A',
            'status' => ucfirst((string) ($donation->status ?? 'pending')),
            'date' => $donation->contribution_date?->format('d/m/Y') ?? ($donation->created_at?->format('d/m/Y') ?? now()->format('d/m/Y')),
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
