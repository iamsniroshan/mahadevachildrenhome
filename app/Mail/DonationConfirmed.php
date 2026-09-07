<?php

namespace App\Mail;

use App\Models\Donation;
use App\Models\MailTemplate;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DonationConfirmed extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Donation $donation,
        public ?MailTemplate $template = null,
    ) {}

    public function envelope(): Envelope
    {
        $subject = $this->template?->subject ?: 'Donation Confirmation';

        return new Envelope(
            subject: $subject,
        );
    }

    public function content(): Content
    {
        $template = $this->template ?? MailTemplate::donationTemplates()->first();
        $mailBody = $template ? $template->renderForDonation($this->donation) : view('emails.donation-confirmed', ['donation' => $this->donation])->render();

        return new Content(
            view: 'emails.donation-confirmed',
            with: ['donation' => $this->donation, 'mailBody' => $mailBody],
        );
    }

    public function attachments(): array
    {
        $attachments = [];

        if ($this->donation->invoice_path) {
            $attachments[] = Attachment::fromStorageDisk('public', $this->donation->invoice_path)
                ->as('invoice-'.$this->donation->invoice_number.'.pdf');
        }

        if ($this->donation->invoice_source_path) {
            $attachments[] = Attachment::fromStorageDisk('public', $this->donation->invoice_source_path)
                ->as('invoice-original.'.pathinfo($this->donation->invoice_source_path, PATHINFO_EXTENSION));
        }

        return $attachments;
    }
}
