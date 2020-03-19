<template>
  <div class="contentBody">

    <!--      列表展示-->
    <div class="lsitBody">
      <!--      头部输入部分-->
      <div class="topContent">
        <div class="topItem">
          <div class="topName">接收时间</div>
          <div class="topList">
            <el-date-picker
              v-model="getDate"
              type="daterange"
              prefix-icon="none"
              popper-class="aaa"
              range-separator="~"
              value-format="yyyy-MM-dd"
              @change="dateChange"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
        <div class="topItem">
          <div class="topName">创建人</div>
          <div class="topList">
            <el-select
              v-model="searchParamsData.creator"
              multiple
              filterable
              @change="getShowList()"
              placeholder="选择人员多选">
              <el-option
                v-for="item in userList"
                :key="item.openID"
                :label="item.name"
                :value="item.openID">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>

    <!--      表格列表-->
    <div class="listContent">
      <div class="listTitle">
        <div class="listTitleItem title1">
          <span>标题</span>
        </div>
        <div class="listTitleItem title2">
          <span>内容 </span>
        </div>
        <div class="listTitleItem title3">
          <span>创建时间</span>
        </div>
        <div class="listTitleItem title2">
          <span>处理时间 </span>
        </div>
        <div class="listTitleItem title4">
          <span>操作</span>
        </div>
      </div>
      <div class="listShowBox">
        <template v-for="(item,index) in showList">
          <div class="listShowItem">
            <div class="showItem title1">
              <span v-if="item.applicationType==1">{{item.applicant}}的采购申请</span>
              <span v-if="item.applicationType==2">{{item.applicant}}的费用报销申请</span>
              <span v-if="item.applicationType==3">{{item.applicant}}的借款审批申请</span>
              <span v-if="item.applicationType==4">{{item.applicant}}的差旅费审批申请</span>
            </div>
            <div class="showItem title2">
              <p>{{item.lastApproverName}}</p>
              <p v-if="item.lastApproverHandle==0" style="color:#888888 ">未处理</p>
              <p v-if="item.lastApproverHandle==1" style="color:#4ca824 ">同意</p>
              <p v-if="item.lastApproverHandle==2" style="color:#f82e2e ">不同意</p>
            </div>

            <div class="showItem title3">
              {{item.createTime}}
            </div>
            <div class="showItem title2">
              {{item.updateTime}}
            </div>
            <div class="showItem title4">
              <router-link
                class="moreData"
                :to="{
                path:'/myProcess/completed/itemDetail',
                query:{
                id:item.applicationID,
                approvalID:item.approvalID,
                type:item.applicationType,
                status:item.status
                }
                }"> 详情</router-link>
              <div v-if="item.status==5&&item.isOwn==false" class="listBtn">
                <a class="listBtnY" @click="approveGo(item.applicationID,1)">同意</a>
                <a  class="listBtnN" @click="approveGo(item.applicationID,2)">不同意</a>
              </div>
              <div v-else>无</div>
            </div>
            <!--                          状态管理-->
            <div v-if="item.status==1" class="showIteamStatus">
              <img src="@/assets/images/myProcess/t1.png" alt="">
            </div>
            <div v-if="item.status==2" class="showIteamStatus">
              <img src="@/assets/images/myProcess/t2.png" alt="">
            </div>
            <div v-if="item.status==3" class="showIteamStatus">
              <img src="@/assets/images/myProcess/t3.png" alt="">
            </div>
            <div v-if="item.status==4" class="showIteamStatus">
              <img src="@/assets/images/myProcess/t4.png" alt="">
            </div>
            <div v-if="item.status==5" class="showIteamStatus">
              <img src="@/assets/images/myProcess/t5.png" alt="">
            </div>
            <div v-if="item.status==6" class="showIteamStatus">
              <img src="@/assets/images/myProcess/t6.png" alt="">
            </div>
            <div v-if="item.status==7" class="showIteamStatus">
              <img src="@/assets/images/myProcess/t7.png" alt="">
            </div>
            <div v-if="item.status==8" class="showIteamStatus">
              <img src="@/assets/images/myProcess/t8.png" alt="">
            </div>

            <!--              我的状态-->
            <div v-if="item.isOwn" class="showIteamMy">
              <img src="@/assets/images/myProcess/my.png" alt="">
            </div>
          </div>
        </template>


      </div>
    </div>

    <div class="pageNumBox">
      <!--        @size-change="handleSizeChange"-->
      <!--        @current-change="handleCurrentChange"-->
      <!--        :current-page="currentPage4"-->
      <el-pagination
        :current-page.sync="searchParamsData.pageIndex"
        @current-change="getShowList"
        :page-count="pageNum.pageTotal"
        layout=" prev, pager, next, jumper, slot">
      </el-pagination>

    </div>


    <!--      详情展示-->

  </div>
</template>

<script>
    import {getMyProcess,updataApprove} from '@/api/views/myProcess/public.js'
    import {getUser} from '@/api/views/addressBook/addressBook.js'
    export default {
        name: "index",
        data(){
            return{
                getDate:'',//接收时间
                peopleNow:'',//创建人
                pageNum:{
                    pageTotal:0,
                },
                searchParamsData:{
                    pageSize:10,
                    pageIndex:1,
                    processType:'1',
                    startTime:'',
                    endTime:'',
                    creator:[]
                },
                userList:[],
                showList: []
            }
        },
        mounted(){
            this.getShowList()
// 获取部门与人员列表
            this.getUserList()
        },
        methods: {
            // 通过父级组件重新获取菜单列表未处理审批数量
            setListNum()
            {
                this.$emit('fatherMethod2')
                // console.log(12)
                // this.$refs.topTitle.getProcessNum();
            },
            // 审核列表
            approveGo(id, val) {
                let opinionStr = ''
                if (val == 1) {
                    opinionStr = '同意'
                } else {
                    opinionStr = '不同意'
                }
                updataApprove(
                    {
                        applicationID: id,
                        handle: val,
                        opinion: opinionStr
                    }
                ).then((res) => {
                    if (res.messageType == 0) {
                        this.$message.success('审批成功');
                        this.getShowList()
                        this.setListNum()
                    } else {
                        this.$message.error(res.message);
                    }
                    // console.log(res)
                });
            },
            // 获取用户列表
            getUserList(){
                getUser().then(res=>{
                    // console.log(res)
                    this.departmentList=res.result
                    let rr=res.result
                    for(let i in rr)
                    {
                        this.userList=this.userList.concat(rr[i].user)
                    }

                    // 临时让空的openId不为空
                    let ul=this.userList
                    for(let i in ul)
                    {
                        if(ul[i].openID=='')
                        {
                            ul[i].openID=i
                        }
                    }
                    this.userList=ul
                })
            },
            // 日期更改时赋值
            dateChange(e) {
                // console.log(e)
                if (e != null) {
                    this.searchParamsData.startTime = e[0]
                    this.searchParamsData.endTime = e[1]
                } else {
                    this.searchParamsData.startTime = ''
                    this.searchParamsData.endTime = ''
                }
                this.getShowList()
                // console.log(this.searchParamsData)
            },
            // 获取列表
            getShowList() {
                let spd = this.searchParamsData
                getMyProcess(
                    spd
                ).then(res => {
                    if (res.messageType == 0) {
                        // console.log(this.showList)
                        this.showList = res.result.processList
                        // console.log(res.result.pageCount)
                        this.pageNum.pageTotal = parseInt(res.result.pageCount)
                    } else {
                        this.$message.error(res.message);
                    }
                    // console.log(res)
                })
            }
        },
        components:{

        }
    }
</script>

<style>
  .el-select-dropdown.el-popper.is-multiple{
    z-index: 99!important;
  }
</style>
<style scoped lang="scss" src="@/styles/myProcess/needDealt/index.scss">

</style>
