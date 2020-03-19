<template>
  <div  class="contentBody viewsfinancialAprovalexpenseReimbursementitemDetail">
    <!--                  顶部按钮部分-->
    <div class="companyTitle">
      <div class="companyName">费用报销审批单--详情</div>
      <div class="companyBtnBox">
        <div class="companyBtn">
          <template v-if="showEditStatus==true">
            <a style="color: #4ca824;"  class="btn_left" @click="submitForm(0,'ruleForm')"><i class="iconfont icon-tijiao"></i>提交</a>
            <a  class="btn_left" @click="submitForm(1,'ruleForm')"><i class="iconfont icon-zancun"></i>暂存</a>
            <a  class="btn_left" @click="showEditStatus=false;getDetail()"><i class="iconfont icon-fanhui"></i>返回</a>
          </template>
          <template v-if="showEditStatus==false">
            <a v-if="((handle==2||pageData.status==1)&&detailOpenId==winOpenID&&pageData.status!=4&&pageData.status!=7)"
               style="color: #3b9414"
               class="btn_left"
               @click="showEditStatus=true">
              <i class="iconfont icon-zhongmingming"></i>编辑
            </a>
            <!--          <a class="btn_left"  @click="delNowGo(id)"><i class="iconfont icon-shan"></i>删除</a>-->
            <a
              class="btn_left"
              v-if="(loginOpenId==pageData.applicantOpenID)&&(pageData.status==2)"
              @click="undoNow" >
              <i class="iconfont icon-chehui"></i>撤回申请
            </a>
            <a v-if="(handle==2||pageData.status==1)&&detailOpenId==winOpenID&&pageData.status!=4&&pageData.status!=7"
               @click="invalidDel()"
               style="color: #e23030;"
               class="btn_left"  >
              <i class="iconfont icon-shan"></i>作废
            </a>
            <!--          <a class="btn_left"  @click="delNowGo(id)"><i class="iconfont icon-shan"></i>删除</a>-->
            <a  class="btn_left"  v-print="'#printTest'"><i class="iconfont icon-zancun"></i>打印</a>
            <router-link   class="btn_left"  :to="{path:'/financialAproval/expenseReimbursement'}">
              <i class="iconfont icon-fanhui"></i>返回
            </router-link>
          </template>

        </div>
      </div>
    </div>

    <showData
      :id="id"
      :getData="pageData"
       v-if="showEditStatus==false"
    ></showData>

    <addOreditShow
      v-if="showEditStatus==true"
      ref="addOreditShow"
      @returnPage="returnPage"
    ></addOreditShow>
  </div>
</template>

<script>
    import{getReimbursementDetail} from '@/api/views/financialAproval/expenseReimbursement.js'
    import{postUndo,undoInvalid} from '@/api/views/financialAproval/utils.js'
    import showData from "@/components/financialAproval/expenseReimbursement/showData";
    import addOreditShow from "@/components/financialAproval/expenseReimbursement/addOreditShow";
    export default {
        name: "itemDetail",
        data(){
            return{
                id:this.$route.query.id,
                pageData:{},
                loginOpenId:'',
                handle:"",
                showEditStatus:false,
                winOpenID:'',
                detailOpenId:''
            }
        },
        mounted(){
            this.getDetail()
            this.loginOpenId=window.localStorage.getItem('openID')
            this.winOpenID=window.localStorage.getItem('openID')

        },
        methods:{
            // 作废申请
            invalidDel(){
                var that=this
                // 1：支付采购;2：费用报销;3：借款;4：差旅
                this.$confirm('此操作将该申请作废, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    undoInvalid(
                        {
                            applicationID:this.id,
                            applicationType:2
                        }
                    ).then(res=>{
                        if(res.messageType==0)
                        {
                            that.$message.success('作废成功')
                            this.$router.push('/financialAproval/expenseReimbursement')
                        }else{
                            that.$message.error(res.message)
                        }
                    })
                }).catch(() => {
                });

            },
            // 提交数据后返回
            returnPage(typeData)
            {
                this.showEditStatus=false
                this.getDetail()
                console.log(typeData)
            },
            // 删除本单
            delNowGo(id){
                this.$message.error('未开发删除功能')
            },
            // 提交
            submitForm(typeNum,formName)
            {
                this.$refs.addOreditShow.submitForm(typeNum,formName)
            },
            // 获取详情
            getDetail(){
                var that=this
                getReimbursementDetail(
                    {
                        ApplicationID:this.id,
                    }
                ).then(res=>{
                    if(res.messageType===0)
                    {
                        this.pageData=res.result;
                        this.detailOpenId=res.result.applicantOpenID
                        if(res.result.approvalRecords.length>0)
                        {
                            let approvalLen=res.result.approvalRecords.length
                            this.handle=res.result.approvalRecords[approvalLen-1].handle
                            console.log(this.handle)
                        }
                    }else{
                        this.$message.error(res.message)
                    }
                    console.log(res)
                })
            },
            // 撤回申请
            undoNow(){
                var that=this
                postUndo(
                    {
                        applicationID:this.id,
                        applicationType:2
                    }
                ).then(res=>{
                    if(res.messageType==0)
                    {
                        console.log(res)
                        that.$message({
                            type: 'success',
                            message: res.message
                        });
                        this.getDetail()
                    }else{
                        this.$message.error(res.message)
                    }
                })
            }
        },
        components:{
            'showData':showData,
            'addOreditShow':addOreditShow
        }
    }
</script>
<style lang="scss">
  .viewsfinancialAprovalexpenseReimbursementitemDetail{
    .formSelect{
      width: 400px;
    }

    .el-radio{
      margin-right: 10px;
    }
  }

</style>
<style scoped lang="scss" >
  //部门人员列表上部分按钮
  .companyTitle{
    height: 50px;
    line-height: 50px;
    padding: 0 0 0 30px;
    font-size: 16px;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    .companyName{

    }
    .companyBtnBox{
      padding-right: 30px;
      display: flex;
      .companyBtn{
        cursor: pointer;
        margin-left: 10px;
        a{
          background: #fff;
          padding: 8px 10px;
          color: #000;
          //border-radius: 5px;
          i{
            margin-right: 5px;
            font-size: 24px;
            vertical-align: middle;
            line-height: 1px;
          }
        }
        .btn_left{
          border-left: 1px solid #ddd;

        }
        .btn_right{
          border-right: 1px solid #ddd;
        }
      }
    }

  }
</style>

