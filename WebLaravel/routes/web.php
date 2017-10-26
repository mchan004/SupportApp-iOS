<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();
Route::get('/', function () {
    return view('welcome');
});
// Route::get('/user', 'UserController@index')->name('home');

Route::group(['middleware' => 'auth'], function () {
  Route::get('/user', 'QuanlyController@home');

  Route::group(['middleware' => 'admin'], function () {
    Route::get('publish/{id}', 'QuanlyMonanController@publish');
    Route::get('unpublish/{id}', 'QuanlyMonanController@unpublish');
    Route::get('xoa/{id}', 'QuanlyMonanController@XoaMonan');
  });
});
