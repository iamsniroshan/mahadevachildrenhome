<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\DonationConfirmed;
use App\Models\Donation;
use App\Models\MailSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class DonationController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Donations/Index', [
            'donations' => Donation::latest()->get(),
            'confirmationMailEnabled' => MailSetting::current()->donation_confirmation_enabled,
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

    /**
     * Return a rendered preview of the confirmation email for the admin to review.
     */
    public function confirmationPreview(Donation $donation): JsonResponse
    {
        $donation->status = 'confirmed';

        return response()->json([
            'subject' => (new DonationConfirmed($donation))->envelope()->subject,
            'html' => (string) view('emails.donation-confirmed', ['donation' => $donation]),
        ]);
    }

    /**
     * Mark the donation as confirmed and email the donor.
     */
    public function confirmAndSend(Request $request, Donation $donation): RedirectResponse
    {
        $data = $request->validate([
            'admin_notes' => ['nullable', 'string'],
        ]);

        $donation->update([
            'status' => 'confirmed',
            'admin_notes' => $data['admin_notes'] ?? $donation->admin_notes,
        ]);

        if (MailSetting::current()->donation_confirmation_enabled) {
            try {
                Mail::to($donation->email)->send(new DonationConfirmed($donation));

                return redirect()->route('admin.donations.index')->with('success', 'Donation confirmed and email sent to the donor.');
            } catch (\Throwable $e) {
                report($e);

                return redirect()->route('admin.donations.index')->with('error', 'Donation confirmed, but the email could not be sent: '.$e->getMessage());
            }
        }

        return redirect()->route('admin.donations.index')->with('success', 'Donation confirmed.');
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
