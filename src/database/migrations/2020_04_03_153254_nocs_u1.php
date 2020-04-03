<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class NocsU1 extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up() {
		Schema::table('nocs', function (Blueprint $table) {
			$table->unsignedInteger('for_type_id')->nullable()->after('for_id');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down() {
		Schema::table('nocs', function (Blueprint $table) {
			$table->dropColumn('for_type_id');
		});
	}
}
