<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DonationController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Donate');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'donor_name' => ['required', 'string', 'max:200'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'address' => ['nullable', 'string'],
            'donation_type' => ['required', 'in:one_time,monthly,yearly'],
            'amount' => ['required', 'numeric', 'min:1'],
            'currency' => ['nullable', 'string', 'max:3'],
            'category' => ['required', 'in:general,education,healthcare,shelter,food,emergency'],
            'message' => ['nullable', 'string'],
            'is_anonymous' => ['nullable', 'boolean'],
            'payment_method' => ['nullable', 'in:bank_transfer,credit_card,paypal,cash,check,other'],
            'payment_reference' => ['nullable', 'string', 'max:255'],
            'document' => ['nullable', 'file', 'mimes:jpg,jpeg,png,pdf', 'max:5120'],
        ]);

        if ($request->hasFile('document')) {
            $data['document_path'] = $request->file('document')->store('uploads/donations', 'public');
        }
        unset($data['document']);

        $data['currency'] = $data['currency'] ?? 'LKR';

        Donation::create($data);

        return redirect()->route('donate')->with('success', 'Thank you! Your donation details have been submitted for review.');
    }
}
