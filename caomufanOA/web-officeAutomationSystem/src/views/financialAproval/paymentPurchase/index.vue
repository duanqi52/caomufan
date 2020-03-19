<template>
    <div class="contentBody">
      <!--                  顶部按钮部分-->
      <div class="companyTitle">
        <div class="companyName">
          支付审批单
        </div>
        <div class="companyBtnBox">
          <div class="companyBtn">
            <router-link :to="{path:'/financialAproval/paymentPurchase/addOrEdit'}">
              <a ><i class="iconfont icon-xinzeng"></i>新增</a>
            </router-link>
          </div>
        </div>
      </div>

<!--      搜索列表-->
      <div class="searchList">
        <el-form ref="form" :model="searchParamsData" class="searchListForm" label-width="120px">
          <div class="companyItem">
            <el-form-item label="申请人">
              <el-select
                v-model="searchParamsData.ApplicantOpenIDList"
                multiple
                filterable
                @change="searchData()"
                placeholder="请选择人员">
                <el-option
                  v-for="item in userList"
                  :key="item.openID"
                  :label="item.name"
                  :value="item.openID">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="companyItem">
            <el-form-item label="申请部门">
              <el-select
                v-model="searchParamsData.DepartmentIDList"
                multiple
                filterable
                @change="searchData()"
                placeholder="请选择部门">
                <el-option
                  v-for="item in departmentList"
                  :key="item.departmentID"
                  :label="item.departmentName"
                  :value="item.departmentID">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="companyItem">
            <el-form-item label="流程状态">
              <el-select
                v-model="searchParamsData.status"
                @change="searchData()"
                placeholder="流程状态">
                <el-option
                  label="全部"
                  :value="0">
                </el-option>
                <el-option
                  label="暂存"
                  :value="1">
                </el-option>
                <el-option
                  label="审批中"
                  :value="2">
                </el-option>
                <el-option
                  label="已完成"
                  :value="3">
                </el-option>
                <el-option
                  label="已撤销"
                  :value="4">
                </el-option>
                <el-option
                  label="审批失败"
                  :value="5">
                </el-option>
                <el-option
                  label="已结束"
                  :value="6">
                </el-option>
                <el-option
                  label="已作废"
                  :value="7">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="companyItem">
            <el-form-item label="填单开始时间">
              <el-date-picker
                v-model="searchParamsData.StartTime"
                @change="searchData()"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="companyItem">
            <el-form-item label="填单结束时间">
              <el-date-picker
                v-model="searchParamsData.EndTime"
                @change="searchData()"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </div>
        </el-form>
      </div>

<!--      展示列表数据-->
      <div class="listShowBox">
        <table width="100%">
          <tr class="listTitleBox">
            <th class="titleItem">序号</th>
            <th class="titleItem">数据标题</th>
            <th class="titleItem">申请部门</th>
            <th class="titleItem">填单时间</th>
            <th class="titleItem">合同金额</th>
            <th class="titleItem">合计金额（小写）</th>
            <th class="titleItem">当前处理人</th>
            <th class="titleItem">支付主体</th>
            <th class="titleItem"><i class="iconfont icon-gengduo"></i></th>
          </tr>
          <template v-for="(item,index) in showList">
            <tr class="listItem" :class="[item.status===1?'setGreen':'',item.status===7?'setGrey':'']" @click="showPageGoNow(item.applicationID)">
              <td class="listItemShow item1">
                <span>{{index+1}}</span>
              </td>
              <td class="listItemShow item2">
                <span>{{item.title}}的支付申请单</span>
              </td>
              <td class="listItemShow item3">
                <span>{{item.department}}</span>
              </td>
              <td class="listItemShow item4">
                <span>{{item.writeTime}}</span>
              </td>
              <td class="listItemShow item5">
                <span>{{item.contractPrice}} 元</span>
              </td>
              <td class="listItemShow item6">
                <span>{{item.total}}元</span>
              </td>
              <td class="listItemShow item7">
                <span>{{item.currentApprover}}</span>
              </td>
              <td class="listItemShow item8">
                <span>{{item.payment}}</span>
              </td>
              <td class="listItemShow listItemStatus">
                <span v-if="item.status===1" title="暂存"></span>
                <span v-else-if="item.status===7" title="已作废"></span>
              </td>
            </tr>
          </template>
        </table>
      </div>

<!--      分页-->
      <div class="pageNumBox">
        <!--        @size-change="handleSizeChange"-->
        <!--        @current-change="handleCurrentChange"-->
        <!--        :current-page="currentPage4"-->
        <el-pagination


          :current-page.sync="searchParamsData.PageIndex"
          @current-change="getShowList"
          :page-count="pageNum.pageTotal"
          layout=" prev, pager, next, jumper, slot">
        </el-pagination>
      </div>
    </div>
</template>

<script>
  import{getPurchase} from '@/api/views/financialAproval/paymentPurchase.js'
  import {getUser} from '@/api/views/addressBook/addressBook.js'
    export default {
        name: "indexp",
        data(){
            return{
                departmentList:[],//部门列表
                userList:[],//用户列表
                pageNum:{
                    pageTotal:0,
                },
                searchParamsData:{
                    PageSize:10,
                    PageIndex:1,
                    ApplicantOpenIDList:[],
                    DepartmentIDList:[],
                    status:0,
                    StartTime:'',
                    EndTime:''
                },
              showList:[]
            }
        },
        mounted(){
          this.getShowList()
            // 获取部门与人员列表
            this.getUserList()
        },
        methods:{
            // 页面跳转
            showPageGoNow(id){
                this.$router.push(
                    {
                        path:'/financialAproval/paymentPurchase/itemDetail',
                        query:{
                            id:id
                        }
                    }
                )
            },
            // 获取用户列表
            getUserList(){
                getUser().then(res=>{
                    console.log(res)
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
            // 搜索列表
            searchData(){
                this.searchParamsData.PageIndex=1;
                this.getShowList()
                console.log(this.searchParamsData)
            },
            // 获取列表
            getShowList(){
                let spd=this.searchParamsData
                // spd.ApplicantOpenIDList=''
                // spd.DepartmentIDList=''
                getPurchase(
                    spd
                ).then(res=>{
                    if(res.messageType==0)
                    {
                        console.log(this.showList)
                        this.showList=res.result.purchaseRoughList
                        console.log(res.result.pageCount)
                        this.pageNum.pageTotal=parseInt(res.result.pageCount)
                    }else{
                        this.$message.error(res.message);
                    }
                  console.log(res)
                })
            }
        }
    }
</script>
<style>
  .el-select-dropdown.el-popper.is-multiple{
    z-index: 99!important;
  }
</style>
<style scoped lang="scss" src="@/styles/financialAproval/paymentPurchase/index.scss">

</style>
