<template>
  <div class="viewsfinancialAprovaltravelExpensesaddOrEdit">
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
                  v-for="(item,index) in departmentList"
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
            <el-form-item label="项目编号" prop="projectNum">
              <el-input v-model="ruleForm.projectNum" placeholder="请输入项目编号"></el-input>
            </el-form-item>
          </div>
          <div class="formItem">
            <el-form-item label="项目名称" prop="projectName">
              <el-input v-model="ruleForm.projectName" placeholder="请输入项目名称"></el-input>
            </el-form-item>
          </div>
          <div class="formItem">
            <el-form-item label="出差人员" >
              <el-select
                v-model="ruleForm.people"
                multiple
                filterable
                placeholder="选择人员多选">
                <el-option
                  v-for="item in userList"
                  :key="item.openID"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
<!--              <el-input v-model="ruleForm.people" placeholder="请输入出差人员"></el-input>-->
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
                <!--                <el-option label="冲账" :value="3"></el-option>-->
              </el-select>
            </el-form-item>
          </div>
          <div class="formItem">
            <el-form-item label="出发日期" prop="departureDate">
              <el-date-picker
                v-model="ruleForm.departureDate"
                :picker-options="pickerOptionsStart"
                @change="changeEnd"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="formItem">
            <el-form-item label="返回日期" prop="returnDate">
              <el-date-picker
                v-model="ruleForm.returnDate"
                :picker-options="pickerOptionsEnd"
                @change="changeStart"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </div>
          <div class="formItem">
            <el-form-item label="出差类型" prop="businessTripType">
              <el-select
                v-model="ruleForm.businessTripType"
                popper-class="formSelect"
                placeholder="请选择出差类型">
                <el-option label="户外作业" :value="0"></el-option>
                <el-option label="会议或培训" :value="1"></el-option>
                <el-option label="普通出差" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="formItem">
            <el-form-item label="出差事由">
              <el-input v-model="ruleForm.businessTripReson" placeholder="请输入出差事由"></el-input>
            </el-form-item>
          </div>
          <div class="formItem">
            <el-form-item label="借款申请单" >
              <div style="cursor: pointer" class="jiekuan" @click="setborrowApplication()">
                <span style="color: #c0c4cc" v-if="ruleForm.borrowApplicationIDList.length==0">点击选择已有的借款审批单<i style="font-size: 20px"  class="iconfont icon-shenpiliucheng"></i></span>
                <span v-else>已选择{{ruleForm.borrowApplicationIDList.length}}份借款审批单</span>
              </div>
            </el-form-item>
          </div>
          <div class="formItem">
            <el-form-item label="费用归属"  prop="costBelong">
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
                <i
                  @click="ruleForm.businessTripDetailList.push({  placeOfDeparture:'',
                            destination:'',
                            airTickets:0,
                            trainTickets:0,
                            busTickets:0,
                            otherTransportation:0,
                            cityTransportation:0,
                            accommodation:0,
                            businessReception:0,
                            otherFees:0,
                            totalItem:0,
                            isInputTax:false})"
                  class="iconfont icon-zeng"></i>
              </div>
              <div class="topRightBtn">
                <i @click="delBtnStatus?delBtnStatus=false:delBtnStatus=true" class="iconfont icon-shan"></i>
              </div>
            </div>
          </div>

          <!--        明细-->
          <div class="detailContent">

            <el-scrollbar  class="detailItem">
              <!--              <div class="detailItem">-->
              <table  border="1" cellspacing="0" cellpadding="0" >
                <tr>
                  <th class="detailNum">序号</th>
                  <th  class="detailUse">出发地</th>
                  <th  class="detailTxt">到达地</th>
                  <th  class="detailmoney">机票费</th>
                  <th  class="detailmoney">火车费</th>
                  <th  class="detailmoney">汽车费</th>
                  <th  class="detailmoney">其他交通工具费用</th>
                  <th  class="detailmoney">市内交通费用</th>
                  <th  class="detailmoney">住宿费</th>
                  <th  class="detailmoney">业务接待费</th>
                  <th  class="detailmoney">其他费用</th>
                  <th  class="detailmoney">小计</th>
                  <th  class="detailmoney">是否含有进项税额</th>
                  <th v-if="delBtnStatus" class="detailDel">删除</th>
                </tr>
                <template v-for="(item,index) in ruleForm.businessTripDetailList">
                  <tr>
                    <td class="detailNum">{{index+1}}</td>
                    <td  class="detailUse elInputNew elAddress"  style="min-width: 220px">
                      <el-form-item
                        label="项"
                        :prop="`businessTripDetailList[${index}].placeOfDeparture`"
                        :rules="{ required: true, message: '请选择地区', trigger: 'change' }">
                        <el-cascader
                          v-model="item.placeOfDeparture"
                          :options="addressCode"
                          placeholder="请选择地区"
                          :props="{ value:'name',label:'name',children:'districts' }">
                        </el-cascader>
                      </el-form-item>

                    </td>
                    <td  class="detailUse elInputNew elAddress"  style="min-width: 220px">
                      <el-form-item
                        label="项"
                        :prop="`businessTripDetailList[${index}].destination`"
                        :rules="{ required: true, message: '请选择地区', trigger: 'change' }">
                        <el-cascader
                          v-model="item.destination"
                          :options="addressCode"
                          placeholder="请选择地区"
                          :props="{ value:'name',label:'name',children:'districts' }">
                        </el-cascader>
                      </el-form-item>

                    </td>
                    <td class="elInputNew elInputMoney">
                      <el-form-item
                        label="项"
                        :change="formTotal(index)"
                        :prop="`businessTripDetailList[${index}].airTickets`"
                        :rules="{ required: true,pattern: /^[0-9]+(\.\d+)?$/,message:'请输入金额',
                       trigger: 'blur' }">
                        <el-input placeholder="输入金额" v-model="item.airTickets"></el-input>
                      </el-form-item>
                    </td>
                    <td class="elInputNew elInputMoney">
                      <el-form-item
                        label="项"
                        :change="formTotal(index)"
                        :prop="`businessTripDetailList[${index}].trainTickets`"
                        :rules="{ required: true,pattern: /^[0-9]+(\.\d+)?$/,message:'请输入金额',
                       trigger: 'blur' }">
                        <el-input placeholder="输入金额" v-model="item.trainTickets"></el-input>
                      </el-form-item>
                    </td>
                    <td class="elInputNew elInputMoney">
                      <el-form-item
                        label="项"
                        :change="formTotal(index)"
                        :prop="`businessTripDetailList[${index}].busTickets`"
                        :rules="{ required: true,pattern: /^[0-9]+(\.\d+)?$/,message:'请输入金额',
                       trigger: 'blur' }">
                        <el-input placeholder="输入金额" v-model="item.busTickets"></el-input>
                      </el-form-item>
                    </td>
                    <td class="elInputNew elInputMoney">
                      <el-form-item
                        label="项"
                        :change="formTotal(index)"
                        :prop="`businessTripDetailList[${index}].otherTransportation`"
                        :rules="{ required: true,pattern: /^[0-9]+(\.\d+)?$/,message:'请输入金额',
                       trigger: 'blur' }">
                        <el-input placeholder="输入金额" v-model="item.otherTransportation"></el-input>
                      </el-form-item>
                    </td>
                    <td class="elInputNew elInputMoney">
                      <el-form-item
                        label="项"
                        :change="formTotal(index)"
                        :prop="`businessTripDetailList[${index}].cityTransportation`"
                        :rules="{ required: true,pattern: /^[0-9]+(\.\d+)?$/,message:'请输入金额',
                       trigger: 'blur' }">
                        <el-input placeholder="输入金额" v-model="item.cityTransportation"></el-input>
                      </el-form-item>
                    </td>
                    <td class="elInputNew elInputMoney">
                      <el-form-item
                        label="项"
                        :change="formTotal(index)"
                        :prop="`businessTripDetailList[${index}].accommodation`"
                        :rules="{ required: true,pattern: /^[0-9]+(\.\d+)?$/,message:'请输入金额',
                       trigger: 'blur' }">
                        <el-input placeholder="输入金额" v-model="item.accommodation"></el-input>
                      </el-form-item>
                    </td>
                    <td class="elInputNew elInputMoney">
                      <el-form-item
                        label="项"
                        :change="formTotal(index)"
                        :prop="`businessTripDetailList[${index}].businessReception`"
                        :rules="{ required: true,pattern: /^[0-9]+(\.\d+)?$/,message:'请输入金额',
                       trigger: 'blur' }">
                        <el-input placeholder="输入金额" v-model="item.businessReception"></el-input>
                      </el-form-item>
                    </td>
                    <td class="elInputNew elInputMoney">
                      <el-form-item
                        label="项"
                        :change="formTotal(index)"
                        :prop="`businessTripDetailList[${index}].otherFees`"
                        :rules="{ required: true,pattern: /^[0-9]+(\.\d+)?$/,message:'请输入金额',
                       trigger: 'blur' }">
                        <el-input placeholder="输入金额" v-model="item.otherFees"></el-input>
                      </el-form-item>
                    </td>
                    <td>
                      {{item.totalItem}}
                    </td>
                    <td>
                      <el-radio-group v-model="item.isInputTax">
                        <el-radio :label=true>是</el-radio>
                        <el-radio :label=false>否</el-radio>
                      </el-radio-group>
                    </td>
                    <td v-if="delBtnStatus"  class="detailDel">
                      <i @click="ruleForm.businessTripDetailList.splice(index,1)" class="iconfont icon-shan"></i>
                    </td>
                  </tr>
                </template>
              </table>
              <!--              </div>-->
            </el-scrollbar>
          </div>
        </div>

        <!--        备注-->
        <div class="remarksBox">
          <div class="remakeMoney">
            <div class="remakeMoneyShow">
              <span style="margin:0 20px 0 25px">合计金额    </span><span> {{toalMoney.toLocaleString('zh')}} 元</span>
            </div>
            <div class="remakeTxt" v-if="ruleForm.borrowApplicationIDList.length>0">
              <div class="remakeTxtItem">
                <el-form-item label="预借金额" prop="originalBorrow">
                  <span class="noneInput" >{{ ruleForm.originalBorrow}}</span>
<!--                  <el-input  v-model="ruleForm.originalBorrow"></el-input>-->
                </el-form-item>
              </div>
              <div class="remakeTxtItem">
                <el-form-item :label="ruleForm.blance>0?'应退差额':'应补差额'" prop="blance">
                  <span class="noneInput" >{{ ruleForm.blance>0?ruleForm.blance:-ruleForm.blance}}</span>
                  <!--                  <el-input v-model="ruleForm.blance"></el-input>-->
                </el-form-item>
              </div>

              <div class="remakeTxtItem">
                <el-form-item label="其他费用说明" prop="otherCostRemark">
                  <el-input v-model="ruleForm.otherCostRemark" placeholder="请输入其他费用说明"></el-input>
                </el-form-item>
              </div>
              <div class="remakeTxtItem">
                <el-form-item  v-if="ruleForm.blance>0"  label="是否退还借款" prop="isRefund">
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
                      <td>
<!--                        <input type="text" disabled :value="item.fileUrl">-->
                        {{item.fileUrl}}
                      </td>
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
    import {addBusinessTrip,getBusinessTripDetail} from '@/api/views/financialAproval/travelExpenses.js'
    import {number_chinese,onlyNumber,nowDatetime,dateForString} from '@/assets/js/public.js'
    import {getUser} from '@/api/views/addressBook/addressBook.js'
    import codeOfChina from '@/assets/json/codeOfChina.json'
    import costPurpose from '@/components/financialAproval/expenseReimbursement/costPurpose.vue'
    import costBorrow from '@/components/financialAproval/expenseReimbursement/costBorrow.vue'
    import axios from 'axios'
    export default {
        name: "addOreditShow.vue",
        data(){
            return{
                pickerOptionsStart: {},
                pickerOptionsEnd:{},
                startDate: '',
                endDate: '',

                delBtnStatus:false,
                departmentList:[],
                userList:[],
                userInfo:{
                    realName:'',
                    nickName:''
                },
                updataHeard:{
                    'x-eco-client-appsession':'53a2b4a9dfed4f2aa5e352948b711890',
                    'x-eco-client-version':'1.0.0',
                    'x-eco-session':window.localStorage.getItem('token')
                },
                addressCode:[],
                costBorrowVisible:false,//借款费用列表弹窗控制按钮
                purposeIndex:-1,
                costPurposeVisible:false,//使用用途弹窗控制按钮
                ruleForm:{
                    departmentID:'',
                    borrowApplication:'',
                    borrowApplicationIDList:[],
                    addType:0,
                    blance:0,
                    businessTripReson:'',
                    businessTripType:0,
                    costBelong:0,
                    departureDate:'',
                    isRefund:false,
                    originalBorrow:0,
                    otherCostRemark:'',
                    payOfMethod:0,
                    people:'',
                    projectName:'',
                    projectNum:'',
                    returnDate:'',
                    totalPay:0,
                    writeTime:'',
                    businessTripDetailList:[
                        {
                            placeOfDeparture:'',
                            destination:'',
                            airTickets:0,
                            trainTickets:0,
                            busTickets:0,
                            otherTransportation:0,
                            cityTransportation:0,
                            accommodation:0,
                            businessReception:0,
                            otherFees:0,
                            totalItem:0,
                            isInputTax:false
                        },
                    ],
                    fileList: [
                    ]
                },
                rules:{
                    departmentID: [
                        { required: true, message: '请选择申请部门', trigger: 'change' }
                    ],
                    projectNum: [
                        { required: true, message: '请输入项目编号', trigger: ['blur', 'change']},
                        { min: 1, max: 30, message: '至少输入1个字符', trigger: ['blur', 'change'] }
                    ],
                    projectName: [
                        { required: true, message: '请输入项目名称', trigger: ['blur', 'change']},
                        { min: 1, max: 50, message: '至少输入1个字符', trigger: ['blur', 'change'] }
                    ],
                    payOfMethod: [
                        { required: true, message: '请选择付款方式', trigger: 'change' }
                    ],
                    departureDate: [
                        { required: true, message: '请选择出发日期', trigger: 'change' }
                    ],
                    returnDate: [
                        { required: true, message: '请选择返回日期', trigger: 'change' }
                    ],
                    businessTripType: [
                        { required: true, message: '请选择出差类型', trigger: 'change' }
                    ],
                    businessTripReson: [
                        { required: true, message: '请输入出差事由', trigger: 'change' },
                        { min: 1, max: 150, message: '至少输入1个字符', trigger: ['blur', 'change'] }
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
                    costBelong: [
                        { required: true,message: '请输入费用归属', trigger: 'change' },
                    ],

                },

            }
        },
        created(){
        },
        mounted(){
            this.userInfo.realName=window.localStorage.getItem('realName')
            this.userInfo.nickName=window.localStorage.getItem('nickName')

            // 获取本地的地区数据
            axios.get('../../../../static/codeOfChina.json').then(response => {
                this.setAddresData(response.data.districts[0].districts)
                // console.log(response.data.districts[0].districts);
            }, response => {
                console.log("error");
            });

            // 获取部门列表
            this.getUserList()
            // 获取数据详情
            this.getItemData()
            this.changeStart()
            this.changeEnd()
            if(this.ruleForm.writeTime=='')
            {
                let a=nowDatetime()
                // console.log(nowDatetime())
                this.ruleForm.writeTime=a
                this.ruleForm.departureDate=new Date()
                this.ruleForm.returnDate=new Date()
            }
            // fetch('../../../assets/json/codeOfChina.json').then(response => response.json())
            //     .then(data => console.log(data))
            //     .catch(e => console.log("Oops, error", e))



        },
        methods:{
            // 出发日期改变时
            changeStart (){
                this.pickerOptionsStart = Object.assign({},this.pickerOptionsStart,{
                    disabledDate: (time) => {
                        return time.getTime() > this.ruleForm.returnDate
                    }
                })
            },
            // 返回日期改变时
            changeEnd (){
                this.pickerOptionsEnd = Object.assign({},this.pickerOptionsEnd,{
                    disabledDate: (time) => {
                        return time.getTime() < this.ruleForm.departureDate
                    }
                })
            },

            // 获取详情并赋值
            getItemData(){
                var that=this
                let updataId=that.$route.query.id
                if(updataId!=undefined)
                {
                    // console.log(that.$route.query.id)
                    getBusinessTripDetail(
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
                            this.ruleForm.returnDate = new Date(this.ruleForm.returnDate);
                            this.ruleForm.departureDate = new Date(this.ruleForm.departureDate);
                            for(let ud in this.ruleForm.businessTripDetailList)
                            {
                                this.ruleForm.businessTripDetailList[ud].destination=this.ruleForm.businessTripDetailList[ud].destination.split(',');
                                this.ruleForm.businessTripDetailList[ud].placeOfDeparture=this.ruleForm.businessTripDetailList[ud].placeOfDeparture.split(',');
                            }
                            this.ruleForm.applicationID=updataId
                            if(this.ruleForm.people=='')
                            {
                                this.ruleForm.people=[]
                            }else{
                                this.ruleForm.people = this.ruleForm.people.split(',');
                            }

                        }else{
                            this.$message.error(res.message)
                        }
                        console.log(res)
                        console.log(this.ruleForm)
                    })
                }
            },
            // 获取用户列表
            getUserList(){
                getUser().then(res=>{
                    // 部门列表赋值
                    this.departmentList=res.result
                    // 用户列表赋值
                    let rr=res.result
                    for(let i in rr)
                    {
                        this.userList=this.userList.concat(rr[i].user)
                    }
                    // console.log(res)
                    // 部门默认赋值
                    if(this.ruleForm.departmentID==''||this.ruleForm.departmentID==undefined)
                    {
                        this.ruleForm.departmentID=parseInt(window.localStorage.getItem('departmentID'))
                    }
                })
            },
            // 上传成功时
            uploadFileSuccess(response, file, fileList){
                console.log(response)
                console.log(file)
                console.log(fileList)
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
                console.log(file)
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
            // 细节里面的小计
            formTotal(index){
                // console.log(1)
                let rd =this.ruleForm.businessTripDetailList[index];
                // console.log(rd)
                let num=0;
                num+=rd.airTickets==undefined||rd.airTickets==''?0:parseFloat(rd.airTickets)
                num+=rd.trainTickets==undefined||rd.trainTickets==''?0:parseFloat(rd.trainTickets)
                num+=rd.busTickets==undefined||rd.busTickets==''?0:parseFloat(rd.busTickets)
                num+=rd.otherTransportation==undefined||rd.otherTransportation==''?0:parseFloat(rd.otherTransportation)
                num+=rd.cityTransportation==undefined||rd.cityTransportation==''?0:parseFloat(rd.cityTransportation)
                num+=rd.accommodation==undefined||rd.accommodation==''?0:parseFloat(rd.accommodation)
                num+=rd.businessReception==undefined||rd.businessReception==''?0:parseFloat(rd.businessReception)
                num+=rd.otherFees==undefined||rd.otherFees==''?0:parseFloat(rd.otherFees)
                this.ruleForm.businessTripDetailList[index].totalItem=num
                // console.log(num)
                // return num
            },
            // 设置借款单
            setborrowApplication(){
                var that=this
                // console.log(1)
                that.costBorrowVisible=true;
            },
            // 接收子组件的借款单参数
            getChildBorrowApplication(obj){
                var that=this
                // console.log(obj)
                this.ruleForm.borrowApplicationIDList=obj.setData
                this.ruleForm.originalBorrow=obj.tatalMoney
            },
            // 获取本地的地区数据
            setAddresData(data) {
                var that=this;
                let _code=data;
                // 循环遍历json数据
                for (var i = 0; i < _code.length; i++) {

                    if (_code[i].districts.length < 1) {
                        // children若为空数组，则将children设为undefined
                        _code[i].districts = undefined;
                    } else {
                        // children若不为空数组，则继续 递归调用 本方法
                        that.setAddresData(_code[i].districts);
                    }
                }
                that.addressCode=_code
                // return _code;
            },
            // 接收子组件的参数
            getChildPirpose(obj){
                var that=this
                console.log(obj)
                that.ruleForm.businessTripDetailList[that.purposeIndex].title=obj.title
                console.log(that.purposeIndex)
                console.log(that.ruleForm.businessTripDetailList[that.purposeIndex])
                console.log(that.ruleForm)
            },
            // 提交表单
            submitForm(typeNum,formName) {
                var that=this;
                let rp=that.ruleForm.businessTripDetailList
                if(typeNum===0) {
                    this.$refs[formName].validate((valid) => {
                        console.log(valid)
                        console.log(this.ruleForm)
                        if (valid) {
                            let upData = this.ruleForm;
                            // 转换格式
                            upData.addType = typeNum
                            upData.departmentID = upData.departmentID.toString()
                            upData.returnDate=dateForString(upData.returnDate)
                            upData.departureDate=dateForString(upData.departureDate)
                            if(this.ruleForm.people==''||this.ruleForm.people==[])
                            {
                                upData.people=''
                            }else{
                                upData.people=upData.people.toString()
                            }
                            if(this.ruleForm.originalBorrow!='')
                            {
                                upData.originalBorrow=parseFloat(this.ruleForm.originalBorrow)
                            }
                            if(this.ruleForm.blance!='')
                            {
                                upData.blance=parseFloat(this.ruleForm.blance)
                            }

                            for (let ud in upData.businessTripDetailList) {
                                upData.businessTripDetailList[ud].destination = upData.businessTripDetailList[ud].destination.toString()
                                upData.businessTripDetailList[ud].placeOfDeparture = upData.businessTripDetailList[ud].placeOfDeparture.toString()
                                if(upData.businessTripDetailList[ud].airTickets!='')
                                {
                                    upData.businessTripDetailList[ud].airTickets=parseFloat(upData.businessTripDetailList[ud].airTickets)
                                }
                                if(upData.businessTripDetailList[ud].trainTickets!='')
                                {
                                    upData.businessTripDetailList[ud].trainTickets=parseFloat(upData.businessTripDetailList[ud].trainTickets)
                                }
                                if(upData.businessTripDetailList[ud].busTickets!='')
                                {
                                    upData.businessTripDetailList[ud].busTickets=parseFloat(upData.businessTripDetailList[ud].busTickets)
                                }
                                if(upData.businessTripDetailList[ud].otherTransportation!='')
                                {
                                    upData.businessTripDetailList[ud].otherTransportation=parseFloat(upData.businessTripDetailList[ud].otherTransportation)
                                }
                                if(upData.businessTripDetailList[ud].cityTransportation!='')
                                {
                                    upData.businessTripDetailList[ud].cityTransportation=parseFloat(upData.businessTripDetailList[ud].cityTransportation)
                                }
                                if(upData.businessTripDetailList[ud].accommodation!='')
                                {
                                    upData.businessTripDetailList[ud].accommodation=parseFloat(upData.businessTripDetailList[ud].accommodation)
                                }
                                if(upData.businessTripDetailList[ud].businessReception!='')
                                {
                                    upData.businessTripDetailList[ud].businessReception=parseFloat(upData.businessTripDetailList[ud].businessReception)
                                }
                                if(upData.businessTripDetailList[ud].otherFees!='')
                                {
                                    upData.businessTripDetailList[ud].otherFees=parseFloat(upData.businessTripDetailList[ud].otherFees)
                                }
                                if(upData.businessTripDetailList[ud].totalItem!='')
                                {
                                    upData.businessTripDetailList[ud].totalItem=parseFloat(upData.businessTripDetailList[ud].totalItem)
                                }
                            }

                            addBusinessTrip(upData).then(res => {
                                if (res.messageType == 0) {
                                    this.$message.success('编辑成功！');
                                    this.$emit('returnPage', res.messageType)
                                    // this.$router.push('/financialAproval/travelExpenses')
                                } else {
                                    this.$emit('returnPage', res.messageType)
                                    this.$message.error(res.message);
                                }
                            })
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                }else{
                    this.temporarySubmit(typeNum)
                }

            },
            // 暂存提交时
            temporarySubmit(typeNum) {
                var that = this;
                let upData = this.ruleForm;
                // 转换格式
                upData.addType = typeNum
                upData.departmentID = upData.departmentID.toString()
                upData.returnDate=dateForString(upData.returnDate)
                upData.departureDate=dateForString(upData.departureDate)
                // upData.totalPay=upData.totalPay.toString()
                console.log(this.ruleForm.people)
                if(this.ruleForm.people==''||this.ruleForm.people==[])
                {
                    upData.people=''
                }else{
                    upData.people=upData.people.toString()
                }
                if(this.ruleForm.originalBorrow!='')
                {
                    upData.originalBorrow=parseFloat(this.ruleForm.originalBorrow)
                }else{
                    upData.originalBorrow=0
                }
                if(this.ruleForm.blance!='')
                {
                    upData.blance=parseFloat(this.ruleForm.blance)
                }else{
                    upData.blance=0
                }

                for (let ud in upData.businessTripDetailList) {
                    upData.businessTripDetailList[ud].destination = upData.businessTripDetailList[ud].destination.toString()
                    upData.businessTripDetailList[ud].placeOfDeparture = upData.businessTripDetailList[ud].placeOfDeparture.toString()
                    if(upData.businessTripDetailList[ud].airTickets!='')
                    {
                        upData.businessTripDetailList[ud].airTickets=parseFloat(upData.businessTripDetailList[ud].airTickets)
                    }else{
                        upData.businessTripDetailList[ud].airTickets=0
                    }
                    if(upData.businessTripDetailList[ud].trainTickets!='')
                    {
                        upData.businessTripDetailList[ud].trainTickets=parseFloat(upData.businessTripDetailList[ud].trainTickets)
                    }else{
                        upData.businessTripDetailList[ud].trainTickets=0
                    }
                    if(upData.businessTripDetailList[ud].busTickets!='')
                    {
                        upData.businessTripDetailList[ud].busTickets=parseFloat(upData.businessTripDetailList[ud].busTickets)
                    }else{
                        upData.businessTripDetailList[ud].busTickets=0
                    }
                    if(upData.businessTripDetailList[ud].otherTransportation!='')
                    {
                        upData.businessTripDetailList[ud].otherTransportation=parseFloat(upData.businessTripDetailList[ud].otherTransportation)
                    }else{
                        upData.businessTripDetailList[ud].otherTransportation=0
                    }
                    if(upData.businessTripDetailList[ud].cityTransportation!='')
                    {
                        upData.businessTripDetailList[ud].cityTransportation=parseFloat(upData.businessTripDetailList[ud].cityTransportation)
                    }else{
                        upData.businessTripDetailList[ud].cityTransportation=0
                    }
                    if(upData.businessTripDetailList[ud].accommodation!='')
                    {
                        upData.businessTripDetailList[ud].accommodation=parseFloat(upData.businessTripDetailList[ud].accommodation)
                    }else{
                        upData.businessTripDetailList[ud].accommodation=0
                    }
                    if(upData.businessTripDetailList[ud].businessReception!='')
                    {
                        upData.businessTripDetailList[ud].businessReception=parseFloat(upData.businessTripDetailList[ud].businessReception)
                    }else{
                        upData.businessTripDetailList[ud].businessReception=0
                    }
                    if(upData.businessTripDetailList[ud].otherFees!='')
                    {
                        upData.businessTripDetailList[ud].otherFees=parseFloat(upData.businessTripDetailList[ud].otherFees)
                    }else{
                        upData.businessTripDetailList[ud].otherFees=0
                    }
                    if(upData.businessTripDetailList[ud].totalItem!='')
                    {
                        upData.businessTripDetailList[ud].totalItem=parseFloat(upData.businessTripDetailList[ud].totalItem)
                    }else{
                        upData.businessTripDetailList[ud].totalItem=0
                    }
                }

                addBusinessTrip(upData).then(res => {
                    if (res.messageType == 0) {
                        this.$message.success('编辑成功！');
                        this.$emit('returnPage', res.messageType)
                        // this.$router.push('/financialAproval/travelExpenses')
                    } else {
                        this.$emit('returnPage', res.messageType)
                        this.$message.error(res.message);
                    }
                })
            },
            // 限制金钱数额为两位数
            moneyInput(el,name){
                this.ruleForm[name] =onlyNumber(el)
            }
        },
        computed:{
            // 合计计算
            toalMoney()
            {
                let that=this
                let rd =this.ruleForm.businessTripDetailList;
                let num=0
                for(let i in rd)
                {
                    if(parseFloat(rd[i].totalItem)>=0)
                    {
                        num+=parseFloat(rd[i].totalItem)
                    }
                }
                this.ruleForm.totalPay=num
                this.ruleForm.blance=this.ruleForm.originalBorrow-this.ruleForm.totalPay;
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
                    that.ruleForm.blance=that.ruleForm.originalBorrow-that.ruleForm.totalPay;
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
  .viewsfinancialAprovaltravelExpensesaddOrEdit{

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


    /*横向滚动条*/
    .detailItem .el-scrollbar__wrap {
      overflow: hidden;
      overflow-y:hidden ;
      margin-right: 0px!important;
    }
    .detailItem .el-scrollbar__bar.is-vertical{
      display: none;
    }


    /*地区选择按钮*/
    .el-cascader-menu{
      /*padding: 0 10px;*/
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
      .elAddress{
        .el-input__inner{
          border-color: #ddd;
        }
      }
      .elInputMoney{
        .el-form-item{
          width: 110px;
        }
      }
      .elInpputHide{
        .el-input{display: none}
      }

    }
  }

</style>
<style scoped lang="scss" src="@/styles/financialAproval/travelExpenses/addOrEdit.scss">

</style>
