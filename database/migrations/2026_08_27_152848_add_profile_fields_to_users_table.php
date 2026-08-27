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
        Schema::table('users', function (Blueprint $table) {
            $table->string('profile_pic')->nullable()->after('id');
            $table->string('first_name', 100)->nullable()->after('profile_pic');
            $table->string('last_name', 100)->nullable()->after('first_name');
            $table->string('title', 150)->nullable()->after('password');
            $table->string('department', 100)->nullable()->after('title');
            $table->enum('status', ['active', 'inactive', 'pending'])->default('active')->after('department');
            $table->enum('role', ['admin', 'manager', 'user', 'viewer'])->default('user')->after('status');
            $table->date('join_date')->nullable()->after('role');
            $table->dateTime('last_active')->nullable()->after('join_date');
            $table->boolean('is_online')->default(false)->after('last_active');

            $table->index('status');
            $table->index('role');
            $table->index('department');
            $table->index(['first_name', 'last_name']);
            $table->index('join_date');
            $table->index('last_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['status']);
            $table->dropIndex(['role']);
            $table->dropIndex(['department']);
            $table->dropIndex(['first_name', 'last_name']);
            $table->dropIndex(['join_date']);
            $table->dropIndex(['last_active']);

            $table->dropColumn([
                'profile_pic',
                'first_name',
                'last_name',
                'title',
                'department',
                'status',
                'role',
                'join_date',
                'last_active',
                'is_online',
            ]);
        });
    }
};
