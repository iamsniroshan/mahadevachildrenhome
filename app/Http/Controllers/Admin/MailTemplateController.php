<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MailTemplate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MailTemplateController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Settings/MailTemplates', [
            'templates' => MailTemplate::query()->orderBy('name')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'in:general,special_food'],
            'subject' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        MailTemplate::create([
            'name' => $data['name'],
            'type' => 'donation_confirmation',
            'category' => $data['category'],
            'subject' => $data['subject'],
            'body' => $data['body'],
            'is_active' => $data['is_active'] ?? true,
        ]);

        return redirect()->route('admin.settings.mail.templates.index')->with('success', 'Email template saved.');
    }

    public function update(Request $request, MailTemplate $template): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'in:general,special_food'],
            'subject' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string'],
            'is_active' => ['nullable', 'boolean'],
        ]);

        $template->update([
            'name' => $data['name'],
            'category' => $data['category'],
            'subject' => $data['subject'],
            'body' => $data['body'],
            'is_active' => $data['is_active'] ?? $template->is_active,
        ]);

        return redirect()->route('admin.settings.mail.templates.index')->with('success', 'Email template updated.');
    }

    public function destroy(MailTemplate $template): RedirectResponse
    {
        $template->delete();

        return redirect()->route('admin.settings.mail.templates.index')->with('success', 'Email template deleted.');
    }
}
