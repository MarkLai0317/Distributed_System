(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2da5f458"],{"00b4":function(e,t,r){"use strict";r("ac1f");var n=r("23e7"),a=r("da84"),o=r("c65b"),c=r("e330"),i=r("1626"),s=r("861d"),u=function(){var e=!1,t=/[ac]/;return t.exec=function(){return e=!0,/./.exec.apply(this,arguments)},!0===t.test("abc")&&e}(),l=a.Error,d=c(/./.test);n({target:"RegExp",proto:!0,forced:!u},{test:function(e){var t=this.exec;if(!i(t))return d(this,e);var r=o(t,this,e);if(null!==r&&!s(r))throw new l("RegExp exec method returned something other than an Object or null");return!!r}})},"0cb2":function(e,t,r){var n=r("e330"),a=r("7b0b"),o=Math.floor,c=n("".charAt),i=n("".replace),s=n("".slice),u=/\$([$&'`]|\d{1,2}|<[^>]*>)/g,l=/\$([$&'`]|\d{1,2})/g;e.exports=function(e,t,r,n,d,p){var f=r+e.length,h=n.length,b=l;return void 0!==d&&(d=a(d),b=u),i(p,b,(function(a,i){var u;switch(c(i,0)){case"$":return"$";case"&":return e;case"`":return s(t,0,r);case"'":return s(t,f);case"<":u=d[s(i,1,-1)];break;default:var l=+i;if(0===l)return a;if(l>h){var p=o(l/10);return 0===p?a:p<=h?void 0===n[p-1]?c(i,1):n[p-1]+c(i,1):a}u=n[l-1]}return void 0===u?"":u}))}},"107c":function(e,t,r){var n=r("d039"),a=r("da84"),o=a.RegExp;e.exports=n((function(){var e=o("(?<a>b)","g");return"b"!==e.exec("b").groups.a||"bc"!=="b".replace(e,"$<a>c")}))},"14c3":function(e,t,r){var n=r("da84"),a=r("c65b"),o=r("825a"),c=r("1626"),i=r("c6b6"),s=r("9263"),u=n.TypeError;e.exports=function(e,t){var r=e.exec;if(c(r)){var n=a(r,e,t);return null!==n&&o(n),n}if("RegExp"===i(e))return a(s,e,t);throw u("RegExp#exec called on incompatible receiver")}},4693:function(e,t,r){"use strict";r.r(t);r("b0c0");var n=r("f2bf"),a={key:0,class:"error"},o=Object(n["createTextVNode"])(" Register "),c={class:"email"},i={class:"user name"},s={class:"password"},u={key:0,class:"error"},l={class:"password"},d={class:"phoneNumber"},p={class:"shopName"},f={key:0,class:"error"},h=["disabled"];function b(e,t,r,b,v,m){return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",null,[v.error?(Object(n["openBlock"])(),Object(n["createElementBlock"])("div",a,Object(n["toDisplayString"])(v.error.message),1)):Object(n["createCommentVNode"])("",!0),Object(n["createElementVNode"])("form",{onSubmit:t[6]||(t[6]=Object(n["withModifiers"])((function(){return m.pressed&&m.pressed.apply(m,arguments)}),["prevent"]))},[o,Object(n["createElementVNode"])("div",c,[Object(n["withDirectives"])(Object(n["createElementVNode"])("input",{type:"email","onUpdate:modelValue":t[0]||(t[0]=function(e){return v.email=e}),placeholder:"email"},null,512),[[n["vModelText"],v.email]])]),Object(n["createElementVNode"])("div",i,[Object(n["withDirectives"])(Object(n["createElementVNode"])("input",{type:"name","onUpdate:modelValue":t[1]||(t[1]=function(e){return v.name=e}),placeholder:"name"},null,512),[[n["vModelText"],v.name]])]),Object(n["createElementVNode"])("div",s,[Object(n["withDirectives"])(Object(n["createElementVNode"])("input",{type:"password","onUpdate:modelValue":t[2]||(t[2]=function(e){return v.password=e}),placeholder:"password"},null,512),[[n["vModelText"],v.password]]),m.passwordNotConsistent?(Object(n["openBlock"])(),Object(n["createElementBlock"])("div",u,"password not consistent")):Object(n["createCommentVNode"])("",!0)]),Object(n["createElementVNode"])("div",l,[Object(n["withDirectives"])(Object(n["createElementVNode"])("input",{type:"password","onUpdate:modelValue":t[3]||(t[3]=function(e){return v.passwordConfirm=e}),placeholder:"password confirm"},null,512),[[n["vModelText"],v.passwordConfirm]])]),Object(n["createElementVNode"])("div",d,[Object(n["withDirectives"])(Object(n["createElementVNode"])("input",{type:"phone Number",placeholder:"phoneNumber","onUpdate:modelValue":t[4]||(t[4]=function(e){return v.phoneNumber=e})},null,512),[[n["vModelText"],v.phoneNumber]])]),Object(n["createElementVNode"])("div",p,[Object(n["withDirectives"])(Object(n["createElementVNode"])("input",{placeholder:"Shop Name","onUpdate:modelValue":t[5]||(t[5]=function(e){return v.shopName=e})},null,512),[[n["vModelText"],v.shopName]])]),v.error?(Object(n["openBlock"])(),Object(n["createElementBlock"])("div",f,Object(n["toDisplayString"])(v.error),1)):Object(n["createCommentVNode"])("",!0),Object(n["createElementVNode"])("button",{type:"submit",disabled:m.registerDisable},"Register",8,h)],32)])}r("ac1f"),r("00b4"),r("e9c4"),r("5319");var v=r("4f60"),m=(r("ea7b"),{data:function(){return{email:"",name:"",password:"",passwordConfirm:"",phoneNumber:"",shopName:"",error:""}},computed:{registerDisable:function(){return!(this.password==this.passwordConfirm)||""==this.password||""==this.email||""==this.phoneNumber||10!=this.phoneNumber.length||!/^\d+$/.test(this.phoneNumber)||""==this.name},passwordNotConsistent:function(){return!(this.password==this.passwordConfirm)}},methods:{pressed:function(){this.checkExist()},addToDatabase:function(){this.axios.post("http://127.0.0.1:9000/manager/register/Manager",{ManagerID:this.email,Name:this.name,PhoneNum:this.phoneNumber,ShopName:this.ShopName}).then((function(e){console.log(e)})).catch((function(e){console.log(e)}))},checkExist:function(){var e=this;return this.axios.get("http://127.0.0.1:9000/manager/existManager",{params:{email:this.email}}).then((function(t){var r=JSON.stringify(t.data),n=JSON.parse(r);n.exist?e.error="email exist":(e.addToDatabase(),v["a"].auth().createUserWithEmailAndPassword(e.email,e.password).then((function(){console.log("here"),e.$router.replace({name:"ManagerHome"})})).catch((function(t){return e.error=t})))})).catch((function(e){console.log(e)})).then((function(){}))}}}),g=(r("7248"),r("6b0d")),x=r.n(g);const N=x()(m,[["render",b],["__scopeId","data-v-2d5887c6"]]);t["default"]=N},5319:function(e,t,r){"use strict";var n=r("2ba4"),a=r("c65b"),o=r("e330"),c=r("d784"),i=r("d039"),s=r("825a"),u=r("1626"),l=r("5926"),d=r("50c4"),p=r("577e"),f=r("1d80"),h=r("8aa5"),b=r("dc4a"),v=r("0cb2"),m=r("14c3"),g=r("b622"),x=g("replace"),N=Math.max,O=Math.min,w=o([].concat),E=o([].push),j=o("".indexOf),y=o("".slice),I=function(e){return void 0===e?e:String(e)},V=function(){return"$0"==="a".replace(/./,"$0")}(),k=function(){return!!/./[x]&&""===/./[x]("a","$0")}(),S=!i((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")}));c("replace",(function(e,t,r){var o=k?"$":"$0";return[function(e,r){var n=f(this),o=void 0==e?void 0:b(e,x);return o?a(o,e,n,r):a(t,p(n),e,r)},function(e,a){var c=s(this),i=p(e);if("string"==typeof a&&-1===j(a,o)&&-1===j(a,"$<")){var f=r(t,c,i,a);if(f.done)return f.value}var b=u(a);b||(a=p(a));var g=c.global;if(g){var x=c.unicode;c.lastIndex=0}var V=[];while(1){var k=m(c,i);if(null===k)break;if(E(V,k),!g)break;var S=p(k[0]);""===S&&(c.lastIndex=h(i,d(c.lastIndex),x))}for(var D="",R=0,$=0;$<V.length;$++){k=V[$];for(var C=p(k[0]),M=N(O(l(k.index),i.length),0),T=[],A=1;A<k.length;A++)E(T,I(k[A]));var B=k.groups;if(b){var F=w([C],T,M,i);void 0!==B&&E(F,B);var U=p(n(a,void 0,F))}else U=v(C,i,M,T,B,a);M>=R&&(D+=y(i,R,M)+U,R=M+C.length)}return D+y(i,R)}]}),!S||!V||k)},7248:function(e,t,r){"use strict";r("833b")},"833b":function(e,t,r){},"8aa5":function(e,t,r){"use strict";var n=r("6547").charAt;e.exports=function(e,t,r){return t+(r?n(e,t).length:1)}},9263:function(e,t,r){"use strict";var n=r("c65b"),a=r("e330"),o=r("577e"),c=r("ad6d"),i=r("9f7f"),s=r("5692"),u=r("7c73"),l=r("69f3").get,d=r("fce3"),p=r("107c"),f=s("native-string-replace",String.prototype.replace),h=RegExp.prototype.exec,b=h,v=a("".charAt),m=a("".indexOf),g=a("".replace),x=a("".slice),N=function(){var e=/a/,t=/b*/g;return n(h,e,"a"),n(h,t,"a"),0!==e.lastIndex||0!==t.lastIndex}(),O=i.BROKEN_CARET,w=void 0!==/()??/.exec("")[1],E=N||w||O||d||p;E&&(b=function(e){var t,r,a,i,s,d,p,E=this,j=l(E),y=o(e),I=j.raw;if(I)return I.lastIndex=E.lastIndex,t=n(b,I,y),E.lastIndex=I.lastIndex,t;var V=j.groups,k=O&&E.sticky,S=n(c,E),D=E.source,R=0,$=y;if(k&&(S=g(S,"y",""),-1===m(S,"g")&&(S+="g"),$=x(y,E.lastIndex),E.lastIndex>0&&(!E.multiline||E.multiline&&"\n"!==v(y,E.lastIndex-1))&&(D="(?: "+D+")",$=" "+$,R++),r=new RegExp("^(?:"+D+")",S)),w&&(r=new RegExp("^"+D+"$(?!\\s)",S)),N&&(a=E.lastIndex),i=n(h,k?r:E,$),k?i?(i.input=x(i.input,R),i[0]=x(i[0],R),i.index=E.lastIndex,E.lastIndex+=i[0].length):E.lastIndex=0:N&&i&&(E.lastIndex=E.global?i.index+i[0].length:a),w&&i&&i.length>1&&n(f,i[0],r,(function(){for(s=1;s<arguments.length-2;s++)void 0===arguments[s]&&(i[s]=void 0)})),i&&V)for(i.groups=d=u(null),s=0;s<V.length;s++)p=V[s],d[p[0]]=i[p[1]];return i}),e.exports=b},"9f7f":function(e,t,r){var n=r("d039"),a=r("da84"),o=a.RegExp,c=n((function(){var e=o("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),i=c||n((function(){return!o("a","y").sticky})),s=c||n((function(){var e=o("^r","gy");return e.lastIndex=2,null!=e.exec("str")}));e.exports={BROKEN_CARET:s,MISSED_STICKY:i,UNSUPPORTED_Y:c}},ac1f:function(e,t,r){"use strict";var n=r("23e7"),a=r("9263");n({target:"RegExp",proto:!0,forced:/./.exec!==a},{exec:a})},ad6d:function(e,t,r){"use strict";var n=r("825a");e.exports=function(){var e=n(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},b0c0:function(e,t,r){var n=r("83ab"),a=r("5e77").EXISTS,o=r("e330"),c=r("9bf2").f,i=Function.prototype,s=o(i.toString),u=/function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/,l=o(u.exec),d="name";n&&!a&&c(i,d,{configurable:!0,get:function(){try{return l(u,s(this))[1]}catch(e){return""}}})},d784:function(e,t,r){"use strict";r("ac1f");var n=r("e330"),a=r("6eeb"),o=r("9263"),c=r("d039"),i=r("b622"),s=r("9112"),u=i("species"),l=RegExp.prototype;e.exports=function(e,t,r,d){var p=i(e),f=!c((function(){var t={};return t[p]=function(){return 7},7!=""[e](t)})),h=f&&!c((function(){var t=!1,r=/a/;return"split"===e&&(r={},r.constructor={},r.constructor[u]=function(){return r},r.flags="",r[p]=/./[p]),r.exec=function(){return t=!0,null},r[p](""),!t}));if(!f||!h||r){var b=n(/./[p]),v=t(p,""[e],(function(e,t,r,a,c){var i=n(e),s=t.exec;return s===o||s===l.exec?f&&!c?{done:!0,value:b(t,r,a)}:{done:!0,value:i(r,t,a)}:{done:!1}}));a(String.prototype,e,v[0]),a(l,p,v[1])}d&&s(l[p],"sham",!0)}},e9c4:function(e,t,r){var n=r("23e7"),a=r("da84"),o=r("d066"),c=r("2ba4"),i=r("e330"),s=r("d039"),u=a.Array,l=o("JSON","stringify"),d=i(/./.exec),p=i("".charAt),f=i("".charCodeAt),h=i("".replace),b=i(1..toString),v=/[\uD800-\uDFFF]/g,m=/^[\uD800-\uDBFF]$/,g=/^[\uDC00-\uDFFF]$/,x=function(e,t,r){var n=p(r,t-1),a=p(r,t+1);return d(m,e)&&!d(g,a)||d(g,e)&&!d(m,n)?"\\u"+b(f(e,0),16):e},N=s((function(){return'"\\udf06\\ud834"'!==l("\udf06\ud834")||'"\\udead"'!==l("\udead")}));l&&n({target:"JSON",stat:!0,forced:N},{stringify:function(e,t,r){for(var n=0,a=arguments.length,o=u(a);n<a;n++)o[n]=arguments[n];var i=c(l,null,o);return"string"==typeof i?h(i,v,x):i}})},ea7b:function(e,t,r){"use strict";r("2ac4"),r("1fd5"),r("589b"),r("e691"),r("22e5")},fce3:function(e,t,r){var n=r("d039"),a=r("da84"),o=a.RegExp;e.exports=n((function(){var e=o(".","s");return!(e.dotAll&&e.exec("\n")&&"s"===e.flags)}))}}]);
//# sourceMappingURL=chunk-2da5f458.js.map