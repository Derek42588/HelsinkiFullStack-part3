(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var r=t(0),a=t.n(r),o=t(13),c=t.n(o),u=t(14),l=t(2),i=function(e){return a.a.createElement("div",null,"filter shown with ",a.a.createElement("input",{value:e.newFilter,onChange:e.handleFilterChange}))},m=function(e){return a.a.createElement("div",null,a.a.createElement("form",{onSubmit:e.addPerson},a.a.createElement("div",null,"name:",a.a.createElement("input",{value:e.newName,onChange:e.handleNameChange})),a.a.createElement("div",null,"number:",a.a.createElement("input",{value:e.newNumber,onChange:e.handleNumberChange})),a.a.createElement("div",null,a.a.createElement("button",{type:"submit"},"add"))))},s=function(e){var n=e.person,t=e.removePersonHandler;return a.a.createElement("li",null," ",n.name," ",n.number," ",a.a.createElement("button",{onClick:t},"delete"))},f=function(e){var n=""===e.newFilter?e.persons:e.persons.filter((function(n){return n.name.toLowerCase().includes(e.newFilter.toLowerCase())}));return a.a.createElement("div",null,n.map((function(n){return a.a.createElement(s,{key:n.name,person:n,removePersonHandler:function(){return e.removePersonHandler(n.id,n.name)}})})))},d=t(3),b=t.n(d),h="/api/persons",p=function(){return b.a.get(h).then((function(e){return e.data}))},v=function(e){return b.a.post(h,e).then((function(e){return e.data}))},O=function(e){return b.a.delete("".concat(h,"/").concat(e)).then((function(e){return e.data}))},w=function(e,n){return b.a.put("".concat(h,"/").concat(e),n).then((function(e){return e.data}))},E=function(e){var n=e.message,t=e.messageType;return null===n?null:a.a.createElement("div",{className:t},n)};function g(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}var j=function(){var e=Object(r.useState)([]),n=Object(l.a)(e,2),t=n[0],o=n[1],c=Object(r.useState)(""),s=Object(l.a)(c,2),d=s[0],b=s[1],h=Object(r.useState)(""),j=Object(l.a)(h,2),y=j[0],P=j[1],C=Object(r.useState)(""),k=Object(l.a)(C,2),N=k[0],S=k[1],F=Object(r.useState)(null),T=Object(l.a)(F,2),D=T[0],H=T[1],I=Object(r.useState)(""),J=Object(l.a)(I,2),L=J[0],Y=J[1];Object(r.useEffect)((function(){p().then((function(e){o(e)}))}),[]);return a.a.createElement("div",null,a.a.createElement("h2",null,"Phonebook"),a.a.createElement(E,{message:D,messageType:L}),a.a.createElement(i,{newFilter:N,handleFilterChange:function(e){S(e.target.value)}}),a.a.createElement("h3",null,"add a new"),a.a.createElement(m,{addPerson:function(e){e.preventDefault();var n={name:d,number:y};if(t.map((function(e){return e.name})).includes(d)){if(console.log("have one"),window.confirm("".concat(d," is already in the phonebook, replace the old number with a new one?"))){var r=t.find((function(e){return e.name===d})),a=function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?g(t,!0).forEach((function(n){Object(u.a)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):g(t).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}({},r,{number:y});w(r.id,a).then((function(e){Y("success"),H("Changed ".concat(a.name,"'s number to ").concat(a.number)),setTimeout((function(){H(null)}),5e3),o(t.map((function(n){return n.id!==r.id?n:e}))),b(""),P("")})).catch((function(e){H("Information of ".concat(a.name," has already been removed from server")),Y("error"),setTimeout((function(){H(null)}),5e3),o(t.filter((function(e){return e.name!==a.name})))}))}}else""===d?alert("You must enter a name!"):""===y?alert("You must enter a number!"):v(n).then((function(e){Y("success"),H("Added ".concat(n.name)),setTimeout((function(){H(null)}),5e3),o(t.concat(e)),b(""),P("")}))},newName:d,handleNameChange:function(e){b(e.target.value)},newNumber:y,handleNumberChange:function(e){P(e.target.value)}}),a.a.createElement("h2",null,"Numbers"),a.a.createElement(f,{persons:t,newFilter:N,removePersonHandler:function(e,n){window.confirm("Delete ".concat(n," ?"))&&O(e).then((function(){Y("success"),H("Removed ".concat(n," from phonebook")),setTimeout((function(){H(null)}),5e3),o(t.filter((function(n){return n.id!==e}))),b(""),P("")})).catch((function(r){H("Information of ".concat(n," has already been removed from server")),Y("error"),setTimeout((function(){H(null)}),5e3),o(t.filter((function(n){return n.id!==e})))}))}}))};t(37);c.a.render(a.a.createElement(j,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.d68e543c.chunk.js.map