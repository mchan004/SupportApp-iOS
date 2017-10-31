@extends('Login.Layouts.app')

@section('content')

  <div class="">
    <div class="page-title">
      <div class="title_left">
        <h3>Change password</h3>
      </div>

    </div>

    <div class="clearfix"></div>

    <div class="row">

      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="x_panel">
          <div class="x_title">

            <div class="clearfix"></div>
          </div>

          <div class="x_content">

            @if (Session::has('success'))
              <div class="alert alert-success">{!! Session::get('success') !!}</div>
            @endif
            @if (Session::has('failure'))
              <div class="alert alert-danger">{!! Session::get('failure') !!}</div>
            @endif
            <form action="{{ route('password.update') }}" method="post" role="form" class="form-horizontal">
              {{csrf_field()}}

              <div class="form-group{{ $errors->has('old') ? ' has-error' : '' }}">
                <label for="password" class="col-md-4 control-label">Old Password</label>

                <div class="col-md-6">
                  <input id="password" type="password" class="form-control" name="old">

                  @if ($errors->has('old'))
                    <span class="help-block">
                      <strong>{{ $errors->first('old') }}</strong>
                    </span>
                  @endif
                </div>
              </div>

              <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                <label for="password" class="col-md-4 control-label">Password</label>

                <div class="col-md-6">
                  <input id="password" type="password" class="form-control" name="password">

                  @if ($errors->has('password'))
                    <span class="help-block">
                    <strong>{{ $errors->first('password') }}</strong>
                  </span>
                  @endif
                </div>
              </div>

              <div class="form-group{{ $errors->has('password_confirmation') ? ' has-error' : '' }}">
                <label for="password-confirm" class="col-md-4 control-label">Confirm Password</label>

                <div class="col-md-6">
                  <input id="password-confirm" type="password" class="form-control" name="password_confirmation">

                  @if ($errors->has('password_confirmation'))
                      <span class="help-block">
                      <strong>{{ $errors->first('password_confirmation') }}</strong>
                  </span>
                  @endif
                </div>
              </div>

              <div class="form-group">
                <div class="col-md-6 col-md-offset-4">
                  <button type="submit" class="btn btn-primary form-control">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

@endsection
