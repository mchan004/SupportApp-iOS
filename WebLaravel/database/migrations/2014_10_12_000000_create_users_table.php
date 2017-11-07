<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('idPosion')->unsigned()->default(0);
            $table->integer('idCompany')->unsigned()->default(0);
            $table->string('name', 35);
            $table->boolean('sex')->default(0);
            $table->string('email', 50)->unique();
            $table->string('password');
            $table->string('phone', 20)->nullable();
            $table->boolean('Admin')->default(0);
            $table->boolean('active')->default(0);
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
