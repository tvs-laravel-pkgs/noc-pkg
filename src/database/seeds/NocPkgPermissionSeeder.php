<?php
namespace Abs\NocPkg\Database\Seeds;

use App\Permission;
use Illuminate\Database\Seeder;

class NocPkgPermissionSeeder extends Seeder {
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run() {
		$permissions = [
			//NOCs
			[
				'display_order' => 99,
				'parent' => null,
				'name' => 'nocs',
				'display_name' => 'NOCs',
			],
			[
				'display_order' => 1,
				'parent' => 'nocs',
				'name' => 'add-noc',
				'display_name' => 'Add',
			],
			[
				'display_order' => 2,
				'parent' => 'nocs',
				'name' => 'edit-noc',
				'display_name' => 'Edit',
			],
			[
				'display_order' => 3,
				'parent' => 'nocs',
				'name' => 'delete-noc',
				'display_name' => 'Delete',
			],

			//NOC Types
			[
				'display_order' => 99,
				'parent' => null,
				'name' => 'noc-types',
				'display_name' => 'NOC Types',
			],
			[
				'display_order' => 1,
				'parent' => 'noc-types',
				'name' => 'add-noc-type',
				'display_name' => 'Add',
			],
			[
				'display_order' => 2,
				'parent' => 'noc-types',
				'name' => 'edit-noc-type',
				'display_name' => 'Edit',
			],
			[
				'display_order' => 3,
				'parent' => 'noc-types',
				'name' => 'delete-noc-type',
				'display_name' => 'Delete',
			],

		];
		Permission::createFromArrays($permissions);
	}
}