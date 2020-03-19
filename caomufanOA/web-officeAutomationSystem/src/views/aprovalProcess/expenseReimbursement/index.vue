<template>
  <div class="showContent aprovalProcessExpenseReimbursementIndex">
    <div class="companyTitle">
      <div class="companyName">费用报销流程</div>
      <div class="companyBtnBox">
        <div class="companyBtn" >
          <a @click="updataGo()"><i class="iconfont icon-tijiao"></i>保存</a>
        </div>
      </div>
    </div>
    <div class="showListBox">
      <div class="showListBoxBox">
        <!--        框-->
        <div class="listBg1">
          <div class="listBg2">
            <div class="listBg3">
            </div>
          </div>
        </div>

        <div class="listShowContent">
          <div class="listShowItem lsi1 ">
            <div class="listMoneyItem">
              <div class="listMoneyItemBox">
                报销金额：0 —— <input type="number" oninput="if(value.length>8)value=value.slice(0,8)"  v-model="dataShow.firstRule" placeholder="请输入" />
              </div>
            </div>
            <div class="listRelation">
              <div class="listRelationItem listRelationName">
                <span>申请人</span>
              </div>
              <div class="listRelationItem listRelationLine">
                <img src="@/assets/images/aprovalProcess/celLine.png" alt="">
              </div>
              <div class="listRelationItem listRelationName">
                <span>直属领导</span>
              </div>
              <div class="listRelationItem listRelationLine">
                <img src="@/assets/images/aprovalProcess/celLine.png" alt="">
              </div>
              <div class="listRelationItem listRelationName">
                <span>会计</span>
              </div>
              <div class="listRelationItem listRelationLine">
                <img src="@/assets/images/aprovalProcess/celLine.png" alt="">
              </div>
              <div class="listRelationItem listRelationName">
                <span>财务负责人</span>
              </div>
            </div>
          </div>

          <div class="listShowItem lsi2">
            <div class="listMoneyItem">
              {{dataShow.firstRule}} ——&nbsp;<input  type="number" oninput="if(value.length>8)value=value.slice(0,8)" v-model="dataShow.secondRule" placeholder="请输入" />
            </div>
            <div class="listRelation">
              <div class="listRelationItem listRelationLine">
                <img src="@/assets/images/aprovalProcess/colLine.png" alt="">
              </div>
              <div class="listRelationItem listRelationName">
                <span>分管副总</span>
              </div>
            </div>
          </div>
          <div class="listShowItem lsi3">
            <div class="listMoneyItem">
              {{dataShow.secondRule}} —— 以上
            </div>
            <div class="listRelation">
              <div class="listRelationItem listRelationLine">
                <img src="@/assets/images/aprovalProcess/colLine.png" alt="">
              </div>
              <div class="listRelationItem listRelationName">
                <span>总经理</span>
              </div>
            </div>
          </div>

          <div class="listShowItem lsi3" >
            <div class="listMoneyItem">
              <!--                {{dataShow.secondRule}} —— 以上-->
            </div>
            <div class="listRelation">
              <div class="listRelationItem listRelationLine">
                <img src="@/assets/images/aprovalProcess/colLine.png" alt="">
              </div>
              <div class="listRelationItem listRelationName">
                <span>抄送申请人、 出纳和总经理</span>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
    import {updataProcess,getProcess} from '@/api/views/aprovalProcess/public.js'
    export default {
        name: "index",
        data(){
            return{
                dataShow:{
                    processIndex:2,
                    firstRule:'',
                    secondRule:'',
                }
            }
        },
        mounted(){
            this.getListShow()
        },
        methods:{
            // 获取列表
            getListShow(){
                getProcess(
                    {
                        processIndex:2
                    }
                ).then(res=>{
                    if(res.messageType==0)
                    {
                        this.dataShow=res.result;
                        this.dataShow.processIndex=2;
                    }else{
                        this.$message.error(res.message)
                    }
                })
            },
            updataGo(){
                var that=this
                let ud=this.dataShow
                ud.firstRule=parseInt(ud.firstRule);
                ud.secondRule=parseInt(ud.secondRule);
                updataProcess(ud).then(res=>{
                    if(res.messageType==0)
                    {
                        that.$message.success( '费用报销流程-保存成功');
                    }else{
                        that.$message.error(res.message)
                    }
                })

            }
        }
    }
</script>

<style scoped lang="scss" src="@/styles/aprovalProcess/paymentPurchase/index.scss">

</style>
