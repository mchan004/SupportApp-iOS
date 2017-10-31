<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use App\User;
use App\Position;
use Auth;

class ProfileController extends Controller
{
  public function show()
  {
    $u = Auth::user();
    $ps = Position::where('idCompany', $u->idCompany)->get();
    return view('Login.EditProfile', ['data' => $u, 'ps' => $ps]);
  }

  public function post(Request $r)
  {
    $idC = Auth::user()->idCompany;
    $u = User::find(Auth::user()->id);
    $u->name = $r->name;
    $u->sex = $r->sex;
    $u->idPosition = $r->position;
    $u->phone = $r->phone;
    $u->save();
    return Redirect::back()->with('msg', 'Edit successfully!');
  }
}
