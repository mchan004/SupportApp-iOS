<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\DB;
use App\User;
use App\Position;
use Auth;

class QuanLyThanhVienController extends Controller
{
  public function show()
  {
    $idC = Auth::user()->idCompany;
    $us = User::where('idCompany', $idC)->get();

    return view('Login.QuanLyThanhVien', ['DSThanhVien' => $us]);
  }

////////
//edit//
////////

  public function showEdit(Request $r)
  {
    $idC = Auth::user()->idCompany;
    $us = User::find($r->id)->where('idCompany', $idC)->first();
    $ps = Position::where('idCompany', $idC)->get();
    return view('Login.EditMember', ['data' => $us, 'ps' => $ps]);
  }

  public function postEdit(Request $r)
  {
    $idC = Auth::user()->idCompany;
    $u = User::where('idCompany', $idC)->where('id', $r->id)->first();
    $u->name = $r->name;
    $u->sex = $r->sex;
    $u->idPosition = $r->position;
    $u->phone = $r->phone;
    $u->save();
    return Redirect::to('user/QuanLyThanhVien')->with('msg', 'Edit successfully!');
  }

//////////
//Active//
//////////

  public function Active($id)
  {
    $us = User::where('id', $id)->where('idCompany', Auth::user()->idCompany)->first();
    $us->active = 1;
    $us->save();
    return Redirect::back()->with('msg', 'Active successfully!');
  }
  public function deActive($id)
  {
    $us = User::where('id', $id)->where('idCompany', Auth::user()->idCompany)->first();
    $us->active = 0;
    $us->save();
    return Redirect::back()->with('msg', 'Deactive successfully!');
  }
//////////
//delete//
//////////

  public function remove($id)
  {
    $us = User::where('id', $id)->where('Admin', 0)->where('idCompany', Auth::user()->idCompany)->first();
    $us->delete();
    return Redirect::back()->with('msg', 'Delete successfully!');
  }
}
