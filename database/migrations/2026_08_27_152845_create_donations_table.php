<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('donations', function (Blueprint $table) {
            $table->id();
            $table->string('donor_name', 200);
            $table->string('email');
            $table->string('phone', 20)->nullable();
            $table->text('address')->nullable();
            $table->enum('donation_type', ['one_time', 'monthly', 'yearly'])->default('one_time');
            $table->decimal('amount', 10, 2);
            $table->string('currency', 3)->default('USD');
            $table->enum('category', ['general', 'education', 'healthcare', 'shelter', 'food', 'emergency'])->default('general');
            $table->text('message')->nullable();
            $table->boolean('is_anonymous')->default(false);
            $table->enum('payment_method', ['bank_transfer', 'credit_card', 'paypal', 'cash', 'check', 'other'])->nullable();
            $table->string('payment_reference')->nullable();
            $table->string('document_path', 500)->nullable();
            $table->enum('status', ['pending', 'confirmed', 'processing', 'completed', 'cancelled'])->default('pending');
            $table->text('admin_notes')->nullable();
            $table->timestamps();

            $table->index('email');
            $table->index('status');
            $table->index('donation_type');
            $table->index('category');
            $table->index('amount');
            $table->index('donor_name');
            $table->index(['status', 'created_at']);
            $table->index(['category', 'amount']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donations');
    }
};
