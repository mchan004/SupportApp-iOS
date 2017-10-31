@extends('Login.Layouts.app')

@section('content')

  <div class="">
    <div class="page-title">
      <div class="title_left">
        <h3>Profile</h3>
      </div>

      <div class="title_right">
        <div class="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Search for...">
            <span class="input-group-btn">
              <button class="btn btn-default" type="button">Go!</button>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="clearfix"></div>

    <div class="row">

      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="x_panel">
          <div class="x_title">
            <h2>Edit Profile</h2>
            <div class="clearfix"></div>
          </div>

          <div class="x_content">
            @if (session('msg'))
              <div class="alert alert-warning alert-dismissible" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4>{{ session('msg') }}</h4>
              </div>
            @endif


            <form action="/user/profile" method="post">
              {{ csrf_field() }}
              <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" class="form-control" name="name" id="name" placeholder="Enter name" value="{{$data->name}}">
              </div>
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="text" class="form-control" name="email" id="email" placeholder="Enter Email" value="{{$data->email}}">
              </div>
              <div class="form-group">
                <label for="phone">Phone:</label>
                <input type="text" class="form-control" name="phone" id="phone" placeholder="Enter phone" value="{{$data->phone}}">
              </div>
              <div class="form-group">
                <label for="position">Position:</label>
                <select class="form-control" id="position" name="position">
                  @foreach ($ps as $p)
                    <option value="{{$p->id}}"@if ($p->id==$data->idPosition) selected @endif>{{$p->name}}</option>
                  @endforeach
                </select>
              </div>
              <div class="form-group">
                <label for="sex">Sex</label>
                <select class="form-control" id="sex" name="sex">
                  <option value="0" @if ($data->sex==0) selected @endif>Boy</option>
                  <option value="1" @if ($data->sex==1) selected @endif>Girl</option>
                </select>
              </div>
                <button type="submit" class="btn btn-default">Submit</button>
            </form>


          </div>
        </div>
      </div>
    </div>
  </div>

@endsection
