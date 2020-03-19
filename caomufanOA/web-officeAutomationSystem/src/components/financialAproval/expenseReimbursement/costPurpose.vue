<template>
  <div class="componentsfinancialAprovalexpenseReimbursementcostPurpose">
    <el-dialog
      :visible.sync="costPurposeVisible"
      width="1000px"
      :show-close="false"
      :modal-append-to-body='false'
      :before-close="cancelModal"
      :close-on-press-escape="true"
      custom-class="DialogVisible addDepartmentVisible"
    >
      <div class="dialogBox">
        <div class="dialogTop">
          <div class="dialogTitle">选择费用用途</div>
          <div class="dialogClose"><i @click="cancelModal()" class="iconfont icon-guanbi"></i></div>
        </div>
        <div class="contentShow">
          <table width="950" border="1" cellspacing="0" cellpadding="0"  class="ShowTable">
            <tr>
              <th class="detailNum">序号</th>
              <th  class="detailUse">标题数据</th>
              <th  class="detailTxt">费用用途</th>
              <th  class="detailmoney">具体内容</th>
              <th  class="detailStatus">备注或填报指引</th>
            </tr>

            <template v-for="(item,index) in listData">
              <tr class="showItem" @click="setDataGo(item)">
                <td class="detailNum">{{index+1}}</td>
                <td  class="detailUse">{{item.title}}</td>
                <td class="detailTxt">{{item.purpose}}</td>
                <td class="detailmoney">
                  <span :title="item.content">{{item.content}}</span>
                </td>
                <td  class="detailStatus">
                  <span :title="item.remarkGuide">{{item.remarkGuide}}</span>
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
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import {getPurpose} from '@/api/views/financialAproval/costUse.js'
    export default {
        name: "costPurpose",
        props: ['costPurposeVisible','purposeIndex'],
        data(){
            return{
                setIndex:this.purposeIndex,
                pageNum:{
                    pageTotal:0,
                },
                searchParamsData:{
                    PageSize:10,
                    PageIndex:1,
                    Purpose:'',
                    Content:''
                },
                listData:[]
            }
        },
        mounted(){
            this.getList()
        },
        methods:{
            // 获取列表
            getList(){
                let spd=this.searchParamsData
                getPurpose(
                    spd
                ).then(res=>{
                    if(res.messageType==0)
                    {
                        console.log(this.listData)
                        this.listData=res.result.purposeList
                        console.log(res.result.pageCount)
                        this.pageNum.pageTotal=parseInt(res.result.pageCount)
                    }else{
                        this.$message.error(res.message);
                    }
                })
            },
            // 传值给父页面
            setDataGo(itemData)
            {
                let data=itemData;
                var that=this;
                that.$emit('setDataNow',data)
                that.cancelModal()
            },
            // 关闭页面时触发
            cancelModal(){
                var that=this
                that.$emit('update:costPurposeVisible', false);
            },
        }
    }
</script>

<style scoped lang="scss">
  .componentsfinancialAprovalexpenseReimbursementcostPurpose{
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
              padding: 5px 0;
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
  }

</style>
