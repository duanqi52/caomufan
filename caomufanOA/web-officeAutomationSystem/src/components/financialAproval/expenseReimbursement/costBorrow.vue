<template>
  <div class="componentsfinancialAprovalexpenseReimbursementcostBorrow">
    <el-dialog
      :visible.sync="costBorrowVisible"
      width="1200px"
      :show-close="false"
      :modal-append-to-body='false'
      :before-close="cancelModal"
      :close-on-press-escape="true"
      custom-class="DialogVisible addDepartmentVisible"
    >
      <div class="dialogBox">
        <div class="dialogTop">
          <div class="dialogTitle">选择借款清单</div>
          <div class="dialogClose"><i @click="cancelModal()" class="iconfont icon-guanbi"></i></div>
        </div>
        <div class="contentShow">
          <table width="1150" border="1" cellspacing="0" cellpadding="0"  class="ShowTable">
            <tr>
              <th @click="allBtn()" class="statusShowBtn">
                <i v-if="!isAll" class="iconfont icon-duoxuankuang"></i>
                <i v-else style="color: #4ca824" class="iconfont icon-duoxuankuangxuanzhong"></i>
              </th>
              <th class="detailNum">序号</th>
              <th  class="detailUse">标题数据</th>
              <th  class="detailTxt">填写时间</th>
              <th  class="detailmoney">项目编号</th>
              <th  class="detailStatus">项目名称</th>
              <th  class="detailStatus">合计金额</th>
              <th  class="detailStatus">支付主体</th>
              <th  class="detailStatus">剩余金额</th>
            </tr>
              <template v-for="(item,index) in listData">
                <tr class="showItem" @click="itemGoCheck(item)">
                  <td class="statusShowBtn">
                    <i v-if="fromDataPut.setData.indexOf(item.applicationID)==-1" class="iconfont icon-duoxuankuang"></i>
                    <i v-else style="color: #4ca824" class="iconfont icon-duoxuankuangxuanzhong"></i>
                  </td>
                  <td class="detailNum">{{index+1}}</td>
                  <td  class="detailUse">{{item.title}}</td>
                  <td class="detailTxt">{{item.writeTime}}</td>
                  <td class="detailmoney">
                    <span :title="item.projectNum">{{item.projectNum}}</span>
                  </td>
                  <td  class="detailStatus">
                    <span :title="item.projectName">{{item.projectName}}</span>
                  </td>
                  <td  class="detailStatus">
                    <span :title="item.total">{{item.total}}元</span>
                  </td>
                  <td  class="detailStatus">
                    <span :title="item.payment">{{item.payment}}</span>
                  </td>
                  <td  class="detailStatus">
                    <span :title="item.noReimbursementPrice">{{item.noReimbursementPrice}}元</span>
                  </td>

                </tr>
              </template>
          </table>
        </div>

        <div class="pageNumBox">
          <!--        @size-change="handleSizeChange"-->
          <!--        @current-change="handleCurrentChange"-->
          <!--        :current-page="currentPage4"-->
          <el-pagination
            :current-page.sync="searchParamsData.PageIndex"
            @current-change="getList"
            :page-count="pageNum.pageTotal"
            layout=" prev, pager, next, jumper, slot">
          </el-pagination>

        </div>
        <div class="setDataBtn">
          <a @click="setDataNow()">确定</a>
        </div>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import {getBorrow} from '@/api/views/financialAproval/loanApproval.js'
    export default {
        name: "costPurpose",
        props: ['costBorrowVisible','moneyTotal','costBorrowList'],
        data(){
            return{
                pageNum:{
                    pageTotal:0,
                },
                searchParamsData:{
                    PageSize:5,
                    PageIndex:1,
                    Purpose:'',
                    Content:''
                },
                isAll:false,
                listData:[],
                fromDataPut:{
                    setData:[],
                    tatalMoney:0
                }

            }
        },
        mounted(){
            this.getList()
        },
        methods:{
            // 获取列表
            getList(){
                let spd=this.searchParamsData
                getBorrow(
                    spd
                ).then(res=>{
                    if(res.messageType==0)
                    {
                        // console.log(this.listData)
                        this.listData=res.result.borrowRoughList
                        // console.log(res.result.pageCount)
                        this.pageNum.pageTotal=parseInt(res.result.pageCount)
                    }else{
                        this.$message.error(res.message);
                    }
                })
            },
            // 多选按钮
            allBtn(){
                let that=this
                let indexNum=-2
                if(!that.isAll)
                {
                    for(let i in that.listData)
                    {
                        indexNum=this.fromDataPut.setData.indexOf(that.listData[i].applicationID)
                        if(indexNum==-1)
                        {
                            that.fromDataPut.setData.push(that.listData[i].applicationID)
                            that.fromDataPut.tatalMoney+=that.listData[i].noReimbursementPrice
                        }
                    }
                    that.isAll=true
                }else{
                    for(let i in that.listData)
                    {
                        indexNum=this.fromDataPut.setData.indexOf(that.listData[i].applicationID)
                        if(indexNum!=-1)
                        {
                            that.fromDataPut.setData.splice(indexNum,1)
                            that.fromDataPut.tatalMoney-=that.listData[i].noReimbursementPrice
                        }
                    }
                    that.isAll=false
                }
                // console.log(that.fromDataPut)
            },
            // 传值给父页面
            setDataNow(){
                var that=this;
                let data=that.fromDataPut;
                console.log(data)
                that.$emit('setDataNow',data)
                that.cancelModal()
            },
            // 判断是否未多选
            judgeIsAll(){
                var that=this;
                // 判断是否所有都选中
                let allNum=0
                for(let i in that.listData)
                {
                    // console.log( that.fromDataPut.setData)
                    if(that.fromDataPut.setData.indexOf(that.listData[i].applicationID)==-1)
                    {
                        allNum++
                    }
                }
                if(allNum>0)
                {
                    that.isAll=false
                }else{
                    that.isAll=true
                }
                // console.log( that.isAll)
            },
            // 赋值进数组
            itemGoCheck(itemData)
            {

                var that=this;
                let data=itemData;
                // console.log(itemData)
                let indexNum= that.fromDataPut.setData.indexOf(data.applicationID)
                if(indexNum==-1)
                {
                    that.fromDataPut.setData.push(data.applicationID)
                    that.fromDataPut.tatalMoney+=data.noReimbursementPrice
                }else{
                    that.fromDataPut.setData.splice(indexNum,1)
                    that.fromDataPut.tatalMoney-=data.noReimbursementPrice
                }
                that.judgeIsAll()
            },
            // 关闭页面时触发
            cancelModal(){
                var that=this
                that.$emit('update:costBorrowVisible', false);
            },
        },
        watch:{
            moneyTotal:{
                immediate:true,
                handler(val){
                    let that=this

                    that.fromDataPut.tatalMoney=parseInt(val.toString())
                    // that.judgeIsAll()
                }
            },
            costBorrowList:{
                immediate:true,
                handler(val){
                    let that=this

                    if(val!=[]&&val!='')
                    {
                        that.fromDataPut.setData=val.toString().split(",");
                    }

                    // that.judgeIsAll()
                }
            },
            fromDataPut:{
                immediate:true,
                handler(val){
                    let that=this

                    that.judgeIsAll()
                }
            },
            listData:{
                immediate:true,
                handler(val){
                    let that=this

                    that.judgeIsAll()
                }
            },
        }
    }
</script>

<style scoped lang="scss">
  .componentsfinancialAprovalexpenseReimbursementcostBorrow{
    .dialogBox {
      /*头部标签*/
      .dialogTop {
        display: flex;
        justify-content: space-between;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #ddd;

        .dialogTitle {
          padding: 0 0 0 10px;
          font-size: 16px;
        }

        .dialogClose {
          padding: 0 10px 0 0;

          i {
            font-size: 26px;
          }
        }
      }

      .contentShow{
        padding: 20px 0;
        .ShowTable{
          margin: 0 auto;
          border: 1px solid #ddd;
          tr{
            th{
              margin: 20px 0;
              height: 40px;
              background: #f0f5ee;
            }
            td{
              border: 0px;
              text-align: center;
              padding: 10px 0;
              height: 48px;
            }
            .statusShowBtn{
              width: 40px;
            }

            .detailNum{
              width: 40px;
            }
            .detailUse{
              width: 120px;
            }
            .detailTxt{
              width: 120px;
            }
            .detailmoney{
              width: 120px;
            }
            .detailStatus{
              width: 120px;
            }
            .detailmoney>span,.detailStatus>span{
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
          }
          tr:hover .statusShowBtn{
            color: #4ca824;
          }
          .showItem:hover{
            background: #ddd;
            cursor: pointer;
          }
        }
      }

    }


    .pageNumBox{
      padding: 20px 10px;
      display: flex;
      justify-content: flex-end;
    }
    .setDataBtn{
      padding: 10px 0;
      background: #f9f9f9;
      a{
        display: block;
        margin: 0 auto;
        background: #4ca824;
        width: 120px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        color: #fff;
        border-radius: 5px;
      }
    }
  }

</style>
