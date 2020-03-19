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
                        财务审批
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
                showTitle:'财务审批',
                returnPath:'/',
                titleStatus:'/financialAproval/paymentPurchase',
                titleList:[
                    {
                        name:'支付申请单',
                        url:'/financialAproval/paymentPurchase',
                    },
                    {
                        name:'费用报销审批单',
                        url:'/financialAproval/expenseReimbursement',
                    },
                    {
                        name:'借款审批单',
                        url:'/financialAproval/loanApproval',
                    },
                    {
                        name:'差旅费审批单',
                        url:'/financialAproval/travelExpenses',
                    },
                    {
                        name:'费用用途清单',
                        url:'/financialAproval/costUse',
                    }
                ]
            }
        },
        mounted(){
            // console.log(this.$route)
            this.titleStatus=this.$route.path
            this.urlFormShow()
        },
        methods:{
            // 获取路由来给左边的导航赋值样式
          urlFormShow(){
              var list=this.titleList
              for(let i in list)
              {
                  if(this.$route.path.indexOf(list[i].url)==0)
                  {
                      // console.log(list[i].url.indexOf('/financialAproval/loanApproval'))
                      this.titleStatus =list[i].url
                  }
              }
          }
        },
        components:{
            'topTitle':topTitle
        }
    }
</script>

<style scoped lang="scss" src="@/styles/financialAproval/index.scss">

</style>
