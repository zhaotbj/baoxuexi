(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-28a1ea04"],{1039:function(e,t,a){},"29bd":function(e,t,a){},4272:function(e,t,a){"use strict";var n=a("29bd"),o=a.n(n);o.a},"5fde":function(e,t,a){},"820a":function(e,t,a){"use strict";var n=a("5fde"),o=a.n(n);o.a},8430:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"expand_row"},[a("Table",{ref:"selectionTable",attrs:{columns:e.columns,data:e.bodyList},scopedSlots:e._u([{key:"name",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.name))])]}},{key:"age",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.name))])]}},{key:"address",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.name))])]}}])},[e.btn?a("template",{slot:"action"},[a("div",e._l(e.btn,(function(t){return a("Button",{key:t.type,attrs:{type:"primary"},on:{click:function(a){return e.btnOperate(t.type)}}},[e._v(e._s(t.text))])})),1)]):e._e()],2)],1)},o=[],r={name:"expand_row",props:{btn:{type:Array}},data:function(){return{columns:[{title:"编号",slot:"name"},{title:"案号",slot:"name"},{title:"申请人",slot:"age"},{title:"被申请人",slot:"age"},{title:"纠纷类型",slot:"age"},{title:"案件状态",slot:"age"},{title:"申请时间",slot:"age"},{title:"开庭时间",slot:"age"}],bodyList:[{name:"王小明",age:18,birthday:"919526400000",address:"北京市朝阳区芍药居"},{name:"张小刚",age:25,birthday:"696096000000",address:"北京市海淀区西二旗"}]}},mounted:function(){if(this.btn){var e={title:"操作",slot:"action"};this.columns.push(e)}},methods:{btnOperate:function(e){this.$emit("operate",e)}}},l=r,s=a("e90a"),i=Object(s["a"])(l,n,o,!1,null,null,null);t["a"]=i.exports},acc9:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"organized_court_case"},[a("listSearch",{attrs:{searchArr:e.searchArr},on:{searchConfirm:e.goSearch},model:{value:e.searchFormData,callback:function(t){e.searchFormData=t},expression:"searchFormData"}}),a("div",{staticClass:"content"},[a("div",{staticClass:"table_box mgt20"},[a("Table",{ref:"selectionTable",attrs:{columns:e.columns,data:e.bodyList},scopedSlots:e._u([{key:"name",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.name))])]}},{key:"age",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.name))])]}},{key:"address",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.name))])]}}])},[a("template",{slot:"action"},[a("div",[a("Button",{attrs:{type:"primary"},on:{click:function(t){return e.btnOperate(1)}}},[e._v("上报")])],1)])],2),a("Page",{staticClass:"mgt20",attrs:{total:e.pageObj.total,"page-size":e.pageObj.pageSize,"page-size-opts":e.pageObj.pageSizeOptions,"show-elevator":"","show-sizer":""},on:{"on-page-size-change":e.pageSizeChange,"on-change":e.pageNumChange}})],1)]),a("popupBox",{attrs:{show:e.popupShow,titleText:e.popupTypeObj[e.popupType]["title"],width:e.popupTypeObj[e.popupType]["width"],footerBtn:e.popupTypeObj[e.popupType]["footerBtn"]},on:{popupConfirm:e.popupConfirm,popupCancel:e.popupCancel}},[1==e.popupType?a("div",{staticClass:"confirm_content"},[e._v(" 确定要上报文书么？ ")]):e._e(),2==e.popupType||3==e.popupType?a("div",{staticClass:"upload_content"},[a("uploadWrit")],1):e._e()])],1)},o=[],r=a("d59d"),l=a("8430"),s=a("ad12"),i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"upload_writ"},[a("Form",{ref:"formValidate",attrs:{model:e.formValidate,rules:e.ruleValidate,"label-width":200}},[a("FormItem",{attrs:{label:"文书类型：",prop:"gender"}},[a("RadioGroup",{model:{value:e.formValidate.gender,callback:function(t){e.$set(e.formValidate,"gender",t)},expression:"formValidate.gender"}},[a("Radio",{attrs:{label:"male"}},[e._v("裁决书")]),a("Radio",{attrs:{label:"female"}},[e._v("调解书")])],1)],1),a("FormItem",{attrs:{label:"文书来源：",prop:"gender"}},[a("RadioGroup",{model:{value:e.formValidate.gender,callback:function(t){e.$set(e.formValidate,"gender",t)},expression:"formValidate.gender"}},[a("Radio",{attrs:{label:"male"}},[e._v("文书模板")]),a("Radio",{attrs:{label:"female"}},[e._v("文件上传")])],1)],1),a("FormItem",{attrs:{label:"选择文书模版：",prop:"city"}},[a("Select",{staticStyle:{width:"200px"},attrs:{placeholder:"请选择模板"},model:{value:e.formValidate.city,callback:function(t){e.$set(e.formValidate,"city",t)},expression:"formValidate.city"}},[a("Option",{attrs:{value:"beijing"}},[e._v("模版1")]),a("Option",{attrs:{value:"shanghai"}},[e._v("模版2")]),a("Option",{attrs:{value:"shenzhen"}},[e._v("模版3")])],1)],1),a("FormItem",[a("Button",{attrs:{type:"primary"},on:{click:function(t){return e.handleSubmit("formValidate")}}},[e._v("确定")]),a("Button",{staticStyle:{"margin-left":"8px"}},[e._v("取消")])],1)],1)],1)},c=[],u={name:"upload_writ",data:function(){return{formValidate:{name:"",mail:"",city:"",gender:"",interest:[],date:"",time:"",desc:""},ruleValidate:{gender:[{required:!0,message:"Please select gender",trigger:"change"}],city:[{required:!0,message:"Please select the city",trigger:"change"}]}}},mounted:function(){},methods:{handleSubmit:function(e){var t=this;this.$refs[e].validate((function(e){e?t.$Message.success("Success!"):t.$Message.error("Fail!")}))}}},p=u,d=(a("ca5b2"),a("e90a")),m=Object(d["a"])(p,i,c,!1,null,null,null),h=m.exports,f={name:"organized_court_case",components:{listSearch:r["a"],uploadWrit:h},mixins:[s["a"]],data:function(){var e=this;return{popupShow:!1,popupType:2,popupTypeObj:{1:{type:1,title:"操作",width:"640"},2:{type:2,title:"操作",width:"640",footerBtn:!1},3:{type:3,title:"操作",width:"640",footerBtn:!1}},deliveryDate:null,searchFormData:{personalName:null,companyName:null,checkbox:[],radio:null,status:null},searchArr:[{type:"input",value:"companyName",label:"案号",placeholder:"请输入企业名称"},{type:"select",value:"status",label:"审核状态",arr:[{label:"通过",value:1},{label:"未通过",value:2}],placeholder:"请选择"}],columns:[{type:"expand",width:"20",render:function(t){return t(l["a"],{props:{btn:[{type:2,text:"上报文书"},{type:3,text:"重新上报文书"}]},on:{operate:function(t){e.btnOperate(t)}}})}},{title:"标题",slot:"name"},{title:"申请时间",slot:"age"},{title:"开庭时间",slot:"age"},{title:"案件状态",slot:"age"},{title:"操作",slot:"action"}],bodyList:[{name:"王小明",age:18,birthday:"919526400000",address:"北京市朝阳区芍药居"},{name:"张小刚",age:25,birthday:"696096000000",address:"北京市海淀区西二旗"}]}},mounted:function(){this.getList()},methods:{goSearch:function(){console.log(this.searchFormData)},btnOperate:function(e){console.log(e),this.popupType=e,this.popupShow=!0},popupConfirm:function(){console.log(1)},popupCancel:function(){console.log(1),this.popupShow=!1},getList:function(){this.commonApi.demo().then((function(e){console.log(e)})).catch((function(e){console.log(e)}))}}},v=f,g=(a("cdfd"),a("820a"),Object(d["a"])(v,n,o,!1,null,null,null));t["default"]=g.exports},ad09:function(e,t,a){},ad12:function(e,t,a){"use strict";t["a"]={data:function(){return{pageObj:{pageIndex:0,pageSize:50,pageSizeOptions:[50,100,150,200],total:0}}},methods:{pageSizeChange:function(e){this.pageObj.pageSize=e,this.getList()},pageNumChange:function(e){this.pageObj.pageSize=e,this.getList()}}}},ca5b2:function(e,t,a){"use strict";var n=a("1039"),o=a.n(n);o.a},cdfd:function(e,t,a){"use strict";var n=a("ad09"),o=a.n(n);o.a},d59d:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"list_search"},[a("div",{staticClass:"search-box"},[a("Form",{staticClass:"search_form",attrs:{model:e.searchForm,"label-width":80}},e._l(e.searchArr,(function(t){return a("formItem",{key:t.label,attrs:{label:t.label}},["input"==t.type?a("Input",{attrs:{placeholder:t.placeholder},model:{value:e.searchForm[t.value],callback:function(a){e.$set(e.searchForm,t.value,a)},expression:"searchForm[item.value]"}}):e._e(),"select"==t.type?a("Select",{model:{value:e.searchForm[t.value],callback:function(a){e.$set(e.searchForm,t.value,a)},expression:"searchForm[item.value]"}},e._l(t.arr,(function(t){return a("Option",{key:t.value,attrs:{value:t.value}},[e._v(e._s(t.label))])})),1):e._e(),"checkbox"==t.type?a("CheckboxGroup",{model:{value:e.searchForm[t.value],callback:function(a){e.$set(e.searchForm,t.value,a)},expression:"searchForm[item.value]"}},e._l(t.arr,(function(e){return a("Checkbox",{key:e.value,attrs:{label:e.label}})})),1):e._e(),"radio"==t.type?a("RadioGroup",{model:{value:e.searchForm[t.value],callback:function(a){e.$set(e.searchForm,t.value,a)},expression:"searchForm[item.value]"}},e._l(t.arr,(function(e){return a("Radio",{key:e.value,attrs:{label:e.label}})})),1):e._e(),"datePicker"==t.type?a("DatePicker",{staticStyle:{width:"200px"},attrs:{format:"yyyy-MM-dd",type:"daterange",placement:"bottom-end",placeholder:t.placeholder},model:{value:e.searchForm[t.value],callback:function(a){e.$set(e.searchForm,t.value,a)},expression:"searchForm[item.value]"}}):e._e()],1)})),1)],1),a("div",{staticClass:"buttons"},[a("Button",{attrs:{type:"primary"},on:{click:e.confirm}},[e._v("确定")]),a("Button",{staticStyle:{"margin-left":"8px"}},[e._v("重制")])],1)])},o=[],r={name:"list_search",props:{value:{type:Object,required:!0},searchArr:{type:Array,required:!0}},data:function(){return{searchForm:this.value}},watch:{value:function(e){console.log("watch:value",e),this.searchForm=e},searchForm:function(e){console.log("watch:search",e),this.$emit("input",e)}},mounted:function(){},methods:{confirm:function(){console.log(this.value),this.$emit("searchConfirm")},reset:function(){}}},l=r,s=(a("4272"),a("e90a")),i=Object(s["a"])(l,n,o,!1,null,"85e1dc38",null);t["a"]=i.exports}}]);
//# sourceMappingURL=chunk-28a1ea04.ba1abb08.js.map