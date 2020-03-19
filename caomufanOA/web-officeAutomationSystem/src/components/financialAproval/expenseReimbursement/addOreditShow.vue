<template>
  <div class="viewfinancialAprovalexpenseReimbursementaddOrEdit">
    <el-form label-position="right" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px">


      <!--    表单填取部分-->
      <div class="formContent">
        <div  class="formBody">
          <div class="formItem">
            <el-form-item label="申请部门" prop="departmentID">
              <el-select
                v-model="ruleForm.departmentID"
                popper-class="formSelect"
                placeholder="请选择申请部门">
                <el-option
                  v-for="(item,index) in userList"
                  :key="index"
                  :label="item.departmentName"
                  :value="item.departmentID"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="formItem">
            <el-form-item label="填单时间" >
              <el-date-picker
                :disabled="true"
                v-model="ruleForm.writeTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="formItem">
            <el-form-item label="费用报销类型" prop="reimbursementType">
              <el-select
                v-model="ruleForm.reimbursementType"
                popper-class="formSelect"
                placeholder="请选择费用报销类型">
                <el-option label="日常费用报销" :value="1"></el-option>
                <el-option label="项目费用报销" :value="2"></el-option>
                <el-option label="团队活动费用报销" :value="3"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="formItem">
            <el-form-item label="付款方式" prop="payOfMethod">
              <el-select
                v-model="ruleForm.payOfMethod"
                popper-class="formSelect"
                placeholder="请选择付款方式">
                <el-option label="网银" :value="0"></el-option>
                <el-option label="现金" :value="1"></el-option>
                <el-option label="支票" :value="2"></el-option>
                <!--              <el-option label="冲账" :value="3"></el-option>-->
              </el-select>
            </el-form-item>
          </div>
          <div class="formItem">
            <el-form-item label="项目编号" prop="projectNum">
              <el-input v-model="ruleForm.projectNum"></el-input>
            </el-form-item>
          </div>
          <div class="formItem">
            <el-form-item label="项目名称" prop="projectName">
              <el-input v-model="ruleForm.projectName"></el-input>
            </el-form-item>
          </div>
          <div class="formItem" >
            <el-form-item label="收款单位">
              <el-input v-model="ruleForm.receivingUnit"></el-input>
            </el-form-item>
          </div>
          <div class="formItem">
            <el-form-item label="开户银行" >
              <el-input v-model="ruleForm.bankName"></el-input>
            </el-form-item>
          </div>
          <div class="formItem">
            <el-form-item label="银行账号" >
              <el-input v-model="ruleForm.bankAccount"></el-input>
            </el-form-item>
          </div>
          <div class="formItem">
            <el-form-item label="借款审批单">
              <div class="jiekuan" @click="setborrowApplication()">
                <span style="color: #c0c4cc" v-if="ruleForm.borrowApplicationIDList.length==0">点击选择已有的借款审批单<i style="font-size: 20px"  class="iconfont icon-shenpiliucheng"></i></span>
                <span v-else>已选择{{ruleForm.borrowApplicationIDList.length}}份借款审批单</span>
              </div>
            </el-form-item>
          </div>
          <div class="formItem">
            <el-form-item label="费用归属" prop="costBelong">
              <el-select
                v-model="ruleForm.costBelong"
                popper-class="formSelect"
                placeholder="请选择费用归属">
                <el-option label="总公司" :value="0"></el-option>
                <el-option label="东莞分公司" :value="1"></el-option>
                <el-option label="韶关分公司" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>

        <div class="detailedBox">
          <div class="detailTop">
            <div class="topLeft">
              <span>明细</span>
            </div>
            <div class="topRight">
              <div class="topRightBtn">
                <i @click="ruleForm.reimbursementDetailList.push({ title:'',purposeID:'',remark:'',
                            price:0,
                            isInputTax:false})" class="iconfont icon-zeng"></i>
              </div>
              <div class="topRightBtn">
                <i @click="delBtnStatus?delBtnStatus=false:delBtnStatus=true" class="iconfont icon-shan"></i>
              </div>
            </div>
          </div>

          <!--        明细-->
          <div class="detailContent">

              <div class="detailItem">
                <table style="width: 100%" border="1" cellspacing="0" cellpadding="0" >
                  <tr>
                    <th class="detailNum">序号</th>
                    <th  class="detailUse">费用用途</th>
                    <th  class="detailTxt">备注</th>
                    <th  class="detailmoney">金额(元)</th>
                    <th  class="detailStatus">是否含进项税</th>
                    <th v-if="delBtnStatus"  class="detailDel">删除</th>
                  </tr>
                  <template v-for="(item,index) in ruleForm.reimbursementDetailList">
                  <tr>
                    <td class="detailNum">{{index+1}}</td>
                    <td  class="detailUse elInputNew elInpputHide"  @click="setPurpose(index)">
                      <p >
                        <span style="color: #c0c4cc" v-if="item.purposeID==''">点击选择已有的表单数据<i style="font-size: 20px"  class="iconfont icon-shenpiliucheng"></i></span>
                        <span v-else>{{item.purpose}}</span>
                      </p>
                      <el-form-item
                        label="项"
                        :prop="`reimbursementDetailList[${index}].purposeID`"
                        :rules="{ required: true, message: '请选择已有的表单数据', trigger: 'change' }">
                        <el-input placeholder="请输入摘要" v-model="item.purposeID"></el-input>
                      </el-form-item>
                    </td>
                    <td>
                    <textarea v-model="item.remark" rows="1" placeholder="请输入备注" >
                    </textarea>
                    </td>
                    <td  class="elInputNew">
                      <el-form-item
                        label="项"
                        :prop="`reimbursementDetailList[${index}].price`"
                        :rules="{ required: true,pattern: /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/,message:'请输入大于0的金额',
                       trigger: 'blur' }">
                        <el-input placeholder="输入金额" v-model="item.price"></el-input>
                      </el-form-item>
                    <td style="">
                      <el-radio-group v-model="item.isInputTax">
                        <el-radio :label=true>是</el-radio>
                        <el-radio :label=false>否</el-radio>
                      </el-radio-group>
                    </td>
                    <td v-if="delBtnStatus"  class="detailDel">
                      <i @click="ruleForm.reimbursementDetailList.splice(index,1)" class="iconfont icon-shan"></i>
                    </td>
                  </tr>
                  </template>
                </table>
              </div>

          </div>
        </div>

        <!--        备注-->
        <div class="remarksBox">
          <div class="remakeMoney">
            <div class="remakeMoneyShow">
              <span style="margin:0 20px 0 25px">合计金额    </span><span> {{toalMoney.toLocaleString('zh')}} 元</span>
            </div>
            <div class="remakeTxt"  v-if="ruleForm.borrowApplicationIDList.length>0" >
              <div class="remakeTxtItem">
                <el-form-item label="原借款金额" prop="originalBorrow">
                 <span class="noneInput" >{{ ruleForm.originalBorrow}}</span>
<!--                  <el-input-->
<!--                    type="text"-->
<!--                    :disabled="true"-->
<!--                    v-model="ruleForm.originalBorrow"></el-input>-->
                </el-form-item>
              </div>
              <div class="remakeTxtItem">
                <el-form-item :label="ruleForm.blance>0?'应退差额':'应补差额'" prop="blance">
                  <span class="noneInput" >{{ ruleForm.blance>0?ruleForm.blance:-ruleForm.blance}}</span>
<!--                  <el-input-->
<!--                    type="text"-->
<!--                    :disabled="true"-->
<!--                    v-model="ruleForm.blance"></el-input>-->
                </el-form-item>
              </div>
              <div v-if="ruleForm.blance>0" class="remakeTxtItem">
                <el-form-item  label="是否退还借款" prop="isRefund">
                  <el-radio-group  v-model="ruleForm.isRefund">
                    <el-radio :label=true>是</el-radio>
                    <el-radio :label=false>否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="remakeMore">
            <div class="remakePaople">
              <span v-if="userInfo.realName==''">申请人：{{userInfo.nickName}}</span>
              <span v-else>申请人：{{userInfo.realName}}</span>
            </div>
            <div class="remakeNum">
              流水号：系统自动生成
            </div>
            <div class="remakeFile">
              附件：
              <div>
                <el-upload
                  class="avatar-uploader"
                  action="https://home.caomufan.net/api/file"
                  :headers="updataHeard"
                  :show-file-list="false"
                  :on-success="uploadFileSuccess"
                  :before-upload="beforeAvatarUpload">
                  <el-button size="small" type="primary"><i  class="iconfont icon-zeng"></i>点击上传</el-button>
                </el-upload>
                <div class="remakeAccessoriesList"  v-show="ruleForm.fileList.length>0">
                  <table border="1" cellspacing="0" cellpadding="0">
                    <tr v-for="(item,index) in ruleForm.fileList">
                      <td>{{item.fileUrl}}</td>
                      <td>{{item.fileSize}}Mb</td>
                      <td>
                        <i @click="ruleForm.fileList.splice(index,1)" style="color: #f56f6f;font-size: 24px;" class="iconfont icon-shan"></i>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-form>
    <costPurpose
      v-if="costPurposeVisible"
      :costPurposeVisible.sync="costPurposeVisible"
      @setDataNow='getChildPirpose'
      :purposeIndex="purposeIndex">
    </costPurpose>

    <costBorrow
      v-if="costBorrowVisible"
      :costBorrowVisible.sync="costBorrowVisible"
      :moneyTotal="ruleForm.originalBorrow"
      :costBorrowList="ruleForm.borrowApplicationIDList"
      @setDataNow='getChildBorrowApplication'
    >
    </costBorrow>
  </div>
</template>

<script>
    import {number_chinese,nowDatetime} from '@/assets/js/public.js'
    import {getUser} from '@/api/views/addressBook/addressBook.js'
    import {addReimbursement,getReimbursementDetail} from '@/api/views/financialAproval/expenseReimbursement.js'
    import costPurpose from '@/components/financialAproval/expenseReimbursement/costPurpose.vue'
    import costBorrow from '@/components/financialAproval/expenseReimbursement/costBorrow.vue'
    export default {
        name: "addOredit",
        data(){
            return{
                delBtnStatus:false,
                userList:[],
                userInfo:{
                    realName:'',
                    nickName:''
                },
                costBorrowVisible:false,//借款费用列表弹窗控制按钮
                purposeIndex:-1,
                costPurposeVisible:false,//使用用途弹窗控制按钮
                updataHeard:{
                    'x-eco-client-appsession':'53a2b4a9dfed4f2aa5e352948b711890',
                    'x-eco-client-version':'1.0.0',
                    'x-eco-session':window.localStorage.getItem('token')
                },
                ruleForm:{
                    departmentID:'',
                    addType:0,
                    bankAccount:'',
                    bankName:'',
                    blance:0,
                    costBelong:0,
                    isRefund:false,
                    originalBorrow:0,
                    payOfMethod:0,
                    projectName:'',
                    projectNum:'',
                    receivingUnit:'',
                    reimbursementType:1,
                    writeTime:'',
                    toTalPay:0,
                    borrowApplicationIDList:[],
                    reimbursementDetailList:[
                        {
                            purposeID:'',
                            remark:'',
                            price:0,
                            isInputTax:false
                        }
                    ],
                    fileList: []
                },
                rules:{
                    departmentID: [
                        { required: true, message: '请选择申请部门', trigger: 'change' }
                    ],
                    reimbursementType: [
                        { required: true, message: '费用报销类型', trigger: 'change' }
                    ],
                    payOfMethod: [
                        { required: true, message: '请选择付款方式', trigger: 'change' }
                    ],
                    projectNum: [
                        { required: true, message: '请输入项目编号', trigger: ['blur', 'change']},
                        { min: 1, max: 30, message: '至少输入1个字符', trigger: ['blur', 'change'] }
                    ],
                    projectName: [
                        { required: true, message: '请输入项目名称', trigger: ['blur', 'change']},
                        { min: 1, max: 50, message: '至少输入1个字符', trigger: ['blur', 'change'] }
                    ],
                    costBelong: [
                        { required: true, message: '请选择费用归属', trigger: 'change' }
                    ],
                    originalBorrow: [
                        { required: true, message: '请输入原借款金额', trigger: ['blur', 'change']},
                    ],
                    blance: [
                        { required: true, message: '请输入应退差额', trigger: ['blur', 'change']},
                    ],
                    isRefund: [
                        { required: true, message: '请选择是否退还借款', trigger: ['blur', 'change']},
                    ],
                },

            }
        },
        mounted(){
            this.userInfo.realName=window.localStorage.getItem('realName')
            this.userInfo.nickName=window.localStorage.getItem('nickName')

            // 获取部门列表
            this.getUserList()
            // 获取数据详情
            this.getItemData()
            if(this.ruleForm.writeTime=='')
            {
                let a=nowDatetime()
                // console.log(nowDatetime())
                this.ruleForm.writeTime=a
            }


        },
        methods:{
            // 获取详情并赋值
            getItemData(){
                var that=this
                let updataId=that.$route.query.id
                if(updataId!=undefined)
                {
                    // console.log(that.$route.query.id)
                    getReimbursementDetail(
                        {
                            ApplicationID:updataId
                        }
                    ).then(res=>{
                        this.ruleForm=res.result
                        if(res.messageType===0)
                        {
                            this.ruleForm=res.result
                            this.ruleForm.departmentID=parseInt(this.ruleForm.departmentID)
                            this.ruleForm.originalBorrow=this.ruleForm.originalBorrow.toString()
                            this.ruleForm.blance=this.ruleForm.blance.toString()
                            this.ruleForm.applicationID=updataId

                        }else{
                            this.$message.error(res.message)
                        }
                        // console.log(res)
                        // console.log(this.ruleForm)
                    })
                }
            },
            // 获取用户列表
            getUserList(){
                getUser().then(res=>{
                    this.userList=res.result
                    // console.log(res)
                    // 部门赋值
                    if(this.ruleForm.departmentID==''||this.ruleForm.departmentID==undefined)
                    {
                        this.ruleForm.departmentID=parseInt(window.localStorage.getItem('departmentID'))
                    }
                })
            },
            // 上传成功时
            uploadFileSuccess(response, file, fileList){
                // console.log(response)
                // console.log(file)
                // console.log(fileList)
                this.ruleForm.fileList.push(
                    {
                        'name':file.name,
                        "fileUrl":file.response.result.url,
                        "fileSize":file.response.result.size
                    }
                )
                console.log(this.ruleForm.fileList)

            },
            // 上传前的检查
            beforeAvatarUpload(file) {
                // console.log(file)
                var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
                const extension = testmsg === 'jpg'
                const extension2 = testmsg === 'jpeg'
                const extension3 = testmsg === 'gif'
                const extension4 = testmsg === 'png'
                const isLt2M = file.size / 1024 / 1024 < 10     //这里做文件大小限制
                // if(!extension && !extension2&& !extension3 && !extension4) {
                //     this.$message({
                //         message: '上传文件只能是 jpg、jpeg、gif、png格式!',
                //         type: 'warning'
                //     });
                // }
                if(!isLt2M) {
                    this.$message({
                        message: '上传文件大小不能超过 10MB!',
                        type: 'warning'
                    });
                }
                // return (extension || extension2|| extension3|| extension4) && isLt2M
                return isLt2M
            },
            // 设置借款单
            setborrowApplication(){
                var that=this

                this.ruleForm.borrowApplicationIDList=this.ruleForm.borrowApplicationIDList
                this.ruleForm.originalBorrow=this.ruleForm.originalBorrow
                // console.log(this.ruleForm.borrowApplicationIDList)
                that.costBorrowVisible=true;

            },
            // 接收子组件的借款单参数
            getChildBorrowApplication(obj){
                var that=this
                // console.log(obj)
                this.ruleForm.borrowApplicationIDList=obj.setData
                this.ruleForm.originalBorrow=obj.tatalMoney
            },
            // 设置用途
            setPurpose(index){
                var that=this
                that.purposeIndex=index;
                that.costPurposeVisible=true;
            },
            // 接收子组件的用途参数
            getChildPirpose(obj){
                var that=this
                // console.log(obj)
                that.ruleForm.reimbursementDetailList[that.purposeIndex].purpose=obj.title
                that.ruleForm.reimbursementDetailList[that.purposeIndex].purposeID=obj.purposeID

            },
            // 提交表单
            submitForm(typeNum,formName) {
                var that=this;
                let rp=that.ruleForm.reimbursementDetailList
                if(typeNum===0) {
                    this.$refs[formName].validate((valid) => {


                        if (valid) {
                            let upData = this.ruleForm;
                            upData.addType = typeNum
                            upData.departmentID = upData.departmentID.toString()
                            if (this.ruleForm.blance != '') {
                                upData.blance = parseFloat(this.ruleForm.blance)
                            }
                            if (this.ruleForm.originalBorrow != '') {
                                upData.originalBorrow = parseFloat(this.ruleForm.originalBorrow)
                            }
                            for (let ud in upData.reimbursementDetailList) {
                                if (upData.reimbursementDetailList[ud].price != '') {
                                    upData.reimbursementDetailList[ud].price = parseFloat(upData.reimbursementDetailList[ud].price)
                                }
                            }
                            addReimbursement(upData).then(res => {
                                if (res.messageType == 0) {
                                    this.$message.success('编辑成功！');
                                    this.$emit('returnPage', res.messageType)
                                    // this.$router.push('/financialAproval/expenseReimbursement')
                                } else {
                                    this.$emit('returnPage', res.messageType)
                                    this.$message.error(res.message);
                                }

                            })
                        } else {

                            return false;
                        }
                    });
                }else{
                    this.temporarySubmit(typeNum)
                }

            },
            // 暂存提交时
            temporarySubmit(typeNum){
                var that=this;
                let upData = this.ruleForm;
                upData.addType = typeNum
                upData.departmentID = upData.departmentID.toString()
                if (this.ruleForm.blance != '') {
                    upData.blance = parseFloat(this.ruleForm.blance)
                }else{
                    upData.blance=0
                }
                if (this.ruleForm.originalBorrow != '') {
                    upData.originalBorrow = parseFloat(this.ruleForm.originalBorrow)
                }else{
                    upData.originalBorrow=0
                }
                for (let ud in upData.reimbursementDetailList) {
                    if (upData.reimbursementDetailList[ud].price != '') {
                        upData.reimbursementDetailList[ud].price = parseFloat(upData.reimbursementDetailList[ud].price)
                    }else{
                        upData.reimbursementDetailList[ud].price=0
                    }
                }
                addReimbursement(upData).then(res => {
                    if (res.messageType == 0) {
                        this.$message.success('编辑成功！');
                        this.$emit('returnPage', res.messageType)
                        // this.$router.push('/financialAproval/expenseReimbursement')
                    } else {
                        this.$emit('returnPage', res.messageType)
                        this.$message.error(res.message);
                    }

                })
            }
        },
        computed:{
            toalMoney()
            {
                let that=this
                let rd =this.ruleForm.reimbursementDetailList;
                let num=0
                for(let i in rd)
                {
                    if(parseFloat(rd[i].price)>=0)
                    {
                        // console.log(rd[i].money)
                        num+=parseFloat(rd[i].price)
                        // console.log(num)
                    }
                }
                this.ruleForm.toTalPay=num;
                this.ruleForm.blance=this.ruleForm.originalBorrow-this.ruleForm.toTalPay;
                if(that.ruleForm.blance<0)
                {
                    that.ruleForm.isRefund=false
                }
                return num
            }
        },
        watch:{
              ruleForm:{
                immediate:true,
                handler(val){
                    let that=this
                    that.ruleForm.blance=that.ruleForm.originalBorrow-that.ruleForm.toTalPay;
                    if(that.ruleForm.blance<0)
                    {
                        that.ruleForm.isRefund=false
                    }

                }
            }
        },
        components:{
            'costPurpose':costPurpose,
            'costBorrow':costBorrow
        }
    }
</script>
<style lang="scss">
  .viewfinancialAprovalexpenseReimbursementaddOrEdit{
    /*弹出框样式更改*/
    .el-dialog__header{
      padding:0;
    }
    .el-dialog__body{
      padding:0;
    }

    /*表单下拉选择框*/
    .formSelect{
      width: 390px;
    }

    /*表单单选框*/
    .el-radio{
      margin-right: 10px;
    }

    input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
    input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;    /*outer */
    }


    .jiekuan{
      width: 300px;
      border: 1px solid #ddd;
      height: 40px;
      line-height: 38px;
      text-align: center;
      border-radius: 4px;
      width:100%;
    }

    .detailItem{
      .elInputNew{
        padding: 22px 0 0 0;
        .el-form-item__label{
          display: none;
        }
        .el-input__inner{
          border-color: #fff;
        }
        .el-form-item__content{
          margin: 0!important;
        }
        .el-form-item.is-error .el-input__inner, .el-form-item.is-error .el-input__inner:focus, .el-form-item.is-error .el-textarea__inner, .el-form-item.is-error .el-textarea__inner:focus, .el-message-box__input input.invalid, .el-message-box__input input.invalid:focus{
          border-color: #F56C6C;
        }
      }
      .elInpputHide{
        .el-input{display: none}
      }

    }
  }


</style>
<style scoped lang="scss" src="@/styles/financialAproval/expenseReimbursement/addOrEdit.scss">

</style>
