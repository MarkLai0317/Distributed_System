(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f5df3bbc"],{"2d86":function(e,t,a){"use strict";a("9476")},9476:function(e,t,a){},"94a7":function(e,t,a){"use strict";a.r(t);var r=a("f2bf"),o=Object(r["createElementVNode"])("p",null,"Order history",-1),n=Object(r["createElementVNode"])("p",null,null,-1),i=Object(r["createElementVNode"])("p",null,null,-1),c={class:"grid-content"},l={class:"grid-content"},s={class:"grid-content"},d=Object(r["createElementVNode"])("p",null,null,-1);function h(e,t,a,h,u,p){var b=Object(r["resolveComponent"])("el-col"),O=Object(r["resolveComponent"])("el-row"),g=Object(r["resolveComponent"])("el-header"),j=Object(r["resolveComponent"])("el-table-column"),m=Object(r["resolveComponent"])("el-table"),f=Object(r["resolveComponent"])("el-main"),N=Object(r["resolveComponent"])("el-container"),C=Object(r["resolveComponent"])("el-pagination");return Object(r["openBlock"])(),Object(r["createElementBlock"])("div",null,[Object(r["createVNode"])(N,null,{default:Object(r["withCtx"])((function(){return[o,n,Object(r["createVNode"])(g,null,{default:Object(r["withCtx"])((function(){return[i,Object(r["createVNode"])(O,{gutter:30,justify:"start"},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(b,{span:2},{default:Object(r["withCtx"])((function(){return[Object(r["createElementVNode"])("div",c,Object(r["toDisplayString"])(u.order.Date),1)]})),_:1}),Object(r["createVNode"])(b,{span:4,offset:0},{default:Object(r["withCtx"])((function(){return[Object(r["createElementVNode"])("div",l,"ID:"+Object(r["toDisplayString"])(u.order.Oid),1)]})),_:1}),Object(r["createVNode"])(b,{span:3,offset:0},{default:Object(r["withCtx"])((function(){return[Object(r["createElementVNode"])("div",s,"$"+Object(r["toDisplayString"])(u.order.Price),1)]})),_:1})]})),_:1})]})),_:1}),Object(r["createVNode"])(f,null,{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(m,{data:u.table},{default:Object(r["withCtx"])((function(){return[Object(r["createVNode"])(j,{prop:"ProductName",label:"Name",width:"220"}),Object(r["createVNode"])(j,{prop:"ShopName",label:"Shop",width:"150"}),Object(r["createVNode"])(j,{prop:"Num",label:"Number",width:"80"}),Object(r["createVNode"])(j,{prop:"Price",label:"Price",width:"100"})]})),_:1},8,["data"])]})),_:1}),d]})),_:1}),Object(r["createVNode"])(C,{background:"",layout:"prev, pager, next","page-size":u.pageSize,total:this.table.length,onCurrentChange:e.setPage},null,8,["page-size","total","onCurrentChange"])])}var u={data(){return{CustomerID:this.firebase.auth().currentUser.email,page:1,pageSize:1,order:{Date:"haha",Oid:"123123",Price:1111},table:[]}},methods:{lastPage(){this.page-1>0&&(this.page-=1),this.axios.get("http://127.0.0.1:9000/nn/history",{params:{CustomerID:this.CustomerID,page:this.page}}).then(e=>{let t=JSON.stringify(e.data),a=JSON.parse(t);this.table=a,this.order.Date=a.data[0].Time.split(" ")[0],this.order.Oid=a.data[0].HistoryID,this.order.Price=a.data[0].TotalPrice,this.table=a.data[0].PurchaseHistory}).catch(e=>{console.log(e)}).then((function(){})),console.log("last page")},nextPage(){this.page+1>0&&(this.page+=1),this.axios.get("http://127.0.0.1:9000/nn/history",{params:{CustomerID:this.CustomerID,page:this.page}}).then(e=>{let t=JSON.stringify(e.data),a=JSON.parse(t);this.table=a,this.order.Date=a.data[0].Time.split(" ")[0],this.order.Oid=a.data[0].HistoryID,this.order.Price=a.data[0].TotalPrice,this.table=a.data[0].PurchaseHistory}).catch(e=>{console.log(e)}).then((function(){})),console.log("next page")}},created(){this.page=1,this.axios.get("http://127.0.0.1:9000/nn/history",{params:{CustomerID:this.CustomerID,page:this.page}}).then(e=>{let t=JSON.stringify(e.data),a=JSON.parse(t);this.table=a,this.order.Date=a.data[0].Time.split(" ")[0],this.order.Oid=a.data[0].HistoryID,this.order.Price=a.data[0].TotalPrice,this.table=a.data[0].PurchaseHistory}).catch(e=>{console.log(e)}).then((function(){})),console.log("created")}},p=(a("2d86"),a("6b0d")),b=a.n(p);const O=b()(u,[["render",h]]);t["default"]=O}}]);
//# sourceMappingURL=chunk-f5df3bbc.js.map