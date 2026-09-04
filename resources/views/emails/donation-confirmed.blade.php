<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Donation Confirmed</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:24px 0;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
                    <tr>
                        <td style="background:#3b0a24;padding:28px 32px;">
                            <h1 style="margin:0;color:#fbbf24;font-size:22px;">{{ config('mail.from.name') }}</h1>
                            <p style="margin:4px 0 0;color:#fbcfe8;font-size:13px;">Donation Confirmation</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:32px;">
                            <p style="margin:0 0 16px;color:#1f2937;font-size:16px;">Dear {{ $donation->is_anonymous ? 'Donor' : $donation->donor_name }},</p>
                            <p style="margin:0 0 24px;color:#374151;font-size:14px;line-height:1.6;">
                                Thank you for your generous contribution. We are pleased to confirm that your donation has been received and confirmed.
                            </p>

                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-bottom:24px;">
                                <tr style="background:#f9fafb;">
                                    <td style="padding:12px 16px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Amount</td>
                                    <td align="right" style="padding:12px 16px;color:#111827;font-size:16px;font-weight:bold;">{{ $donation->currency }} {{ number_format((float) $donation->amount, 2) }}</td>
                                </tr>
                                <tr>
                                    <td style="padding:12px 16px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;border-top:1px solid #e5e7eb;">Category</td>
                                    <td align="right" style="padding:12px 16px;color:#1f2937;font-size:14px;border-top:1px solid #e5e7eb;text-transform:capitalize;">{{ $donation->category }}</td>
                                </tr>
                                <tr>
                                    <td style="padding:12px 16px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;border-top:1px solid #e5e7eb;">Donation Type</td>
                                    <td align="right" style="padding:12px 16px;color:#1f2937;font-size:14px;border-top:1px solid #e5e7eb;text-transform:capitalize;">{{ str_replace('_', ' ', $donation->donation_type) }}</td>
                                </tr>
                                @if($donation->payment_reference)
                                <tr>
                                    <td style="padding:12px 16px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;border-top:1px solid #e5e7eb;">Reference</td>
                                    <td align="right" style="padding:12px 16px;color:#1f2937;font-size:14px;border-top:1px solid #e5e7eb;">{{ $donation->payment_reference }}</td>
                                </tr>
                                @endif
                                <tr>
                                    <td style="padding:12px 16px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;border-top:1px solid #e5e7eb;">Status</td>
                                    <td align="right" style="padding:12px 16px;color:#0f766e;font-size:14px;font-weight:bold;border-top:1px solid #e5e7eb;text-transform:capitalize;">{{ $donation->status }}</td>
                                </tr>
                            </table>

                            <p style="margin:0 0 24px;color:#374151;font-size:14px;line-height:1.6;">
                                Your support makes a real difference in the lives of the children we care for. If you have any questions about your donation, simply reply to this email.
                            </p>

                            <p style="margin:0;color:#1f2937;font-size:14px;">With gratitude,<br><strong>{{ config('mail.from.name') }}</strong></p>
                        </td>
                    </tr>
                    <tr>
                        <td style="background:#f9fafb;padding:20px 32px;border-top:1px solid #e5e7eb;">
                            <p style="margin:0;color:#9ca3af;font-size:12px;text-align:center;">This is an automated confirmation from {{ config('app.name') }}.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
