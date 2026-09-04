<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'mailer', 'host', 'port', 'username', 'password', 'encryption',
    'from_address', 'from_name', 'donation_confirmation_enabled',
])]
class MailSetting extends Model
{
    protected function casts(): array
    {
        return [
            'port' => 'integer',
            'donation_confirmation_enabled' => 'boolean',
        ];
    }

    /**
     * Get the single settings row, creating it with defaults if missing.
     */
    public static function current(): self
    {
        return static::first() ?? static::create([
            'mailer' => 'log',
            'host' => null,
            'port' => 2525,
            'username' => null,
            'password' => null,
            'encryption' => null,
            'from_address' => 'hello@example.com',
            'from_name' => config('app.name'),
            'donation_confirmation_enabled' => true,
        ]);
    }
}
