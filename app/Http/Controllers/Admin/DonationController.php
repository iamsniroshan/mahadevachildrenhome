<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Donation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DonationController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Donations/Index', [
            'donations' => Donation::latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Donations/Form');
    }

    public function store(Request $request): RedirectResponse
    {
        Donation::create($this->validated($request));

        return redirect()->route('admin.donations.index')->with('success', 'Donation recorded.');
    }

    public function edit(Donation $donation): Response
    {
        return Inertia::render('Admin/Donations/Form', ['donation' => $donation]);
    }

    public function update(Request $request, Donation $donation): RedirectResponse
    {
        $donation->update($this->validated($request));

        return redirect()->route('admin.donations.index')->with('success', 'Donation updated.');
    }

    public function updateStatus(Request $request, Donation $donation): RedirectResponse
    {
        $data = $request->validate([
            'status' => ['required', 'in:pending,confirmed'],
            'admin_notes' => ['nullable', 'string'],
        ]);

        $donation->update($data);

        return redirect()->route('admin.donations.index')->with('success', 'Donation updated.');
    }

    public function destroy(Donation $donation): RedirectResponse
    {
        $donation->delete();

        return redirect()->route('admin.donations.index')->with('success', 'Donation removed.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'donor_name' => ['required', 'string', 'max:200'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:20'],
            'address' => ['nullable', 'string'],
            'donation_type' => ['required', 'in:one_time,monthly,yearly'],
            'amount' => ['required', 'numeric'],
            'currency' => ['nullable', 'string', 'max:3'],
            'category' => ['required', 'in:general,education,healthcare,shelter,food,emergency'],
            'message' => ['nullable', 'string'],
            'is_anonymous' => ['nullable', 'boolean'],
            'payment_method' => ['nullable', 'in:bank_transfer,credit_card,paypal,cash,check,other'],
            'payment_reference' => ['nullable', 'string', 'max:255'],
            'status' => ['required', 'in:pending,confirmed'],
            'admin_notes' => ['nullable', 'string'],
        ]);
    }
}
