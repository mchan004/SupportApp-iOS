<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGroupMessage extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('groupMessage', function (Blueprint $table) {
          $table->increments('id');
          $table->integer('idUser')->unsigned();
          $table->string('idCustomer');
          $table->string('viewing')->nullable();
          $table->timestamps();

          // $table->foreign('idCustomer')->references('id')->on('users');
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('groupMessage');
    }
}
