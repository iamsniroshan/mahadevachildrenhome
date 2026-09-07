<?php

namespace App\Services;

use App\Models\Donation;
use App\Models\MailTemplate;
use Illuminate\Support\Facades\Storage;
use Mpdf\Config\ConfigVariables;
use Mpdf\Config\FontVariables;
use Mpdf\Mpdf;
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

        $letterheadPdf = new Fpdi();
        $letterheadPdf->setSourceFile($letterhead);
        $templatePage = $letterheadPdf->importPage(1);
        $pageSize = $letterheadPdf->getTemplateSize($templatePage);

        $fontConfig = (new ConfigVariables())->getDefaults();
        $fontData = (new FontVariables())->getDefaults();
        $contentPdf = new Mpdf([
            'format' => [$pageSize['width'], $pageSize['height']],
            'margin_left' => 0,
            'margin_right' => 0,
            'margin_top' => 0,
            'margin_bottom' => 0,
            'fontDir' => array_merge($fontConfig['fontDir'], ['C:/Windows/Fonts']),
            'fontdata' => $fontData['fontdata'] + [
                'arial' => [
                    'R' => 'Nirmala.ttc',
                    'B' => 'Nirmala.ttc',
                    'I' => 'Nirmala.ttc',
                    'BI' => 'Nirmala.ttc',
                    'TTCfontID' => [
                        'R' => 1,
                        'B' => 1,
                        'I' => 1,
                        'BI' => 1,
                    ],
                ],
            ],
            'default_font' => 'nirmala',
        ]);
        $contentPdf->WriteHTML($this->mailHtml($donation, $template, $pageSize));

        $contentPath = tempnam(sys_get_temp_dir(), 'donation-mail-');
        $contentPdf->Output($contentPath, 'F');

        $finalPdf = new Fpdi();
        $finalPdf->setSourceFile($letterhead);
        $letterheadPage = $finalPdf->importPage(1);
        $finalPdf->AddPage($pageSize['orientation'], [$pageSize['width'], $pageSize['height']]);
        $finalPdf->useTemplate($letterheadPage);
        $finalPdf->setSourceFile($contentPath);
        $contentPage = $finalPdf->importPage(1);
        $finalPdf->useTemplate($contentPage);
        @unlink($contentPath);

        $path = 'invoices/final-'.$this->safeFileName($donation->invoice_number).'.pdf';
        Storage::disk('public')->put($path, $finalPdf->Output('S'));

        return $path;
    }

    private function mailHtml(Donation $donation, ?MailTemplate $template, array $pageSize): string
    {
        $mailBody = $template
            ? $template->renderForDonation($donation)
            : view('emails.default-donation-template', ['donation' => $donation])->render();

        $left = $pageSize['width'] * 0.53;
        $right = $pageSize['width'] * 0.06;

        $styles = '<style>
            * { box-sizing: border-box; }
            div, table, section, article { max-width: 100% !important; width: 100% !important; }
            table { table-layout: fixed; }
            td, th, p, div { overflow-wrap: break-word; word-wrap: break-word; }
            img { max-width: 100% !important; height: auto; }
        </style>';

        return $styles.'<div style="position:absolute;left:'.$left.'mm;right:'.$right.'mm;top:'.$pageSize['height'] * 0.25.'mm;width:auto;color:#000000;font-family:nirmala, Arial, Helvetica, sans-serif;font-size:10pt;line-height:1.45;overflow-wrap:break-word;">'.$mailBody.'</div>';
    }

    private function safeFileName(?string $invoiceNumber): string
    {
        return preg_replace('/[^A-Za-z0-9_-]/', '-', $invoiceNumber ?: uniqid('invoice-', true));
    }
}
