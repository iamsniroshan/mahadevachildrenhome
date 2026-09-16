<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('donations', function (Blueprint $table) {
            $table->date('contribution_date')->nullable()->after('donation_type');
            $table->string('reason')->nullable()->after('message');
            $table->string('meal_option')->nullable()->after('reason');
        });
    }

    public function down(): void
    {
        Schema::table('donations', function (Blueprint $table) {
            $table->dropColumn(['contribution_date', 'reason', 'meal_option']);
        });
    }
};