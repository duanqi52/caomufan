<template>
  <div class="bodyShow">
    <div class="bodyBox">
      <div class="topShow">
        <topTitle
          ref="topTitle"
          @fatherMethod="urlFormShow"
          @forNum="getMessageNumShow"
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
                        我的流程
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
                          <i class="iconfont icon-liucheng"></i>
                        </div>
                        <div class="itemName">
                          {{item.name}}
                        </div>
                        <div v-if="item.url=='/myProcess/needDealt'" class="itemNum">
                          <span  v-if="numShow.dealtNum!=0" :class="numShow.dealtNum===0?'zeroNum':''">{{numShow.dealtNum}}</span>
                        </div>
                        <div v-if="item.url=='/myProcess/needRead'" class="itemNum">
                          <span  v-if="numShow.readNum!=0" :class="numShow.readNum===0?'zeroNum':''">{{numShow.readNum}}</span>
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
          <el-scrollbar style="flex: 1">
            <div class="rightContent">
              <div class="nowShow">
                <div class="nowPage">
                  <router-view @fatherMethod2="listGetNum"/>
                </div>
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
                numShow:{
                    dealtNum:0,
                    readNum:0,
                    totalNum:0
                },
                showTitle:'我的流程',
                returnPath:'/',
                titleStatus:'/myProcess/needDealt',
                titleList:[
                    {
                        name:'待办',
                        url:'/myProcess/needDealt',
                    },
                    {
                        name:'待阅',
                        url:'/myProcess/needRead',
                    },
                    {
                        name:'我发起的',
                        url:'/myProcess/iStarted',
                    },
                    {
                        name:'已办',
                        url:'/myProcess/completed',
                    },
                    {
                        name:'全部',
                        url:'/myProcess/whole',
                    }
                ]
            }
        },
        mounted(){
            // console.log(this.$route)
            this.titleStatus=this.$route.path
            this.urlFormShow()
        },
        created(){
            this.urlFormShow()
        },
        methods:{
            // 列表中同意或不同意审批单时调用此方法来重新获取审批数量
            listGetNum()
            {
                this.$refs.topTitle.getProcessNum();
                // console.log(123)
            },
            // 通过头部子组件来获取未处理的审批数量方法
            getMessageNumShow(data){
                // console.log(data)
                this.numShow.dealtNum=data.waitForDone
                this.numShow.readNum=data.waitForRead
            },
            // 获取路由来给左边的导航赋值样式
            urlFormShow(){
                var list=this.titleList
                for(let i in list)
                {
                    // console.log(list[i].url)
                    if(this.$route.path.indexOf(list[i].url)==0)
                    {
                        // console.log(this.$route.path.indexOf(list[i].url))
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

<style scoped lang="scss" src="@/styles/myProcess/index.scss">

</style>
