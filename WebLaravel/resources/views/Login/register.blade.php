<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Register CookingA-Z! | </title>

    <!-- Bootstrap -->
    <link href="{{ URL::asset('Admin/vendors/bootstrap/dist/css/bootstrap.min.css') }}" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="{{ URL::asset('Admin/vendors/font-awesome/css/font-awesome.min.css') }}" rel="stylesheet">
    <!-- NProgress -->
    <link href="{{ URL::asset('Admin/vendors/nprogress/nprogress.css') }}" rel="stylesheet">
    <!-- Animate.css -->
    <link href="{{ URL::asset('Admin/vendors/animate.css/animate.min.css') }}" rel="stylesheet">

    <!-- Custom Theme Style -->
    <link href="{{ URL::asset('Admin/build/css/custom.min.css') }}" rel="stylesheet">
    <script>
        window.Laravel = {!! json_encode([
            'csrfToken' => csrf_token(),
        ]) !!};
    </script>
  </head>

  <body class="login">
    <div>
      <a class="hiddenanchor" id="signup"></a>
      <a class="hiddenanchor" id="signin"></a>

      <div class="login_wrapper">
        <div class="animate form login_form">
          <section class="login_content">
            <form role="form" method="POST" action="{{ route('register') }}">
              {{ csrf_field() }}
              <h1>Register Your Website</h1>

              <input type="hidden" name="new" value="new">
              <div class="{{ $errors->has('website') ? ' has-error' : '' }} input-group">
                <div class="input-group-addon">http://</div>
                <input id="website" type="text" class="form-control" name="website" placeholder="Your website" value="{{ old('website') }}" style="margin-bottom: 0px;" required>
                @if ($errors->has('website'))
                    <span class="help-block">
                        <strong>{{ $errors->first('website') }}</strong>
                    </span>
                @endif
              </div>

              <div class="{{ $errors->has('webname') ? ' has-error' : '' }}">
                <input id="webname" type="text" class="form-control" name="webname" placeholder="Website name" value="{{ old('webname') }}" required>
                @if ($errors->has('webname'))
                    <span class="help-block">
                        <strong>{{ $errors->first('webname') }}</strong>
                    </span>
                @endif
              </div>


              <div class="{{ $errors->has('name') ? ' has-error' : '' }}">
                <input id="name" type="text" class="form-control" name="name" placeholder="Your name" value="{{ old('name') }}" required>
                @if ($errors->has('name'))
                    <span class="help-block">
                        <strong>{{ $errors->first('name') }}</strong>
                    </span>
                @endif
              </div>


              <div class="{{ $errors->has('email') ? ' has-error' : '' }}">
                <input id="email" type="email" class="form-control" name="email" placeholder="Email" value="{{ old('email') }}" required>
                @if ($errors->has('email'))
                    <span class="help-block">
                        <strong>{{ $errors->first('email') }}</strong>
                    </span>
                @endif
              </div>

              <div class="{{ $errors->has('password') ? ' has-error' : '' }}">
                <input id="password" type="password" class="form-control" placeholder="Password" name="password" required>
                @if ($errors->has('password'))
                    <span class="help-block">
                        <strong>{{ $errors->first('password') }}</strong>
                    </span>
                @endif
              </div>
              <div>

              </div>
              <div>
                <input type="submit" value="Đăng ký">

              </div>

              <div class="clearfix"></div>

              <div class="separator">
                <p class="change_link">Are you Supporter?
                  <a href="#signup" class="to_register"> <u>Register Supporter</u> </a>
                </p>

                <div class="clearfix"></div>
                <br />

                <div>
                  <h1><i class="fa fa-paw"></i> Support App!</h1>
                  <p>©2016 All Rights Reserved. Gentelella Alela! is a Bootstrap 3 template. Privacy and Terms</p>
                </div>
              </div>
            </form>
          </section>
        </div>

        <div id="register" class="animate form registration_form">
          <section class="login_content">
            <form role="form" method="POST" action="{{ route('register') }}">
              {{ csrf_field() }}
              <h1>Register Supporter</h1>

              <div class="{{ $errors->has('website') ? ' has-error' : '' }} input-group">
                <div class="input-group-addon">http://</div>
                <input id="website" type="text" class="form-control" name="website" placeholder="Your website" value="{{ old('website') }}" style="margin-bottom: 0px;" required>
                @if ($errors->has('website'))
                    <span class="help-block">
                        <strong>{{ $errors->first('website') }}</strong>
                    </span>
                @endif
              </div>


              <div>
                <input id="name" type="text" class="form-control" name="name" placeholder="Your name" value="{{ old('name') }}" required>

                @if ($errors->has('name'))
                    <span class="help-block">
                        <strong>{{ $errors->first('name') }}</strong>
                    </span>
                @endif
              </div>
              <div>
                <input id="email" type="email" class="form-control" name="email" placeholder="Email" value="{{ old('email') }}" required>

                @if ($errors->has('email'))
                    <span class="help-block">
                        <strong>{{ $errors->first('email') }}</strong>
                    </span>
                @endif
              </div>
              <div>
                <input id="password" type="password" class="form-control" placeholder="Password" name="password" required>

                @if ($errors->has('password'))
                    <span class="help-block">
                        <strong>{{ $errors->first('password') }}</strong>
                    </span>
                @endif
              </div>
              <div>
                <input type="submit" value="Register">
              </div>

              <div class="clearfix"></div>

              <div class="separator">
                <p class="change_link">Need register a new Website?
                  <a href="#signin" class="to_register"> <u>Register</u> </a>
                </p>

                <div class="clearfix"></div>
                <br />

                <div>
                  <h1><i class="fa fa-paw"></i> Support App!</h1>
                  <p>©2016 All Rights Reserved. Gentelella Alela! is a Bootstrap 3 template. Privacy and Terms</p>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  </body>
</html>
