<template>
    <div class="topTitle">
      <div class="topShow">
        <template v-if="$route.fullPath=='/'">
          <div class="topLefe">
            <img src="@/assets/images/index/logo.png" alt="">
            <span>广州草木蕃环境科技有限公司</span>
          </div>
        </template>
        <template v-else>
          <div class="topLefe">
            <router-link  :to="{path:returnPath}">
              <i class="iconfont icon-fanhui"></i>
            </router-link>
            <span>{{showTitle}}</span>
          </div>
        </template>

        <div class="topRight">
          <div class="topMessage">
            <el-popover
              placement="bottom"
              title=""
              popper-class="topPopper"
              width="244"
              trigger="hover"
              >
              <div class="topMessageShow">
                <div class="messageShowTitle">
                  <span>未处理的审批</span>
                </div>
                <div class="messageShowList">
                  <router-link
                    class="messageShowItem"
                    :to="{path:'/myProcess/needDealt',}">
                    <div class="messageItemIcon">
                      <i class="iconfont icon-daiyuedaiban"></i>
                    </div>
                    <div class="messageItemTxt">待办消息</div>
                    <div class="messageItemNum">
                      <span  v-if="numShow.dealtNum!=0" :class="numShow.dealtNum===0?'zeroNum':''" >{{numShow.dealtNum}}</span>
                    </div>
                  </router-link>
                  <router-link
                    class="messageShowItem"
                    :to="{path:'/myProcess/needRead',}">
                    <div class="messageItemIcon">
                      <i class="iconfont icon-daiyuedaiban"></i>
                    </div>
                    <div class="messageItemTxt">待阅消息</div>
                    <div class="messageItemNum">
                      <span v-if="numShow.readNum!=0" :class="numShow.readNum===0?'zeroNum':''">{{numShow.readNum}}</span>
                    </div>
                  </router-link>
                </div>
              </div>
              <div class="topMessageBtn" slot="reference">
                <i class="iconfont icon-xiaoxi"></i><span :class="numShow.totalNum===0?'zeroNum':''" class="topMessageBtnNum">{{numShow.totalNum}}</span>
              </div>

            </el-popover>
          </div>
          <div class="topPhone">
            <el-avatar  class="TopAvatarImg" size="large" :src="userInfo.avatar"></el-avatar>
          </div>
          <!--          <div class="topOut" style="margin-right: 30px">-->
          <!--            <span v-if="userInfo.realName!=''">{{userInfo.realName}}</span>-->
          <!--            <span v-else>{{userInfo.departmentName}}</span>-->
          <!--          </div>-->
          <div class="topOut">
              <span @click="nowLogout()">退出登录</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    import {logout} from '@/assets/js/public.js'
    import {getMyProcessRemindCount} from '@/api/views/myProcess/public.js'
    import '@/assets/fontStyle/other/iconfont.css'
    export default {
        name: "topTitle",
        props:['showTitle','returnPath'],
        data(){
            return{
                userInfo:{
                    avatar:'',
                    realName:'',
                    departmentName:''
                },
                numShow:{
                    dealtNum:0,
                    readNum:0,
                    totalNum:0
                }
            }
        },
        mounted(){
            this.showUserData()

            // console.log(this.$route)
            this.getProcessNum()
        },
        methods:{
            // 获取待办与待阅数目
            getProcessNum(){
                // 流程类型（0待办1已办2待阅3已阅4我发起的5全部）
                getMyProcessRemindCount().then(res=>{
                    if(res.messageType===0)
                    {
                        this.$emit('forNum',res.result)
                        // this.numShow.dealtNum=res.result.pageCount*(res.result.pageIndex-1)+res.result.processList.length
                        this.numShow.dealtNum=parseInt(res.result.waitForDone)
                        this.numShow.readNum=parseInt(res.result.waitForRead)
                        this.numShow.totalNum=this.numShow.dealtNum+this.numShow.readNum
                    }else{
                        this.$message.error(res.message)
                    }
                    // console.log(res)
                }).catch(err => {
                    // console.log(err) // 这里catch到错误timeout
                })

            },
            // 获取头像以及用户名
            showUserData(){
                var that=this
                that.userInfo.avatar=window.localStorage.getItem('avatar')
                that.userInfo.realName=window.localStorage.getItem('realName')
                that.userInfo.departmentName=window.localStorage.getItem('departmentName')
                if(that.userInfo.realName==null||that.userInfo.realName==='') {
                    setTimeout(function () {
                        console.log(that.userInfo)
                        that.userInfo.avatar=window.localStorage.getItem('avatar')
                        that.userInfo.realName=window.localStorage.getItem('realName')
                        that.userInfo.departmentName=window.localStorage.getItem('departmentName')
                    }, 1000)
                }

            },
            // 开始退出登录
            nowLogout(){
                var that=this
                logout()
            },
        },
        watch:{
            $route(to,from){
                this.$emit('fatherMethod')
                this.getProcessNum()
                // this.$router.go(0)
            }
        }
    }
</script>
<style >
  .topPopper{
    /*top: -10px;*/
    margin-top:-10px!important;
    padding: 0!important;
    box-shadow: 0 0 10px #000;
  }
</style>

<style scoped lang="scss">
  $initBG:#4a9a38;//基础背景颜色
  $initFontColor:#fff;//基础字体颜色
  $fs:20px;//一般字体大小

  .topTitle{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
    //头部展示
    .topShow{
      height: 65px;
      /*line-height: 65px;*/
      display: flex;
      justify-content: space-between;
      background: #4ca824;
      font-size: $fs;
      box-shadow: 0px 0px 10px #4a4646;
      .topLefe{
        line-height: 65px;
        padding: 0 0 0 20px ;
        font-weight: bold;
        color:#fff;
        i{
          background: #3b9414;
          font-size: 30px;
          border-radius: 100%;
          line-height: 65px;
          color: #fff;
          vertical-align: middle;
          margin-right: 10px;
        }
      }
      .topRight{
        padding: 0 20px 0 0;
        display: flex;
        .topMessage{
          .topMessageBtn{
            margin: 0 18px 0 0;
            display: flex;
            i{
              font-size: 30px;
              color: #fff;
              margin: 16px 0;
            }
            .topMessageBtnNum{
              display: inline-block;
              background: #e23030;
              min-width: 28px;
              height: 18px;
              font-size: 12px;
              color: #fff;
              text-align: center;
              padding: 0 10px;
              border-radius: 8px;
              margin: 24px 0;
            }
            .zeroNum{
              background:#368115 !important;
            }
          }
        }
        .topPhone{
          line-height: 65px;
          padding: 0 10px 0 0;
          .TopAvatarImg{
            vertical-align: middle;
          }
        }
        .topOut{
          line-height: 65px;
          span{
            color: $initFontColor;
          }
        }
      }
    }
  }

  .topMessageShow{
    .messageShowTitle{
      font-size: 16px;
      height: 50px;
      padding: 17px 20px;
      color: #888888;
    }
    .messageShowList{
      padding: 0 0 6px 0;
      .messageShowItem{
        display: flex;
        font-size: 16px;
        padding: 11px 20px;
        border-top: 1px solid #eff5ee;
        .messageItemIcon{
          width: 24px;
          i{
            font-size: 20px;
            color: #686868;
          }
        }
        .messageItemTxt{
          width: 140px;
          margin: 3px 0;
          color: #313233;
        }
        .messageItemNum{
          width: 40px;
          text-align: right;
          margin: 5px 0;
          span{
            min-width: 28px;
            height: 18px;
            background: #e23030;
            color: #fff;
            text-align: center;
            padding: 0 10px;
            font-size: 12px;
            border-radius: 8px;

          }
        }
        .zeroNum{
          background:#368115 !important;
        }
      }
      .messageShowItem:hover{
        background: #f0f5ee;
      }
    }
  }

</style>
