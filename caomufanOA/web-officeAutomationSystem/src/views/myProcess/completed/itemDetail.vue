<template>
  <div  class="contentBody viewsmyProcesscompleteditemDetail">
    <!--                  顶部按钮部分-->
    <div class="companyTitle">
      <div class="companyName">
        <span v-if="showType=='1'">支付采购单--详情</span>
        <span v-if="showType=='2'">费用报销审批单--详情</span>
        <span v-if="showType=='3'">借款审批单--详情</span>
        <span v-if="showType=='4'">差旅费审批单--详情</span>
      </div>
      <div class="companyBtnBox">
        <div class="companyBtn">
          <template v-if="showEditStatus==true">
            <a style="color: #4ca824;"  class="btn_left" @click="submitForm(0,'ruleForm')"><i class="iconfont icon-tijiao"></i>提交</a>
            <a  class="btn_left" @click="submitForm(1,'ruleForm')"><i class="iconfont icon-zancun"></i>暂存</a>
            <a  class="btn_left" @click="showEditStatus=false"><i class="iconfont icon-fanhui"></i>返回</a>
          </template>
          <template v-if="showEditStatus==false">
            <a v-if="handle==0&&checkOpenId==winOpenID"
               @click="approveGo(1)"
               style="color: #4ca824;"
               class="btn_left"  >
              <i class="iconfont icon-tijiao"></i>同意
            </a>
            <a  v-if="handle==0&&checkOpenId==winOpenID"
                @click="approveGo(2)"
                style="color: #e23030;"
                class="btn_left"  >
              <i style="font-weight: bold;" class="iconfont icon-butongyi"></i>不同意
            </a>
            <a v-if="handle==2&&detailOpenId==winOpenID&&pageData.status!=4&&pageData.status!=7"
               style="color: #4ca824;"
               class="btn_left"
               @click="showEditStatus=true">
              <i class="iconfont icon-zhongmingming"></i>编辑
            </a>
            <a v-if="handle==2&&detailOpenId==winOpenID&&pageData.status!=4&&pageData.status!=7"
               @click="invalidDel()"
               style="color: #e23030;"
               class="btn_left"  >
              <i class="iconfont icon-shan"></i>作废
            </a>
            <a class="btn_left"
              v-if="(detailOpenId==winOpenID)&&(pageData.status==2)"
              @click="undoNow" >
              <i class="iconfont icon-chehui"></i>撤回申请
            </a>
            <a   class="btn_left"  v-print="'#printTest'">
              <i class="iconfont icon-zancun"></i>打印
            </a>
            <router-link   class="btn_left"  :to="{path:'/myProcess/completed'}">
              <i class="iconfont icon-fanhui"></i>返回
            </router-link>
          </template>
        </div>
      </div>
    </div>

    <showData1 v-if="showType=='1'&&showEditStatus==false" :getData="pageData"  :id="id"></showData1>
    <showData2 v-if="showType=='2'&&showEditStatus==false" :getData="pageData"  :id="id"></showData2>
    <showData3 v-if="showType=='3'&&showEditStatus==false" :getData="pageData"  :id="id"></showData3>
    <showData4 v-if="showType=='4'&&showEditStatus==false" :getData="pageData"  :id="id"></showData4>

    <addOreditShow1 ref="addOreditShow" @returnPage="returnPage" v-if="showType=='1'&&showEditStatus==true" :id="id"></addOreditShow1>
    <addOreditShow2 ref="addOreditShow" @returnPage="returnPage" v-else-if="showType=='2'&&showEditStatus==true" :id="id"></addOreditShow2>
    <addOreditShow3 ref="addOreditShow" @returnPage="returnPage" v-else-if="showType=='3'&&showEditStatus==true" :id="id"></addOreditShow3>
    <addOreditShow4 ref="addOreditShow" @returnPage="returnPage" v-else-if="showType=='4'&&showEditStatus==true" :id="id"></addOreditShow4>

  </div>
</template>

<script>
    import {updataMyprocessStatus} from '@/api/views/myProcess/public.js'
    import showData1 from "@/components/financialAproval/paymentPurchase/showData";
    import showData2 from "@/components/financialAproval/expenseReimbursement/showData";
    import showData3 from "@/components/financialAproval/loanApproval/showData";
    import showData4 from "@/components/financialAproval/travelExpenses/showData";
    import{getPurchaseDetail} from '@/api/views/financialAproval/paymentPurchase.js'
    import{getReimbursementDetail} from '@/api/views/financialAproval/expenseReimbursement.js'
    import{getBorrowDetail} from '@/api/views/financialAproval/loanApproval.js'
    import{getBusinessTripDetail} from '@/api/views/financialAproval/travelExpenses.js'
    import addOreditShow1 from "@/components/financialAproval/paymentPurchase/addOreditShow";
    import addOreditShow2 from "@/components/financialAproval/expenseReimbursement/addOreditShow";
    import addOreditShow3 from "@/components/financialAproval/loanApproval/addOreditShow";
    import addOreditShow4 from "@/components/financialAproval/travelExpenses/addOreditShow";
    import {getMyProcess,updataApprove} from '@/api/views/myProcess/public.js'
    import {undoInvalid,postUndo} from '@/api/views/financialAproval/utils.js'

    export default {
        name: "itemDetail",
        data(){
            return{
                showType:this.$route.query.type,
                id:this.$route.query.id,
                handle:"",
                approvalID:'',
                showEditStatus:false,
                winOpenID:'',
                detailOpenId:'',
                checkOpenId:'',
                pageData:{}
            }
        },
        mounted(){
            this.getDetail()
            this.winOpenID=window.localStorage.getItem('openID')
            // console.log(this.$route)
        },
        methods:{
            // 撤回申请
            undoNow(){
                var that=this
                let applicationID=this.$route.query.id
                postUndo(
                    {
                        applicationID:applicationID,
                        applicationType:parseInt(that.showType)
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
            },
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
                            applicationType:parseInt(this.showType)
                        }
                    ).then(res=>{
                        if(res.messageType==0)
                        {
                            that.$message.success('作废成功')
                            this.$router.push('/myProcess/completed')
                        }else{
                            that.$message.error(res.message)
                        }
                    })
                }).catch(() => {
                });

            },
            // 审核列表
            approveGo(val){
                let opinionStr=''
                let applicationID=this.$route.query.id
                if(val==1)
                {
                    opinionStr='同意'
                }else{
                    opinionStr='不同意'
                }
                updataApprove(
                    {
                        applicationID:applicationID,
                        handle:val,
                        opinion: opinionStr
                    }
                ).then((res) => {
                    if(res.messageType==0)
                    {
                        this.$message.success('审批成功');
                        this.getDetail()
                    }else{
                        this.$message.error(res.message);
                    }
                    console.log(res)
                });
            },
            // 提交数据后返回
            returnPage(typeData)
            {
                this.showEditStatus=false
                this.getDetail()
                console.log(typeData)
            },
            // 提交
            submitForm(typeNum,formName)
            {
                this.$refs.addOreditShow.submitForm(typeNum,formName)
            },
            // 更新抄送为已读
            setRead(){
                if(this.$route.query.status==7)
                {
                    console.log(this.$route)
                    updataMyprocessStatus(
                        {
                            id:this.$route.query.approvalID
                        }
                    ).then(res=>{
                        console.log(res)
                    })
                }
            },
            // 获取详情
            getDetail(){
                var that=this
                if(that.showType=='1')
                {
                    getPurchaseDetail(
                        {
                            ApplicationID:this.id,
                        }
                    ).then(res=>{
                        if(res.messageType===0)
                        {
                            this.pageData=res.result
                            this.approvalID=res.result.applicationNum
                            this.detailOpenId=res.result.applicantOpenID
                            if(res.result.approvalRecords.length>0)
                            {
                                let approvalLen=res.result.approvalRecords.length
                                this.handle=res.result.approvalRecords[approvalLen-1].handle
                                this.checkOpenId=res.result.approvalRecords[approvalLen-1].openID
                                console.log(this.handle)
                            }
                            this.setRead()
                        }else{
                            this.$message.error(res.message)
                        }
                        console.log(res)
                    })
                }else if(that.showType=='2')
                {
                    getReimbursementDetail(
                        {
                            ApplicationID:this.id,
                        }
                    ).then(res=>{
                        if(res.messageType===0)
                        {
                            this.pageData=res.result
                            this.approvalID=res.result.applicationNum
                            this.detailOpenId=res.result.applicantOpenID
                            if(res.result.approvalRecords.length>0)
                            {
                                let approvalLen=res.result.approvalRecords.length
                                this.handle=res.result.approvalRecords[approvalLen-1].handle
                                this.checkOpenId=res.result.approvalRecords[approvalLen-1].openID
                                console.log(this.handle)
                            }
                            this.setRead()
                        }else{
                            this.$message.error(res.message)
                        }
                        console.log(res)
                    })
                }
                else if(that.showType=='3')
                {
                    getBorrowDetail(
                        {
                            ApplicationID:this.id,
                        }
                    ).then(res=>{
                        if(res.messageType===0)
                        {
                            this.pageData=res.result
                            this.approvalID=res.result.applicationNum
                            this.detailOpenId=res.result.applicantOpenID
                            if(res.result.approvalRecords.length>0)
                            {
                                let approvalLen=res.result.approvalRecords.length
                                this.handle=res.result.approvalRecords[approvalLen-1].handle
                                this.checkOpenId=res.result.approvalRecords[approvalLen-1].openID
                                console.log(this.handle)
                            }
                            this.setRead()
                        }else{
                            this.$message.error(res.message)
                        }
                        console.log(res)
                    })
                }
                else if(that.showType=='4')
                {
                    getBusinessTripDetail(
                        {
                            ApplicationID:this.id,
                        }
                    ).then(res=>{
                        if(res.messageType===0)
                        {
                            this.pageData=res.result
                            this.approvalID=res.result.applicationNum
                            this.detailOpenId=res.result.applicantOpenID
                            if(res.result.approvalRecords.length>0)
                            {
                                let approvalLen=res.result.approvalRecords.length
                                this.handle=res.result.approvalRecords[approvalLen-1].handle
                                this.checkOpenId=res.result.approvalRecords[approvalLen-1].openID
                                console.log(this.handle)
                            }
                            this.setRead()
                        }else{
                            this.$message.error(res.message)
                        }
                        console.log(res)
                    })
                }

            },
        },

        components:{
            'showData1':showData1,
            'showData2':showData2,
            'showData3':showData3,
            'showData4':showData4,
            'addOreditShow1':addOreditShow1,
            'addOreditShow2':addOreditShow2,
            'addOreditShow3':addOreditShow3,
            'addOreditShow4':addOreditShow4,
        }
    }
</script>
<style lang="scss" >
  .viewsmyProcesscompleteditemDetail{
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

