@extends('Login.Layouts.app')

@section('content')

  <div class="">
    <div class="page-title">
      <div class="title_left">
        <h3>Quản lý món ăn</h3>
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
            <h2>Danh sách các món ăn</h2>
            <div class="clearfix"></div>
          </div>

          <div class="x_content">
            @if (session('msg'))
              <div class="alert alert-warning alert-dismissible" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4>{{ session('msg') }}</h4>
              </div>
            @endif

            <p>Các món ăn của bạn.</p>
            <p><a href="/user/QuanLyMonan/ThemMonan" class="btn btn-success">Thêm món mới</a></p>
            <div class="table-responsive">
              <table class="table table-striped jambo_table bulk_action">
                <thead>
                  <tr class="headings">
                    <th>
                      <input type="checkbox" id="check-all" class="flat">
                    </th>
                    <th class="column-title">Tên món ăn </th>
                    <th class="column-title">Ngày tạo </th>
                    <th class="column-title">Publish</th>
                    <th class="column-title no-link last"><span class="nobr">Action</span>
                    </th>

                    <th class="bulk-actions" colspan="7">
                      <a class="antoo" style="color:#fff; font-weight:500;">Bulk Actions ( <span class="action-cnt"> </span> ) <i class="fa fa-chevron-down"></i></a>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  @foreach ($DSMonan as $v)
                  <tr class="even pointer">
                    <td class="a-center ">
                      <input type="checkbox" class="flat" name="table_records">
                    </td>
                    <td class=" "><a href="/user/QuanLyMonan/suaMonan/{{$v->id}}">{{$v->tenMonan}}</a></td>
                    <td class=" ">May 23, 2014 11:47:56 PM </td>
                    <td class=" ">
                      @if ($v->publish == 1)
                        <a href="/user/QuanLyMonan/unpublish/{{$v->id}}" class="btn btn-success">v</a>
                      @else
                        <a href="/user/QuanLyMonan/publish/{{$v->id}}" class="btn btn-danger">x</a>
                      @endif
                    </td>
                    <td class=" last">
                      <a href="/user/QuanLyMonan/xoa/{{$v->id}}" class="btn btn-danger">Xoá</a>
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
