(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2e95d7c4"],{"32f7":function(t,e,n){"use strict";n.r(e);var o=n("f2bf"),r=Object(o["createElementVNode"])("h2",null,"Chat Room",-1),c={key:0},a={key:1};function u(t,e,n,u,l,i){var s=Object(o["resolveComponent"])("el-header"),h=Object(o["resolveComponent"])("el-table-column"),d=Object(o["resolveComponent"])("el-table"),g=Object(o["resolveComponent"])("el-aside"),f=Object(o["resolveComponent"])("el-main"),p=Object(o["resolveComponent"])("el-container");return Object(o["openBlock"])(),Object(o["createBlock"])(p,null,{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(s,null,{default:Object(o["withCtx"])((function(){return[r]})),_:1}),Object(o["createVNode"])(p,null,{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(g,null,{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(d,{ref:"singleTable",data:l.ShopList,"highlight-current-row":"",onCurrentChange:i.handleCurrentChange,"max-height":"1000",style:{width:"30%"}},{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(h,{property:"ShopName",label:"Shops",width:"120"})]})),_:1},8,["data","onCurrentChange"])]})),_:1}),Object(o["createVNode"])(f,null,{default:Object(o["withCtx"])((function(){return[(Object(o["openBlock"])(!0),Object(o["createElementBlock"])(o["Fragment"],null,Object(o["renderList"])(l.CurrentMsg,(function(t){return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",{key:t.id,align:"left"},["108703031@nccu.edu.tw"===t.From?(Object(o["openBlock"])(),Object(o["createElementBlock"])("div",c,"You : "+Object(o["toDisplayString"])(t.Msg),1)):(Object(o["openBlock"])(),Object(o["createElementBlock"])("div",a,"shop"+Object(o["toDisplayString"])(t.From[7])+Object(o["toDisplayString"])(t.From[8])+":"+Object(o["toDisplayString"])(t.Msg),1))])})),128))]})),_:1})]})),_:1})]})),_:1})}n("e9c4");var l={data:function(){return{ShopList:[],CurrentRow:null,HistoryMsg:{},CurrentMsg:{}}},methods:{handleCurrentChange:function(t){this.CurrentRow=t,console.log("val,this.CurrentRow",this.CurrentRow),console.log(t.ShopID),this.CurrentMsg=this.HistoryMsg["1087030"+t.ShopID+"@nccu.edu.tw"],console.log("currentMsg",this.CurrentMsg)},getAllShopID:function(){var t=this;this.axios.get("http://127.0.0.1:9000/customer/getShopList",{params:{}}).then((function(e){var n=JSON.stringify(e.data),o=JSON.parse(n),r=o.data;console.log(r);for(var c=0;c<r.length;++c)t.ShopList.push({ShopID:r[c].ShopID,ShopName:r[c].ShopName})})).catch((function(t){console.log(t)})).then((function(){}))},getHistoryMsg:function(){var t=this;this.axios.get("http://127.0.0.1:9000/chat/getHistory",{params:{UserId:"108703031@nccu.edu.tw"}}).then((function(e){var n=JSON.stringify(e.data),o=JSON.parse(n);console.log(o),t.HistoryMsg=o})).catch((function(t){console.log(t)})).then((function(){}))}},created:function(){this.getAllShopID(),this.getHistoryMsg()}},i=n("6b0d"),s=n.n(i);const h=s()(l,[["render",u]]);e["default"]=h},e9c4:function(t,e,n){var o=n("23e7"),r=n("da84"),c=n("d066"),a=n("2ba4"),u=n("e330"),l=n("d039"),i=r.Array,s=c("JSON","stringify"),h=u(/./.exec),d=u("".charAt),g=u("".charCodeAt),f=u("".replace),p=u(1..toString),b=/[\uD800-\uDFFF]/g,O=/^[\uD800-\uDBFF]$/,j=/^[\uDC00-\uDFFF]$/,C=function(t,e,n){var o=d(n,e-1),r=d(n,e+1);return h(O,t)&&!h(j,r)||h(j,t)&&!h(O,o)?"\\u"+p(g(t,0),16):t},m=l((function(){return'"\\udf06\\ud834"'!==s("\udf06\ud834")||'"\\udead"'!==s("\udead")}));s&&o({target:"JSON",stat:!0,forced:m},{stringify:function(t,e,n){for(var o=0,r=arguments.length,c=i(r);o<r;o++)c[o]=arguments[o];var u=a(s,null,c);return"string"==typeof u?f(u,b,C):u}})}}]);
//# sourceMappingURL=chunk-2e95d7c4.js.map