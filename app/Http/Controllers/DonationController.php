<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
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
            'phone' => ['required', 'string', 'max:20'],
            'address' => ['nullable', 'string'],
            'donation_type' => ['required', 'in:one_time,monthly,yearly'],
            'amount' => ['required', 'numeric', 'min:1'],
            'currency' => ['nullable', 'string', 'max:3'],
            'category' => ['required', 'in:general,education,healthcare,shelter,food,emergency'],
            'message' => ['nullable', 'string'],
            'is_anonymous' => ['nullable', 'boolean'],
            'payment_method' => ['nullable', 'in:bank_transfer,credit_card,paypal,cash,check,other'],
            'payment_reference' => ['nullable', 'string', 'max:255'],
            'document' => [
                'required',
                'file',
                'mimes:jpg,jpeg,png,pdf',
                'mimetypes:image/jpeg,image/png,application/pdf',
                'max:5120',
            ],
        ]);

        // strip any HTML/script tags so stored content is plain text
        $data = array_map(
            fn ($value) => is_string($value) ? strip_tags($value) : $value,
            $data
        );

        if ($request->hasFile('document')) {
            $file = $request->file('document');

            // re-verify actual file content matches an allowed image/pdf signature, not just the claimed mime type
            if (! $this->hasValidFileSignature($file)) {
                return back()->withErrors(['document' => 'The uploaded file is not a valid JPG, PNG, or PDF.'])->withInput();
            }

            $data['document_path'] = $file->store('uploads/donations', 'public');
        }
        unset($data['document']);

        $data['currency'] = $data['currency'] ?? 'LKR';

        Donation::create($data);

        return redirect()->route('donate')->with('success', 'Thank you! Your donation details have been submitted for review.');
    }

    private function hasValidFileSignature(UploadedFile $file): bool
    {
        $handle = fopen($file->getRealPath(), 'rb');
        if (! $handle) {
            return false;
        }
        $bytes = fread($handle, 8);
        fclose($handle);

        $signatures = [
            "\xFF\xD8\xFF" => true, // JPEG
            "\x89PNG\r\n\x1A\n" => true, // PNG
            '%PDF-' => true, // PDF
        ];

        foreach (array_keys($signatures) as $magic) {
            if (str_starts_with((string) $bytes, $magic)) {
                return true;
            }
        }

        return false;
    }
}
