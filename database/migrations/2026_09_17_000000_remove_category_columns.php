<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('donations', function (Blueprint $table) {
            $table->dropColumn('category');
        });

        Schema::table('mail_templates', function (Blueprint $table) {
            $table->dropColumn('category');
        });
    }

    public function down(): void
    {
        Schema::table('donations', function (Blueprint $table) {
            $table->string('category', 50)->nullable();
        });

        Schema::table('mail_templates', function (Blueprint $table) {
            $table->string('category')->nullable();
        });
    }
};