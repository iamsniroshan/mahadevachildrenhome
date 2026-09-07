<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\DonationConfirmed;
use App\Models\Donation;
use App\Models\MailSetting;
use App\Models\MailTemplate;
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
            'mailTemplates' => MailTemplate::donationTemplates()->get()->map(fn ($template) => [
                'id' => $template->id,
                'name' => $template->name,
                'subject' => $template->subject,
            ]),
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
            'invoice_number' => ['nullable', 'string', 'max:100'],
            'invoice_file' => [$request->input('status') === 'confirmed' ? 'required' : 'nullable', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:10240'],
        ]);

        if ($data['status'] === 'confirmed' && $request->hasFile('invoice_file')) {
            $data['invoice_path'] = $request->file('invoice_file')->store('invoices', 'public');
        }

        unset($data['invoice_file']);

        $donation->update($data);

        return redirect()->route('admin.donations.index')->with('success', 'Donation updated.');
    }

    /**
     * Return a rendered preview of the confirmation email for the admin to review.
     */
    public function confirmationPreview(Request $request, Donation $donation): JsonResponse
    {
        $data = $request->validate([
            'template_id' => ['nullable', 'exists:mail_templates,id'],
            'invoice_number' => ['nullable', 'string', 'max:100'],
        ]);

        $donation->status = 'confirmed';
        $donation->invoice_number = $data['invoice_number'] ?? $donation->invoice_number;
        $template = $data['template_id'] ? MailTemplate::find($data['template_id']) : MailTemplate::donationTemplates()->first();

        return response()->json([
            'subject' => (new DonationConfirmed($donation, $template))->envelope()->subject,
            'html' => (string) view('emails.donation-confirmed', ['donation' => $donation, 'mailBody' => $template ? $template->renderForDonation($donation) : null]),
        ]);
    }

    /**
     * Mark the donation as confirmed and email the donor.
     */
    public function confirmAndSend(Request $request, Donation $donation): RedirectResponse
    {
        $data = $request->validate([
            'admin_notes' => ['nullable', 'string'],
            'template_id' => ['nullable', 'exists:mail_templates,id'],
            'invoice_number' => ['required', 'string', 'max:100'],
            'invoice_file' => ['required', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:10240'],
        ]);

        $invoicePath = $request->file('invoice_file')->store('invoices', 'public');

        $donation->update([
            'status' => 'confirmed',
            'admin_notes' => $data['admin_notes'] ?? $donation->admin_notes,
            'invoice_number' => $data['invoice_number'] ?? $donation->invoice_number,
            'invoice_path' => $invoicePath,
        ]);

        if (MailSetting::current()->donation_confirmation_enabled) {
            try {
                $template = $data['template_id'] ? MailTemplate::find($data['template_id']) : MailTemplate::donationTemplates()->first();
                Mail::to($donation->email)->send(new DonationConfirmed($donation, $template));

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
            'invoice_number' => ['nullable', 'string', 'max:100'],
            'status' => ['required', 'in:pending,confirmed'],
            'admin_notes' => ['nullable', 'string'],
        ]);
    }
}
