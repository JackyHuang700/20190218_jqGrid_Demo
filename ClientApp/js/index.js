import printMe from './print'
import '../scss/all.scss'
// import '../css/styles.css'
import {
  cube,
  square,
} from './multiFunc'
// 在dll內的套件
// var _ = require('lodash');

// setting
$.jgrid.defaults.width = 780;
$.jgrid.defaults.responsive = true;
$.jgrid.defaults.styleUI = 'Bootstrap4';
$.jgrid.defaults.iconSet = "Octicons";

// jqGridId
const jqGridId = '#jqGrid'
const jqGridId2 = '#jqGrid2'

// function
// 子表格
// the event handler on expanding parent row receives two parameters
// the ID of the grid tow  and the primary key of the row
function showChildGrid(parentRowID, parentRowKey) {
  var childGridID = parentRowID + "_table";
  var childGridPagerID = parentRowID + "_pager";

  // send the parent row primary key to the server so that we know which grid to show
  var childGridURL = "https://jackyhuang700.github.io/20190211_API/jqGrid/15327fce.json";

  // add a table and pager HTML elements to the parent grid row - we will render the child grid here
  $("#" + parentRowID).append(
    "<table id=" +
      childGridID +
      "></table><div id=" +
      childGridPagerID +
      " class=scroll></div>"
  );

  $("#" + childGridID).jqGrid({
    url: childGridURL,
    mtype: "GET",
    datatype: "json",
    page: 1,
    colModel: [
      { label: "Order ID", name: "OrderID", key: true, width: 75 },
      { label: "Required Date", name: "RequiredDate", width: 100 },
      { label: "Ship Name", name: "ShipName", width: 100 },
      { label: "Ship City", name: "ShipCity", width: 100 },
      { label: "Freight", name: "Freight", width: 75 }
    ],
    loadonce: true,
    width: 500,
    height: "100%",
  });
}

// 註冊 datepacker
function  registeDatePicker(id){
  console.log('registeDatePicker', id)
  console.log("#" + id + "_sdate", "#jqGrid")
  $("#" + id + "_Quantity").datepicker({
    uiLibrary: 'bootstrap4'
  });
}

// common setting
function commonSetting(json = {}){
  
  json.url = json.url || "https://jackyhuang700.github.io/20190211_API/jqGrid/3077efc7.json"
  
  if(json.pager  === undefined){
    console.error('json.pager is undefined')
  }
  
  return {
    // url: "https://api.myjson.com/bins/x8kuf",
    url: json.url,
    editurl: "",
    // 取回資料的型態
    datatype: "json", // 'local', 'json'
    // 定義資料 Schema
    colModel: [
      {
        key: true,
        name: "Id",
        hidden: true,
      },
      {
        label: "Category Name",
        name: "CategoryName",
        width: 75,
        editable: true,
        editoptions: {
          size:"10",
          maxlength:"30"
        }
      },
      { 
        label: "Product Name", 
        name: "ProductName", 
        width: 100, 
        editable: true,
        edittype:"textarea", 
        editoptions: {
          rows:"2",
          cols:"10"
        }
      },
      {
        label: "Country",
        name: "Country",
        width: 100,
        sortable: false,
        editable: true,
        edittype:"select",
        editoptions:{
          // value: text
          value: `
           UK:UK;
           USA:USA;
          `
        }
      },
      {
        label: "Price",
        name: "Price",
        width: 80,
        sorttype: "integer",
        editable: true
      },
      // sorttype is used only if the data is loaded locally or loadonce is set to true
      {
        label: "Quantity",
        name: "Quantity",
        width: 80,
        sorttype: "number",
        editable: true
      },
      {
        label: "Enable",
        name: "Enable",
        width: 50,
        sortable: false,
        editable: true,
        edittype: "checkbox",
        editoptions:{
          value: `
           true:false;
          `
        }
      },
      // 操作區
      {
        name: 'Action',
        align: 'center',
        width: 80,
        fixed: true,
        search: false,
        sortable: false,
        resize: true,
        formatter: 'actions',
        formatoptions: {
          keys: false,
          editbutton: true,
          delbutton: true,
          editformbutton: false,
          onSuccess: function(response) {
              if (response.status == 200) {
              }
          },
          extraparam: { oper: 'edit' },
          url: '/controller/action'
        }
      },
    ],
    // 自定義CSS Tag
    css: '',
    // 是否要一次取全部的資料
    loadonce: false,
    altRows: true,
    //rownumbers : true,
    // 多選
    multiselect : true,
    width: 1100,
    colMenu: true,
    menubar: true,
    viewrecords: true,
    hoverrows: true,
    height: '100%', // 200 or ( 'auto', '100%' )
    // 顯示欄位數
    rowNum: 10,
    // 顯示筆數
    rowList: [10,20,30],
    // 標題名稱
    caption: "jsGrid - Demo",
    sortname: 'id',
    sortable: true,
    sortorder: "desc",
    grouping: true,
    groupingView: {
      groupField: ["CategoryName"],
      groupColumnShow: [true],
      groupText: ["<b>{0}</b>"],
      groupOrder: ["asc"],
      groupSummary: [false],
      groupCollapse: false
    },
    //altRows: true, This does not work in boostrarap
    // altclass: '....'
    // 必須是jQuery物件，指向html中設定pager的div元素。
    pager: json.pager,
    // set table stripped class in table style in bootsrap
    
    // 單個點擊事件 - editing: true有效
    // item       數據項
    // itemIndex  數據項索引
    // event      jQuery事件
    rowClick: function( item, itemIndex ,event ){
      console.log('rowClick')
    },
    pagerFormat: "頁數: {first} {prev} {pages} {next} {last}    {pageIndex} of {pageCount}",
    pagePrevText: "Prev",
    pageNextText: "Next",
    pageFirstText: "First",
    pageLastText: "Last",
    // 資料讀取完畢
    loadComplete: function(){
      console.log(`This function is executed immediately after`)
      console.log(`data is loaded. We try to update data in row 13.`)
      var ret = $(jqGridId).jqGrid('getRowData',"1")
      if(ret){
        $(jqGridId).jqGrid('setRowData',ret.id,{ProductName:`<font color='red'>${ret.ProductName}</font>`})
      }
    },
    // 完成以後
    gridComplete: function(){
      console.log('gridComplete')
    },
    /// subGrid  ///
    subGrid : true,
    subGridRowExpanded: showChildGrid,
    /// subGrid  ///
    // 點擊某列
    onSelectRow: function(id){
      console.log('onSelectRow', id)
      // $(jqGridId).jqGrid('editRow',id,true) // 開啟某列編輯
      
      // datepicker
      // $(jqGridId).jqGrid('editRow', id, true, registeDatePicker);
    },
    // 選取分頁
    onPaging : function(but) {
      console.log("Button: "+but + " is clicked")
    },
    // 開啟可放置自定義DOM
	  toolbar: [true,"top"], // "top", "bottom"
  }
}

// main
$(document).ready(function() {
  // altrows are set with table striped class for Boostrap
  //$.jgrid.styleUI.Bootstrap.base.rowTable = "table table-bordered table-striped";
  
  // main
  $(jqGridId).jqGrid(commonSetting({
    pager: "#jqGridPager",
  }))
  $(jqGridId2).jqGrid(commonSetting({
    url: 'https://jackyhuang700.github.io/20190211_API/jqGrid/e9a5b26e.json',
    pager: "#jqGridPager2",
  }))

  // 功能欄位
  $(jqGridId).navGrid(
    "#jqGridPager",
    // the buttons to appear on the toolbar of the grid
    {
      edit: true,
      add: true,
      del: true,
      search: true,
      refresh: true,
      view: true,
      position: "left",
      cloneToTop: false
    },
    // options for the Edit Dialog
    {
      editCaption: "The Edit Dialog",
      recreateForm: true,
      checkOnUpdate: true,
      checkOnSubmit: true,
      closeAfterEdit: true,
      errorTextFormat: function(data) {
        return "Error: " + data.responseText;
      }
    },
    // options for the Add Dialog
    {
      closeAfterAdd: true,
      recreateForm: true,
      errorTextFormat: function(data) {
        return "Error: " + data.responseText;
      }
    },
    // options for the Delete Dailog
    {
      errorTextFormat: function(data) {
        return "Error: " + data.responseText;
      }
    },
    { multipleSearch: true, showQuery: true } // search options - define multiple search
  )
  
  // 這行加了不知道要幹嘛
  $(jqGridId).jqGrid('inlineNav',"#jqGridPager")
  
  // 左上角排序
  $(jqGridId).jqGrid("menubarAdd", [
    {
      id: "das",
      //cloasoncall : true,
      title: "Sort by Category",
      click: function(event) {
        console.log('a')
        $("#jqGrid").jqGrid("sortGrid", "CategoryName");
      }
    },
    {
      divider: true
    },
    {
      id: "was",
      //cloasoncall : true,
      title: "Toggle Visibility",
      click: function(event) {
        console.log('b')
        var state = this.p.gridstate === "visible" ? "hidden" : "visible";
        $("#jqGrid").jqGrid("setGridState", state);
      }
    }
  ]);
  
  //
  $(jqGridId).jqGrid(
    "navGrid",
    "#jqGridPager",
    {}, //options
    { height: 500, reloadAfterSubmit: false }, // edit options
    { height: 500, reloadAfterSubmit: false }, // add options
    { reloadAfterSubmit: false }, // del options
    {} // search options
  );

  // Drag & Drop Rows
  $(jqGridId).jqGrid("gridDnD", { connectWith: `${jqGridId2}` }) // connectWith: "#grid2,#grid3"
  $(jqGridId2).jqGrid("gridDnD", { connectWith: `${jqGridId}` })


  /// 功能展示 ///
  // 取得被勾選的行 - Note: multiselect : true,
  $("#btn").click(function() {
    alert(
      $(jqGridId).jqGrid('getGridParam', 'selarrrow')
    )
  });

  // 強制勾選(取消) 第13列資料 - Note: multiselect : true,
  $("#btn2").click(function() {
    $(jqGridId).jqGrid('setSelection', "13")
  });
  
  //
  $("#btn3").click(function() {
    $(jqGridId).jqGrid('hideCol', 'CategoryName')
  });
  
  //
  $("#btn4").click(function() {
    $(jqGridId).jqGrid('showCol', 'CategoryName')
  });
  
  // 全域搜尋
  $("#btn5").click(function(){
    $(jqGridId).jqGrid('searchGrid',
      {sopt:['cn','bw','eq','ne','lt','gt','ew']}
    );
  });
  
  // 編輯選取欄位，Note: 一定要點選一列資料
  $("#btn6").click(function(){
    var gr = $(jqGridId).jqGrid('getGridParam','selrow')
    if( gr != null ) $(jqGridId).jqGrid('editGridRow',gr,{height:280,reloadAfterSubmit:false})
    else alert("請選取一列資料")
  });
  
   // 新增資料
  $("#btn7").click(function() {
    // $(jqGridId).jqGrid('showCol', 'CategoryName')
    $(jqGridId).jqGrid("editGridRow", "new", {
      height: 280,
      reloadAfterSubmit: false
    });
  });
  
  // 刪除資料，Note: 一定要點選一列資料
  $("#btn8").click(function() {
    var gr = $(jqGridId).jqGrid("getGridParam", "selrow")
    if (gr != null) $(jqGridId).jqGrid("delGridRow", gr, { reloadAfterSubmit: false })
    else alert("Please Select Row to delete!")
  });
  
  // 取消所有選取
  $("#btn9").click(function(){
    $(jqGridId).jqGrid('resetSelection')
  });
  
  // 添加額外DOM
    $("#t_jqGrid").append("<input type='button' id='btnMMM' value='Click Me' />");
  $("#btnMMM").click(function(){
    alert("Hi! I'm added button at this toolbar");
  });
});



