<template>
  <div class="bodyShow">
    <div class="bodyBox">
      <div class="topShow">
        <topTitle
          :returnPath="returnPath"
          :showTitle="showTitle">
        </topTitle>
      </div>
      <div class="bodyBox">
        <!--        左边展示-->
        <div class="bodyLeft">
          <div class="leftSearch"></div>
          <div class="leftList">
              <template slot="title" class="collapseTitle">
                <i class="iconfont icon-zu"></i>
              </template>
              <ul>
                <li class="itemShow">
                  <div class="itemShowBox">
                    <div class="itemBox">
                      <div class="itemOne"></div>
                      <div class="itemDataShow" >
                        <div class="itemIcon" style="width: 40px">
                          <i class="iconfont icon-zu"></i>
                        </div>
                        <div class="itemName">
                          审批流程
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li v-for="(item,index) in titleList"
                    :key="index"
                    class="itemShow"
                    :class="titleStatus==item.url?'active':''"
                >
                  <router-link :to="{path:item.url}">
                    <div
                      @click="titleStatus=item.url"
                      class="itemShowBox">
                      <div class="itemBox">
                        <div class="itemOne"></div>
                        <div class="changeBtn">

                        </div>
                        <div class="itemDataShow" >
                          <div class="itemIcon">
                            <i class="iconfont icon-qingdan"></i>
                          </div>
                          <div class="itemName">
                            {{item.name}}
                          </div>
                        </div>
                      </div>
                    </div>
                  </router-link>
                </li>
              </ul>
          </div>
        </div>
        <div class="bodyRight">
          <div class="rightCrevice"></div>
          <el-scrollbar class="scrollbarY" style="flex: 1">
            <div class="rightContent">
              <div class="nowTop">
                 <div style="height: 75px"></div>
              </div>
              <div class="nowPage">
                <router-view/>
              </div>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import topTitle from '@/components/Top/topTitle.vue'
    export default {
        name: "index",
        data(){
            return{
                showTitle:'审批流程',
                returnPath:'/',
                titleStatus:'/aprovalProcess/paymentPurchase',
                titleList:[
                    {
                        name:'支付采购流程',
                        url:'/aprovalProcess/paymentPurchase',
                    },
                    {
                        name:'费用报销流程',
                        url:'/aprovalProcess/expenseReimbursement',
                    },
                    {
                        name:'借款审批流程',
                        url:'/aprovalProcess/loanApproval',
                    },
                    {
                        name:'差旅费报销流程',
                        url:'/aprovalProcess/travelExpenses',
                    }
                ]
            }
        },
        mounted(){
          // console.log(this.$route)
            this.titleStatus=this.$route.path
        },
        methods:{

        },
        components:{
            'topTitle':topTitle
        }
    }
</script>
<style>
  .el-scrollbar__wrap{
    overflow-x: hidden;
  }
  .el-scrollbar__wrap::-webkit-scrollbar {display:none}
</style>

<style scoped lang="scss" src="@/styles/aprovalProcess/index.scss">

</style>
