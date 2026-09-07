<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mail_templates', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type')->default('donation_confirmation');
            $table->string('subject');
            $table->longText('body');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        DB::table('mail_templates')->insert([
            [
                'name' => 'Default Donation Confirmation',
                'type' => 'donation_confirmation',
                'subject' => 'Donation Confirmation',
                'body' => '<div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;background:#f5f9fc;padding:24px;">
                    <div style="background:#ffffff;border:1px solid #dfeaf1;border-radius:12px;padding:28px;">
                        <p style="margin:0 0 12px;color:#0f172a;font-size:22px;font-weight:bold;">Dear {{ donor_name }},</p>
                        <p style="margin:0 0 18px;color:#334155;line-height:1.7;">Thank you for your generous donation to support the children and programs at {{ app_name }}. We are pleased to confirm that your contribution has been received.</p>
                        <table style="width:100%;border-collapse:collapse;margin:18px 0;background:#f8fbfd;border:1px solid #d9eaf5;">
                            <tr><td style="padding:12px 14px;border-bottom:1px solid #d9eaf5;color:#475569;font-weight:bold;">Amount</td><td style="padding:12px 14px;border-bottom:1px solid #d9eaf5;text-align:right;color:#0f172a;font-weight:bold;">{{ currency }} {{ amount }}</td></tr>
                            <tr><td style="padding:12px 14px;border-bottom:1px solid #d9eaf5;color:#475569;font-weight:bold;">Category</td><td style="padding:12px 14px;border-bottom:1px solid #d9eaf5;text-align:right;color:#0f172a;">{{ category }}</td></tr>
                            <tr><td style="padding:12px 14px;border-bottom:1px solid #d9eaf5;color:#475569;font-weight:bold;">Donation Type</td><td style="padding:12px 14px;border-bottom:1px solid #d9eaf5;text-align:right;color:#0f172a;">{{ donation_type }}</td></tr>
                            <tr><td style="padding:12px 14px;color:#475569;font-weight:bold;">Status</td><td style="padding:12px 14px;text-align:right;color:#0f766e;font-weight:bold;">{{ status }}</td></tr>
                        </table>
                        <p style="margin:0 0 8px;color:#334155;line-height:1.7;">Your kindness makes a meaningful difference in the lives of the children we care for.</p>
                        <p style="margin:0;color:#334155;line-height:1.7;">With gratitude,<br><strong>{{ app_name }}</strong></p>
                    </div>
                </div>',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('mail_templates');
    }
};
