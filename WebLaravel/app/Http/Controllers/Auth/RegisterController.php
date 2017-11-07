<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Company;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {

        if (isset($data["new"])) {
          return Validator::make($data, [
              'website' => 'required|string|max:60',
              'webname' => 'required|string|max:60',
              'name' => 'required|string|max:60',
              'email' => 'required|string|email|max:80|unique:users',
              'password' => 'required|string|max:60|min:6',
          ]);
        } else {
          return Validator::make($data, [
              'website' => 'required|string|max:60|exists:company,website',
              'name' => 'required|string|max:60',
              'email' => 'required|string|email|max:80|unique:users',
              'password' => 'required|string|max:60|min:6',
          ]);
        }

    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
      if (isset($data["new"])) {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
        $cp = new Company;
        $cp->userID = $user->id;
        $cp->name = $data['webname'];
        $cp->website = $data['website'];
        $cp->save();
        $user->idCompany = $cp->id + $user->id;
        $user->Admin = 1;
        $user->save();
        return $user;
      } else {
        $cp = Company::where('website', $data["website"])->firstOrFail();
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'idCompany' => $cp->userID + $cp->id,
            'password' => bcrypt($data['password']),
        ]);
        return $user;
      }
    }

    public function showRegistrationForm()
    {
        return view('Login.Register');
    }
}
