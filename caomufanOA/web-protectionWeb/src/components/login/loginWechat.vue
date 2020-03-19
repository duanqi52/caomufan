<template>
  <el-dialog
    :visible.sync="loginDialogVisible"
    :show-close="false"
    :before-close="cancelModal"
    :append-to-body="true"
    :close-on-click-modal="false"
    opened="test"
    top="1vh"
    :close-on-press-escape="true"
    custom-class="DialogVisible loginDialogVisible"
  >
    <div class="showLogin">
      <div class="loginTitle">
        <span>保护地统一保护平台</span>
      </div>
      <div class="loginWechat">
        <div id="wx_login" class="wx_login">
        </div>
      </div>


    </div>

<!--    <a @click="this.loginWechat()"> 测试</a>-->
  </el-dialog>
</template>

<script>
    // import {WxLogin}from 'https://res.wx.qq.com/open/js/jweixin-1.3.0.js'
    export default {
        name: "loginWechat",
        props:{
          loginDialogVisible:{
              type: Boolean,
              default: false
          }
        },
        mounted(){
            var that=this
            // 展示微信二维码
            setTimeout(
                function () {
                    var obj = new WxLogin({
                        self_redirect:true,
                        id:"wx_login",
                        appid: "wxb803fd59fd3f3628",
                        scope: "snsapi_login",
                        // redirect_uri 需要进行 UrlEncode
                        redirect_uri: "https%3a%2f%2fproland.caomufan.com%2f%23%2fresetGo",
                        state: "",
                        style: "",
                        href: "data:text/css;base64,LmltcG93ZXJCb3ggLnRpdGxlIHtkaXNwbGF5OiBub25lO30NCi5pbXBvd2VyQm94IC5zdGF0dXMgcHtmb250LXNpemU6MTZweH0NCi5pbXBvd2VyQm94IC5zdGF0dXNfdHh0IHB7Zm9udC1zaXplOjE1cHh9DQouaW1wb3dlckJveCAucXJjb2Rle2JvcmRlcjpub25lO21hcmdpbi10b3A6MH0="
                    });
                // .impowerBox .title {display: none;}
                // .impowerBox .status p{font-size:16px}
                // .impowerBox .status_txt p{font-size:15px}
                // .impowerBox .qrcode{border:none;margin-top:0}
                },500)
        },
        methods:{
             // 关闭页面
            cancelModal(){
                var that=this
                // 关闭弹窗，触发父组件修改visible值
                this.$emit('update:loginDialogVisible', false);
            },
        }
    }
</script>
<style>

  iframe{


    margin: 0 auto;
    display: block;
  }
  /*弹出框*/
  .DialogVisible.loginDialogVisible{
    width:420px;
    height:490px;
  }
  .el-dialog__header{
    padding: 0;
  }
  .el-dialog__body{
    padding: 0;
  }


  /*固定弹出框在中间*/
  .el-dialog{
    margin:0 !important;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    /*height:600px;*/
    max-height:calc(100% - 30px);
    max-width:calc(100% - 30px);
  }
  .el-dialog .el-dialog__body {
    flex: 1;
    overflow: auto;
  }
</style>
<style scoped>
  .wx_login{

  }
  .showLogin{

    height: 490px;
  }
  .loginTitle{
    height: 90px;
    color: #64a831;
    text-align: center;
    font-size: 32px;
    line-height: 90px;
    background: #fff;
    width: 100%;
    font-weight: 700;
  }
  .loginWechat{
    width: 100%;
  }

</style>
