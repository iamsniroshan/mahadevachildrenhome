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
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->string('title', 500);
            $table->text('content');
            $table->text('excerpt')->nullable();
            $table->string('image')->nullable();
            $table->text('images')->nullable()->comment('JSON array of additional image paths');
            $table->string('author')->nullable();
            $table->string('category', 100)->default('general');
            $table->text('tags')->nullable();
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
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
