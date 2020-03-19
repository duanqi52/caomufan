<template>
  <div class="componentsaddressBookupdataPeople">
    <el-dialog
      :visible.sync="updataPeopleVisible"
      width="1000px"
      :show-close="false"
      :before-close="cancelModal"
      :close-on-press-escape="true"
      custom-class="DialogVisible addDepartmentVisible"
    >
      <div class="dialogBox">
        <div class="dialogTop">
          <div class="dialogTitle">修改人员信息</div>
          <div class="dialogClose"><i @click="cancelModal()" class="iconfont icon-guanbi"></i></div>
        </div>
        <div  class="addForm">
          <el-form :model="departmentForm" :rules="rules" ref="ruleForm" label-width="120px" class="dialogContent">
            <div class="formItem">
              <el-form-item label="姓名" prop="name">
                <el-input :disabled="accessRole!=200" v-model="departmentForm.name" placeholder="请输入员工姓名"></el-input>
              </el-form-item>
            </div>
            <div class="formItem">
              <el-form-item label="性别" >
                <el-radio-group :disabled="accessRole!=200" v-model="departmentForm.sex">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>

            <div class="formItem">
              <el-form-item label="部门" prop="name">
                <el-select
                  v-model="departmentForm.departmentID"
                  popper-class="departmentList"
                  :disabled="accessRole!=200"
                  placeholder="请选择部门">
                  <el-option
                    v-for="item in departmentList"
                    :key="item.departmentName"
                    :label="item.departmentName"
                    :value="item.departmentID">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="formItem">
              <el-form-item label="职位" prop="position">
                <el-input :disabled="accessRole!=200" v-model="departmentForm.position" placeholder="请输入员工职位"></el-input>
              </el-form-item>
            </div>
            <div class="formItem">
              <div class="formItem">
                <el-form-item label="电话" prop="name">
                  <el-input v-model="departmentForm.mobilePhone" placeholder="请输入员工电话"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="formItem">
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="departmentForm.email" placeholder="请输入员工邮箱"></el-input>
              </el-form-item>
            </div>

          </el-form>
          <div class="dialogBottom">
            <a @click="updataPeopleData()">确定</a>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>

</template>

<script>
    import {getUser,addUserUpdateDetail} from '@/api/views/addressBook/addressBook.js'
    export default {
        name: "updataPeople",
        props: ['updataPeopleVisible','userData'],
        data(){
            return{
                departmentForm:{},
                accessRole:101,
                rules:{
                    name: [
                        { required: true, message: '请输入真实名称', trigger: 'change' },
                        { min: 1, max: 50, message: '至少输入1个字符', trigger: ['blur', 'change'] }
                    ],
                    mobilePhone: [
                        { required: true, message: '请输入手机号码', trigger: 'change' },
                        { min: 1, max: 50, message: '至少输入1个字符', trigger: ['blur', 'change'] }
                    ],
                    position: [
                        { required: true, message: '请输入职位', trigger: 'change' },
                        { min: 1, max: 50, message: '至少输入1个字符', trigger: ['blur', 'change'] }
                    ],
                },
                nowUserData:{},
                peopleForm:{
                    departmentName:'',
                    company:'no'
                },
                departmentList:[
                ],
            }
        },
        mounted(){
            let that=this;

            that.init();
            that.accessRole=window.localStorage.getItem('accessRole')


        },
        methods:{
            // 初始化数据
            init(){
                let that=this
                that.getdepartmentList();
                that.accessRole=window.localStorage.getItem('accessRole')
            },
            // 获取部门列表
            getdepartmentList(){
                let that=this
                getUser().then(res=>{
                    that.departmentList=res.result;
                    that.nowUserData=JSON.parse(JSON.stringify(that.userData))
                    that.departmentForm=that.nowUserData;
                })
            },
            // 更新员工信息
            updataPeopleData(){
                let that=this;
                // console.log(that.userData)
                // console.log(that.departmentForm)
                let df=that.departmentForm
                // console.log(df)
                addUserUpdateDetail(df).then(res=>{
                    if (res.messageType == 0) {
                        that.$message.success('修改成功！页面即将刷新！');
                        that.$emit('refreshNowPage', '')
                        that.cancelModal()
                    } else {
                        that.$message.error(res.message);
                        that.departmentForm=JSON.parse(JSON.stringify(that.userData))
                    }
                    // console.log(that.userData)
                })
            },
            // 关闭页面时触发
            cancelModal(){
                var that=this
                that.wechatStatus=true
                that.$emit('update:updataPeopleVisible', false);
            },
        }
    }
</script>
<style lang="scss">
  .componentsaddressBookupdataPeople{
    .el-form-item__content{
      width: 90%!important;
    }
    .el-select{
      width: 95%!important;
    }
  }

</style>

<style scoped lang="scss">
  .componentsaddressBookupdataPeople{
    .dialogBox{
      /*头部标签*/
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


      /*输入列表 表单*/
      .addForm{
        .dialogContent{
          padding: 20px 0;
          width: 1000px;
          display: flex;
          flex-wrap: wrap;

          line-height: 60px;
          .formItem{
            width: 500px;
            display: flex;
            .formItemName{
              width: 120px;
              text-align: center;
            }
            .formItemInput{
              width: 300px;
              .departmentList{
                width: 300px;
              }
              .el-select{
                width: 300px;
              }
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
  }

</style>
