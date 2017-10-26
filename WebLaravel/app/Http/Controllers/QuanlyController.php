<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class QuanlyController extends Controller
{
  public function home()
  {
    return view('Login.home');
  }

  public function quanLyThanhVien()
  {
    
  }
}
