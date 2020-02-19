<?php
Route::group(['namespace' => 'Abs\NocPkg\Api', 'middleware' => ['api']], function () {
	Route::group(['prefix' => 'noc-pkg/api'], function () {
		Route::group(['middleware' => ['auth:api']], function () {
			// Route::get('taxes/get', 'TaxController@getTaxes');
		});
	});
});