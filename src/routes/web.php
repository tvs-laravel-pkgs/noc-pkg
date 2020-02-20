<?php

Route::group(['namespace' => 'Abs\NocPkg', 'middleware' => ['web', 'auth'], 'prefix' => 'noc-pkg'], function () {
	//FAQs
	Route::get('/nocs/get-list', 'NocController@getNocList')->name('getNocList');
	Route::get('/noc/get-form-data', 'NocController@getNocFormData')->name('getNocFormData');
	Route::get('/noc/view/{noc_id}', 'NocController@getNocViewData')->name('getNocViewData');
	Route::get('/noc/sendotp/{noc_id}', 'NocController@sendOTP')->name('sendOTP');
	Route::post('/noc/save', 'NocController@saveNoc')->name('saveNoc');
	Route::get('/noc/delete', 'NocController@deleteNoc')->name('deleteNoc');
});

Route::group(['namespace' => 'Abs\NocPkg', 'middleware' => ['web'], 'prefix' => 'noc-pkg'], function () {
	//FAQs
	Route::get('/nocs/get', 'NocController@getNocs')->name('getNocs');
});
