<template>
  <div class="contentBody">
    <!--                  顶部按钮部分-->
    <div class="companyTitle">
      <div class="companyName">费用用途清单</div>
      <div class="companyBtnBox">
        <div class="companyBtn">
          <a v-show="!showDelStatus" @click="showDelStatus=true"><i class="iconfont icon-shanchu"></i>删除</a>
          <a v-show="showDelStatus" @click="showDelStatus=false"><i class="iconfont icon-tijiao"></i>完成</a>
          <router-link v-show="!showDelStatus" :to="{path:'/financialAproval/costUse/addOrEdit'}">
            <a ><i class="iconfont icon-xinzeng"></i>新增</a>
          </router-link>

        </div>
      </div>
    </div>

    <!--      搜索列表-->
    <div class="searchList">
      <el-form ref="form" :model="searchParamsData" class="searchListForm" label-width="120px">
        <div class="companyItem">
          <el-form-item label="费用用途">
            <el-input
              v-model="searchParamsData.Purpose"
              placeholder="请输入费用用途"
              @change="searchData()">
            </el-input>
          </el-form-item>
        </div>
        <div class="companyItem">
          <el-form-item label="具体内容">
            <el-input
              v-model="searchParamsData.Content"
              placeholder="请输入具体内容"
              @change="searchData()">
            </el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>

    <!--      展示列表数据-->
    <div class="listShowBox">
      <div class="listTitleBox">
        <div class="titleItem item1">
          <span>序号</span>
        </div>
        <div class="titleItem  item2">
          <span>标题数据</span>
        </div>
        <div class="titleItem item3">
          <span>费用用途</span>
        </div>
        <div class="titleItem item4">
          <span>具体内容</span>
        </div>
        <div class="titleItem item5">
          <span>备注与填报指引</span>
        </div>
      </div>
      <div class="listContentBox">
          <template v-for="(item,index) in showList">
            <div class="listItem">
              <span class="delBtn" v-show="showDelStatus" @click="delNowGo(item.purposeID)" ><i style="font-size: 22px" class="iconfont icon-shan"></i></span>
              <router-link
                class="listItemGo"
                :to="{
              path:'/financialAproval/costUse/itemDetail',
              query:{
                purpose:item.purpose,
                content:item.content,
                remarkGuide:item.remarkGuide,
                id:item.purposeID
              }
              }">
                <div class="listItemShow item1">
                  <span ><span v-show="!showDelStatus">{{index+1}}</span></span>
                </div>
                <div class="listItemShow item2">
                  <span>{{item.title}}</span>
                </div>
                <div class="listItemShow item3">
                  <span>{{item.purpose}}</span>
                </div>
                <div class="listItemShow item4">
                  <span :title="item.content">{{item.content}}</span>
                </div>
                <div class="listItemShow item5">
                  <span :title="item.remarkGuide">{{item.remarkGuide}}</span>
                </div>
              </router-link>
            </div>

          </template>
      </div>
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
    import{getPurpose,delPurpose} from '@/api/views/financialAproval/costUse.js'
    export default {
        name: "index",
        data(){
            return{
                showDelStatus:false,
                pageNum:{
                    pageTotal:0,
                },
                searchParamsData:{
                    PageSize:10,
                    PageIndex:1,
                    Purpose:'',
                    Content:''
                },
                showList:[
                ]
            }
        },
        mounted(){
            this.getShowList()
        },
        methods:{
            // 删除
            delNowGo(id){
                // this.$message.error('未开发删除功能')
                var that=this;
                this.$confirm('此操作将删除该用途清单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delPurpose(
                        {
                            purposeID:id
                        }
                    ).then(res=>{
                        if(res.messageType==0)
                        {
                            that.$message.success('删除成功')
                            that.getShowList()
                        }else{
                            that.$message.error(res.message)
                        }
                        console.log(res)
                    })
                }).catch(() => {
                });
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
                getPurpose(
                    spd
                ).then(res=>{
                    if(res.messageType==0)
                    {
                        console.log(this.showList)
                        this.showList=res.result.purposeList
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

<style scoped lang="scss" src="@/styles/financialAproval/costUse/index.scss">

</style>
