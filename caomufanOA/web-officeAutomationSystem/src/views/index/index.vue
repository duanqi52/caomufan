<template>
    <div class="BodyShow">
      <div class="topShow">
        <topTitle
          :returnPath="returnPath"
          :showTitle="showTitle">
        </topTitle>
      </div>
      <div class="goListShow">
        <ul>
          <li >
            <router-link :to="{path:'/financialAproval/paymentPurchase'}">
              <div class="goBtn" >
                <img src="@/assets/images/index/caiwushenpi.png" alt="财务审批">
                <div class="goBtnShow">
                  <span><i class="iconfont icon-caiwushenpi"></i>财务审批</span>
                </div>
              </div>
            </router-link>
          </li>
          <li  >
            <router-link :to="{path:'/addressBook'}">
              <div class="goBtn">
                <img src="@/assets/images/index/tongxunlu.png" alt="组织架构">
                <div class="goBtnShow">
                  <span><i class="iconfont icon-tongxunlu"></i>组织架构</span>
                </div>
              </div>
            </router-link>
          </li>
          <li >
            <router-link :to="{path:'/myProcess/needDealt'}">
              <div class="goBtn">
                <img src="@/assets/images/index/wodeliucheng.png" alt="我的流程">
                <div class="goBtnShow">
                  <span><i class="iconfont icon-wodeliucheng"></i>我的流程</span>
                </div>
              </div>
            </router-link>
          </li>
          <li  v-if="accessRole==200">
            <router-link :to="{path:'/aprovalProcess/paymentPurchase'}">
              <div class="goBtn">
                <img src="@/assets/images/index/shenpiliucheng.png" alt="审批流程">
                <div class="goBtnShow">
                  <span><i class="iconfont icon-shenpiliucheng"></i>审批流程</span>
                </div>
              </div>
            </router-link>
          </li>
          <li  v-if="accessRole==200">
            <router-link :to="{path:'/roleManage'}">
              <div class="goBtn">
                <img src="@/assets/images/index/jueseguanli.png" alt="角色管理">
                <div class="goBtnShow">
                  <span><i class="iconfont icon-jiaoseguanli"></i>角色管理</span>
                </div>
              </div>
            </router-link>
          </li>
           <li  v-if="accessRole==200">
            <router-link :to="{path:'/IntentionProject'}">
              <div class="goBtn">
                <img src="@/assets/images/index/yixiangxiangmu.png" alt="意向项目">
                <div class="goBtnShow">
                  <span><i class="iconfont icon-yixiangxiangmu"></i>意向项目</span>
                </div>
              </div>
            </router-link>
          </li>
          <li  v-if="accessRole==200">
            <router-link :to="{path:'/roleManage'}">
              <div class="goBtn">
                <img src="@/assets/images/index/jueseguanli.png" alt="项目管理">
                <div class="goBtnShow">
                  <span><i class="iconfont icon-zhengshixiangmu"></i>项目管理</span>
                </div>
              </div>
            </router-link>
          </li>
          <li  v-if="accessRole==200">
            <router-link :to="{path:'/roleManage'}">
              <div class="goBtn">
                <img src="@/assets/images/index/jueseguanli.png" alt="归档项目">
                <div class="goBtnShow">
                  <span><i class="iconfont icon-guidangxiangmu"></i>归档项目</span>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>

    </div>
</template>

<script>
    import {getUserDetail} from '@/api/views/utils.js'
    import topTitle from '@/components/Top/topTitle.vue'
    import '@/assets/fontStyle/other/iconfont.css'
    export default {
        name: "index",
        data(){
            return{
                showTitle:'无',
                returnPath:'/',
                accessRole:101,
                userInfo:{
                    avatar:'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3333145089,190536566&fm=26&gp=0.jpg',
                    realName:'',
                    departmentName:''
                }
            }
        },
        mounted(){
          this.getUserdatashow()
            // console.log(this.$route)
        },
        methods:{
            // 获取用户信息
            getUserdatashow(){
                this.accessRole=window.localStorage.getItem('accessRole')
                getUserDetail().then(res=>{
                    if(res.messageType===0)
                    {
                        window.localStorage.setItem('avatar',res.result.avatar)
                        window.localStorage.setItem('departmentID',res.result.departmentID)
                        window.localStorage.setItem('departmentName',res.result.departmentName)
                        window.localStorage.setItem('openID',res.result.openID)
                        window.localStorage.setItem('realName',res.result.realName)
                    }else {
                        this.$message.error(res.message)
                    }
                }).catch(err => {
                    // console.log(err) // 这里catch到错误timeout
                })
            },
        },
        components:{
            'topTitle':topTitle
        }
    }
</script>


<style lang="scss" scoped src="@/styles/index/index.scss" >

</style>
<!--<style scoped src="@/styles/index/index.css" >-->

<!--</style>-->
