<?php

Route::group(['namespace' => 'Abs\NocPkg', 'middleware' => ['web', 'auth'], 'prefix' => 'noc-pkg'], function () {
	//FAQs
	Route::get('/nocs/get-list', 'NocController@getNocList')->name('getNocList');
	Route::get('/noc/get-form-data', 'NocController@getNocFormData')->name('getNocFormData');
	Route::post('/noc/save', 'NocController@saveNoc')->name('saveNoc');
	Route::get('/noc/delete', 'NocController@deleteNoc')->name('deleteNoc');
});

Route::group(['namespace' => 'Abs\NocPkg', 'middleware' => ['web'], 'prefix' => 'noc-pkg'], function () {
	//FAQs
	Route::get('/nocs/get', 'NocController@getNocs')->name('getNocs');
});
