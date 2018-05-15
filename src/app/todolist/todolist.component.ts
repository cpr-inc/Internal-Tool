import { Component, OnInit } from '@angular/core';
import { TodoTableColItems, TodoTableDateList } from '../shared/const/TodoTableData'
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Task } from '../shared/class/task'
import { format } from 'date-fns'
import { NgForm } from '@angular/forms';

declare var jquery:any;  // jquery
declare var $ :any; // jquery

declare var autosize :any; // jquery

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {

  newdata = []
  tasks: Task[];
  tasksRef: AngularFireList<any>;

  TableDateList: Task[];
  bk_Data: Task[];

  tasksNo: number;

  now = format(new Date())

  alltasks: Task[];
  alltasksRef: AngularFireList<any>;

  alltasksItemsRef: AngularFireObject<any>;

  title: string;
  description: string;
  priority: string;
  deadline: string;
  startdate: string;
  state: string;
  author: string;

  task:Task

  constructor(private db: AngularFireDatabase) { 
    this.tasksRef = db.list('/tasks', ref => ref.orderByChild('isTrash').equalTo(false));
    this.alltasksRef = db.list('/tasks');
    for(let data of TodoTableDateList){
      this.newdata.push(false)
    }
    this.newdata[0]=true
  }

  ngOnInit() {
    // trashtask以外
    this.tasksRef.snapshotChanges()
    .subscribe(snapshots => {
      this.tasks = snapshots.map(snapshot => {
        // console.log(this.i,this.DeleteAlertFlag[this.i]) //ngOnChanges  
        const values = snapshot.payload.val();
        return new Task({ key: snapshot.payload.key, ...values });
      });
      this.TableDateList = this.tasks
      this.task = this.tasks[0]

      // this.i = 0; //ngOnChanges
      // for(var task of this.tasks){
      //   if(task.priority=="高"){
      //     this.taskcolor[this.i] = "bg-yellow-font-bk";
      //   }else if(task.priority=="中"){
      //     this.taskcolor[this.i] = "bg-MediumPurple-font-bk";
      //   }else if(task.priority=="低"){
      //     this.taskcolor[this.i] = "bg-powderBlue-font-bk";
      //   }else{
      //     this.taskcolor[this.i] = "";
      //   }
      //   this.i++;
      // }
    });
    //全てのタスク
    this.alltasksRef.snapshotChanges()
    .subscribe(snapshots => {
      this.alltasks = snapshots.map(snapshot => {
        const values = snapshot.payload.val();
        return new Task({ key: snapshot.payload.key, ...values });
      });
      this.tasksNo = this.alltasks.length
    });
  }
  ngAfterViewChecked(){
    if(this.TableDateList && !this.bk_Data){
      var orderTab = $('.js-basic-example').dataTable({
        destroy: true,
        // responsive: true,
        language: {
            "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Japanese.json"
        },
        columnDefs: [{targets: 0, orderable: false}]
      });
      orderTab.fnSort([[0, 'asc']]);
      this.bk_Data = this.TableDateList
    }
    else if(this.TableDateList && this.bk_Data != this.TableDateList){
      var orderTab = $('.js-basic-example').dataTable({
        destroy: true,
        // responsive: true,
        language: {
            "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Japanese.json"
        },
        columnDefs: [{targets: 0, orderable: false}]
      });
      this.bk_Data = this.TableDateList
    }
  }
  value:string
  signup(f: NgForm) {
    console.log(f.value.title)
    console.log(f.value.description)
    console.log(f.value.deadline)
    console.log(f.value.startdate)
    console.log(f.value.author)
    console.log(this.value)

    // this.userService.create(
    //   f.value.email, 
    //   f.value.password,
    //   f.value.displayName,
    //   f.value.department);
    // this.password = f.value.password  title: string;
    console.log(this.title)
    console.log(this.description)
    console.log(this.priority)
    console.log(this.deadline)
    console.log(this.startdate)
    console.log(this.state)
    console.log(this.author)
  }

  EditTask(index: number){
    this.task = this.tasks[index]
  }


  ngAfterViewInit() {

    autosize($('textarea.auto-growth'));

    $(".dropdown-menu li a").click(function() {
      $(this).parents('.btn-group').find('.dropdown-toggle').html($(this).text()	+ ' <span class="caret"></span>');
      let test = $(this).text()
      console.log(test)
      $(this).parents('.btn-group').find('input[name="dropdown-value"]').val($(this).attr("data-value"));
    });

    
    
    $(document).on('click', '#btnModal', function() {
      $('#editModal').modal('show');
      //     CKEDITOR.replace('editor1');
      });
    
      $(document).on('click', '#btnModal2', function() {
          $('#notificationListModal').modal('show');
          //     CKEDITOR.replace('editor1');
      });
    
      $(document).on('click', '#btnModal3', function() {
    
          $('#excelPersonalDetailModal').modal('show');
          //     CKEDITOR.replace('editor1');
      });
    
    
          $("#editModal").on('shown.bs.modal', function () {
            var globaleTableHeight = getTableHeight("editModal","init");
            setOpenedModalScroll(globaleTableHeight);
          });
    
          $("#timeDiv").slimScroll({
            alwaysVisible: true,
            position: 'left',
            distance: '290px',
            height: '430px'
          });
    
          $('.datetimepicker').bootstrapMaterialDatePicker({
              format : 'YYYY/MM/DD HH:mm',
              clearButton : true,
              weekStart : 1,
              clearText : "クリア",
              cancelText : "キャンセル",
              lang : 'ja',
              triggerEvent : 'click'
          });

//Input - Function ========================================================================================================
//You can manage the inputs(also textareas) with name of class 'form-control'
// js/admin.js AdminBSBより入力フォームのアニメーション制御

      //On focus event
      $('.form-control').focus(function () {
        $(this).parent().addClass('focused');
      });

      //On focusout event
      $('.form-control').focusout(function () {
        var $this = $(this);
        if ($this.parents('.form-group').hasClass('form-float')) {
          if ($this.val() == '') { $this.parents('.form-line').removeClass('focused'); }
        }
        else {
          $this.parents('.form-line').removeClass('focused');
        }
      });

      //On label click
      $('body').on('click', '.form-float .form-line .form-label', function () {
        $(this).parent().find('input').focus();
      });

      //Not blank form
      $('.form-control').each(function () {
        if ($(this).val() !== '') {
          $(this).parents('.form-line').addClass('focused');
        }
      });
//Input - end ========================================================================================================

/* DropdownMenu - Function =================================================================================================
*  You can manage the dropdown menu
*  
*/

$.AdminBSB.dropdownMenu = {
  activate: function () {
      var _this = this;

      $('.dropdown, .dropup, .btn-group').on({
          "show.bs.dropdown": function () {
              var dropdown = _this.dropdownEffect(this);
              _this.dropdownEffectStart(dropdown, dropdown.effectIn);
          },
          "shown.bs.dropdown": function () {
              var dropdown = _this.dropdownEffect(this);
              if (dropdown.effectIn && dropdown.effectOut) {
                  _this.dropdownEffectEnd(dropdown, function () { });
              }
          },
          "hide.bs.dropdown": function (e) {
              var dropdown = _this.dropdownEffect(this);
              if (dropdown.effectOut) {
                  e.preventDefault();
                  _this.dropdownEffectStart(dropdown, dropdown.effectOut);
                  _this.dropdownEffectEnd(dropdown, function () {
                      dropdown.dropdown.removeClass('open');
                  });
              }
          }
      });

      // //Set Waves
      // Waves.attach('.dropdown-menu li a', ['waves-block']);
      // Waves.init();
  },
  dropdownEffect: function (target) {
      var effectIn = $.AdminBSB.options.dropdownMenu.effectIn, effectOut = $.AdminBSB.options.dropdownMenu.effectOut;
      var dropdown = $(target), dropdownMenu = $('.dropdown-menu', target);

      if (dropdown.length > 0) {
          var udEffectIn = dropdown.data('effect-in');
          var udEffectOut = dropdown.data('effect-out');
          if (udEffectIn !== undefined) { effectIn = udEffectIn; }
          if (udEffectOut !== undefined) { effectOut = udEffectOut; }
      }

      return {
          target: target,
          dropdown: dropdown,
          dropdownMenu: dropdownMenu,
          effectIn: effectIn,
          effectOut: effectOut
      };
  },
  dropdownEffectStart: function (data, effectToStart) {
      if (effectToStart) {
          data.dropdown.addClass('dropdown-animating');
          data.dropdownMenu.addClass('animated dropdown-animated');
          data.dropdownMenu.addClass(effectToStart);
      }
  },
  dropdownEffectEnd: function (data, callback) {
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      data.dropdown.one(animationEnd, function () {
          data.dropdown.removeClass('dropdown-animating');
          data.dropdownMenu.removeClass('animated dropdown-animated');
          data.dropdownMenu.removeClass(data.effectIn);
          data.dropdownMenu.removeClass(data.effectOut);

          if (typeof callback == 'function') {
              callback();
          }
      });
  }
}
//==========================================================================================================================

//==========================================================================================================================

          //TinyMCE (tinymceを定義する必要あるためコメントアウト)
          // tinymce.init({
          //   selector : "textarea.tinymce#editModal1Tinymce",
          //   theme : "modern",
          //   height : 300,
          //   language : "ja",
          //   menubar : false,
          //   plugins : [
          //       'lists link charmap preview hr anchor pagebreak',
          //       'searchreplace wordcount visualblocks visualchars code fullscreen',
          //       'insertdatetime nonbreaking directionality',
          //       'emoticons template paste textcolor colorpicker textpattern ' ],
          //   toolbar1 : 'bold italic underline | forecolor backcolor preview',
          //   image_advtab : false,
          // });
    
          //Date
          $("input.date").inputmask('yyyy/mm/dd', { placeholder: '__/__/____' });
          // $(".input-daterange").datepicker({
          //     language: 'ja',
          //     format: "yyyy/mm/dd",
          //     autoclose: true,
          //     clearBtn: true,
          //     todayHighlight: true
          // });
    
          //Datepicker plugin
    // 		        $('.datepicker').bootstrapMaterialDatePicker({
    // 		            format: 'YYYY/MM/DD',
    // 		            clearButton: true,
    // 		            weekStart: 1,
    // 		            time: false,
    // 		            clearText: "クリア",
    // 		            cancelText: "キャンセル",
    // 		            lang: 'ja'
    // 		        });
          //パネル表示切替
          $("#expander").click(function() {
              if ($("#expander").find('i').text() == 'expand_more') {
                  $("#expander").find('i').text("expand_less");
                  $("#search_body").css("display", "block");
                  $(this).attr("title", "最小化する");
              }
              else {
                  $("#expander").find('i').text("expand_more");
                  $("#search_body").css("display", "none");
                  $(this).attr("title", "最大化する");
              }
          });
    
          $("#selectall_1").click(function() {
              if ($(this).prop('checked')) {
                  $('#timeline').find('input:checkbox[name!=selectall]').each(function() {
                      $(this).prop('checked', true);
                  });
              }
              else {
                  $('#timeline').find('input:checkbox[name!=selectall]').each(function() {
                      $(this).prop('checked', false);
                  });
              }
          });
          
          // $('.js-basic-example').dataTable({
          //     destroy: true,
          //     responsive: true,
          //     language: {
          //         "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Japanese.json"
          //     }
          // });
          // var orderTab = $('.js-basic-example').dataTable({
          //   destroy: true,
          //   // responsive: true,
          //   language: {
          //       "url": "http://cdn.datatables.net/plug-ins/1.10.15/i18n/Japanese.json"
          //   },
          //   columnDefs: [{targets: 0, orderable: false}]
          // });
          // orderTab.fnSort([[1, 'desc']]);
        
          //Exportable table
          // $('.js-exportable').DataTable({
          //   dom: 'Bfrtip',
          //   responsive: true,
          //   buttons: [
          //       'copy', 'csv', 'excel', 'pdf', 'print'
          //   ]
          // });
    
        $("#expander").click(function() {
          if ($("#expander").find('i').text() == 'expand_more') {
            $("#expander").find('i').text("expand_less");
            $("#search_body").css("display", "block");
            $(this).attr("title", "最小化する");
          } else {
            $("#expander").find('i').text("expand_more");
            $("#search_body").css("display", "none");
            $(this).attr("title", "最大化する");
          }
        });
    
        $(".barDropdownToggle").click(function() {
          if ($("#expander").find('i').text() == 'expand_more') {
            $("#expander").find('i').text("expand_less");
            $("#search_body").css("display", "block");
            $(this).attr("title", "最小化する");
          } else {
            $("#expander").find('i').text("expand_more");
            $("#search_body").css("display", "none");
            $(this).attr("title", "最大化する");
          }
        });
    
      //時系列の背景色
      $(".modal .scrollDiv").find("tr:nth-child(2n-1)").css({"background": "rgba(244, 67, 54, 0.1)"});
      $(".modal .scrollDiv").find("tr:last").filter(function(){
        if($(this).text().indexOf("終票")>0){
          $(this).css({"background": "rgba(244, 67, 54, 0.1)"});
        }
      });
    
      $(".timeExpander").click(function() {
      if ($(this).find('i').text() == 'expand_more') {
        $(this).find('i').text("expand_less");
        $("[class='modal fade in']").find(".search_body").css("display", "block");
        $(this).attr("title", "最小化する");
    
        //スクロールを調整
        var globaleTableHeight = getTableHeight($("[class='modal fade in']").attr("id"),"reset");
        $("[class='modal fade in']").find(".scrollDiv").slimScroll({ destroy: true }).height(globaleTableHeight);
        setOpenedModalScroll(globaleTableHeight);
    
      } else {
        $(this).find('i').text("expand_more");
        $("[class='modal fade in']").find(".search_body").css("display", "none");
        $(this).attr("title", "最大化する");
    
        //スクロールを調整
        var globaleTableHeight = getTableHeight($("[class='modal fade in']").attr("id"),"init");
        $("[class='modal fade in']").find(".scrollDiv").slimScroll({ destroy: true }).height('auto');
        setOpenedModalScroll(globaleTableHeight);
      }
    });
    
    function setOpenedModalScroll( globaleTableHeight ){
      $("[class='modal fade in']").find(".scrollDiv").slimScroll({
        alwaysVisible: true,
        position: 'left',
        distance: '290px',
        height: globaleTableHeight + 'px'
      });
    }
    
    function getTableHeight( modal ,flg ){//flg:'init','reset'
      var tableHeight;
      var totalHeight =$("[class='modal fade in']").find(".card")[0].clientHeight + $("[class='modal fade in']").find(".card")[1].clientHeight;
      switch( modal ){
        case "editModal":
          if(flg == "init"){
            tableHeight = totalHeight + 10 - 122;
          }else if(flg == "reset"){
            tableHeight = totalHeight + 10 - 232 - 10;
          }
          break;
        default:
      }
      return tableHeight;
    }
  }

  TableColItems=TodoTableColItems

  SetNew(index){
    return this.newdata[index]
  }

}
