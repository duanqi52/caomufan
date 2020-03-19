<template>
    <div class="printPage">
      <div class="printTitle">
        <h1>广州草木蕃环境科技有限公司</h1>
        <h2>差旅费打印清单</h2>
      </div>
      <table width="100%" border="1" cellspacing="0" cellpadding="0" >
        <tr>
          <td class="iteamName">申请部门</td>
          <td>{{printList.department}}</td>
          <td class="iteamName">填表时间</td>
          <td>{{printList.writeTime}}</td>
        </tr>
        <tr>
          <td class="iteamName">项目编号</td>
          <td>{{printList.projectNum}}</td>
          <td class="iteamName">项目名称</td>
          <td>{{printList.projectName}}</td>
        </tr>
        <tr>
          <td class="iteamName">出差人员</td>
          <td>{{printList.people}}</td>
          <td class="iteamName">付款方式</td>
          <td>
            <span v-if="printList.payOfMethod==0"  value="0">网银</span>
            <span v-if="printList.payOfMethod==1"  value="1">现金</span>
            <span v-if="printList.payOfMethod==2"  value="2">支票</span>
            <span v-if="printList.payOfMethod==3"  value="3">冲账</span>
          </td>
        </tr>
        <tr>
          <td class="iteamName">出发日期</td>
          <td>{{printList.departureDate}}</td>
          <td class="iteamName">返回日期</td>
          <td>{{printList.returnDate}}</td>
        </tr>
        <tr>
          <td class="iteamName">出差类型</td>
          <td>
            <span v-if="printList.businessTripType==0"  value="0">户外作业</span>
            <span v-if="printList.businessTripType==1"  value="1">会议或培训</span>
            <span v-if="printList.businessTripType==2"  value="2">普通出差</span>
          </td>
          <td class="iteamName">出差事由</td>
          <td>{{printList.businessTripReson}}</td>
        </tr>
        <tr>
          <td class="iteamName">借款申请单</td>
          <td>{{printList.borrowApplicationID}}</td>
          <td class="iteamName">费用归属</td>
          <td>
            <span v-if="printList.costBelong==0" value="0">总公司</span>
            <span v-if="printList.costBelong==1" value="1">东莞分公司</span>
            <span v-if="printList.costBelong==2" value="1">韶关分公司</span>
          </td>
        </tr>
      </table>
      <table style="border-top: 0" width="100%" border="1" cellspacing="0" cellpadding="0" >
        <tr>
          <td  colspan="12" style="text-align: center">明细</td>
        </tr>
        <tr>
          <td >出发地</td>
          <td >到达地</td>
          <td >机票费</td>
          <td >火车费</td>
          <td >汽车费</td>
          <td >其他交通工具费用</td>
          <td >市内交通费</td>
          <td >住宿费</td>
          <td >业务接待费</td>
          <td >其他费用</td>
          <td>小计</td>
          <td >是否含有进项税额</td>
        </tr>
        <tr v-for="(item,index) in printList.businessTripDetailList">
          <td >{{item.placeOfDeparture}}</td>
          <td >{{item.destination}}</td>
          <td >{{item.airTickets}}</td>
          <td >{{item.trainTickets}}</td>
          <td >{{item.busTickets}}</td>
          <td >{{item.otherTransportation}}</td>
          <td >{{item.cityTransportation}}</td>
          <td >{{item.accommodation}}</td>
          <td >{{item.businessReception}}</td>
          <td >{{item.otherFees}}</td>
          <td >{{item.totalItem}}</td>
          <td >
            <span v-if="item.isInputTax" value="0">是</span>
            <span v-else value="1">否</span>
          </td>
        </tr>
      </table>
      <table style="border-top: 0" width="100%" border="1" cellspacing="0" cellpadding="0" >
      <tr>
        <td class="iteamName">合计金额（小写）</td>
        <td>{{printList.totalPay}}</td>
        <td class="iteamName">合计金额（大写）</td>
        <td>{{numble_code(printList.totalPay)}}</td>
      </tr>
      <tr>
        <td class="iteamName">预借金额</td>
        <td>{{printList.originalBorrow}}</td>
        <td class="iteamName">应退/补全额</td>
        <td>{{printList.blance}}</td>
      </tr>
      <tr>
        <td class="iteamName">申请人</td>
        <td>{{printList.name}}</td>
        <td class="iteamName">流水号</td>
        <td>{{printList.applicationNum}}</td>
      </tr>
    </table>
      <table style="border-top: 0" width="100%" border="1"  cellspacing="0" cellpadding="0" >
        <tr>
          <td  colspan="6" style="text-align: center">审批记录</td>
        </tr>
        <tr>
          <td >审批人</td>
          <td>审批节点</td>
          <td >审批结果</td>
          <td >审批意见</td>
          <td >手写签名</td>
          <td >审批时间</td>
        </tr>
        <tr v-for="(item,index) in printList.approvalRecords">
          <td >{{item.name}}</td>
          <td>{{item.role}}</td>
          <td >
            <p v-if="item.handle==0" style="color:#888888 ">未处理</p>
            <p v-if="item.handle==1" style="color:#4ca824 ">同意</p>
            <p v-if="item.handle==2" style="color:#f82e2e ">不同意</p>
          </td>
          <td >
            <p v-if="item.handle==0" style="color:#888888 ">未处理</p>
            <p v-if="item.handle==1" style="color:#4ca824 ">同意</p>
            <p v-if="item.handle==2" style="color:#f82e2e ">不同意</p>
          </td>
          <td></td>
          <td >{{item.time}}</td>
        </tr>
      </table>
      <div class="printPeople">
        打印人：{{printName}}
      </div>
    </div>
</template>

<script>
    import {number_chinese} from '@/assets/js/public.js'
    export default {
        name: "printPage",
        props:['printData'],
        data(){
            return{
                printList:this.printData,
                printName:''
            }
        },
        mounted() {
            // console.log(this.printList)
            if(window.localStorage.getItem('realName')!='')
            {
                this.printName=window.localStorage.getItem('realName')
            }else{
                this.printName=window.localStorage.getItem('nickName')
            }
        },
        methods:{
            // 转换为大写
            numble_code(obj){
                // console.log(number_chinese(obj))
                return number_chinese(obj)
            },
        },
        watch:{
            printData:{
                immediate:true,
                handler(val){
                    this.printList=val
                    // console.log(val)
                }
            }
        }
    }
</script>

<style scoped lang="scss">
  .printPage{
    width: 1000px;
    .printTitle{
      text-align: center;
      line-height: 40px;
      padding: 10px 0;
    }
    td{
     line-height:24px;
      padding: 0 10px ;

    }
    .iteamName{
      width: 16%;
    }
    .printPeople{
      line-height: 40px;
    }
  }
</style>
