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
			[
				'display_order' => 4,
				'parent' => 'nocs',
				'name' => 'view-all-noc',
				'display_name' => 'View All',
			],
			[
				'display_order' => 5,
				'parent' => 'nocs',
				'name' => 'view-mapped-state-noc',
				'display_name' => 'Only State Mapped',
			],
			[
				'display_order' => 6,
				'parent' => 'nocs',
				'name' => 'view-own-noc',
				'display_name' => 'View Only Own',
			],
			[
				'display_order' => 7,
				'parent' => 'nocs',
				'name' => 'rm-based-noc',
				'display_name' => 'RM Based',
			],
			[
				'display_order' => 8,
				'parent' => 'nocs',
				'name' => 'zm-based-noc',
				'display_name' => 'ZM Based',
			],
			[
				'display_order' => 9,
				'parent' => 'nocs',
				'name' => 'nm-based-noc',
				'display_name' => 'NM Based',
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