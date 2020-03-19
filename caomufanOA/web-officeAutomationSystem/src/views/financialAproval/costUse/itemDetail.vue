<template>
  <div  class="contentBody viewfinancialAprovalcostUseitemDetail">
    <!--                  顶部按钮部分-->
    <div class="companyTitle">
      <div class="companyName">用途清单--详情</div>
      <div class="companyBtnBox">
        <div class="companyBtn">
          <a class="btn_left"  @click="delNowGo(listShow.id)"><i class="iconfont icon-shan"></i>删除</a>
<!--          <a  v-print="'#printTest'"><i class="iconfont icon-zancun"></i>打印</a>-->
          <router-link class="btn_left"  :to="{path:'/financialAproval/costUse'}">
            <i class="iconfont icon-fanhui"></i>返回
          </router-link>
        </div>
      </div>
    </div>

    <div class="formContent">
      <el-form label-position="right" size="medium" :model="ruleForm" label-width="120px" class="formBody">
        <div class="formItem">
          <el-form-item label="用途："  size="medium">
            <span>{{listShow.purpose}}</span>
          </el-form-item>
        </div>
        <div class="formItem">
          <el-form-item label="内容："  size="medium">
            <span>{{listShow.content}}</span>
          </el-form-item>
        </div>
        <div class="formItem">
          <el-form-item label="备注填报指引	："  size="medium">
            <span>{{listShow.remarkGuide}}</span>
          </el-form-item>
        </div>
      </el-form>
    </div>

  </div>
</template>

<script>


    export default {
        name: "itemDetail",
        data(){
            return{
                listShow:{
                    purpose:'',
                    content:'',
                    remarkGuide:'',
                    id:''
                },
                ruleForm:{}
            }
        },
        mounted() {
            console.log(this.$route.query)
            this.listShow.id=this.$route.query.id
            this.listShow.purpose=this.$route.query.purpose
            this.listShow.content=this.$route.query.content
            this.listShow.remarkGuide=this.$route.query.remarkGuide
        },
        methods:{
            // 删除本单
            delNowGo(id){
                this.$message.error('未开发删除功能')
            },
        }


    }
</script>
<style lang="scss" >
  .viewfinancialAprovalcostUseitemDetail{
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

  .formBody{
    padding: 20px 30px;
    display: flex;
    flex-wrap: wrap;
    .formItem{
      width: 680px;
      margin:0px 25px 0 0 ;
      font-size: 16px;
      span{
        display: block;
        background: #f8f8f8;
        padding: 0 10px;
        border-radius: 5px;
      }
      .el-select{
        width: 390px;
      }
    }
  }
</style>

