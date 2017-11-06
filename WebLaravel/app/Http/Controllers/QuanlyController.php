<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class QuanlyController extends Controller
{
  public function home()
  {
    $idCompany = Auth::user()->idCompany;
    return view('Login.home', ['idCompany' => $idCompany]);
  }

  public function quanLyThanhVien()
  {

  }
}
