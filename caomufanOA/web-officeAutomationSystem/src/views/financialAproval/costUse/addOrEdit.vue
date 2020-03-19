<template>
    <div class="contentBody viewFinancialAprovalCostUseAddOrEdit">
      <!--                  顶部按钮部分-->
      <div class="companyTitle">
        <div class="companyName">广州草木蕃环境科技有限公司</div>
        <div class="companyBtnBox">
          <div class="companyBtn">
            <a class="btn_left" @click="submitForm(0,'ruleForm')"><i class="iconfont icon-tijiao"></i>提交</a>
<!--            <a class="btn_right" @click="submitForm(1,'ruleForm')"><i class="iconfont icon-zancun"></i>暂存</a>-->
            <router-link :to="{path:'/financialAproval/costUse'}">
              <i class="iconfont icon-fanhui"></i>返回
            </router-link>
          </div>
        </div>
      </div>

<!--      填写表单数据-->
      <div class="formBody">
        <el-form class="formShow" label-position="right" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px">
          <div class="formItem">
            <el-form-item label="费用用途" prop="purpose">
              <input class="formItemInput" type="text" v-model="ruleForm.purpose" placeholder="请输入费用用途">

            </el-form-item>
          </div>
          <div class="formItem">
            <el-form-item label="具体内容" prop="content">
              <input class="formItemInput" type="text" v-model="ruleForm.content" placeholder="请输入具体内容">
            </el-form-item>
          </div>
          <div class="formItem other">
            <el-form-item label="备注与填报指引" prop="remarkGuid">
              <input class="formItemInput other" type="text" v-model="ruleForm.remarkGuid" placeholder="请输入备注与填报指引">

            </el-form-item>
          </div>
        </el-form>
      </div>

    </div>
</template>

<script>
    import{addPurpose} from '@/api/views/financialAproval/costUse.js'
    export default {
        name: "addOrEdit",
        data(){
            return{
                ruleForm:{},
                rules: {
                    purpose: [
                        {required: true, message: '请输入费用用途', trigger: 'change'}
                    ],
                    content: [
                        {required: true, message: '请输入具体内容', trigger: 'change'}
                    ],
                    remarkGuid: [
                        {required: true, message: '请输入备注与填报指引', trigger: 'change'}
                    ],
                }
            }
        },
        methods:{
            // 保存数据
            submitForm(typeNum,formName) {
                this.$refs[formName].validate((valid) => {
                    console.log(valid)
                    console.log(this.ruleForm)
                    if (valid) {
                        let upData=this.ruleForm;
                        upData.addType=typeNum
                        addPurpose(upData).then(res=>{
                            if(res.messageType==0)
                            {
                                this.$message.success( '编辑成功！');
                                this.$router.push('/financialAproval/costUse')
                            }else{
                                this.$message.error(res.message);
                            }
                            console.log(res)
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>
<style lang="scss">
  .viewFinancialAprovalCostUseAddOrEdit{
    .el-textarea__inner{
      width: 400px;
    }
  }

</style>

<style scoped lang="scss" src="@/styles/financialAproval/costUse/addOrEdit.scss">

</style>
