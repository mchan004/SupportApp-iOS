@extends('Login.Layouts.app')

@section('content')

  <div class="">
    <div class="page-title">
      <div class="title_left">
        <h3>Manager members</h3>
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
            <h2>List members</h2>
            <div class="clearfix"></div>
          </div>

          <div class="x_content">
            @if (session('msg'))
              <div class="alert alert-warning alert-dismissible" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4>{{ session('msg') }}</h4>
              </div>
            @endif

            <div class="table-responsive">
              <table class="table table-striped jambo_table bulk_action">
                <thead>
                  <tr class="headings">
                    <th>
                      <input type="checkbox" id="check-all" class="flat">
                    </th>
                    <th class="column-title">Staff name</th>
                    <th class="column-title">Posion</th>
                    <th class="column-title">Email</th>
                    <th class="column-title">Active</th>
                    <th class="column-title no-link last"><span class="nobr">Action</span>
                    </th>

                    <th class="bulk-actions" colspan="7">
                      <a class="antoo" style="color:#fff; font-weight:500;">Bulk Actions ( <span class="action-cnt"> </span> ) <i class="fa fa-chevron-down"></i></a>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  @foreach ($DSThanhVien as $v)
                  <tr class="even pointer">
                    <td class="a-center ">
                      <input type="checkbox" class="flat" name="table_records">
                    </td>
                    <td><a href="/user/QuanLyThanhVien/suaThanhVien/{{$v->id}}">{{$v->name}}</a></td>
                    <td>{{ isset($v->position->name) ? $v->position->name : '' }}</td>
                    <td>{{$v->email}}</td>
                    <td>
                      @if ($v->active == 1)
                        <a href="/user/QuanLyThanhVien/deActive/{{$v->id}}" class="btn btn-success">o</a>
                      @else
                        <a href="/user/QuanLyThanhVien/Active/{{$v->id}}" class="btn btn-danger">x</a>
                      @endif
                    </td>
                    <td class=" last">
                      <a href="/user/QuanLyThanhVien/remove/{{$v->id}}" class="btn btn-danger">Delete</a>
                    </td>
                  </tr>
                  @endforeach

                </tbody>
              </table>
            </div>


          </div>
        </div>
      </div>
    </div>
  </div>

@endsection
