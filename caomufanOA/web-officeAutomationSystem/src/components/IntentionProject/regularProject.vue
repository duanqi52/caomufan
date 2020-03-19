<template>
  <div class="componentsroleManageaddDepartmentBoss">
    <el-dialog
      :visible.sync="regularProjectShow"
      width="1000px"
      :show-close="false"
      :before-close="cancelModal"
      :close-on-press-escape="true"
      custom-class="DialogVisible regularProjectShow"
    >
      <div class="dialogBox">
        <div class="dialogTop">
          <div class="dialogTitle">转正式项目</div>
          <div class="dialogClose">
            <i @click="cancelModal()" class="iconfont icon-guanbi"></i>
          </div>
        </div>
        <div class="addForm">
          <div class="dialogContent">
            <div class="formItem">
              <div class="formItemName">选择项目的负责部门并点击“确认”按钮，意向项目将会转成正式项目。</div>

              <div class="formItemInput">
                <el-select
                  v-model="departmentForm.departmentId"
                  filterable
                  popper-class="departmentList"
                  placeholder="请负责选择部门"
                >
                  <el-option
                    v-for="item in departmentList"
                    :key="item.departmentName"
                    :label="item.departmentName"
                    :value="item.departmentID"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="dialogBottom">
            <button @click="cancelModal()">取消</button>
            <a @click="adddepartmentGo()">确定</a>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUser } from "@/api/views/addressBook/addressBook.js";
import { addRoleUser } from "@/api/views/roleManage/roleManage.js";
export default {
  name: "regularProjectShow",
  props: ["regularProjectShow"],
  data() {
    return {
      departmentForm:{
        roleId:"",
        openID:'',
        departmentId:''
      },
      departmentList: []
    };
  },
  mounted() {
    // 获取部门与人员列表
    this.getUserList();
  },
  methods: {
    // 获取用户列表
    getUserList() {
      getUser().then(res => {
        this.departmentList = res.result;
        let rr = res.result;
        for (let i in rr) {
          this.userList = this.userList.concat(rr[i].user);
        }
        console.log(this.userList)
        // 临时让空的openId不为空
        let ul = this.userList;
        for (let i in ul) {
          if (ul[i].openID == "") {
            ul[i].openID = i;
          }
        }
        this.userList = ul;
      });
    },
    // 关闭页面时触发
    cancelModal() {
      var that = this;
      that.wechatStatus = true;
      that.$emit("update:regularProjectShow", false);
    }
  },
  watch: {}
};
</script>

<style scoped lang="scss" >
.componentsroleManageaddDepartmentBoss {
    .regularProjectShow{
            margin-top: 35vh;
    }
  /*头部标签*/
  .dialogTop {
    display: flex;
    justify-content: space-between;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ddd;
    .dialogTitle {
      padding: 0 0 0 20px;
      font-size: 16px;
    }
    .dialogClose {
      padding: 0 20px 0 0;
      i {
        font-size: 26px;
      }
    }
  }

  /*输入列表 表单*/
  .addForm {
    .dialogContent {
      width: 1000px;

      .formItem {
        text-align: center;
        .formItemName {
          margin: 40px 0;
          text-align: center;
          font-size: 16px;
        }
        .formItemInput {
              text-align: center;
          .departmentList {
            width: 300px;
          }
          .el-select {
            width: 600px;
          }
        }
      }
    }
    .dialogBottom {
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 1px solid #EEEFEF;
      margin-top: 50px;
      button{
        width: 90px;
        height: 36px;
        margin: 0 auto;
        text-align: center;
        color: black;
        border: 1px solid #F5F5F5;
        background: white;
        cursor: pointer;
        outline:0;
      }
      a {
        width: 90px;
        height: 36px;
        line-height: 36px;
        display: block;
        margin: 0 auto;
        text-align: center;
        color: #fff;
        border-radius: 5px;
        background: #3b9414;
        cursor: pointer;
      }
    }
  }
}
</style>

