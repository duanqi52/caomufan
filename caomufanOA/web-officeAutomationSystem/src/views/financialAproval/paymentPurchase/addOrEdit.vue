<template>
  <div  class="contentBody paymentPurchaseAddOrEdit">
    <!--                  顶部按钮部分-->
    <div class="companyTitle">
      <div class="companyName">支付申请单--编辑</div>
      <div class="companyBtnBox">
        <div class="companyBtn">
          <a class="btn_left" @click="submitForm(0,'ruleForm')"><i class="iconfont icon-tijiao"></i>提交</a>
          <a class="btn_right" @click="submitForm(1,'ruleForm')"><i class="iconfont icon-zancun"></i>暂存</a>
          <router-link :to="{path:'/financialAproval/paymentPurchase'}">
            <i class="iconfont icon-fanhui"></i>返回
          </router-link>
        </div>
      </div>
    </div>

<!--    表单填取部分-->
    <addOreditShow ref="addOreditShow" @returnPage="returnPage"></addOreditShow>

  </div>
</template>

<script>
    import addOreditShow from '@/components/financialAproval/paymentPurchase/addOreditShow.vue'
    export default {
        name: "addOrEdit",
        methods:{
            // 提交数据后返回
            returnPage(typeData)
            {
                // this.showEditStatus=false
                console.log(typeData)
                this.$router.push('/financialAproval/paymentPurchase')
            },
            submitForm(typeNum,formName)
            {
                this.$refs.addOreditShow.submitForm(typeNum,formName)
            }
        },
        components:{
            'addOreditShow':addOreditShow,
        }
    }
</script>
<style lang="scss">

</style>
<style scoped lang="scss" src="@/styles/financialAproval/paymentPurchase/addOrEdit.scss">

</style>
