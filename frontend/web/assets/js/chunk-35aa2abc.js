(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-35aa2abc"],{e9c4:function(e,t,n){var o=n("23e7"),r=n("da84"),c=n("d066"),s=n("2ba4"),a=n("e330"),i=n("d039"),l=r.Array,u=c("JSON","stringify"),h=a(/./.exec),g=a("".charAt),d=a("".charCodeAt),b=a("".replace),f=a(1..toString),p=/[\uD800-\uDFFF]/g,m=/^[\uD800-\uDBFF]$/,O=/^[\uDC00-\uDFFF]$/,j=function(e,t,n){var o=g(n,t-1),r=g(n,t+1);return h(m,e)&&!h(O,r)||h(O,e)&&!h(m,o)?"\\u"+f(d(e,0),16):e},C=i((function(){return'"\\udf06\\ud834"'!==u("\udf06\ud834")||'"\\udead"'!==u("\udead")}));u&&o({target:"JSON",stat:!0,forced:C},{stringify:function(e,t,n){for(var o=0,r=arguments.length,c=l(r);o<r;o++)c[o]=arguments[o];var a=s(u,null,c);return"string"==typeof a?b(a,p,j):a}})},f0ac:function(e,t,n){"use strict";n.r(t);n("d3b7"),n("25f0");var o=n("f2bf"),r=Object(o["createElementVNode"])("h2",null,"Chat Room",-1),c={key:0},s={key:1},a=Object(o["createTextVNode"])("send");function i(e,t,n,i,l,u){var h=this,g=Object(o["resolveComponent"])("el-header"),d=Object(o["resolveComponent"])("el-table-column"),b=Object(o["resolveComponent"])("el-table"),f=Object(o["resolveComponent"])("el-aside"),p=Object(o["resolveComponent"])("el-input"),m=Object(o["resolveComponent"])("el-button"),O=Object(o["resolveComponent"])("el-main"),j=Object(o["resolveComponent"])("el-container");return Object(o["openBlock"])(),Object(o["createBlock"])(j,null,{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(g,null,{default:Object(o["withCtx"])((function(){return[r]})),_:1}),Object(o["createVNode"])(j,null,{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(f,null,{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(b,{ref:"singleTable",data:l.ShopList,"highlight-current-row":"",onCurrentChange:u.handleCurrentChange,"max-height":"1000",style:{width:"30%"}},{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(d,{property:"ShopName",label:"Shops",width:"120"})]})),_:1},8,["data","onCurrentChange"])]})),_:1}),Object(o["createVNode"])(O,null,{default:Object(o["withCtx"])((function(){return[(Object(o["openBlock"])(!0),Object(o["createElementBlock"])(o["Fragment"],null,Object(o["renderList"])(l.CurrentMsg,(function(e){return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",{key:e.id,align:"left"},[e.From===h.firebase.auth().currentUser.email?(Object(o["openBlock"])(),Object(o["createElementBlock"])("div",c,"You : "+Object(o["toDisplayString"])(e.Msg),1)):(Object(o["openBlock"])(),Object(o["createElementBlock"])("div",s,Object(o["toDisplayString"])(l.CurrentRow.ShopName)+" : "+Object(o["toDisplayString"])(e.Msg),1))])})),128)),Object(o["createElementVNode"])("div",null,"message:"+Object(o["toDisplayString"])(l.message),1),Object(o["createVNode"])(p,{modelValue:l.tempMsg,"onUpdate:modelValue":t[0]||(t[0]=function(e){return l.tempMsg=e}),placeholder:"",style:{width:"500px"}},null,8,["modelValue"]),Object(o["createVNode"])(m,{onClick:t[1]||(t[1]=function(e){return u.publish("/chat/1087030"+(h.CurrentRow.ShopID-30).toString()+"@nccu.edu.tw",l.tempMsg)})},{default:Object(o["withCtx"])((function(){return[a]})),_:1})]})),_:1})]})),_:1})]})),_:1})}n("e9c4");var l={data:function(){return{ShopList:[],CurrentRow:null,HistoryMsg:[],CurrentMsg:[],message:"",tempMsg:""}},methods:{handleCurrentChange:function(e){this.CurrentRow=e,console.log("val,this.CurrentRow",this.CurrentRow),console.log(e.ShopID),this.CurrentMsg=this.HistoryMsg["1087030"+(e.ShopID-30).toString()+"@nccu.edu.tw"],console.log("currentMsg",this.CurrentMsg)},getAllShopID:function(){var e=this;this.axios.get("http://127.0.0.1:9000/customer/getShopList",{params:{}}).then((function(t){var n=JSON.stringify(t.data),o=JSON.parse(n),r=o.data;console.log(r);for(var c=0;c<r.length;++c)e.ShopList.push({ShopID:r[c].ShopID,ShopName:r[c].ShopName})})).catch((function(e){console.log(e)})).then((function(){}))},getHistoryMsg:function(){var e=this;this.axios.get("http://127.0.0.1:9000/chat/getHistory",{params:{UserId:this.firebase.auth().currentUser.email}}).then((function(t){var n=JSON.stringify(t.data),o=JSON.parse(n);console.log(o),e.HistoryMsg=o})).catch((function(e){console.log(e)})).then((function(){}))},connectBroker:function(){var e,t=this,o=n("e7fc"),r=o.connect("ws://localhost:8083/mqtt"),c=this.firebase.auth().currentUser.email;r.on("connect",(function(){console.log("Listen Method Connected"),r.subscribe("/chat/"+c,(function(){console.log("subscribed /chat/"+c)})),r.on("message",(function(n,o){e=JSON.parse(o.toString()),console.log(e),t.CurrentMsg.push(e)}))}))},publish:function(e,t){this.tempMsg="";var o=n("e7fc"),r=o.connect("ws://localhost:8083/mqtt"),c={Msg:t,From:this.firebase.auth().currentUser.email,Date:Date.now()};this.CurrentMsg.push(c),r.on("connect",(function(){console.log("Publish Method Connected"),r.publish(e,JSON.stringify(c),(function(){console.log("published ",c)}))}))}},created:function(){this.getAllShopID(),this.getHistoryMsg(),this.connectBroker()},watch:{message:function(e){console.log("Received Message: ",e),this.message=e}}},u=n("6b0d"),h=n.n(u);const g=h()(l,[["render",i]]);t["default"]=g}}]);
//# sourceMappingURL=chunk-35aa2abc.js.map