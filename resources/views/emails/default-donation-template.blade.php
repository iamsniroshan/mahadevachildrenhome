<div style="max-width:680px;margin:0 auto;padding:24px;background:#ffffff;color:#000000;font-family:Arial,Helvetica,sans-serif;">
    <div style="background:#ffffff;border:1px solid #dfeaf1;border-radius:12px;padding:28px;box-shadow:0 2px 8px rgba(15,23,42,0.05);">
        <p style="margin:0 0 12px;color:#000000;font-size:22px;font-weight:bold;">Dear {{ $donation->is_anonymous ? 'Donor' : ($donation->donor_name ?? 'Donor') }},</p>
        <p style="margin:0 0 18px;color:#000000;line-height:1.7;">
            Thank you for your generous donation to support the children and programs at {{ config('app.name') }}. We are pleased to confirm that your contribution has been received.
        </p>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin:18px 0;background:#ffffff;border:1px solid #d9d9d9;">
            <tr>
                <td style="padding:12px 14px;border-bottom:1px solid #d9d9d9;color:#000000;font-weight:bold;">Amount</td>
                <td align="right" style="padding:12px 14px;border-bottom:1px solid #d9d9d9;color:#000000;font-weight:bold;">{{ $donation->currency ?? 'LKR' }} {{ number_format((float) $donation->amount, 2, '.', ',') }}</td>
            </tr>
            <tr>
                <td style="padding:12px 14px;border-bottom:1px solid #d9d9d9;color:#000000;font-weight:bold;">Category</td>
                <td align="right" style="padding:12px 14px;border-bottom:1px solid #d9d9d9;color:#000000;">{{ ucfirst((string) ($donation->category ?? 'general')) }}</td>
            </tr>
            <tr>
                <td style="padding:12px 14px;border-bottom:1px solid #d9d9d9;color:#000000;font-weight:bold;">Donation Type</td>
                <td align="right" style="padding:12px 14px;border-bottom:1px solid #d9d9d9;color:#000000;">{{ str_replace('_', ' ', (string) ($donation->donation_type ?? 'one_time')) }}</td>
            </tr>
            <tr>
                <td style="padding:12px 14px;color:#000000;font-weight:bold;">Status</td>
                <td align="right" style="padding:12px 14px;color:#000000;font-weight:bold;">{{ ucfirst((string) ($donation->status ?? 'confirmed')) }}</td>
            </tr>
        </table>

        <p style="margin:0 0 8px;color:#000000;line-height:1.7;">Your kindness makes a meaningful difference in the lives of the children we care for.</p>
        <p style="margin:0;color:#000000;line-height:1.7;">With gratitude,<br><strong>{{ config('mail.from.name', config('app.name')) }}</strong></p>
    </div>
</div>
