<template>
  <div class="componentsroleManageaddDepartmentBoss">
    <el-dialog
      :visible.sync="addDepartmentBossVisible"
      width="1000px"
      :show-close="false"
      :before-close="cancelModal"
      :close-on-press-escape="true"
      custom-class="DialogVisible addDepartmentVisible"
    >
      <div class="dialogBox">
        <div class="dialogTop">
          <div class="dialogTitle">添加{{noewRoleName}}</div>
          <div class="dialogClose">
            <i @click="cancelModal()" class="iconfont icon-guanbi"></i>
          </div>
        </div>
        <div class="addForm">
          <div class="dialogContent">
            <div class="formItem">
              <div class="formItemName">姓名</div>
              <div class="formItemInput">
                <el-select
                  v-model="departmentForm.openID"
                  filterable
                  placeholder="请选择人员">
                  <el-option
                    v-for="item in userList"
                    :key="item.openID"
                    :label="item.name"
                    :value="item.openID">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div v-if="departmentStatus" class="formItem">
              <div class="formItemName">部门</div>
              <div class="formItemInput">
                <el-select
                  v-model="departmentForm.departmentId"
                  filterable
                  popper-class="departmentList"
                  placeholder="请选择部门">
                  <el-option
                    v-for="item in departmentList"
                    :key="item.departmentName"
                    :label="item.departmentName"
                    :value="item.departmentID">
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="dialogBottom">
            <a @click="adddepartmentGo()">确定</a>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>

</template>

<script>
    import {getUser} from '@/api/views/addressBook/addressBook.js'
    import {addRoleUser} from '@/api/views/roleManage/roleManage.js'
    export default {
        name: "addDepartmentBoss",
        props:['addDepartmentBossVisible','roleData'],
        data(){
            return{
                noewRoleName:this.roleData.roleName,//当前选中角色名称
                departmentStatus:false,//是否显示部门列表
                departmentForm:{
                    roleId:this.roleData.roleID,
                    openID:'',
                    departmentId:''
                },
                userList:[],
                departmentList:[],
            }
        },
        mounted(){
            // 获取部门与人员列表
            this.getUserList()
        },
        methods:{
            // 获取用户列表
            getUserList(){
                getUser().then(res=>{

                    this.departmentList=res.result
                    let rr=res.result
                    for(let i in rr)
                    {
                        this.userList=this.userList.concat(rr[i].user)
                    }
                    // 临时让空的openId不为空
                    let ul=this.userList
                    for(let i in ul)
                    {
                        if(ul[i].openID=='')
                        {
                            ul[i].openID=i
                        }
                    }
                    this.userList=ul
                })
            },
            // 添加角色
            adddepartmentGo(){
                var that=this
                let dF=this.departmentForm
                console.log(dF)
                if( dF.departmentId=='')
                {
                    dF.departmentId=0
                }
                // dF.departmentId=dF.departmentId.toString()
                addRoleUser(
                    dF
                ).then(res=>{
                    if(res.messageType==0)
                    {
                        console.log(res)
                        that.$message({
                            type: 'success',
                            message: res.message
                        });
                        this.$emit('refreshNowPage', '')
                        that.cancelModal()
                    }else{
                        this.$message.error(res.message)
                    }

                })
            },
            // 关闭页面时触发
            cancelModal(){
                var that=this;
                that.wechatStatus=true
                that.$emit('update:addDepartmentBossVisible', false);
            },
        },
        watch:{
            roleData:{
                immediate:true,
                handler(val)
                {

                    this.departmentForm.roleId=val.roleID;
                    this.noewRoleName=val.roleName
                    console.log(val)
                    if(val.roleName!="部门分管领导"&&val.roleName!='部门负责人')
                    {
                        this.departmentStatus=false
                    }else{
                        this.departmentStatus=true
                    }
                }
            },
        }
    }
</script>

<style scoped lang="scss" >
  .componentsroleManageaddDepartmentBoss{
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

</style>

