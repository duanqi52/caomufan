<template>
    <div class="BodyShow viewsloginindex">
      <div class="loginBox">
        <div class="loginTitle">
          <img src="@/assets/images/login/title.png" alt="">
        </div>
        <div class="loginShowBox">
<!--          二维码登录-->
          <div class="loginItem loginWechat" v-show="!loginStatus">
            <div id="wx_login" class="wx_login">
            </div>
          </div>
<!--          账号密码登录-->
          <div class="loginItem loginNumber" v-show="loginStatus">
            <div class="formItem">
              <div class="formItemName">账号</div>
              <div class="formItemInput">
                <el-input v-model="loginForm.userName" placeholder="请输入内部员工账号"></el-input>
              </div>
            </div>
            <div class="formItem">
              <div class="formItemName">密码</div>
              <div class="formItemInput">
                <el-input v-model="loginForm.password" placeholder="请输入内部账号密码" show-password></el-input>
              </div>
            </div>
            <div class="formItem">
              <a @click="nowLogin()">登录</a>
            </div>
          </div>
        </div>
        <div class="loginChange">
          <span v-show="loginStatus" @click="loginChange()">切换为二维码登录</span>
          <span  v-show="!loginStatus" @click="loginChange()">切换为账号密码登录</span>
        </div>
      </div>
    </div>
</template>

<script>
    import {wxlogin}from '@/api/views/login/login.js'
    export default {
        name: "index",
        data(){
            return{
                messagePage:'',
                loginForm:{
                    userName:'',
                    password:''
                },
                loginStatus:false,
                code:''
            }
        },
        mounted(){
            var that=this
            // 展示微信二维码
            setTimeout(
                function () {
                    that.getwechatQr()
                },500)
            that.listentResetGoPage()
        },
        methods:{
            // 监听登录跳转页面的信息
            listentResetGoPage(){
                this.messagePage=(e)=>
                {
                    console.log(e,e.data)
                    if(e.data.data){
                        if(e.data.data.code.length>0)
                        {
                            console.log('我要登录了')
                            this.loginWechatNow(e.data.data.code)
                        }
                    }else{
                    }
                }
                // 监听登录跳转页
                window.addEventListener('message', this.messagePage, false);
            },
            // 开始微信登录
            loginWechatNow(code){
                var that=this
                console.log(code)
                wxlogin(
                    {
                        code:code
                    }
                ).then(res=>{
                    if(res.messageType==0)
                    {
                        window.localStorage.setItem('isLogin','1')
                        window.localStorage.setItem('token',res.result.session)
                        window.localStorage.setItem('header',res.result.header)
                        window.localStorage.setItem('nickName',res.result.nickName)
                        // 101：普通用户；200：管理员
                        window.localStorage.setItem('accessRole',res.result.accessRole)
                        this.$router.push({
                            path:'/'
                        })
                    }else{
                        this.$message.error(res.message);
                        that.getwechatQr()
                    }
                })

            },
            // 切换登录模式按钮
            loginChange(){
                var that=this;
              if(that.loginStatus)
              {
                  that.loginStatus=false;
                  that.getwechatQr()
              }else{
                  that.loginStatus=true;
              }
            },
            // 获取微信二维码
            getwechatQr(){
                var obj = new WxLogin({
                    self_redirect:true,
                    id:"wx_login",
                    appid: "wxe07a40c4ba25026c",
                    scope: "snsapi_login",
                    // redirect_uri 需要进行 UrlEncode
                    redirect_uri: "https%3a%2f%2fhome.caomufan.com%2f%23%2fresetLogin",
                    state: "",
                    style: "",
                    href: "data:text/css;base64,LmltcG93ZXJCb3ggLnRpdGxlIHtkaXNwbGF5OiBub25lO30NCi5pbXBvd2VyQm94IC5zdGF0dXMgcHtmb250LXNpemU6MTZweH0NCi5pbXBvd2VyQm94IC5zdGF0dXNfdHh0IHB7Zm9udC1zaXplOjE1cHh9DQouaW1wb3dlckJveCAucXJjb2Rle2JvcmRlcjpub25lO21hcmdpbi10b3A6MH0="
                });
            },
            // 账号密码登录提交时
            nowLogin(){
                var that=this
              console.log('我要账号登录了')
                console.log(1)
                if(that.loginForm.userName=='')
                {
                    this.$message({
                        message: '登录失败！请输入员工内部账号！',
                        type: 'warning'
                    });
                }else if(that.loginForm.password=='')
                {
                    this.$message({
                        message: '登录失败！请输入账号密码！',
                        type: 'warning'
                    });
                }else{
                    this.$message({
                        message: '登录失败！不存在该账号！',
                        type: 'warning'
                    });
                }

            },
        },
        beforeDestroy() {
            window.removeEventListener('message', this.messagePage,false)
        },
    }
</script>

<style scoped lang="scss" src="@/styles/login/index.scss">

</style>
<style lang="scss">
  .viewsloginindex{
    .el-input__inner{
      height: 50px;
    }
    .el-input__inner:focus{outline:none;}
  }

</style>
