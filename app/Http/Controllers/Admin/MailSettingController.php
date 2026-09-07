<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MailSetting;
use App\Models\MailTemplate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;
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
                'cc_address' => $settings->cc_address,
                'letterhead_path' => $settings->letterhead_path,
                'donation_confirmation_enabled' => $settings->donation_confirmation_enabled,
                'has_password' => filled($settings->password),
            ],
            'templates' => MailTemplate::donationTemplates()->get()->map(fn ($template) => [
                'id' => $template->id,
                'name' => $template->name,
                'subject' => $template->subject,
            ]),
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
            'cc_address' => ['nullable', 'email', 'max:255'],
            'letterhead_path' => ['nullable', 'file', 'mimes:pdf', 'max:10240'],
            'donation_confirmation_enabled' => ['boolean'],
        ]);

        $settings = MailSetting::current();

        if (filled($data['password'] ?? null)) {
            $data['password'] = Crypt::encryptString($data['password']);
        } else {
            unset($data['password']);
        }

        if ($request->hasFile('letterhead_path')) {
            if ($settings->letterhead_path) {
                Storage::disk('public')->delete($settings->letterhead_path);
            }

            $data['letterhead_path'] = $request->file('letterhead_path')->store('letterheads', 'public');
        } else {
            unset($data['letterhead_path']);
        }

        $settings->update($data);

        return redirect()->route('admin.settings.mail.edit')->with('success', 'Mail settings updated.');
    }
}
