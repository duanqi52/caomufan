<template>
  <div class="bodyShow viewAddressBookIndex">
    <div class="topShow">
      <topTitle :returnPath="returnPath" :showTitle="showTitle"></topTitle>
    </div>
    <div class="bodyBox">
      <!--        左边展示-->
      <div class="bodyLeft">
        <div class="topNotTitle"></div>
        <div class="leftSearch"></div>

        <el-scrollbar class="leftList">
          <template slot="title" class="collapseTitle">
            <i class="iconfont icon-zu"></i>
          </template>
          <ul>
            <li
              class="itemShow"
              @click="changeDepartment({departmentName:0},-1)"
              :class="departmentStatus=='0'?'active':''"
            >
              <div class="itemShowBox">
                <div class="itemBox">
                  <div class="itemOne"></div>
                  <div class="itemDataShow">
                    <div class="itemIcon" style="width: 40px">
                      <i class="iconfont icon-zu"></i>
                    </div>
                    <div class="itemName">草木蕃环境科技有限公司</div>
                  </div>
                </div>
              </div>
            </li>
            <li
              v-for="(item,index) in departmentList"
              :key="index"
              class="itemShow"
              :class="departmentStatus==item.departmentName?'active':''"
            >
              <div
                @click="departmentcheckStatus?deleteDepartment(item):changeDepartment(item,index)"
                class="itemShowBox"
              >
                <div class="itemBox">
                  <div class="itemOne"></div>
                  <div class="changeBtn">
                    <!--                            <el-checkbox v-show="departmentcheckStatus" size="medium" :label="item.name" ></el-checkbox>-->
                  </div>
                  <div class="itemDataShow">
                    <div class="itemIcon">
                      <i class="iconfont icon-tongxunlubumen"></i>
                    </div>
                    <div class="itemName">{{item.departmentName}}({{item.userList.length}})</div>
                  </div>
                </div>
              </div>
              <div class="changeBtnPosition">
                <i
                  style="font-size: 24px;"
                  @click="deleteDepartment(item)"
                  v-show="departmentcheckStatus"
                  class="iconfont icon-shan"
                ></i>
              </div>
            </li>
          </ul>
        </el-scrollbar>
      </div>

      <!--        右边展示-->
      <div class="bodyRight">
        <div class="rightCrevice"></div>
        <div style="flex: 1">
          <div class="rightContent">
            <div class="nowTop">
              <div style="height: 75px"></div>
            </div>
            <div class="peopleListBox">
              <div class="peopleList">
                <!--                  顶部按钮部分-->
                <div class="companyTitle">
                  <div class="companyName">
                    <img style="width: 25px;height: 25px" src="@/assets/images/icon.png" alt="1" />
                    <span>广州草木蕃环境科技有限公司</span>
                  </div>
                  <div v-if="accessRole==200" class="companyBtnBox" v-show="departmentStatus!='0'">
                    <div class="companyBtn" v-show="!delPeopleStatus">
                      <a @click="addPeopleVisible=true">
                        <i class="iconfont icon-xinzeng"></i>增加人员
                      </a>
                    </div>
                    <div class="companyBtn" v-show="!delPeopleStatus">
                      <a @click="delPeopleStatus=true">
                        <i class="iconfont icon-shanchu"></i>删除人员
                      </a>
                    </div>
                    <div
                      class="companyBtn"
                      v-show="!delPeopleStatus"
                      @click="updataDepartmentName()"
                    >
                      <a>
                        <i class="iconfont icon-zhongmingming"></i>部门重命名
                      </a>
                    </div>
                    <div class="companyBtn" v-show="delPeopleStatus">
                      <a @click="delPeopleStatus=false">
                        <i class="iconfont icon-tijiao"></i>完成
                      </a>
                    </div>
                  </div>
                  <div v-if="accessRole==200" class="companyBtnBox" v-show="departmentStatus=='0'">
                    <div class="companyBtn" v-show="!departmentcheckStatus">
                      <a @click="addDepartmentVisible=true">
                        <i class="iconfont icon-xinzeng"></i>增加部门
                      </a>
                    </div>
                    <div class="companyBtn" v-show="!departmentcheckStatus">
                      <a @click="departmentcheckStatus=true">
                        <i class="iconfont icon-shanchu"></i>删除部门
                      </a>
                    </div>
                    <div class="companyBtn" v-show="departmentcheckStatus">
                      <a @click="departmentcheckStatus=false">
                        <i class="iconfont icon-tijiao"></i>完成
                      </a>
                    </div>
                  </div>
                </div>

                <!--                  展示列表部分-->
                <div class="peopleListShow">
                  <div class="peopleListShowNone"></div>
                  <el-scrollbar class="peopleListShowBox" v-if="peopleList.length>0">
                    <ul class="peopleUl">
                      <li v-for="(item,index) in peopleList" class="peopleItem">
                        <div class="peopelItemBox">
                          <div v-show="item.isLeader" class="peopelTitle">
                            <!--    是否为部门负责人-->
                            <img src="@/assets/images/addressBook/bumenfuzeren.png" alt />
                          </div>
                          <div v-show="delPeopleStatus" class="peopelDel">
                            <!--    删除按钮-->
                            <img
                              @click="deletePeople(item)"
                              src="@/assets/images/addressBook/delPeople.png"
                              alt
                            />
                          </div>
                          <div class="peopleImg">
                            <!--    头像-->
                            <template v-if="item.avatar!=''">
                              <el-avatar class="peopleImgShow" :size="65" :src="item.avatar"></el-avatar>
                            </template>
                            <template v-else>
                              <el-avatar
                                class="peopleImgShow"
                                :size="65"
                                src="@/assets/images/addressBook/nonephoto.png"
                              ></el-avatar>
                            </template>
                          </div>
                          <div class="peolpleData">
                            <div class="peopleTop">
                              <div class="peopleDataItem">
                                <div class="peopleDataName">姓名</div>
                                <div class="peopleDataInput" style="display: flex">
                                  <span class="peopleNameTxt" :title="item.name">{{item.name}}</span>
                                  <img
                                    style="height: 18px;margin: 12px 0 0 0;"
                                    v-if="item.sex==1"
                                    src="@/assets/images/addressBook/man.png"
                                    alt
                                  />
                                  <img
                                    style="height: 18px;margin: 12px 0 0 0;"
                                    v-if="item.sex==2"
                                    src="@/assets/images/addressBook/woman.png"
                                    alt
                                  />
                                </div>
                              </div>
                              <div class="peopleDataItem">
                                <div class="peopleDataName">电话</div>
                                <div
                                  class="peopleDataInput"
                                  style="color: #4ca824"
                                >{{item.mobilePhone}}</div>
                              </div>
                            </div>
                            <div class="peopleBottom">
                              <div class="peopleDataItem">
                                <div class="peopleDataName">部门</div>
                                <div class="peopleDataInput">{{item.department}}</div>
                              </div>
                              <div class="peopleDataItem">
                                <div class="peopleDataName">职位</div>
                                <div class="peopleDataInput">{{item.position}}</div>
                              </div>
                              <div class="peopleDataItem">
                                <div class="peopleDataName">邮箱</div>
                                <div class="peopleDataInput">{{item.email}}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="changeDep">
                          <a
                            v-if="accessRole==200||openID==item.openID"
                            class
                            @click="changePeopleData(item)"
                          >修改信息</a>
                        </div>
                      </li>
                    </ul>
                  </el-scrollbar>
                  <div v-else class="nonePeople">
                    <div class="noneItem">
                      <div class="noneImg">
                        <img src="@/assets/images/addressBook/none.png" alt />
                      </div>
                      <div class="noneTxt">
                        <!--                          <span style="font-size:16px ">该部门暂未添加人员</span>-->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--      添加部门组件-->
    <addDepartment
      v-if="addDepartmentVisible"
      @refreshNowPage="getAllUser"
      :addDepartmentVisible.sync="addDepartmentVisible"
    ></addDepartment>

    <!--      添加人员组件-->
    <addPeople
      v-if="addPeopleVisible"
      :departmentData="nowdepartmentData"
      @refreshNowPage="refreshDepartment"
      :addPeopleVisible.sync="addPeopleVisible"
    ></addPeople>

    <!--      修改用户信息弹窗-->
    <updataPeople
      v-if="updataPeopleVisible"
      :userData="nowUserData"
      @refreshNowPage="refreshDepartment"
      :updataPeopleVisible.sync="updataPeopleVisible"
    ></updataPeople>
  </div>
</template>

<script>
import {
  getUserAllUserDetail,
  delDepartment,
  putDepartment,
  delDepartmentDeleteUser
} from "@/api/views/addressBook/addressBook.js";
import topTitle from "@/components/Top/topTitle.vue";
import addDepartment from "@/components/addressBook/addDepartment.vue";
import addPeople from "@/components/addressBook/addPeople.vue";
import updataPeople from "@/components/addressBook/updataPeople.vue";
export default {
  name: "index",
  data() {
    return {
      accessRole: 101, //权限等级
      openID: "", //当前登录员工openID
      showTitle: "组织架构", //顶部导航显示标题
      returnPath: "/", //顶部导航跳转路由位置
      departmentcheckStatus: false, //部门多选框隐藏按钮状态
      delPeopleStatus: false, //人员的删除按钮状态
      addDepartmentVisible: false, //显示添加部门弹窗
      addPeopleVisible: false, //显示添加人员弹窗
      updataPeopleVisible: false, //修改员工信息弹窗
      departmentStatus: "", //当前选中部门名字
      departmentIndex: "", //当前选中部门index
      nowdepartmentData: {}, //当前选中部门详细信息
      nowUserData: {},
      // 当前部门列表
      departmentList: [],
      // 部门人员列表
      peopleList: [
        // {
        //     img:'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3333145089,190536566&fm=26&gp=0.jpg',
        //     name:'两年半练习生',
        //     tel:'+86-123456789',
        //     department:'恭喜发财部',
        //     position:'益力多饮佐味',
        //     email:'12342225789@qq.com',
        //     type:1
        // },
      ]
    };
  },
  mounted() {
    this.accessRole = window.localStorage.getItem("accessRole");
    this.openID = window.localStorage.getItem("openID");
    this.getAllUser();
  },
  methods: {
    // 获取所有人员详细信息
    getAllUser() {
      this.openID = window.localStorage.getItem("openID");
      this.accessRole = window.localStorage.getItem("accessRole");
      var that = this;
      getUserAllUserDetail().then(res => {
        if (res.messageType == 0) {
          that.departmentList = res.result;
          if (res.result.length > 0) {
            that.changeDepartment(res.result[0], 0);
          }
        } else {
        }
      });
    },
    // 初始化页面数据
    initPage() {
      var that = this;
      that.departmentcheckStatus = false;
      that.delPeopleStatus = false;
    },
    // 修改员工信息
    changePeopleData(data) {
      console.log(1);
      var that = this;
      that.nowUserData = data;
      that.updataPeopleVisible = true;
    },
    // 切换部门列表时人员展示
    changeDepartment(data, index) {
      var that = this;
      that.departmentIndex = index;
      that.nowdepartmentData = data;
      that.departmentStatus = data.departmentName;
      if (index != -1) {
        that.peopleList = data.userList;
      } else {
        let nl = [];
        let dl = that.departmentList;
        for (let i in dl) {
          nl = nl.concat(dl[i].userList);
        }
        that.peopleList = nl;
        // that.peopleList=
      }
    },
    // 删除选中部门
    deleteDepartment(data) {
      var that = this;
      let a = data;
      this.$confirm(
        "此操作将删除 " + data.departmentName + " 部门, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          delDepartment({
            DepartmentID: data.departmentID
          }).then(res => {
            if (res.messageType == 0) {
              that.$message.success("删除成功");
              that.getAllUser();
            } else {
              that.$message.error(res.message);
            }
            console.log(res);
          });
        })
        .catch(() => {});
    },
    // 刷新当前选定的部门
    refreshDepartment() {
      var that = this;
      getUserAllUserDetail().then(res2 => {
        if (res2.messageType == 0) {
          that.departmentList = res2.result;
          if (res2.result.length > 0) {
            that.changeDepartment(
              res2.result[that.departmentIndex],
              that.departmentIndex
            );
          }
        } else {
          that.$message.error(res2.message);
        }
      });
    },
    // 修改部门名称
    updataDepartmentName() {
      var that = this;
      let nd = that.nowdepartmentData;
      console.log(nd);
      let name = that.departmentStatus;
      that
        .$prompt("请输入部门新名称", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          inputValue: nd.departmentName,
          inputPattern: /^\S{1,14}$/,
          inputErrorMessage: "请输入1至14位字符且不能含有空格"
        })
        .then(({ value }) => {
          putDepartment({
            departmentID: nd.departmentID,
            departmentName: value
          }).then(res => {
            if (res.messageType == 0) {
              that.$message.success("更新成功");
              that.getAllUser();
            } else {
              that.$message.error(res.message);
            }
          });
        })
        .catch(() => {});
    },
    //删除员工
    deletePeople(data) {
      var that = this;
      console.log(data);
      console.log(that.nowdepartmentData);
      this.$confirm("此操作将删除该员工, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delDepartmentDeleteUser({
            departmentID: data.departmentID,
            openID: data.openID
          }).then(res => {
            if (res.messageType == 0) {
              that.$message.success(
                "删除成功," + data.name + "已从公司通讯录删除"
              );
              that.refreshDepartment();
            } else {
              that.$message.error(res.message);
            }
          });
        })
        .catch(() => {});
    },
    // 刷新当前页面
    refreshPage() {
      this.$router.go(0);
    }
  },
  components: {
    topTitle: topTitle,
    addDepartment: addDepartment,
    addPeople: addPeople,
    updataPeople: updataPeople
  }
};
</script>
<style lang="scss">
.viewAddressBookIndex {
  /*弹出框样式更改*/
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__body {
    padding: 0;
  }
  /*多选框样式更改*/
  .el-checkbox__label {
    display: none;
  }
  .el-collapse-item__header {
    font-size: 16px;
    padding: 0 0 0 10px;
    height: 65px;
    line-height: 65px;
  }
  .el-collapse-item__header i {
    font-size: 24px;
    color: #3b9414;
    padding: 0 10px 0 0;
  }
}
</style>
<style scoped lang="scss" src="@/styles/addressBook/index.scss">
</style>
