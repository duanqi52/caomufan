<template>
  <div class="paymentPurchaseAddOrEdit">
    <el-form
      label-position="right"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <div class="formContent">
        <div class="formBody">
          <div class="formItem">
            <el-form-item label="申请部门" prop="departmentID">
              <el-select
                v-model="ruleForm.departmentID"
                popper-class="formSelect"
                placeholder="请选择申请部门"
              >
                <el-option
                  v-for="(item,index) in userList"
                  :key="index"
                  :label="item.departmentName"
                  :value="item.departmentID"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="formItem">
            <el-form-item label="填单时间">
              <el-date-picker
                :disabled="true"
                v-model="ruleForm.writeTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
          </div>
          <div class="formItem">
            <el-form-item label="支付类型" prop="payType">
              <el-select v-model="ruleForm.payType" popper-class="formSelect" placeholder="请选择支付类型">
                <el-option label="按合同支付" :value="0"></el-option>
                <el-option label="无合同支付" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="formItem">
            <el-form-item label="付款方式" prop="payOfMethod">
              <el-select
                v-model="ruleForm.payOfMethod"
                popper-class="formSelect"
                placeholder="请选择付款方式"
              >
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
          <div class="formItem">
            <el-form-item label="合同金额" prop="contractPrice">
              <el-input type="number" v-model="ruleForm.contractPrice"></el-input>
            </el-form-item>
          </div>
          <div class="formItem">
            <el-form-item label="累计已支付" prop="cumulativePaid">
              <el-input
                oninput="value=value.replace(/[^\d.]/g,'')"
                v-model="ruleForm.cumulativePaid"
              ></el-input>
            </el-form-item>
          </div>
          <div class="formItem">
            <el-form-item label="收款单位" prop="receivingUnit">
              <el-input v-model="ruleForm.receivingUnit"></el-input>
            </el-form-item>
          </div>
          <div class="formItem">
            <el-form-item label="开户银行" prop="bankName">
              <el-input v-model="ruleForm.bankName"></el-input>
            </el-form-item>
          </div>
          <div class="formItem">
            <el-form-item label="银行账号" prop="bankAccount">
              <el-input v-model="ruleForm.bankAccount"></el-input>
            </el-form-item>
          </div>
          <div class="formItem">
            <el-form-item label="支付主体" prop="bayment">
              <el-select v-model="ruleForm.payment" popper-class="formSelect" placeholder="请选择支付主体">
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
                  @click="ruleForm.purchaseDetailList.push({ abstract:'',
                            price:0,
                            isInputTax:false})"
                  class="iconfont icon-zeng"
                ></i>
              </div>
              <div class="topRightBtn">
                <i
                  @click="delBtnStatus?delBtnStatus=false:delBtnStatus=true"
                  class="iconfont icon-shan"
                ></i>
              </div>
            </div>
          </div>

          <!--        明细-->
          <div class="detailContent">
            <div class="detailItem">
              <table style="width: 100%" border="1" cellspacing="0" cellpadding="0">
                <tr>
                  <th class="detailNum">序号</th>
                  <th class="detailTxt">付款项目摘要</th>
                  <th class="detailmoney">金额(元)</th>
                  <th class="detailStatus">是否含进项税</th>
                  <th v-if="delBtnStatus" class="detailDel">删除</th>
                </tr>
                <template v-for="(item,index) in ruleForm.purchaseDetailList">
                  <tr>
                    <td class="detailNum">{{index+1}}</td>
                    <td class="elInputNew">
                      <!--                    <textarea v-model="item.abstract" rows="1" placeholder="未输入摘要" >-->
                      <!--                    </textarea>-->
                      <el-form-item
                        label="项"
                        :prop="`purchaseDetailList[${index}].abstract`"
                        :rules="{ required: true, message: '请输入输入摘要', trigger: 'blur' }"
                      >
                        <el-input placeholder="请输入摘要" v-model="item.abstract"></el-input>
                      </el-form-item>
                    </td>
                    <td class="elInputNew">
                      <!--                    <input type="number"   placeholder="输入金额" oninput="if(value.length>12){value=value.slice(0,12);value= value.replace(/[^\d.]/g,'')}" v-model="item.price">-->
                      <el-form-item
                        label="项"
                        :prop="`purchaseDetailList[${index}].price`"
                        :rules="{ required: true,pattern: /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/,message:'请输入大于0的金额',
                       trigger: 'blur' }"
                      >
                        <el-input placeholder="输入金额" v-model="item.price"></el-input>
                      </el-form-item>
                    </td>
                    <td style>
                      <el-radio-group v-model="item.isInputTax">
                        <el-radio :label="true">是</el-radio>
                        <el-radio :label="false">否</el-radio>
                      </el-radio-group>
                    </td>
                    <td v-if="delBtnStatus" class="detailDel">
                      <i
                        @click="ruleForm.purchaseDetailList.splice(index,1)"
                        class="iconfont icon-shan"
                      ></i>
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
              <span style="margin-right: 20px">合计金额</span>
              <span>{{toalMoney.toLocaleString('en-US')}} 元</span>
            </div>
            <div class="remakeTxt">
              <div class="remakeTxtName">
                <span>备注</span>
              </div>
              <div class="remakeTxtShow">
                <el-input
                  type="textarea"
                  v-model="ruleForm.remark"
                  resize="none"
                  rows="3"
                  placeholder="请输入备注，选填。"
                ></el-input>
              </div>
            </div>
          </div>
          <div class="remakeMore">
            <div class="remakePaople">
              <span v-if="userInfo.realName==''">申请人：{{userInfo.nickName}}</span>
              <span v-else>申请人：{{userInfo.realName}}</span>
            </div>
            <div class="remakeNum">流水号：系统自动生成</div>
            <div class="remakeFile">
              附件：
              <div>
                <el-upload
                  class="avatar-uploader"
                  action="https://home.caomufan.net/api/file"
                  :headers="updataHeard"
                  :show-file-list="false"
                  :on-success="uploadFileSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <el-button size="small" type="primary">
                    <i class="iconfont icon-zeng"></i>点击上传
                  </el-button>
                </el-upload>
                <div class="remakeAccessoriesList" v-show="ruleForm.fileList.length>0">
                  <table border="1" cellspacing="0" cellpadding="0">
                    <tr v-for="(item,index) in ruleForm.fileList">
                      <td>{{item.fileUrl}}</td>
                      <td>{{item.fileSize}}Mb</td>
                      <td>
                        <i
                          @click="ruleForm.fileList.splice(index,1)"
                          style="color: #f56f6f;font-size: 24px;"
                          class="iconfont icon-shan"
                        ></i>
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
  </div>
</template>

<script>
import { number_chinese, nowDatetime } from "@/assets/js/public.js";
import {
  addPurchase,
  getPurchaseDetail
} from "@/api/views/financialAproval/paymentPurchase.js";
import { getUser } from "@/api/views/addressBook/addressBook.js";
import "@/assets/fontStyle/itemData/iconfont.css";
export default {
  name: "addOreditShow.vue",
  data() {
    return {
      delBtnStatus: false,
      userList: [],
      userInfo: {
        realName: "",
        nickName: ""
      },
      updataHeard: {
        "x-eco-client-appsession": "53a2b4a9dfed4f2aa5e352948b711890",
        "x-eco-client-version": "1.0.0",
        "x-eco-session": window.localStorage.getItem("token")
      },
      ruleForm: {
        departmentID: "",
        addType: 0,
        bankAccount: "",
        bankName: "",
        contractPrice: "",
        cumulativePaid: "",
        payOfMethod: 0,
        payType: 0,
        payment: 0,
        projectName: "",
        projectNum: "",
        receivingUnit: "",
        remark: "",
        toTalPay: 0,
        writeTime: "",
        purchaseDetailList: [
          {
            abstract: "",
            price: 0,
            isInputTax: false
          }
        ],
        fileList: []
      },
      rules: {
        departmentID: [
          { required: true, message: "请选择申请部门", trigger: "change" }
        ],
        payType: [
          { required: true, message: "请选择支付类型", trigger: "change" }
        ],
        payOfMethod: [
          { required: true, message: "请选择付款方式", trigger: "change" }
        ],
        projectNum: [
          {
            required: true,
            message: "请输入项目编号",
            trigger: ["blur", "change"]
          },
          {
            min: 1,
            max: 30,
            message: "至少输入1个字符",
            trigger: ["blur", "change"]
          }
        ],
        projectName: [
          {
            required: true,
            message: "请输入项目名称",
            trigger: ["blur", "change"]
          },
          {
            min: 1,
            max: 50,
            message: "至少输入1个字符",
            trigger: ["blur", "change"]
          }
        ],
        contractPrice: [
          {
            required: true,
            message: "请输入合同金额",
            trigger: ["blur", "change"]
          }
        ],
        cumulativePaid: [
          {
            required: true,
            message: "请输入累计已支付金额",
            trigger: ["blur", "change"]
          }
        ],
        bankName: [
          {
            required: true,
            message: "请输入开户银行",
            trigger: ["blur", "change"]
          },
          {
            min: 1,
            max: 24,
            message: "至少输入1个字符",
            trigger: ["blur", "change"]
          }
        ],
        bankAccount: [
          {
            required: true,
            message: "请输入银行账号",
            trigger: ["blur", "change"]
          },
          {
            min: 1,
            max: 24,
            message: "至少输入1个字符",
            trigger: ["blur", "change"]
          }
        ],
        payment: [
          { required: true, message: "请选择支付主体", trigger: "change" }
        ],

        receivingUnit: [
          {
            required: true,
            message: "请输入收款单位",
            trigger: ["blur", "change"]
          },
          {
            min: 1,
            max: 50,
            message: "至少输入1个字符",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  mounted() {
    this.userInfo.realName = window.localStorage.getItem("realName");
    this.userInfo.nickName = window.localStorage.getItem("nickName");

    console.log(number_chinese(0.15));
    // 获取部门列表
    this.getUserList();
    // 获取数据详情
    this.getItemData();
    if (this.ruleForm.writeTime == "") {
      let a = nowDatetime();
      console.log(nowDatetime());
      this.ruleForm.writeTime = a;
    }
  },
  methods: {
    // 获取详情并赋值
    getItemData() {
      var that = this;
      let updataId = that.$route.query.id;
      if (updataId != undefined) {
        console.log(that.$route.query.id);
        getPurchaseDetail({
          ApplicationID: updataId
        }).then(res => {
          this.ruleForm = res.result;
          if (res.messageType === 0) {
            this.ruleForm = res.result;
            this.ruleForm.departmentID = parseFloat(this.ruleForm.departmentID);
            this.ruleForm.applicationID = updataId;
          } else {
            this.$message.error(res.message);
          }
          console.log(res);
          console.log(this.ruleForm);
        });
      }
    },
    // 获取用户列表
    getUserList() {
      getUser().then(res => {
        this.userList = res.result;
        console.log(res);
        // 部门赋值
        if (
          this.ruleForm.departmentID == "" ||
          this.ruleForm.departmentID == undefined
        ) {
          this.ruleForm.departmentID = parseInt(
            window.localStorage.getItem("departmentID")
          );
        }
      });
    },
    // 上传成功时
    uploadFileSuccess(response, file, fileList) {
      console.log(response);
      console.log(file);
      console.log(fileList);
      this.ruleForm.fileList.push({
        name: file.name,
        fileUrl: file.response.result.url,
        fileSize: file.response.result.size
      });
      console.log(this.ruleForm.fileList);
    },
    // 上传前的检查
    beforeAvatarUpload(file) {
      console.log(file);
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "jpg";
      const extension2 = testmsg === "jpeg";
      const extension3 = testmsg === "gif";
      const extension4 = testmsg === "png";
      const isLt2M = file.size / 1024 / 1024 < 10; //这里做文件大小限制
      // if(!extension && !extension2&& !extension3 && !extension4) {
      //     this.$message({
      //         message: '上传文件只能是 jpg、jpeg、gif、png格式!',
      //         type: 'warning'
      //     });
      // }
      if (!isLt2M) {
        this.$message({
          message: "上传文件大小不能超过 10MB!",
          type: "warning"
        });
      }
      // return (extension || extension2|| extension3|| extension4) && isLt2M
      return isLt2M;
    },
    // 提交数据
    submitForm(typeNum, formName) {
      var that = this;
      let rp = that.ruleForm.purchaseDetailList;
      console.log(that.ruleForm);
      if (typeNum === 0) {
        this.$refs[formName].validate(valid => {
          console.log(valid);

          if (valid) {
            let upData = this.ruleForm;
            upData.addType = typeNum;
            upData.departmentID = upData.departmentID.toString();
            if (this.ruleForm.contractPrice != "") {
              upData.contractPrice = parseFloat(this.ruleForm.contractPrice);
            }
            if (this.ruleForm.cumulativePaid != "") {
              upData.cumulativePaid = parseFloat(this.ruleForm.cumulativePaid);
            }

            for (let ud in upData.purchaseDetailList) {
              if (upData.purchaseDetailList[ud].price != "") {
                upData.purchaseDetailList[ud].price = parseFloat(
                  upData.purchaseDetailList[ud].price
                );
              }
            }
            addPurchase(upData).then(res => {
              if (res.messageType == 0) {
                this.$message.success("编辑成功！");
                this.$emit("returnPage", res.messageType);
                // this.$router.push('/financialAproval/paymentPurchase')
              } else {
                this.$emit("returnPage", res.messageType);
                this.$message.error(res.message);
                this.ruleForm.departmentID = parseInt(
                  this.ruleForm.departmentID
                );
              }
              console.log(res);
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        this.temporarySubmit(typeNum);
      }
    },
    // 暂存提交时
    temporarySubmit(typeNum) {
      var that = this;
      let upData = this.ruleForm;
      upData.addType = typeNum;
      upData.departmentID = upData.departmentID.toString();
      if (this.ruleForm.contractPrice != "") {
        upData.contractPrice = parseFloat(this.ruleForm.contractPrice);
      } else {
        upData.contractPrice = 0;
      }
      if (this.ruleForm.cumulativePaid != "") {
        upData.cumulativePaid = parseFloat(this.ruleForm.cumulativePaid);
      } else {
        upData.cumulativePaid = 0;
      }

      for (let ud in upData.purchaseDetailList) {
        if (upData.purchaseDetailList[ud].price != "") {
          upData.purchaseDetailList[ud].price = parseFloat(
            upData.purchaseDetailList[ud].price
          );
        } else {
          upData.purchaseDetailList[ud].price = 0;
        }
      }
      addPurchase(upData).then(res => {
        if (res.messageType == 0) {
          this.$message.success("编辑成功！");
          this.$emit("returnPage", res.messageType);
          // this.$router.push('/financialAproval/paymentPurchase')
        } else {
          this.$emit("returnPage", res.messageType);
          this.$message.error(res.message);
          this.ruleForm.departmentID = parseInt(this.ruleForm.departmentID);
        }
        console.log(res);
      });
    }
  },
  computed: {
    toalMoney() {
      let rd = this.ruleForm.purchaseDetailList;
      let num = 0;
      for (let i in rd) {
        if (parseFloat(rd[i].price) >= 0) {
          num += parseFloat(rd[i].price);
        }
      }
      this.ruleForm.toTalPay = num;
      return num;
    }
  }
};
</script>

<style lang="scss">
.paymentPurchaseAddOrEdit {
  .formSelect {
    width: 400px;
  }

  .el-radio {
    margin-right: 10px;
  }

  /*点击图片时的放大弹窗*/
  .el-image-viewer__close {
    top: 80px !important;
  }
  .el-image__preview {
    width: 130px;
    height: 24px;
    opacity: 0;
  }

  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none; /*outer */
  }

  .detailItem {
    .elInputNew {
      padding: 22px 0 0 0;
      .el-form-item__label {
        display: none;
      }
      .el-input__inner {
        border-color: #fff;
      }
      .el-form-item__content {
        margin: 0 !important;
      }
      .el-form-item.is-error .el-input__inner,
      .el-form-item.is-error .el-input__inner:focus,
      .el-form-item.is-error .el-textarea__inner,
      .el-form-item.is-error .el-textarea__inner:focus,
      .el-message-box__input input.invalid,
      .el-message-box__input input.invalid:focus {
        border-color: #f56c6c;
      }
    }
  }
}
</style>
<style scoped lang="scss" src="@/styles/financialAproval/paymentPurchase/addOrEdit.scss">
</style>
