<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Donation Confirmation</title>
</head>
<body style="margin:0;padding:0;background:#ffffff;color:#000000;font-family:Arial,Helvetica,sans-serif;">
    @php
        $mailBody = $mailBody ?? view('emails.default-donation-template', ['donation' => $donation])->render();
    @endphp

    {!! $mailBody !!}
</body>
</html>
