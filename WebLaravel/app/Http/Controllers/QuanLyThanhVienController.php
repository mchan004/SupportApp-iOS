<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;
use App\User;
use Auth;

class QuanLyThanhVienController extends Controller
{
  public function show()
  {
    $idC = Auth::user()->idCompany;
    $us = User::where('idCompany', $idC)->get();
    // $us = User::find(4);
    // $us = DB::table('users')
    //             ->join('positions', 'users.idPosition', '=', 'position.id')->where('users.idCompany', $idC)
    //             ->select('users.*')
    //             ->get();
    // exit($us->position);
    return view('Login.QuanLyThanhVien', ['DSThanhVien' => $us]);
  }







  public function Active($id)
  {
    $us = User::find($id)->where('idCompany', Auth::user()->idCompany)->first();
    $us->active = 1;
    $us->save();
    return Redirect::back()->with('msg', 'Active successfully!');
  }
  public function deActive($id)
  {
    $us = User::find($id)->where('idCompany', Auth::user()->idCompany)->first();
    $us->active = 0;
    $us->save();
    return Redirect::back()->with('msg', 'Deactive successfully!');
  }
  public function remove($id)
  {
    $us = User::find($id)->where('Admin', 0)->where('idCompany', Auth::user()->idCompany)->first();
    $us->delete();
    return Redirect::back()->with('msg', 'Delete successfully!');
  }
}
