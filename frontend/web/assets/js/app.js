(function(e){function n(n){for(var r,o,u=n[0],i=n[1],l=n[2],f=0,h=[];f<u.length;f++)o=u[f],Object.prototype.hasOwnProperty.call(c,o)&&c[o]&&h.push(c[o][0]),c[o]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);d&&d(n);while(h.length)h.shift()();return a.push.apply(a,l||[]),t()}function t(){for(var e,n=0;n<a.length;n++){for(var t=a[n],r=!0,o=1;o<t.length;o++){var u=t[o];0!==c[u]&&(r=!1)}r&&(a.splice(n--,1),e=i(i.s=t[0]))}return e}var r={},o={app:0},c={app:0},a=[];function u(e){return i.p+"assets/js/"+({}[e]||e)+".js"}function i(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(e){var n=[],t={"chunk-2da5f458":1,"chunk-3c6b0b9f":1,"chunk-6f47be00":1,"chunk-83ab4e9c":1,"chunk-d1987436":1,"chunk-d4f7a81e":1,"chunk-f5df3bbc":1};o[e]?n.push(o[e]):0!==o[e]&&t[e]&&n.push(o[e]=new Promise((function(n,t){for(var r="assets/css/"+({}[e]||e)+".css",c=i.p+r,a=document.getElementsByTagName("link"),u=0;u<a.length;u++){var l=a[u],f=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(f===r||f===c))return n()}var h=document.getElementsByTagName("style");for(u=0;u<h.length;u++){l=h[u],f=l.getAttribute("data-href");if(f===r||f===c)return n()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=n,d.onerror=function(n){var r=n&&n.target&&n.target.src||c,a=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=r,delete o[e],d.parentNode.removeChild(d),t(a)},d.href=c;var p=document.getElementsByTagName("head")[0];p.appendChild(d)})).then((function(){o[e]=0})));var r=c[e];if(0!==r)if(r)n.push(r[2]);else{var a=new Promise((function(n,t){r=c[e]=[n,t]}));n.push(r[2]=a);var l,f=document.createElement("script");f.charset="utf-8",f.timeout=120,i.nc&&f.setAttribute("nonce",i.nc),f.src=u(e);var h=new Error;l=function(n){f.onerror=f.onload=null,clearTimeout(d);var t=c[e];if(0!==t){if(t){var r=n&&("load"===n.type?"missing":n.type),o=n&&n.target&&n.target.src;h.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",h.name="ChunkLoadError",h.type=r,h.request=o,t[1](h)}c[e]=void 0}};var d=setTimeout((function(){l({type:"timeout",target:f})}),12e4);f.onerror=f.onload=l,document.head.appendChild(f)}return Promise.all(n)},i.m=e,i.c=r,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)i.d(t,r,function(n){return e[n]}.bind(null,r));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="/web/",i.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],f=l.push.bind(l);l.push=n,l=l.slice();for(var h=0;h<l.length;h++)n(l[h]);var d=f;a.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"56d7":function(e,n,t){"use strict";t.r(n);t("e260"),t("e6cf"),t("cca6"),t("a79d");var r=t("f2bf");function o(e,n){var t=Object(r["resolveComponent"])("router-view");return Object(r["openBlock"])(),Object(r["createBlock"])(t)}t("b6b4");var c=t("6b0d"),a=t.n(c);const u={},i=a()(u,[["render",o]]);var l=i,f=(t("d3b7"),t("3ca3"),t("ddb0"),t("6c02")),h=Object(r["createTextVNode"])("Customer"),d=Object(r["createTextVNode"])("Manager");function p(e,n,t,o,c,a){var u=Object(r["resolveComponent"])("el-button");return Object(r["openBlock"])(),Object(r["createElementBlock"])("div",null,[Object(r["createVNode"])(u,{onClick:a.toCustomerLogin},{default:Object(r["withCtx"])((function(){return[h]})),_:1},8,["onClick"]),Object(r["createVNode"])(u,{onClick:a.toManagerLogin},{default:Object(r["withCtx"])((function(){return[d]})),_:1},8,["onClick"])])}var s={components:{},methods:{toCustomerLogin:function(){this.$router.push({name:"CustomerLogin"})},toManagerLogin:function(){this.$router.push({name:"ManagerLogin"})}}};const m=a()(s,[["render",p]]);var b,g=m,k=(t("256a"),[{path:"/",name:"Home",component:g},{path:"/customerLogin",name:"CustomerLogin",component:function(){return t.e("chunk-d4f7a81e").then(t.bind(null,"b245"))}},{path:"/managerLogin",name:"ManagerLogin",component:function(){return t.e("chunk-6f47be00").then(t.bind(null,"24a9"))}},{path:"/managerRegister",name:"ManagerRegister",component:function(){return t.e("chunk-2da5f458").then(t.bind(null,"4693"))}},{path:"/customerRegister",name:"CustomerRegister",component:function(){return t.e("chunk-d1987436").then(t.bind(null,"dce0"))}},{path:"/managerHome",name:"ManagerHome",component:function(){return t.e("chunk-43d8847f").then(t.bind(null,"4f51"))},children:[{path:"orderHistory",component:function(){return t.e("chunk-ae149bd8").then(t.bind(null,"a8b5"))}},{path:"tradeHistory",component:function(){return t.e("chunk-2a8629c7").then(t.bind(null,"2e0d"))}},{path:"order",component:function(){return t.e("chunk-7680e78a").then(t.bind(null,"c77f"))}},{path:"shop",name:"Shop",component:function(){return t.e("chunk-ce985490").then(t.bind(null,"3a91"))}},{path:"revenue",component:function(){return t.e("chunk-0980588a").then(t.bind(null,"988c"))}},{path:"chat",component:function(){return Promise.all([t.e("chunk-7cd0f927"),t.e("chunk-0fd3d6e3")]).then(t.bind(null,"8a11"))}}]},{path:"/customerHome",name:"CustomerHome",component:function(){return t.e("chunk-18d29e4a").then(t.bind(null,"cf00"))},children:[{path:"buy",name:"Buy",component:function(){return t.e("chunk-0e66bec1").then(t.bind(null,"57f1"))},meta:{requiresAuth:!0}},{path:"history",name:"History",component:function(){return t.e("chunk-83ab4e9c").then(t.bind(null,"caf6"))}},{path:"cart",name:"Cart",component:function(){return t.e("chunk-da4cc966").then(t.bind(null,"69ec"))}},{path:"chat",component:function(){return Promise.all([t.e("chunk-7cd0f927"),t.e("chunk-35aa2abc")]).then(t.bind(null,"f0ac"))}}]},{path:"/test",name:"Test",component:function(){return t.e("chunk-2d0d7fc5").then(t.bind(null,"78c1"))},children:[{path:"nn",component:function(){return t.e("chunk-f5df3bbc").then(t.bind(null,"94a7"))}},{path:"mark",component:function(){return t.e("chunk-3c6b0b9f").then(t.bind(null,"9cb7"))}},{path:"lin",component:function(){return Promise.all([t.e("chunk-7cd0f927"),t.e("chunk-2d0c0c73")]).then(t.bind(null,"42dc"))}},{path:"chang",component:function(){return Promise.all([t.e("chunk-7cd0f927"),t.e("chunk-2d0f0810")]).then(t.bind(null,"9d3b"))}},{path:"tsai",component:function(){return t.e("chunk-2e95d7c4").then(t.bind(null,"32f7"))}}]}]),v=Object(f["a"])({history:Object(f["b"])("/web/"),routes:k}),y=v,j=t("5502"),O=Object(j["a"])({state:{},mutations:{},actions:{},modules:{}}),C=t("c3a1"),w=(t("7437"),t("bc3a")),P=t.n(w),L=t("4f60"),S={apiKey:"AIzaSyDo2tXj0grmhufacfU44WmrCDIj2NNNwVQ",authDomain:"dbfinalproject-ff1dd.firebaseapp.com",projectId:"dbfinalproject-ff1dd",storageBucket:"dbfinalproject-ff1dd.appspot.com",messagingSenderId:"1026474221634",appId:"1:1026474221634:web:984ecefc2f68a53f724ddb"},x=L["a"].initializeApp(S);L["a"].auth().onAuthStateChanged((function(){b||(b=Object(r["createApp"])(l).use(O).use(y).use(C["a"]),b.config.globalProperties.axios=P.a,b.config.globalProperties.firebase=x,b.mount("#app"))}))},"62e7":function(e,n,t){},b6b4:function(e,n,t){"use strict";t("62e7")}});
//# sourceMappingURL=app.js.map