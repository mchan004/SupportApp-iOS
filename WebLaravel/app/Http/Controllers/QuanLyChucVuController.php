<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use App\Position;
use Auth;

class QuanLyChucVuController extends Controller
{

    public function show()
    {
      $idC = Auth::user()->idCompany;
      $us = position::where('idCompany', $idC)->get();

      return view('Login.QuanLyChucVu', ['ListPositions' => $us]);
    }




    public function showEdit(Request $r)
    {
      $idC = Auth::user()->idCompany;
      $us = Position::find($r->id)->where('idCompany', $idC)->first();
      return view('Login.EditChucVu', ['data' => $us]);
    }

    public function postEdit(Request $r)
    {
      $idC = Auth::user()->idCompany;
      $P = Position::where('idCompany', $idC)->where('id', $r->id)->first();
      $P->name = $r->name;
      $P->save();
      return Redirect::to('user/QuanLyChucVu')->with('msg', 'Edit successfully!');
    }





    public function showAdd()
    {
      return view('Login.AddChucVu');
    }

    public function postAdd(Request $r)
    {
      $P = new Position;
      $P->name = $r->name;
      $P->idCompany = Auth::user()->idCompany;
      $P->save();
      return Redirect::to('user/QuanLyChucVu')->with('msg', 'Add successfully!');
    }

    public function delete($id)
    {
      $idC = Auth::user()->idCompany;
      $us = Position::find($id)->where('idCompany', $idC)->first();
      $us->delete();
      return Redirect::back()->with('msg', 'Delete successfully!');
    }

}
