module.exports=function(e){var t={};function n(a){if(t[a])return t[a].exports;var l=t[a]={i:a,l:!1,exports:{}};return e[a].call(l.exports,l,l.exports,n),l.l=!0,l.exports}return n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:a})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n.w={},n(n.s=22)}([function(e,t){e.exports=require("react")},function(e,t){e.exports=require("react-router-dom")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Form=void 0;var a=r(n(0)),l=r(n(13));function r(e){return e&&e.__esModule?e:{default:e}}var i=t.Form=function(e){return a.default.createElement("form",{onSubmit:e.handleSubmit},a.default.createElement("br",null),a.default.createElement("div",{className:"row"},a.default.createElement("div",{className:"col-md-8"},a.default.createElement("div",{className:"form-group"},a.default.createElement("label",null,"Titel:"),a.default.createElement("input",{type:"text",name:"title",className:"form-control",value:e.title,onChange:e.handleInputChange,required:!0})))),a.default.createElement("div",{className:"row"},a.default.createElement("div",{className:"col-md-8"},a.default.createElement("div",{className:"form-group"},a.default.createElement("label",null,"Ny bild:"),a.default.createElement("input",{type:"file",name:"image",className:"form-control",onChange:e.handleInputChange,accept:"image/*"})))),a.default.createElement("div",{className:"row"},a.default.createElement("div",{className:"col-md-8"},a.default.createElement("label",null,"Nuvarande bild:"),a.default.createElement("br",null),e.preview&&a.default.createElement("img",{src:e.preview,height:"100",width:"150"}))),a.default.createElement("br",null),a.default.createElement("div",{className:"row"},a.default.createElement("div",{className:"col-md-8"},a.default.createElement("div",{className:"form-group"},a.default.createElement(l.default,{config:{height:300},model:e.text,onModelChange:e.handleTextChange})))),a.default.createElement("br",null),a.default.createElement("div",{className:"form-group"},a.default.createElement("button",{className:"btn btn-primary"},"Spara")))};t.default=i},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("multer")},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("mysql")},function(e,t){e.exports=require("body-parser")},function(e,t,n){"use strict";var a=n(3),l=n(8),r=n(7),i=a.Router(),u=n(6),o=n(4),c=n(5)({dest:"uploads/"});i.use(l.urlencoded({extended:!0})),i.use(l.json());var s=r.createConnection({host:"192.168.10.10",user:"homestead",password:"secret",database:"CRUD"});s.connect(function(e){e&&console.log("MySQL Error: "+e)}),i.get("/articles",function(e,t){s.query("SELECT * FROM articles",function(e,n,a){e&&console.log(e),t.send(n)})}),i.get("/articles/:id",function(e,t){var n=e.params.id;s.query("SELECT * FROM articles WHERE id=?",[n],function(e,n,a){e&&console.log(e),t.send(n)})}),i.post("/articles",c.single("image"),function(e,t){var n='INSERT INTO articles (title, text, image) VALUES("'+e.body.title+'", "'+e.body.text+'", "'+e.file.filename+'")';s.query(n,function(e,n,a){e&&console.log(e),t.send(n)})}),i.delete("/articles/:id",function(e,t){s.query("SELECT image FROM articles WHERE id="+e.params.id,function(e,t,n){e&&console.log(e),u.unlink("uploads/"+t[0].image,function(e){e&&console.log(e)})}),s.query("DELETE FROM articles WHERE id="+e.params.id,function(e,t,n){e&&console.log(e)}),s.query("SELECT * FROM articles",function(e,n,a){e&&console.log(e),t.send(n)})}),i.put("/articles/:id",c.single("image"),function(e,t){var n="UPDATE articles SET title=?, text=?, image=? WHERE id="+e.params.id;s.query(n,[e.body.title,e.body.text,e.file.filename],function(e,n,a){e&&console.log(e),t.send(n)})}),i.get("/image/:id",function(e,t){t.setHeader("Content-Type","image/png"),u.createReadStream(o.join("./uploads",e.params.id)).pipe(t)}),e.exports=i},function(e,t){e.exports=require("helmet")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.NotFoundPage=void 0;var a,l=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),r=n(0),i=(a=r)&&a.__esModule?a:{default:a},u=n(1);var o=t.NotFoundPage=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r.Component),l(t,[{key:"componentWillMount",value:function(){var e=this.props.staticContext;e&&(e.is404=!0)}},{key:"render",value:function(){return i.default.createElement("div",{className:"not-found"},i.default.createElement("h1",null,"404"),i.default.createElement("h2",null,"Page not found!"),i.default.createElement("p",null,i.default.createElement(u.Link,{to:"/"},"Go back to the main page")))}}]),t}();t.default=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CreateArticlePage=void 0;var a,l=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),r=n(0),i=(a=r)&&a.__esModule?a:{default:a},u=n(1),o=n(2);var c=t.CreateArticlePage=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={title:"",image:"",text:"",isSuccess:!1,preview:""},n.handleTextChange=n.handleTextChange.bind(n),n.handleInputChange=n.handleInputChange.bind(n),n.handleSubmit=n.handleSubmit.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.default.Component),l(t,[{key:"handleInputChange",value:function(e){var t=this,n=e.target,a="file"===n.type?n.files[0]:n.value,l=n.name;if("image"===l){var r=new FileReader,i=a;r.addEventListener("load",function(){t.setState({preview:r.result})},!1),i&&r.readAsDataURL(i)}this.setState(function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}({},l,a))}},{key:"handleTextChange",value:function(e){this.setState({text:e})}},{key:"handleSubmit",value:function(e){var t=this;e.preventDefault();var n=new FormData;n.append("title",this.state.title),n.append("image",this.state.image),n.append("text",this.state.text),fetch("/api/articles",{method:"post",body:n}).then(function(e){e.ok&&t.setState({title:"",text:"",image:"",preview:"",isSuccess:!0})})}},{key:"render",value:function(){return i.default.createElement("div",null,i.default.createElement("h1",null,"Skapa artikel"),i.default.createElement("br",null),i.default.createElement(u.Link,{to:"/",className:"btn btn-info"},"Visa artiklar"),this.state.isSuccess&&i.default.createElement("div",{className:"alert alert-success",style:{marginTop:20,marginBottom:10}},i.default.createElement("button",{type:"button",className:"close","data-dismiss":"alert"},"×"),i.default.createElement("strong",null,"Success!")," Artikeln sparades."),i.default.createElement(o.Form,{title:this.state.title,text:this.state.text,preview:this.state.preview,handleInputChange:this.handleInputChange,handleTextChange:this.handleTextChange,handleSubmit:this.handleSubmit}))}}]),t}();t.default=c},function(e,t){e.exports=require("react-froala-wysiwyg")},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.UpdateArticlePage=void 0;var a,l=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),r=n(0),i=(a=r)&&a.__esModule?a:{default:a},u=n(1),o=n(2);var c=t.UpdateArticlePage=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={title:"",preview:"",text:"",isSuccess:!1,image:"",isLoading:!0},n.handleInputChange=n.handleInputChange.bind(n),n.handleTextChange=n.handleTextChange.bind(n),n.handleSubmit=n.handleSubmit.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.default.Component),l(t,[{key:"componentDidMount",value:function(){var e=this;fetch("/api/articles/"+this.props.match.params.id).then(function(e){return e.json()}).then(function(t){e.setState({title:t[0].title,image:t[0].image,text:t[0].text,preview:"/api/image/"+t[0].image,isLoading:!1})})}},{key:"handleInputChange",value:function(e){var t=this,n=e.target,a="file"===n.type?n.files[0]:n.value,l=n.name;if("image"===l){var r=new FileReader,i=a;r.addEventListener("load",function(){t.setState({preview:r.result})},!1),i&&r.readAsDataURL(i)}this.setState(function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}({},l,a))}},{key:"handleTextChange",value:function(e){this.setState({text:e})}},{key:"handleSubmit",value:function(e){var t=this;e.preventDefault();var n=new FormData;n.append("title",this.state.title),n.append("image",this.state.image),n.append("text",this.state.text),fetch("/api/articles/"+this.props.match.params.id,{method:"put",body:n}).then(function(e){e.ok?t.setState({isSuccess:!0}):console.log(e)})}},{key:"render",value:function(){return this.state.isLoading?i.default.createElement("div",null,i.default.createElement("h1",null,"Loading...")):i.default.createElement("div",null,i.default.createElement("h1",null,"Uppdatera artikel"),i.default.createElement("br",null),i.default.createElement(u.Link,{to:"/",className:"btn btn-info"},"Tillbaka"),i.default.createElement("br",null),this.state.isSuccess&&i.default.createElement("div",{className:"alert alert-success"},i.default.createElement("button",{type:"button",className:"close","data-dismiss":"alert"},"×"),i.default.createElement("strong",null,"Success!")," Artikeln uppdaterades."),i.default.createElement(o.Form,{title:this.state.title,text:this.state.text,preview:this.state.preview,handleInputChange:this.handleInputChange,handleTextChange:this.handleTextChange,handleSubmit:this.handleSubmit}))}}]),t}();t.default=c},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.TableRow=void 0;var a,l=n(0),r=(a=l)&&a.__esModule?a:{default:a},i=n(1);var u=t.TableRow=function(e){return r.default.createElement("tr",null,r.default.createElement("td",null,e.obj.id),r.default.createElement("td",null,e.obj.title),r.default.createElement("td",null,e.obj.created_at&&e.obj.created_at.replace("T"," ").split(".")[0]),r.default.createElement("td",null,r.default.createElement(i.Link,{to:"/articles/"+e.obj.id,className:"btn btn-primary"},"Edit"),r.default.createElement("button",{id:e.obj.id,onClick:e.handleDelete,className:"btn btn-danger"},"Delete")))};t.default=u},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.IndexPage=void 0;var a,l=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),r=n(0),i=(a=r)&&a.__esModule?a:{default:a},u=n(15);var o=t.IndexPage=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={articles:"",isLoading:!0},n.tableRow=n.tableRow.bind(n),n.handleDelete=n.handleDelete.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r.Component),l(t,[{key:"componentDidMount",value:function(){var e=this;fetch("/api/articles").then(function(e){return e.json()}).then(function(t){e.setState({articles:t,isLoading:!1})})}},{key:"tableRow",value:function(){var e=this;if(this.state.articles instanceof Array)return this.state.articles.map(function(t,n){return i.default.createElement(u.TableRow,{obj:t,key:n,handleDelete:e.handleDelete})})}},{key:"handleDelete",value:function(e){var t=this;fetch("/api/articles/"+e.target.id,{method:"delete",headers:{"Content-Type":"application/json"}}).then(function(e){if(e.ok)return e.json()}).then(function(e){t.setState({articles:e})})}},{key:"render",value:function(){return this.state.isLoading?i.default.createElement("div",null,i.default.createElement("h1",null,"Loading...")):i.default.createElement("div",null,i.default.createElement("h1",null,"Artiklar"),i.default.createElement("br",null),i.default.createElement("table",{className:"table table-hover"},i.default.createElement("thead",null,i.default.createElement("tr",null,i.default.createElement("td",null,i.default.createElement("b",null,"ID")),i.default.createElement("td",null,i.default.createElement("b",null,"Titel")),i.default.createElement("td",null,i.default.createElement("b",null,"Senast ändrad")),i.default.createElement("td",null))),i.default.createElement("tbody",null,this.tableRow())))}}]),t}();t.default=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.NavBar=void 0;var a,l=n(0),r=(a=l)&&a.__esModule?a:{default:a},i=n(1);var u=t.NavBar=function(){return r.default.createElement("nav",{className:"navbar navbar-expand-sm bg-dark navbar-dark"},r.default.createElement("ul",{className:"navbar-nav"},r.default.createElement("li",{className:"nav-item"},r.default.createElement(i.NavLink,{to:"/",className:"navbar-brand"},"CRUD")),r.default.createElement("li",{className:"nav-item"},r.default.createElement(i.NavLink,{to:"/",exact:!0,className:"nav-link"},"Visa artiklar")),r.default.createElement("li",{className:"nav-item"},r.default.createElement(i.NavLink,{to:"/articles/add",className:"nav-link"},"Skapa artikel"))))};t.default=u},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Layout=void 0;var a,l=n(0),r=(a=l)&&a.__esModule?a:{default:a},i=n(17);var u=t.Layout=function(e){return r.default.createElement("div",{className:"container"},r.default.createElement("header",null,r.default.createElement(i.NavBar,null)),r.default.createElement("br",null),r.default.createElement("div",{className:"container"},e.children))};t.default=u},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.App=void 0;var a,l=n(0),r=(a=l)&&a.__esModule?a:{default:a},i=n(1),u=n(18),o=n(16),c=n(14),s=n(12),d=n(11);var f=t.App=function(){return r.default.createElement(u.Layout,null,r.default.createElement(i.Switch,null,r.default.createElement(i.Route,{exact:!0,path:"/",component:o.IndexPage}),r.default.createElement(i.Route,{exact:!0,path:"/articles/add",component:s.CreateArticlePage}),r.default.createElement(i.Route,{exact:!0,path:"/articles/:id",component:c.UpdateArticlePage}),r.default.createElement(i.Route,{component:d.NotFoundPage})))};t.default=f},function(e,t){e.exports=require("react-dom/server")},function(e,t){e.exports=require("http")},function(e,t,n){"use strict";var a=d(n(4)),l=n(21),r=d(n(3)),i=d(n(0)),u=n(20),o=n(1),c=n(19),s=d(n(10));function d(e){return e&&e.__esModule?e:{default:e}}var f=n(9),m=new r.default,p=new l.Server(m);m.set("view engine","ejs"),m.set("views",a.default.join(__dirname,"views")),m.use(r.default.static(a.default.join(__dirname,"static"))),m.use((0,s.default)()),m.use("/api",f),m.get("*",function(e,t){var n,a=200,l={};return n=(0,u.renderToString)(i.default.createElement(o.StaticRouter,{location:e.url,context:l},i.default.createElement(c.App,null))),l.url?t.redirect(302,l.url):(l.is404&&(a=404),t.status(a).render("index",{markup:n}))});var h=process.env.PORT||3e3;p.listen(h,function(e){return e?console.error(e):console.info("Server running on http://localhost:"+h)})}]);