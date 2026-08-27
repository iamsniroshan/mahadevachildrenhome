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
        Schema::create('fundrise', function (Blueprint $table) {
            $table->id();
            $table->string('title', 500);
            $table->text('content');
            $table->text('excerpt')->nullable();
            $table->string('image')->nullable();
            $table->decimal('goal_amount', 12, 2)->nullable();
            $table->decimal('current_amount', 12, 2)->default(0);
            $table->string('currency', 3)->default('USD');
            $table->string('category', 100)->default('general');
            $table->text('tags')->nullable();
            $table->enum('status', ['draft', 'active', 'paused', 'completed', 'archived'])->default('draft');
            $table->boolean('featured')->default(false);
            $table->dateTime('start_date')->nullable();
            $table->dateTime('end_date')->nullable();
            $table->timestamps();

            $table->index('status');
            $table->index('category');
            $table->index('featured');
            $table->index('start_date');
            $table->index('end_date');
            $table->index('title');
            $table->index(['status', 'start_date']);
            $table->index(['category', 'featured']);
            $table->index(['goal_amount', 'current_amount']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fundrise');
    }
};
