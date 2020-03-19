<template>
    <div class="componentsfinancialAprovalloanApprovalshowData">
     <!--    表单填取部分-->
      <div class="formContent">
        <el-form label-position="right" size="medium" :model="showData"  ref="ruleForm" label-width="120px" class="formBody">
          <div class="formItem">
            <el-form-item label="申请部门："  size="medium">
              <span>{{showData.department}}</span>
            </el-form-item>
          </div>
          <div class="formItem">
            <el-form-item label="填单时间：" >
              <span>{{showData.writeTime}}</span>
            </el-form-item>
          </div>
          <div class="formItem">
            <el-form-item label="借款事由：" prop="name">
              <span>{{showData.borrowReason}}</span>
            </el-form-item>
          </div>
          <div class="formItem">
            <el-form-item label="付款方式：" prop="region">
              <span v-if="showData.payOfMethod==0"  value="0">网银</span>
              <span v-if="showData.payOfMethod==1"  value="1">现金</span>
              <span v-if="showData.payOfMethod==2"  value="2">支票</span>
              <span v-if="showData.payOfMethod==3"  value="3">冲账</span>
            </el-form-item>
          </div>
          <div class="formItem">
            <el-form-item label="项目编号：" prop="name">
              <span>{{showData.projectNum}}</span>
            </el-form-item>
          </div>
          <div class="formItem">
            <el-form-item label="项目名称：" prop="name">
              <span>{{showData.projectName}}</span>
            </el-form-item>
          </div>
          <div class="formItem">
            <el-form-item label="收款单位：" prop="name">
              <span>{{showData.receivingUnit}}</span>
            </el-form-item>
          </div>

          <div class="formItem">
            <el-form-item label="开户银行：" prop="name">
              <span>{{showData.bankName}}</span>
            </el-form-item>
          </div>
          <div class="formItem">
            <el-form-item label="银行账号：" prop="name">
              <span>{{showData.bankAccount}}</span>
            </el-form-item>
          </div>
          <div class="formItem">
            <el-form-item label="支付主体：" prop="name">
              <span v-if="showData.payment==0" value="0">总公司</span>
              <span v-if="showData.payment==1" value="1">东莞分公司</span>
              <span v-if="showData.payment==2" value="1">韶关分公司</span>
            </el-form-item>
          </div>
        </el-form>
        <div class="detailedBox">
          <div class="detailTop">
            <div class="topLeft">
              <span>明细</span>
            </div>
            <div class="topRight">
              <div class="topRightBtn">

              </div>
            </div>
          </div>

          <!--        明细-->
          <div class="detailContent">

              <div class="detailItem">
                <table width="98%" border="1" cellspacing="0" cellpadding="0" >
                  <tr>
                    <th class="detailNum">序号</th>
                    <th  class="detailTxt">费用用途</th>
                    <th class="detailDel">备注</th>
                    <th  class="detailmoney">金额(元)</th>
                  </tr>
                  <template v-for="(item,index) in showData.borrowDetailList">
                  <tr>
                    <td class="detailNum">{{index+1}}</td>
                    <td>
                      <span>{{item.purpose}}</span>
                    </td>
                    <td>
                      <span>{{item.remark}}</span>
                    </td>
                    <td>
                      <span>{{item.price}}</span>
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
            <el-form label-position="right" size="medium" :model="showData"   label-width="140px" class="formBody">
              <div class="remakeMoneyItem">
                <el-form-item label="小写合计金额：">
                  <span v-if="showData.totalPay>999">{{showData.totalPay.toLocaleString('en-US')}} 元</span>
                  <span v-else>{{(showData.totalPay)}} 元</span>
                </el-form-item>
              </div>
              <div class="remakeMoneyItem">
                <el-form-item label="大写合计金额：">
                  <span>{{numble_code(showData.totalPay)}}</span>
                </el-form-item>
              </div>
            </el-form>
          </div>
          <div class="remakeMore">
            <el-form label-position="right" size="medium" :model="showData"   label-width="140px" class="formBody">
              <el-form-item label="申请人：">
                <span>{{showData.name}}</span>
              </el-form-item>
              <el-form-item label="流水号：">
                <span>{{showData.applicationNum}}</span>
              </el-form-item>

            </el-form>
          </div>
          <div class="remakeAccessories">
            <el-form label-position="right" size="medium" :model="showData"   label-width="140px" class="formBody">
              <el-form-item label="附件：">
                <div class="remakeAccessoriesList">
                  <table border="1" cellspacing="0" cellpadding="0">
                    <tr v-for="(item,index) in showData.fileList">
                      <td style="max-width: 400px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{item.name}}</td>
                      <td>{{item.fileSize}}MB</td>
                      <td>
                        <a style="cursor: pointer;" @click="download4(item.fileUrl,item.name)">
                          <i class="iconfont iconxiazai"></i>下载
                        </a>
                      </td>
                      <td class="bigImg">
                        <template v-if="item.type=='jpeg'||item.type=='jpg'||item.type=='png'||item.type=='png'">
                          <el-image
                            class="imgBigBox"
                            :src="item.fileUrl"
                            :preview-src-list="imgList">
                          </el-image>
                          <div class="bigBtn">
                            <i class="iconfont iconliulan"></i>浏览
                          </div>
                        </template>
                        <template v-else>
                          <div class="bigBtn">
                            <a style="color: #ddd;"><i class="iconfont iconliulan"></i>浏览</a>
                          </div>
                        </template>

                      </td>
                    </tr>
                  </table>
                </div>
              </el-form-item>
            </el-form>

          </div>

        </div>

<!--        审批记录-->
        <div class="remakesApproval">
          <div class="remakesApprovalTitle">审批记录</div>
          <div class="remakesApprovallist">
            <div v-for="(item,index) in showData.approvalRecords" class="ApprovaItem" :class="item.handle=='通过'?'':'nonePass'">
              <div class="ApprovaStatus">
                <span  v-if="item.handle==0">未处理</span>
                <span v-if="item.handle==1" style="background:#4ca824 ">同意</span>
                <span v-if="item.handle==2">不同意</span>
              </div>
              <div class="ApprovaName">
                <p>{{item.name}}</p>
                <p v-if="item.handle==0" style="color:#888888 ">未处理</p>
                <p v-if="item.handle==1" style="color:#4ca824 ">同意</p>
                <p v-if="item.handle==2" style="color:#f82e2e ">不同意</p>
              </div>
              <div class="ApprovaLever">
                <p>{{item.role}}</p>
              </div>
              <div class="ApprovaTime">
                <p>{{item.time}}</p>
              </div>
            </div>
          </div>
        </div>

<!--        借款单抵扣记录-->
        <div class="approvalDeduction">
          <div class="approvalDeductionTitle">借款单抵扣记录</div>
          <div class="approvalDeductionList">
            <table width="98%" border="1" cellspacing="0" cellpadding="0">
              <tr>
                <th class="detailNum">序号</th>
                <th>报销类型</th>
                <th>抵扣金额</th>
                <th>剩余金额</th>
                <th>抵扣时间</th>
              </tr>
              <template v-for="(item,index) in showData.offsetRecords">
              <tr>
                <td>{{index+1}}</td>
                <td>
                  <router-link
                    tag="a"
                    target="_blank"
                    :to="{
                    path:item.applicationType==2?'/financialAproval/expenseReimbursement/itemDetail':'/financialAproval/travelExpenses/itemDetail',
                    query:{
                      id:item.applicationID
                      }
                    }">
                    <span v-if="item.applicationType==2">费用报销审批单</span>
                    <span v-else-if="item.applicationType==4">差旅费审批单</span>
<!--                    {{item.applicationType}}-->
                  </router-link>
                </td>
                <td>{{item.price}}</td>
                <td>{{item.noReimbursementPrice}}</td>
                <td>{{item.time}}</td>
              </tr>
              </template>
            </table>
          </div>
        </div>
      </div>


      <!--      打印的部门模板-->
      <div
        style="display: none">
        <div id="printTest">
          <printPage
            :printData="showData"></printPage>
        </div>
      </div>

    </div>
</template>

<script>
    import  '@/assets/fontStyle/itemData/iconfont.css'
    import {number_chinese} from '@/assets/js/public.js'
    import printPage from "@/components/financialAproval/loanApproval/printPage";
    import{getBorrowDetail} from '@/api/views/financialAproval/loanApproval.js'
    export default {
        name: "showData",
        props:['id','getData'],
        data(){
            return{
                showId:this.id,
                imgList:['@../../../../static/caomufanLogo_144_144.png','@../../../../static/1213.jpg',],
                showData:{},
            }
        },
        mounted(){
            // console.log(number_chinese(0.15))
            // this.getDetail()
        },
        methods:{
            // 获取详情
            getDetail(){
                var that=this
                getBorrowDetail(
                    {
                        ApplicationID:this.showId
                    }
                ).then(res=>{
                    if(res.messageType===0)
                    {
                        that.showData=res.result
                        let fl=that.showData.fileList
                        let flIndex=0;
                        let flType=0;
                        this.imgList=[]
                        for(let i in fl)
                        {
                            this.imgList.push(fl[i].fileUrl)
                            flIndex=fl[i].fileUrl.lastIndexOf("/");;
                            fl[i].name=fl[i].fileUrl.substr(flIndex+1);
                            flType=fl[i].fileUrl.lastIndexOf(".");
                            fl[i].type=fl[i].fileUrl.substr(flType+1);

                        }
                    }else{
                        this.$message.error(res.message)
                    }
                    console.log(res)
                })
            },
            // 转换为大写金额
            numble_code(obj){
                return number_chinese(obj)
            },

            // 提交表单
            submitForm(formName) {

            },
            // 下载按钮
            download4(imgSrc, name) {
                var x=new XMLHttpRequest();
                x.open("GET", imgSrc, true);
                x.responseType = 'blob';
                x.onload=function(e){
                    var url = window.URL.createObjectURL(x.response)
                    var a = document.createElement('a');
                    a.href = url
                    // a.download = ''
                    a.download = name
                    a.click()
                }
                x.send();
            },
        },
        computed:{

            toalMoney()
            {
                let rd =this.ruleForm.detail;
                let num=0
                for(let i in rd)
                {
                    if(parseInt(rd[i].money)>=0)
                    {
                        num+=parseInt(rd[i].money)
                    }
                }
                this.num=num
                return num
            }
        },
        components:{
            'printPage':printPage
        },
        watch:{
            getData:{
                immediate:true,
                handler(val){
                    var that=this
                    this.showData=val
                    let fl=that.showData.fileList
                    let flIndex=0;
                    let flType=0;
                    this.imgList=[]
                    for(let i in fl)
                    {
                        this.imgList.push(fl[i].fileUrl)
                        flIndex=fl[i].fileUrl.lastIndexOf("/");;
                        fl[i].name=fl[i].fileUrl.substr(flIndex+1);
                        flType=fl[i].fileUrl.lastIndexOf(".");
                        fl[i].type=fl[i].fileUrl.substr(flType+1);

                    }
                    // console.log(this.nowGetData)
                }
            }
        }
    }
</script>
<style lang="scss">
  .componentsfinancialAprovalloanApprovalshowData{
    .formSelect{
      width: 400px;
    }

    .el-radio{
      margin-right: 10px;
    }

    /*点击图片时的放大弹窗*/
    .el-image-viewer__close{
      top: 80px!important;
    }
    .el-image__preview{
      width: 130px;
      height: 24px;
      opacity:0;
    }
  }

</style>

<style scoped lang="scss" >
  .componentsfinancialAprovalloanApprovalshowData{
    .formContent{
      .formBody{
        padding: 20px 30px;
        display: flex;
        flex-wrap: wrap;
        .formItem{
          width: 480px;
          margin:0px 25px 0 0 ;
          font-size: 16px;
          span{
            display: block;
            background: #f8f8f8;
            padding: 0 10px;
            border-radius: 5px;
            min-height: 36px;
          }
          .el-select{
            width: 390px;
          }
        }
      }

      //明细
      .detailedBox{
        border: 1px solid #ddd;
        margin: 0 30px;
        .detailTop{
          height: 46px;
          line-height: 46px;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #ddd;
          background: #f9f9f9;
          .topLeft{
            padding-left: 20px ;
            font-size: 16px;
          }
          .topRight{
            padding-right: 20px ;
            display: flex;
            i{
              font-size: 30px;
              cursor: pointer;
            }
          }
        }
        .detailContent{
          padding: 10px 0 0 0px;
          display: flex;
          flex-wrap: wrap;
          .detailItem{
            width: 100%;
            overflow-y: hidden;
            //overflow-x: auto;
            /*padding: 0 0 20px 0;*/
            /*margin: 0 20px 20px 0;*/
            table{
              margin: 0 1% 10px 1%;
              border-collapse: collapse;
              border: 1px solid #ddd;
              tr{
                th{
                  height: 45px;
                  white-space:nowrap;
                  padding: 0 10px;

                }
                th.detailNum{
                  background: #4ca824;
                  color: #fff;
                }
              }
              tr{
                td{
                  height: 55px;
                  text-align: center;
                  vertical-align: middle;
                  overflow: hidden;
                  font-size: 16px;
                  input{
                    margin: 0 5px;
                    width: 100px;
                    text-align: center;
                  }
                  input[type="number"]::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                  }
                  input[type="number"]::-webkit-outer-spin-button {
                    -webkit-appearance: none;    /*outer */
                  }
                  textarea{
                    text-align: center;
                    font-size: 14px;
                  }
                }
              }
              .detailNum{
                width: 40px;
              }
              .detailTxt{
                width: 209px;
              }
              .detailmoney{
                width: 100px;
              }
              .detailStatus{
                width: 110px;
                .el-radio-group{

                  .el-radio{
                    margin-right: 10px;
                  }
                }
              }
              .detailDel{
                width: 40px;
                i{
                  color: #f56f6f;
                  font-size: 24px;
                }
              }
            }
          }
        }
      }

      //备注
      .remarksBox {
        border: 1px solid #ddd;
        margin: 20px 30px;
        font-size: 16px;
        .remakeMoney{
          display: flex;
          flex-wrap: wrap;
          padding: 20px 0;
          .remakeMoneyItem{
            display: flex;
            width: 550px;
            height: 40px;
            line-height: 40px;
            .remakeMoneyName{
              width: 200px;
              padding: 0 0 0 30px;
            }
          }
        }
        .remakeMore{
          display: flex;
          border-top: 1px solid #ddd;
          line-height: 80px;
          .remakePaople{
            width: 180px;
            text-align: center;
            /*border-right: 1px solid #ddd;*/
          }
          .remakeNum{
            text-align: center;
            padding: 0 20px;
            /*border-right: 1px solid #ddd;*/
          }

        }
        .remakeAccessories{
          display: flex;
          .remakeAccessoriesName{
            padding: 0 30px;
            width: 140px;
          }
          .remakeAccessoriesList{

            padding: 0px 0px 20px 0px;
            tr{
              border: 1px solid #ddd;
              word-break: keep-all;white-space:nowrap;
              .bigImg{
                position: relative;
              }
              td{
                padding: 10px 10px;
                min-width: 150px;
                text-align: center;
                .imgBigBox{
                  position: absolute;
                  top: 10px;
                  left: 10px;
                }

              }
            }
          }
        }
      }

      /*审批记录*/
      .remakesApproval{
        margin: 20px 30px;
        border: 1px solid #ddd;
        font-size: 16px;
        .remakesApprovalTitle{
          height: 46px;
          line-height: 46px;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #ddd;
          padding: 0 20px;
          background: #f9f9f9;
        }
        .remakesApprovallist{
          padding: 20px 0;
          .ApprovaItem{
            display: flex;
            padding: 10px 0;
            .ApprovaStatus{
              width: 150px;
              height: 60px;
              span{
                display: block;
                width: 60px;
                height: 60px;
                background: #4ca824;
                line-height: 60px;
                text-align: center;
                color: #fff;
                border-radius: 50%;
                margin:  0 auto;
              }
            }
            .ApprovaName{
              width: 120px;
              line-height: 30px;
            }
            .ApprovaLever{
              width: 120px;
              line-height: 60px;
            }
            .ApprovaTime{
              width: 220px;
              line-height: 60px;
            }
          }
          // 不同意时
          .nonePass{
            .ApprovaStatus{
              span{
                background: #df3652;
              }
            }

          }
        }
      }
        /*借款单抵扣记录*/
      .approvalDeduction {
        margin: 20px 30px;
        border: 1px solid #ddd;
        font-size: 16px;

        .approvalDeductionTitle {
          height: 46px;
          line-height: 46px;
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #ddd;
          padding: 0 20px;
          background: #f9f9f9;
        }

        .approvalDeductionList {
          padding: 10px 0 0 0;
          table{
            margin: 0 1% 10px 1%;
            border-collapse: collapse;
            border: 1px solid #ddd;
            tr{
              th{
                height: 45px;
                white-space:nowrap;
                padding: 0 10px;

              }
              th.detailNum{
                width: 80px;
                background: #4ca824;
                color: #fff;
              }
            }
            tr{
              td{
                height: 55px;
                text-align: center;
                vertical-align: middle;
                overflow: hidden;
                font-size: 16px;
                span{
                  color: #4ca824;
                }
              }
            }
          }
        }
      }
    }

    //日期输入框样式
    .el-date-editor.el-input, .el-date-editor.el-input__inner{
      width: 390px;
    }
  }

</style>
