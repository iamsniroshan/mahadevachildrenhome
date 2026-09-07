<?php

namespace App\Services;

use App\Models\Donation;
use App\Models\MailTemplate;
use Illuminate\Support\Facades\Storage;
use RuntimeException;
use setasign\Fpdi\Fpdi;

class DonationInvoicePdf
{
    public function generate(Donation $donation, ?MailTemplate $template): string
    {
        $letterhead = base_path('letter-head.pdf');

        if (! is_file($letterhead)) {
            throw new RuntimeException('Letterhead PDF was not found.');
        }

        $pdf = new Fpdi();
        $pdf->setSourceFile($letterhead);
        $templatePage = $pdf->importPage(1);
        $pageSize = $pdf->getTemplateSize($templatePage);

        $pdf->AddPage($pageSize['orientation'], [$pageSize['width'], $pageSize['height']]);
        $pdf->useTemplate($templatePage);
        $pdf->SetTextColor(0, 0, 0);
        $pdf->SetLeftMargin($pageSize['width'] * 0.53);
        $pdf->SetRightMargin($pageSize['width'] * 0.06);
        $pdf->SetXY($pageSize['width'] * 0.53, $pageSize['height'] * 0.25);
        $pdf->SetFont('Arial', 'B', 15);
        $pdf->Cell(0, 8, $this->text('Donation Confirmation'), 0, 1);
        $pdf->Ln(4);
        $pdf->SetFont('Arial', '', 10);
        $pdf->MultiCell(0, 5, $this->text($this->details($donation, $template)), 0, 'L');

        $path = 'invoices/final-'.$this->safeFileName($donation->invoice_number).'.pdf';
        Storage::disk('public')->put($path, $pdf->Output('S'));

        return $path;
    }

    private function details(Donation $donation, ?MailTemplate $template): string
    {
        $mailText = $template
            ? $template->renderForDonation($donation)
            : view('emails.default-donation-template', ['donation' => $donation])->render();
        $mailText = trim(html_entity_decode(strip_tags((string) $mailText)));

        return implode("\n", array_filter([
            'Invoice Number: '.$donation->invoice_number,
            'Date: '.($donation->created_at?->format('d M Y') ?? now()->format('d M Y')),
            'Donor: '.($donation->is_anonymous ? 'Anonymous Donor' : ($donation->donor_name ?? 'Donor')),
            'Email: '.($donation->email ?? ''),
            'Amount: '.($donation->currency ?? 'LKR').' '.number_format((float) $donation->amount, 2, '.', ','),
            '',
            $mailText,
        ]));
    }

    private function text(string $value): string
    {
        return iconv('UTF-8', 'windows-1252//TRANSLIT//IGNORE', $value) ?: $value;
    }

    private function safeFileName(?string $invoiceNumber): string
    {
        return preg_replace('/[^A-Za-z0-9_-]/', '-', $invoiceNumber ?: uniqid('invoice-', true));
    }
}
