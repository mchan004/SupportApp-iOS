@extends('Login.Layouts.app')

@section('content')
<div class="page-title">
    <div class="title_left">
        <h3>Thêm món ăn</h3>
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
                <h2>Thêm món ăn</h2>
                <ul class="nav navbar-right panel_toolbox">
                    <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                    </li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-wrench"></i></a>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="#">Settings 1</a>
                            </li>
                            <li><a href="#">Settings 2</a>
                            </li>
                        </ul>
                    </li>
                    <li><a class="close-link"><i class="fa fa-close"></i></a>
                    </li>
                </ul>
                <div class="clearfix"></div>
            </div>
            <div class="x_content">
              @if (count($errors) > 0)
                <div class="alert alert-warning" role="alert">
                  @foreach ($errors->all() as $error)
                    {{ $error }}<br>
                  @endforeach
                </div>
              @endif
                <!-- Smart Wizard -->
                <p>cheme.</p>
                <form class="form-horizontal form-label-left" action="/user/QuanLyMonan/ThemMonan" method="post">
                    {{ csrf_field() }}
                    <div>
                        <ul class="nav nav-tabs" role="tablist">
                            <li role="presentation" class="active">
                                <a href="#step-1" aria-controls="step-1" role="tab" data-toggle="tab">

                                    <span class="step_descr">
                                                Bước 1<br />
                                                <small>Thêm nguyên liệu và dụng cụ</small>
                                            </span>
                                </a>
                            </li>
                            <li role="presentation">
                                <a href="#step-2" aria-controls="step-2" role="tab" data-toggle="tab">

                                    <span class="step_descr">
                                                Bước 2<br />
                                                <small>Hướng dẫn chi tiết từng bước</small>
                                            </span>
                                </a>
                            </li>
                            <li role="presentation">
                                <a href="#step-3" aria-controls="step-3" role="tab" data-toggle="tab">

                                    <span class="step_descr">
                                                Bước 3<br />
                                                <small>Bổ xung thêm</small>
                                            </span>
                                </a>
                            </li>

                        </ul>

                        <div class="tab-content" style="margin-top: 25px">


                            <div role="tabpanel" class="tab-pane active" id="step-1">

                                <div class="form-group">
                                    <label class="control-label col-md-4 col-sm-4 col-xs-12">Nguyên liệu món ăn</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <div class="row">
                                            <input list="browsers" id="themNL" class="col-md-9 col-xs-9" onkeyup="showResult(this.value)">
                                            <datalist id="browsers">
                                            </datalist>
                                            <input type="button" onclick="them()" value="Thêm" class="col-md-3 col-xs-3">
                                        </div>
                                        <div class="row">
                                            <p><i>Tìm nguyên liệu và click thêm để thêm nguyên liệu cho món ăn của bạn</i>
                                            </p>
                                        </div>
                                        <div class="row" id="DSNguyenlieu">
                                            <table id="tblNL">
                                                <tr>
                                                    <th width="30%">Số lượng</th>
                                                    <th width="70%">Tên nguyên liệu</th>
                                                    <th> X </th>
                                                </tr>
                                                <tr>
                                                    <td><i>Ví dụ</i>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <input type="text" placeholder="12 quả" class="form-control" readonly>
                                                    </td>
                                                    <td>
                                                        <input type="text" placeholder="Trứng gà" class="form-control" readonly>
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <input type="text" placeholder="300 g" class="form-control" readonly>
                                                    </td>
                                                    <td>
                                                        <input type="text" placeholder="Bột mỳ" class="form-control" readonly>
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                <tr>
                                                    <td><i>.</i>
                                                    </td>
                                                </tr>

                                            </table>

                                        </div>
                                    </div>
                                </div>
                                <hr>
                                <div class="form-group">
                                    <label class="control-label col-md-4 col-sm-4 col-xs-12" for="first-name">Dụng cụ món ăn
                                    </label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <div class="row">
                                            <input list="browsers1" id="DC" class="col-md-9 col-xs-9" onkeyup="showResultDC(this.value)">
                                            <datalist id="browsers1">
                                            </datalist>
                                            <input id="themDC" type="button" value="Thêm" class="col-md-3 col-xs-3">

                                        </div>
                                        <div class="row">
                                            <p><i>Tìm dụng cụ và click thêm để thêm dụng cụ cho món ăn của bạn</i>
                                            </p>
                                        </div>
                                        <div class="row">
                                            <ul class="list-group" id="DSDungcu"></ul>
                                        </div>
                                    </div>
                                </div>



                            </div>
                            <div role="tabpanel" class="tab-pane" id="step-2">
                              <div class="row">


                                <div class="col-lg-8 col-sm-10 col-xs-12 col-lg-offset-2 col-sm-offset-1">
                                    <div class="form-group">
                                        <label for="tenMonan">Tên món ăn</label>
                                        <input type="text" id="tenMonan" name="tenMonan" value="{{ old('tenMonan') }}" class="form-control">
                                    </div>

                                    <div class="form-group">
                                        <label for="tenMonan">Giới thiệu</label>
                                        <textarea name="gioithieu" class="form-control" rows="3">{{ old('gioithieu') }}</textarea>

                                    </div>

                                    <div class="form-group">
                                        <label for="huongdan">Hướng dẫn chi tiết</label>
                                        <textarea class="ckeditor" id="huongdan" name="huongdan" rows="10">{{ old('huongdan') }}</textarea>

                                    </div>



                                </div>
                              </div>
                            </div>
                            <div role="tabpanel" class="tab-pane form-horizontal form-label-left" id="step-3">

                                <div class="form-group">
                                    <label class="control-label col-md-4 col-sm-4 col-xs-12" for="categorie">Thể loại</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                      <select class="form-control" id="categorie" name="categorie">
                                        <option value="1">Món chính</option>
                                        <option value="2">Món bánh/Tráng miệng</option>
                                        <option value="3">Thức uống</option>
                                      </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-4 col-sm-4 col-xs-12" for="hinhMinhhoa">Hình món ăn</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <input type="text" class="form-control" name="hinhMinhhoa" value="{{ old('hinhMinhhoa') }}" id="hinhMinhhoa">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="control-label col-md-4 col-sm-4 col-xs-12" for="nguon">Nguồn bài viết</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <input type="text" class="form-control" name="nguon" value="{{ old('nguon') }}" id="nguon">
                                    </div>
                                </div>

                                <hr>

                                <div class="form-group">
                                    <label class="control-label col-md-4 col-sm-4 col-xs-12" for="thoigian">Thời gian nấu</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <input type="text" class="form-control" name="thoigian" value="{{ old('thoigian') }}" id="thoigian">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="control-label col-md-4 col-sm-4 col-xs-12" for="dokho">Độ khó</label>
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                      <select class="form-control" id="dokho" name="dokho">
                                        <option value="2">Dễ</option>
                                        <option value="3" selected>Trung Bình</option>
                                        <option value="4">Khó</option>
                                      </select>
                                    </div>
                                </div>

                                <div class="text-right" style="margin-right:30px">
                                    <input type="submit" class="btn btn-primary" value="Hoàn tất">
                                </div>
                            </div>

                        </div>

                    </div>

                </form>




                <!-- End SmartWizard Content -->

            </div>
        </div>
    </div>
</div>
@endsection



@section('addscript')
<script>
function showResult(str) {
  if (str.length==0) {
    // document.getElementById("livesearchNguyenlieu").innerHTML="";
    // document.getElementById("livesearchNguyenlieu").style.border="0px";
    return;
  }
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else {  // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (this.readyState==4 && this.status==200) {
      document.getElementById("browsers").innerHTML=this.responseText;
    }
  }
  xmlhttp.open("GET","/livesearchNguyenlieuDatalist/"+str,true);
  xmlhttp.send();
}

function showResultDC(str) {
  if (str.length==0) {
    // document.getElementById("livesearchNguyenlieu").innerHTML="";
    // document.getElementById("livesearchNguyenlieu").style.border="0px";
    return;
  }
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else {  // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (this.readyState==4 && this.status==200) {
      document.getElementById("browsers1").innerHTML=this.responseText;
    }
  }
  xmlhttp.open("GET","/livesearchDungcuDatalist/"+str,true);
  xmlhttp.send();
}


function them() {
  var add = "<tr><td><input type=\"text\" name=\"soluong[]\" class=\"form-control\"></td>            <td><input type=\"text\" name=\"nguyenlieu[]\" value=\"" + $('#themNL').val() + "\" class=\"form-control\"></td><td><a href=\"#\" class=\"bo\"><img src=\"/images/icon/dustbin.svg\" alt=\"remove\"></a></td></tr>";


  $("#tblNL").append(add);
}

$(document).ready(function(){

  $(document).on('click', '#themDC', function() {
    var add = "<li class=\"list-group-item\">" + $('#DC').val() + "<input type=\"hidden\" name=\"dungcu[]\" value=\"" + $('#DC').val() + "\"></li>";
    $("#DSDungcu").append(add);
  });

  $(document).on('click', '.bo', function() {
      $(this).parent().parent().remove();
  });






});



</script>


<script src="//cdn.ckeditor.com/4.6.2/full/ckeditor.js"></script>



@endsection
