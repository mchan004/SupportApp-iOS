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

use Illuminate\Http\Request;
use App\User;

Auth::routes();
Route::get('/', function () {
    return view('welcome');
});
Route::get('/user', 'UserController@index')->name('home');
Route::post('/checkLogin', function (Request $request) {
  $user = User::where('email', $request->email)->first();
  if ($user) {
    if (Hash::check($request->password, $user->password))
    {
      echo 1;
    }
    else {
      echo 0;
    }
  }

});
