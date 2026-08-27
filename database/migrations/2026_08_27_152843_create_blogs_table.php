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
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('content');
            $table->text('excerpt')->nullable();
            $table->string('image', 500)->nullable();
            $table->json('images')->nullable()->comment('JSON array of additional image URLs');
            $table->string('author', 100)->nullable();
            $table->string('category', 50)->default('general');
            $table->json('tags')->nullable()->comment('JSON array of tags');
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->boolean('featured')->default(false);
            $table->dateTime('publish_date')->nullable();
            $table->timestamps();

            $table->index('status');
            $table->index('category');
            $table->index('featured');
            $table->index('publish_date');
            $table->index('title');
            $table->index(['status', 'publish_date']);
            $table->index(['category', 'featured']);
            $table->index('author');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
