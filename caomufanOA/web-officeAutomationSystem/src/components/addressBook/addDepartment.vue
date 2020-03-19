<template>
  <div class="componentsaddressBookaddDepartment">
    <el-dialog
      :visible.sync="addDepartmentVisible"
      width="1000px"
      :show-close="false"
      :before-close="cancelModal"
      :close-on-press-escape="true"
      custom-class="DialogVisible addDepartmentVisible"
    >
      <div class="dialogBox">
        <div class="dialogTop">
          <div class="dialogTitle">添加部门</div>
          <div class="dialogClose"><i @click="cancelModal()" class="iconfont icon-guanbi"></i></div>
        </div>
        <div class="dialogContent">
          <div class="formItem">
            <div class="formItemName">部门名称</div>
            <div class="formItemInput">
              <el-input v-model="departmentForm.departmentName" placeholder="请输入部门名称"></el-input>
            </div>
          </div>
          <div class="formItem">
            <div class="formItemName">是否为分公司</div>
            <div class="formItemInput">
              <el-radio v-model="departmentForm.isBranch" :label="false">否</el-radio>
              <el-radio v-model="departmentForm.isBranch" :label="true">是</el-radio>
            </div>
          </div>
        </div>
        <div class="dialogBottom">
          <a @click="adddepartmentGo()">确定</a>
        </div>
      </div>
    </el-dialog>
  </div>

</template>

<script>
    import {addDepartment} from '@/api/views/addressBook/addressBook.js'
    export default {
        name: "addDepartment",
        props: ['addDepartmentVisible'],
        data(){
            return{
                departmentForm:{
                    departmentName:'',
                    isBranch:false
                }
            }
        },
        methods:{
            // 添加部门
            adddepartmentGo(){
                var that=this
                if(that.departmentForm.departmentName!='')
                {
                    addDepartment(
                        that.departmentForm
                    ).then(res=>{
                        if(res.messageType==0)
                        {
                            that.$message.success('添加成功')
                            // 添加成功刷新页面
                            this.$emit('refreshNowPage','')
                            that.cancelModal()
                        }else{
                            that.$message.error(res.message)
                        }
                    })

                }else{
                    that.$message({
                        type: 'info',
                        message: '请输入部门名称'
                    });
                }

            },
            // 关闭页面时触发
            cancelModal(){
                var that=this
                that.$emit('update:addDepartmentVisible', false);
            }
        }
    }
</script>

<style scoped lang="scss">
  .componentsaddressBookaddDepartment{
    .dialogBox{
      .dialogTop{
        display: flex;
        justify-content: space-between;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #ddd;
        .dialogTitle{
          padding: 0 0 0 10px;
          font-size: 16px;
        }
        .dialogClose{
          padding: 0 10px 0 0;
          i{
            font-size: 26px;
          }
        }
      }
      .dialogContent{
        width: 1000px;
        display: flex;
        height: 80px;
        line-height: 80px;
        .formItem{
          width: 500px;
          display: flex;
          .formItemName{
            width: 120px;
            text-align: center;
          }
          .formItemInput{
            width: 300px;
          }
        }
      }
      .dialogBottom{
        height: 80px;
        display: flex;
        justify-content:center;
        align-items: center;
        a{
          width: 90px;
          height: 36px;
          line-height: 36px;
          display: block;
          margin: 0 auto;
          text-align: center;
          color: #fff;
          border-radius: 5px;
          background:#3b9414 ;
          cursor: pointer;
        }
      }
    }
  }

</style>
