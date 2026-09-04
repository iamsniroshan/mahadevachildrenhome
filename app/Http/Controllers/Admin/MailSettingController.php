<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MailSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Inertia\Inertia;
use Inertia\Response;

class MailSettingController extends Controller
{
    public function edit(): Response
    {
        $settings = MailSetting::current();

        return Inertia::render('Admin/Settings/Mail', [
            'settings' => [
                'mailer' => $settings->mailer,
                'host' => $settings->host,
                'port' => $settings->port,
                'username' => $settings->username,
                'encryption' => $settings->encryption,
                'from_address' => $settings->from_address,
                'from_name' => $settings->from_name,
                'donation_confirmation_enabled' => $settings->donation_confirmation_enabled,
                'has_password' => filled($settings->password),
            ],
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'mailer' => ['required', 'in:smtp,log'],
            'host' => ['nullable', 'string', 'max:255'],
            'port' => ['nullable', 'integer', 'min:1', 'max:65535'],
            'username' => ['nullable', 'string', 'max:255'],
            'password' => ['nullable', 'string'],
            'encryption' => ['nullable', 'in:tls,ssl'],
            'from_address' => ['required', 'email', 'max:255'],
            'from_name' => ['required', 'string', 'max:255'],
            'donation_confirmation_enabled' => ['boolean'],
        ]);

        $settings = MailSetting::current();

        if (filled($data['password'] ?? null)) {
            $data['password'] = Crypt::encryptString($data['password']);
        } else {
            unset($data['password']);
        }

        $settings->update($data);

        return redirect()->route('admin.settings.mail.edit')->with('success', 'Mail settings updated.');
    }
}
