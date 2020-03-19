<template>
  <div class="componentsaddressBookaddPeople">
    <el-dialog
      :visible.sync="addPeopleVisible"
      width="1000px"
      :show-close="false"
      :before-close="cancelModal"
      :close-on-press-escape="true"
      custom-class="DialogVisible addDepartmentVisible"
    >
      <div class="dialogBox">
        <div class="dialogTop">
          <div class="dialogTitle">添加人员</div>
          <div class="dialogClose"><i @click="cancelModal()" class="iconfont icon-guanbi"></i></div>
        </div>
        <div v-show="wechatStatus" class="dialogWechatBox">
          <p>请使用微信扫一扫</p>
          <p> 绑定新增人员</p>
          <div id="wx_login" class="wx_login">
          </div>
        </div>
        <div v-show="!wechatStatus" class="addForm">
          <el-form :model="departmentForm" :rules="rules" ref="ruleForm" label-width="120px" class="dialogContent">
            <div class="formItem">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="departmentForm.name" placeholder="请输入员工姓名"></el-input>
              </el-form-item>
            </div>
            <div class="formItem">
              <el-form-item label="性别" >
                <el-radio-group v-model="departmentForm.sex">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>

            <div class="formItem">
              <el-form-item label="部门" prop="departmentID">
                <el-select
                  v-model="departmentForm.departmentID"
                  popper-class="departmentList"
                  :disabled="true"
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
                <el-input v-model="departmentForm.position" placeholder="请输入员工职位"></el-input>
              </el-form-item>
            </div>
            <div class="formItem">
              <div class="formItem">
                <el-form-item label="电话" prop="mobilePhone">
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
            <a @click="adddepartmentGo('ruleForm')">确定</a>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>

</template>
<!--0a1ZKlq92fDXxN09Xiq92sooq92ZKlq- -->
<script>
    import {getUser,grtOpenId,addUserAddDetail} from '@/api/views/addressBook/addressBook.js'
    export default {
        name: "addPeople",
        props: ['addPeopleVisible','departmentData'],
        data(){
            return{
                messagePage:'',
                departmentForm:{},
                rules:{
                    name: [
                        { required: true, message: '请输入真实名称', trigger: 'change' },
                        { min: 1, max: 50, message: '至少输入1个字符', trigger: ['blur', 'change'] }
                    ],
                    departmentID: [
                        { required: true, message: '请输选择部门', trigger: 'change' },
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
                nowDepartmentData:this.departmentID,
                wechatStatus:true,
                departmentList:[],//部门列表
            }
        },
        mounted(){
            var that=this;
          that.getdepartmentList();// 获取部门列表
            that.init();//初始化数据

            // that.goFromPage()
            // 展示微信二维码
            setTimeout(
                function () {
                    that.getwechatQr();

                },500)
            that.listentResetGoPage()
        },
        methods:{
            // 添加部门
            adddepartmentGo(formName){
                var that=this
                this.$refs[formName].validate((valid) => {
                    console.log(valid)
                    console.log(this.departmentForm)
                    if (valid) {
                        let upData = this.departmentForm;
                        addUserAddDetail(upData).then(res => {
                            if (res.messageType == 0) {
                                this.$message.success('添加成功！页面即将刷新！');
                                this.$emit('refreshNowPage', '')
                                that.cancelModal()
                            } else {
                                this.$message.error(res.message);
                            }
                            console.log(res)
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }

                })

            },
            // 初始化数据
            init(){
              var that=this
                that.departmentForm={
                    sex:1,
                    departmentID:this.nowDepartmentData.departmentID
                }
            },
            // 获取部门列表
            getdepartmentList(){
                var that=this
                getUser().then(res=>{
                    that.departmentList=res.result
                })
            },
            // 微信获取到code后跳转到表单输入
            goFromPage(code)
            {
                var that=this;
                grtOpenId(
                    {
                        code:code
                    }
                ).then(res=>{
                    if (res.messageType == 0) {

                        that.departmentForm.openID=res.result
                        that.wechatStatus=false;
                    } else {
                        that.$message.error(res.message);
                        that.init();//初始化数据
                        that.getwechatQr()
                    }
                })

            },
            // 关闭页面时触发
            cancelModal(){
                var that=this
                that.wechatStatus=true
                window.removeEventListener('message', this.messagePage,false)
                that.$emit('update:addPeopleVisible', false);
            },
            // 监听登录跳转页面的信息
            listentResetGoPage(){
                this.messagePage=(e)=>
                {
                    if(e.data.data){
                        if(e.data.data.code.length>0)
                        {
                            console.log('我要登录了')
                            this.goFromPage(e.data.data.code)
                        }
                    }else{
                    }
                }
                // 监听登录跳转页
                window.addEventListener('message', this.messagePage, false);
            },
            // 获取微信二维码
            getwechatQr() {
                var obj = new WxLogin({
                    self_redirect: true,
                    id: "wx_login",
                    appid: "wxe07a40c4ba25026c",
                    scope: "snsapi_login",
                    // redirect_uri 需要进行 UrlEncode
                    redirect_uri: "https%3a%2f%2fhome.caomufan.com%2f%23%2fresetLogin",
                    state: "",
                    style: "",
                    href: "data:text/css;base64,LmltcG93ZXJCb3ggLnRpdGxlIHtkaXNwbGF5OiBub25lO30NCiAgICAgICAgICAgICAgICAuaW1wb3dlckJveCAuc3RhdHVzIHB7Zm9udC1zaXplOjE2cHh9DQogICAgICAgICAgICAgICAgLmltcG93ZXJCb3ggLnN0YXR1c190eHQgcHtmb250LXNpemU6MTVweH0NCiAgICAgICAgICAgICAgICAuaW1wb3dlckJveCAucXJjb2Rle2JvcmRlcjpub25lO21hcmdpbi10b3A6MH0NCiAgICAgICAgICAgICAgICAuaW1wb3dlckJveCAuc3RhdHVzLnN0YXR1c19icm93c2VyLCAucmVkZXNpZ24tbXNnew0KICAgICAgICAgICAgICAgICAgICBkaXNwbGF5Om5vbmUNCiAgICAgICAgICAgICAgICAgICAgfQ=="
                });
            }
        },
        beforeDestroy() {
            window.removeEventListener('message', this.messagePage,false)
        },
        watch:{
            departmentData:{
                immediate:true,
                handler(val){
                    this.nowDepartmentData=val
                }
            }
        }
    }
</script>
<style lang="scss">
  .componentsaddressBookaddPeople{
    .addForm .el-form-item__content{
      width: 90%;
    }
    .addForm .el-select{
      width: 95%;
    }
  }




</style>
<style scoped lang="scss">
  .componentsaddressBookaddPeople{
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

      /*微信扫描界面*/
      .dialogWechatBox{
        padding: 20px 0 0 0;
        text-align: center;
        font-size: 20px;

        .wx_login{
          width: 300px;
          height: 400px;
          margin: 0 auto;
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
