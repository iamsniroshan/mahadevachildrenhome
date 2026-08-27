<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Contact');
    }

    public function store(Request $request): RedirectResponse
    {
        // honeypot: bots fill hidden fields, humans never see them
        if (filled($request->input('website'))) {
            return redirect()->route('contact')->with('success', 'Thank you for reaching out. We will get back to you soon.');
        }

        $data = $request->validate([
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'subject' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
        ]);

        // strip any HTML/script tags so stored content is plain text
        $data = array_map(
            fn ($value) => is_string($value) ? strip_tags($value) : $value,
            $data
        );

        Contact::create($data);

        return redirect()->route('contact')->with('success', 'Thank you for reaching out. We will get back to you soon.');
    }
}
