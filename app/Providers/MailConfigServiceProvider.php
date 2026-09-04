<?php

namespace App\Providers;

use App\Models\MailSetting;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class MailConfigServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        try {
            if (!Schema::hasTable('mail_settings')) {
                return;
            }

            $settings = MailSetting::current();

            Config::set('mail.from.address', $settings->from_address ?: config('mail.from.address'));
            Config::set('mail.from.name', $settings->from_name ?: config('mail.from.name'));

            if ($settings->mailer === 'smtp' && filled($settings->host)) {
                Config::set('mail.default', 'smtp');
                Config::set('mail.mailers.smtp.host', $settings->host);
                Config::set('mail.mailers.smtp.port', $settings->port ?? 587);
                Config::set('mail.mailers.smtp.username', $settings->username);
                Config::set('mail.mailers.smtp.encryption', $settings->encryption);

                if (filled($settings->password)) {
                    try {
                        Config::set('mail.mailers.smtp.password', Crypt::decryptString($settings->password));
                    } catch (\Throwable) {
                        // keep existing password if decryption fails
                    }
                }
            } else {
                Config::set('mail.default', 'log');
            }
        } catch (\Throwable $e) {
            Log::debug('MailConfigServiceProvider: '.$e->getMessage());
        }
    }
}
