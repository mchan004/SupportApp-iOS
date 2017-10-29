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
  Route::group(['prefix' => 'user'], function () {
    Route::group(['middleware' => 'admin'], function () {
      Route::group(['prefix' => 'QuanLyThanhVien'], function () {
        Route::get('/', 'QuanLyThanhVienController@show');
        Route::get('/deActive/{id}', 'QuanLyThanhVienController@deActive');
        Route::get('/Active/{id}', 'QuanLyThanhVienController@Active');
        Route::get('/remove/{id}', 'QuanLyThanhVienController@remove');
      });

      Route::group(['prefix' => 'QuanLyChucVu'], function () {
        Route::get('/', 'QuanLyChucVuController@show');
        Route::get('add', 'QuanLyChucVuController@showAdd');
        Route::post('add', 'QuanLyChucVuController@postAdd');
        Route::get('edit/{id}', 'QuanLyChucVuController@showEdit');
        Route::post('edit', 'QuanLyChucVuController@postEdit');
        Route::get('delete/{id}', 'QuanLyChucVuController@delete');
      });
    });
  });
});
