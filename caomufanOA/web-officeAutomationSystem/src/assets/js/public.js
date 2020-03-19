import {getlogout}from '@/api/views/login/login.js'
import router from '@/router'
import {Message} from 'element-ui';

// 数字转换问大写
export function number_chinese(str) {
  var num = parseFloat(str);
  var strOutput = "",
    strUnit = '垓仟佰拾京仟佰拾兆仟佰拾亿仟佰拾万仟佰拾元角分';
  num += "00";
  var intPos = num.indexOf('.');
  if (intPos >= 0){
    num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
  }
  strUnit = strUnit.substr(strUnit.length - num.length);

  for (var i=0; i < num.length; i++){
    strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i,1),1) + strUnit.substr(i,1);
  }
  return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元")

}

// 限制只能输入金额
export function onlyNumber(e){

//得到第一个字符是否为负号
    var t = e.charAt(0);
//先把非数字的都替换掉，除了数字和.
  e = e.replace(/[^\d\.]/g,'');
//必须保证第一个为数字而不是.
  e = e.replace(/^\./g,'');
//保证只有出现一个.而没有多个.
    e = e.replace(/\.{2,}/g,'.');
//保证.只出现一次，而不能出现两次以上
    e = e.replace('.','$#$').replace(/\./g,'').replace('$#$','.');
//只能输入两位小数
    e = e.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
//如果第一位是负号，则允许添加
    if(t == '-'){
      return e;
    }
  return e;

}

// date转换为string格式 年月日时分秒
export function dateForString(time) {

  var date = time;
  var month = (date.getMonth()+1) > 9 ? (date.getMonth()+1) : "0" + (date.getMonth()+1);
  var day = (date.getDate()) > 9 ? (date.getDate()) : "0" + (date.getDate());
  var hours = (date.getHours()) > 9 ? (date.getHours()) : "0" + (date.getHours());
  var minutes = (date.getMinutes()) > 9 ? (date.getMinutes()) : "0" + (date.getMinutes());
  var seconds = (date.getSeconds()) > 9 ? (date.getSeconds()) : "0" + (date.getSeconds());

  var dateString =
    date.getFullYear() + "-" +
    month + "-" +
    day + " " +
    hours + ":" +
    minutes + ":" +
    seconds;

  return dateString;
}

// date转换为string格式 年月日
export function dateForStringDate(time) {

  var date = time;
  var month = (date.getMonth()+1) > 9 ? (date.getMonth()+1) : "0" + (date.getMonth()+1);
  var day = (date.getDate()) > 9 ? (date.getDate()) : "0" + (date.getDate());
  var hours = (date.getHours()) > 9 ? (date.getHours()) : "0" + (date.getHours());
  var minutes = (date.getMinutes()) > 9 ? (date.getMinutes()) : "0" + (date.getMinutes());
  var seconds = (date.getSeconds()) > 9 ? (date.getSeconds()) : "0" + (date.getSeconds());

  var dateString =
    date.getFullYear() + "-" +
    month + "-" +
    day + " " ;

  return dateString;
}

// 获取当前时间
export function nowDatetime() {

  var date = new Date();
  var month = (date.getMonth()+1) > 9 ? (date.getMonth()+1) : "0" + (date.getMonth()+1);
  var day = (date.getDate()) > 9 ? (date.getDate()) : "0" + (date.getDate());
  var hours = (date.getHours()) > 9 ? (date.getHours()) : "0" + (date.getHours());
  var minutes = (date.getMinutes()) > 9 ? (date.getMinutes()) : "0" + (date.getMinutes());
  var seconds = (date.getSeconds()) > 9 ? (date.getSeconds()) : "0" + (date.getSeconds());

  var dateString =
    date.getFullYear() + "-" +
    month + "-" +
    day + " " +
    hours + ":" +
    minutes + ":" +
    seconds;

  return dateString;
}

// 退出登录
export function logout(){
  var that=this
  getlogout(
  ).then(res=>{
    if(res.messageType==0||res.messageType==3)
    {
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('header')
      window.localStorage.removeItem('nickName')
      window.localStorage.removeItem('avatar')
      window.localStorage.removeItem('departmentID')
      window.localStorage.removeItem('departmentName')
      window.localStorage.removeItem('openID')
      window.localStorage.removeItem('realName')
      window.localStorage.setItem('isLogin','0')
      window.localStorage.removeItem('isLogin')
      router.push({
        path:'/login'
      })
    }else{
      Message.error(res.message);
    }
  })
}



