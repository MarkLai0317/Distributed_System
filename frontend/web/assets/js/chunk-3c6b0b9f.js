(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3c6b0b9f"],{1781:function(e,t,o){"use strict";o("1dc2")},"1dc2":function(e,t,o){},"9cb7":function(e,t,o){"use strict";o.r(t);var n=o("f2bf"),r=Object(n["createTextVNode"])("register"),a={key:0,class:"error"};function c(e,t,o,c,i,s){var u=Object(n["resolveComponent"])("MarkComponent"),l=Object(n["resolveComponent"])("el-button");return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",null,[Object(n["createVNode"])(u,{prop:i.testProp},null,8,["prop"]),Object(n["createVNode"])(l,{onClick:t[0]||(t[0]=function(e){return s.registerCustomer()})},{default:Object(n["withCtx"])((function(){return[r]})),_:1}),i.error?(Object(n["openBlock"])(),Object(n["createElementBlock"])("div",a,Object(n["toDisplayString"])(i.error),1)):Object(n["createCommentVNode"])("",!0)])}o("e9c4");function i(e,t,o,r,a,c){return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",null,Object(n["toDisplayString"])(o.prop),1)}var s={props:{prop:String}},u=o("6b0d"),l=o.n(u);const p=l()(s,[["render",i]]);var d=p,f={components:{MarkComponent:d},created:function(){this.getSensorData(),this.getTradeHistory()},data:function(){return{options:[{value:"Option1",label:"Option1"},{value:"Option2",label:"Option2"},{value:"Option3",label:"Option3"},{value:"Option4",label:"Option4"},{value:"Option5",label:"Option5"}],valueA:"",table:[{id:"1",name:"n"},{id:"2",name:"n2"}],testProp:"testProp string",shopID:"",type:"",page:3,error:""}},methods:{handle:function(){console.log(console.log(this.firebase.auth().currentUser.email))},getSensorData:function(){var e=this;this.axios.get("http://127.0.0.1:9000/nn/searchProduct",{params:{ShopID:this.shopID,Type:this.type,page:this.page}}).then((function(t){var o=JSON.stringify(t.data),n=JSON.parse(o);e.table=n,console.log(n.data)})).catch((function(e){console.log(e)})).then((function(){}))},registerCustomer:function(){var e=this;this.axios.post("http://127.0.0.1:9000/mark/register/customer",{Email:"test1@gmail.com",Name:"test1",PhoneNum:"0919191919"}).then((function(t){console.log(t);var o=JSON.stringify(t.data),n=JSON.parse(o);n.error?e.error=n.error:console.log("success")})).catch((function(t){console.log(t),e.error="register fail",console.log(e.page)}))},getTradeHistory:function(){var e=this;this.axios.get("http://127.0.0.1:9000/ni/TradeHistory",{params:{ManagerID:"108703060@nccu.edu.tw",page:1}}).then((function(t){var o=JSON.stringify(t.data),n=JSON.parse(o);e.table=n,console.log(n.data)})).catch((function(e){console.log(e)})).then((function(){}))}}};o("1781");const g=l()(f,[["render",c],["__scopeId","data-v-79eae656"]]);t["default"]=g},e9c4:function(e,t,o){var n=o("23e7"),r=o("da84"),a=o("d066"),c=o("2ba4"),i=o("e330"),s=o("d039"),u=r.Array,l=a("JSON","stringify"),p=i(/./.exec),d=i("".charAt),f=i("".charCodeAt),g=i("".replace),h=i(1..toString),b=/[\uD800-\uDFFF]/g,O=/^[\uD800-\uDBFF]$/,v=/^[\uDC00-\uDFFF]$/,m=function(e,t,o){var n=d(o,t-1),r=d(o,t+1);return p(O,e)&&!p(v,r)||p(v,e)&&!p(O,n)?"\\u"+h(f(e,0),16):e},y=s((function(){return'"\\udf06\\ud834"'!==l("\udf06\ud834")||'"\\udead"'!==l("\udead")}));l&&n({target:"JSON",stat:!0,forced:y},{stringify:function(e,t,o){for(var n=0,r=arguments.length,a=u(r);n<r;n++)a[n]=arguments[n];var i=c(l,null,a);return"string"==typeof i?g(i,b,m):i}})}}]);
//# sourceMappingURL=chunk-3c6b0b9f.js.map