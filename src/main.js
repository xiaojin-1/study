// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible/flexible.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
import Bridge from './config/bridge.js'
Vue.prototype.$bridge = Bridge
//axios全局配置
let token = ''
let userCode = ''
let model = ' '
let version = ''
let dataobj = ''

function setupWebViewJavascriptBridge(callback) {
  // alert(callback,1456)
var bridge=window.WebViewJavascriptBridge||window.WKWebViewJavascriptBridge
if (bridge) { return callback(bridge); }
var callbacks=window.WVJBCallbacks||window.WKWVJBCallbacks
if (callbacks) { return callbacks.push(callback); }
window.WVJBCallbacks=window.WKWVJBCallbacks = [callback];
if(window.WKWebViewJavascriptBridge){
  window.webkit.messageHandlers.iOS_Native_InjectJavascript.postMessage(null)
}else{
  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'https://__bridge_loaded__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}
}

setupWebViewJavascriptBridge(function(bridge) {
bridge.registerHandler('setupWebViewtoken', function(data, responseCallback) {
  dataobj = data
  var dataJSON = JSON.parse(data)
 // console.log(dataJSON.token,111)
  token = dataJSON.token
  userCode = dataJSON.userCode
  model = dataJSON.model
  version = dataJSON.version
  localStorage.setItem('_token',token)
  localStorage.setItem('_userCode',userCode)
  localStorage.setItem('_model',model)
  localStorage.setItem('_version',version)
  responseCallback(data)
 // location.reload()
})
bridge.registerHandler('jsRcvResponseTest', function(data, responseCallback) {
  bridge.callHandler('javaEchoToJs', { foo:'bar' }, function(response) {
    console.log(456)
    if (response && response.foo == 'bar') {
      responseCallback("Response from JS")
    } else {
      responseCallback("Failed")
    }
  })
})
//bridge.hasNativeMethod('javaEchoToJs',function(b){
//   alert(b===true)
//})
})
// function dataJSON(){
//   //var stringify = JSON.stringify(dataobj)
//   var dataJSON = JSON.parse(dataobj)
//   console.log(dataJSON.token)
// }

Vue.prototype._token = function (_token){
 var ary = localStorage.getItem('_token')
 var _token = ary
  return _token
}
Vue.prototype._userCode = function (_userCode){
  var ary = localStorage.getItem('_userCode')
  var _userCode = ary
   return _userCode
 }
 Vue.prototype._model = function (_model){
  var ary = localStorage.getItem('_model')
  var _model = ary
   return _model
 }
 Vue.prototype._version = function (_version){
  var ary = localStorage.getItem('_version')
  var _version = ary
   return _version
 }


//console.log(12345689)
let baseUrl = '';

if (location.hostname == 'test1.zjchuangxue.com') { //测试环境
    baseUrl = ' ';
}  else { //开发环境
    baseUrl = '/api'
}
Vue.prototype.$axios = Axios
Axios.defaults.baseURL = baseUrl
Axios.defaults.headers.post['Content-Type'] = 'application/json';
Axios.defaults.headers.post['token'] =  localStorage.getItem('_token') //localStorage.getItem('_token')    //localStorage.getItem('_token'); 
Vue.config.productionTip = false

Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

