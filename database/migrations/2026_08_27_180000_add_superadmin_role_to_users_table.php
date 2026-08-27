<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('superadmin', 'admin', 'manager', 'user', 'viewer') DEFAULT 'user'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("UPDATE users SET role = 'admin' WHERE role = 'superadmin'");
        DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('admin', 'manager', 'user', 'viewer') DEFAULT 'user'");
    }
};
