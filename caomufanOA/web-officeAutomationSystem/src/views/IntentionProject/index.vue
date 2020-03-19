<template>
  <div class="bodyShow viewIntentionProjectIndex">
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
            <li class="company">
              <div class="companyIcon" style="width: 40px">
                <i class="iconfont icon-zu"></i>
              </div>
              <div class="companyName">项目管理部</div>
            </li>
            <div class="addProjectBut">
              <button @click="addProjecShow = true">
                <span class="adds">+</span>
                <span class="addProjec">新增意向项目</span>
              </button>
            </div>
            <li
              v-for="(item,index) in userIntentList"
              :key="index"
              class="itemShow" style="padding-top: 20px;"
              :class="departmentStatus==item.userName?'active':''"
            >
              <div @click="changeDepartment(item,index)" class="itemShowBox" style="padding-left: 30px;">
                <div class="itemBox">
                  <div class="itemDataShow">
                    <div class="itemIcon">
                      <i class="iconfont icon-tongxunlubumen"></i>
                    </div>
                    <div class="itemName">{{item.userName}}({{item.projects.length}})</div>
                  </div>
                </div>
              </div>
              <ul v-show="item.isSubShow" style="padding: 0px 0px 0px 45px;">
                <li
                  v-for="(subItem,index) in item.projects"
                  :key="index"
                  class="projectNames"
                  :class="projectName==subItem.projectName?'actives':''"
                  @click="changeProject(subItem,index)"
                >
                  <i class="el-icon-s-claim" style="font-size: 16px;"></i>
                  <div class="projectName">{{subItem.projectName}}</div>
                </li>
              </ul>
            </li>
          </ul>
        </el-scrollbar>
      </div>

      <!--        右边展示-->
      <div class="bodyRight">
        <div class="rightCrevice"></div>
        <el-scrollbar class="scrollbarY" style="flex: 1">
          <div class="rightContent">
            <div class="nowTop">
              <div style="height: 75px"></div>
            </div>
            <div class="nowPage">
              <!-- 保存后的查看子页面 -->
              <viewItems style="display: none;">

                </viewItems>
              <!-- 所有项目展示 -->
              <div id="allIitems" style="display: none;">
                <ul>
                  <li class="allIitemsList">
                    <div class="allItemsTitle">
                      <span>广州什么什么项目</span>
                      <span class="itemsDetails">详情</span>
                    </div>
                    <!-- 里程碑部分 -->
                    <div class="allItemsMilepost">
                      <div class="allItems">
                        <ul id="allItemsList">
                          <li>
                            <span>里程碑阶段1</span>
                            <br />
                            <span class="milength">1</span><br />
                            <span>2020-02-02</span><br />
                            <span class="subTask">
                              <i class="iconfont icon-zirenwu"></i>
                              <span class>0/10</span>
                            </span>
                          </li>
                          
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <!-- //默认无内容 -->
              <div class="noConten" :style="{'height': windowInnerHeight-75 + 'px'}" v-if="!addProjecShow" >
                <img src="@/assets/images/IntentionProject/noConten.png" alt="">
              </div>
              <!-- 新增意向项目 -->
              <div class="peopleListBox" v-if="addProjecShow">
                <div class="peopleList">
                  <!--                  顶部按钮部分-->
                  <div class="companyTitle">
                    <div class="companyName">
                      <span>新增意向项目</span>
                    </div>
                    <div class="companyBtnBox">
                      <div class="companyBtn">
                        <a>
                          <i class="iconfont icon-tijiao"></i>保存
                        </a>
                      </div>
                    </div>
                  </div>
                  <!--                  展示部分-->
                  <div style="margin: 0 25px;">
                    <!-- 里程碑部分 -->
                    <div class="addMilepost">
                      <div class="addMileposter">
                        <ul v-if="ruleForm.milestoneList.length > 0" id="milestoneList">
                          <li v-for="(item,index) in ruleForm.milestoneList" :key="index">
                            <el-input
                              placeholder="请输入标题"
                              v-model="item.milestoneTltie"
                              clearable
                              style="width: 220px;"
                              class="milestoneTitle"
                            ></el-input>
                            <br />
                            <span class="milength">
                              <img src="@/assets/images/IntentionProject/delete.png" alt @click.stop="deletemilestoneLi(index)"/>{{index+1}}</span><br />
                            <el-date-picker
                              v-model="item.deadline"
                              type="date"
                              placeholder="请选择截止时间"
                              class="milestoneDate"
                            ></el-date-picker>
                            <br />
                            <span class="subTask">
                              <i class="iconfont icon-zirenwu"></i>
                              <span class>0/{{subTaskLeng}}</span>
                            </span>
                          </li>
                        </ul>
                        <span
                          @click="addMilepost()"
                          class="addMi"
                          :style="{'margin-left' : ruleForm.milestoneList.length > 0?'120px':'700px'}"
                        >
                          <img
                            src="@/assets/images/IntentionProject/add.png"
                            alt
                            style="position: relative;"
                          />
                          <span>添加里程碑</span>
                        </span>
                      </div>
                    </div>
                    <!-- 表单部分 -->
                    <el-form
                      label-position="right"
                      label-width="100px"
                      :model="ruleForm"
                      :rules="rules"
                      ref="ruleForm"
                    >
                      <div class="formContent">
                        <div class="formBody">
                          <div class="formItem">
                            <el-form-item label="项目名称" prop="projectName">
                              <el-input v-model="ruleForm.projectName"></el-input>
                            </el-form-item>
                          </div>
                          <div class="formItem">
                            <el-form-item label="临时编号" prop="projectNum">
                              <el-input v-model="ruleForm.projectNum"></el-input>
                            </el-form-item>
                          </div>
                          <div class="formItem">
                            <el-form-item label="负责部门" prop="departmentID">
                              <el-select
                                v-model="ruleForm.departmentID"
                                popper-class="formSelect"
                                placeholder="请选择负责部门"
                              >
                                <el-option
                                  v-for="(item,index) in departmentList"
                                  :key="index"
                                  :label="item.departmentName"
                                  :value="item.departmentID"
                                ></el-option>
                              </el-select>
                            </el-form-item>
                          </div>
                          <div class="formItem">
                            <el-form-item label="项目类型" prop="projectType">
                              <el-select
                                v-model="ruleForm.projectType"
                                popper-class="formSelect"
                                placeholder="请选择支付类型"
                              >
                                <el-option label="外出调研" :value="0"></el-option>
                                <el-option label="调研" :value="1"></el-option>
                              </el-select>
                            </el-form-item>
                          </div>
                          <div class="formItem">
                            <el-form-item label="业主单位" prop="oddNum">
                              <el-input v-model="ruleForm.oddNum"></el-input>
                            </el-form-item>
                          </div>
                          <div class="formItem">
                            <el-form-item label="项目金额" prop="projectPrice">
                              <el-input type="number" v-model="ruleForm.projectPrice"></el-input>
                            </el-form-item>
                          </div>
                          <div class="formItem">
                            <el-form-item label="* 项目所在地" prop="selectedOptions">
                              <el-cascader
                                size="large"
                                :options="options"
                                v-model="selectedOptions"
                                @change="addressChange"
                                clearable
                              ></el-cascader>
                            </el-form-item>
                          </div>
                        </div>
                      </div>
                    </el-form>
                    <!-- 实施信息部分 -->
                    <div class="implementationInfo">
                      <div class="implementationHead">
                        <span>实施信息</span>
                      </div>
                      <div class="implementationContent">
                        <ul class="chargeMan">
                          <span class="chargeMans">项目负责人：</span>
                          <li>
                            <span class="el-avatar--circle headPortrait">
                              <el-avatar :size="50" :src="ruleForm.implementationInfor.userInfo.avatar"></el-avatar>
                            </span>
                            <span class="chargeName">{{ruleForm.implementationInfor.userInfo.userName}}</span>
                          </li>
                          <div id="replace" @click="leadingCadre()" v-show="changePerson">更换</div>
                          <el-cascader
                            placeholder="请搜索选择负责人"
                            filterable
                            v-show="!changePerson"
                            v-model="personCharge"
                            :options="departmentList"
                            :props="personInCharge"
                            @change="personInChargeBtn(personCharge)"
                          ></el-cascader>
                        </ul>
                        <ul class="participatingDepartments">
                          <span class="departments">参与部门：</span>
                          <li v-for="(item,index) in ruleForm.implementationInfor.participatingDepartments" :key="index">
                            <span>{{item}}</span>
                          </li>
                        </ul>
                        <ul class="chargeMan">
                          <span class="chargeMans">参与人：</span>
                          <li v-for="(itme,index) in ruleForm.implementationInfor.participant" :key="index">
                            <span class="el-avatar--circle headPortrait">
                              <img
                                src="@/assets/images/IntentionProject/delete.png"
                                alt
                                class="deleteParticipant"
                                @click="ruleForm.implementationInfor.participant.splice(index,1),deleteParticipants(itme)"
                              />
                              <el-avatar
                                :size="50"
                                :src="itme.participantAvatar"
                              ></el-avatar>
                            </span>
                            <span class="chargeName">{{itme.participantName}}</span>
                          </li>
                          <img
                            v-show="participantShow"
                            src="@/assets/images/IntentionProject/add.png"
                            alt
                            @click="addParticipantBtn()"
                            class="addParticipantBtn"
                          />
                          <el-cascader
                            placeholder="请搜索选择参与人"
                            v-show="!participantShow"
                            v-model="participant"
                            :options="departmentList"
                            :props="personInCharge"
                            filterable
                            @change="participantBtn(participant)"
                            style="margin-bottom: 50px;"
                          ></el-cascader>
                        </ul>
                      </div>
                    </div>
                    <!-- 资料信息 -->
                    <div class="dataInfo">
                      <div class="dataInfoHead">
                        <span>资料信息</span>
                        <i
                          class="iconfont icon-zhankai1"
                          v-show="openData"
                          @click="openData = !openData"
                        ></i>
                        <i
                          class="iconfont icon-shouqi1"
                          v-show="!openData"
                          @click="openData = !openData"
                        ></i>
                      </div>
                      <el-collapse-transition>
                        <div class="dataContent" v-show="!openData">
                          <div class="enclosure">
                            <p style="margin-bottom: 10px;">附件：</p>
                            <!-- 工作方案/报价文件 -->
                            <div class="quotation">
                              <div class="quotationHead">
                                <span>
                                  <i class="iconfont icon-zu quotationLogo"></i>
                                  <span
                                    style="margin-top: 5px;display: inline-block;"
                                  >项目工作方案/报价文件（{{ruleForm.fileQuotationList.length}}）</span>
                                </span>
                                <el-upload
                                  class="avatar-uploader"
                                  action="https://home.caomufan.net/api/file"
                                  :headers="updataHeard"
                                  :show-file-list="false"
                                  :on-success="uploadFileSuccess"
                                  :before-upload="beforeAvatarUpload"
                                >
                                <i class="iconfont icon-dianjishangchuan addQuotation"></i>
                                </el-upload>
                              </div>
                              <div class="remakeFile">
                                <div
                                  class="remakeAccessoriesList"
                                  v-show="ruleForm.fileQuotationList.length>0"
                                >
                                  <table border="1" cellspacing="0" cellpadding="0">
                                    <tr v-for="(item,index) in ruleForm.fileQuotationList" :key='index'>
                                      <td>{{item.fileUrl}}</td>
                                      <td>{{item.fileSize}}Mb</td>
                                      <td>
                                        <i
                                          @click="ruleForm.fileQuotationList.splice(index,1)"
                                          style="color: #f56f6f;font-size: 24px;cursor: pointer;"
                                          class="iconfont icon-shan"
                                        ></i>
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                              </div>
                            </div>
                            <!-- 招标文件 -->
                            <div class="quotation">
                              <div class="quotationHead">
                                <span>
                                  <i class="iconfont icon-zu quotationLogo"></i>
                                  <span
                                    style="margin-top: 5px;display: inline-block;"
                                  >项目招标文件（{{ruleForm.fileTenderingList.length}}）</span>
                                </span>
                                <el-upload
                                  class="avatar-uploader"
                                  action="https://home.caomufan.net/api/file"
                                  :headers="updataHeard"
                                  :show-file-list="false"
                                  :on-success="upTenderingloadFileSuccess"
                                  :before-upload="beforeAvatarUpload"
                                >
                                <i class="iconfont icon-dianjishangchuan addQuotation"></i>
                                </el-upload>
                              </div>
                              <div class="remakeFile">
                                <div
                                  class="remakeAccessoriesList"
                                  v-show="ruleForm.fileTenderingList.length>0"
                                >
                                  <table border="1" cellspacing="0" cellpadding="0">
                                    <tr v-for="(item,index) in ruleForm.fileTenderingList" :key='index'>
                                      <td>{{item.fileUrl}}</td>
                                      <td>{{item.fileSize}}Mb</td>
                                      <td>
                                        <i
                                          @click="ruleForm.fileTenderingList.splice(index,1)"
                                          style="color: #f56f6f;font-size: 24px;cursor: pointer;"
                                          class="iconfont icon-shan"
                                        ></i>
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                              </div>
                            </div>
                            <!-- 投标文件 -->
                            <div class="quotation">
                              <div class="quotationHead">
                                <span>
                                  <i class="iconfont icon-zu quotationLogo"></i>
                                  <span
                                    style="margin-top: 5px;display: inline-block;"
                                  >项目投标文件（{{ruleForm.fileBidList.length}}）</span>
                                </span>
                                <el-upload
                                  class="avatar-uploader"
                                  action="https://home.caomufan.net/api/file"
                                  :headers="updataHeard"
                                  :show-file-list="false"
                                  :on-success="upBidloadFileSuccess"
                                  :before-upload="beforeAvatarUpload"
                                >
                                <i class="iconfont icon-dianjishangchuan addQuotation"></i>
                                </el-upload>
                              </div>
                              <div class="remakeFile">
                                <div
                                  class="remakeAccessoriesList"
                                  v-show="ruleForm.fileBidList.length>0"
                                >
                                  <table border="1" cellspacing="0" cellpadding="0">
                                    <tr v-for="(item,index) in ruleForm.fileBidList" :key='index'>
                                      <td>{{item.fileUrl}}</td>
                                      <td>{{item.fileSize}}Mb</td>
                                      <td>
                                        <i
                                          @click="ruleForm.fileBidList.splice(index,1)"
                                          style="color: #f56f6f;font-size: 24px;cursor: pointer;"
                                          class="iconfont icon-shan"
                                        ></i>
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                              </div>
                            </div>
                            <!-- 其他文件 -->
                            <div class="quotation">
                              <div class="quotationHead">
                                <span>
                                  <i class="iconfont icon-zu quotationLogo"></i>
                                  <span
                                    style="margin-top: 5px;display: inline-block;"
                                  >项目其他文件（{{ruleForm.fileOtherList.length}}）</span>
                                </span>
                                <el-upload
                                  class="avatar-uploader"
                                  action="https://home.caomufan.net/api/file"
                                  :headers="updataHeard"
                                  :show-file-list="false"
                                  :on-success="upOtherloadFileSuccess"
                                  :before-upload="beforeAvatarUpload"
                                >
                                <i class="iconfont icon-dianjishangchuan addQuotation"></i>
                                </el-upload>
                              </div>
                              <div class="remakeFile">
                                <div
                                  class="remakeAccessoriesList"
                                  v-show="ruleForm.fileOtherList.length>0"
                                >
                                  <table border="1" cellspacing="0" cellpadding="0">
                                    <tr v-for="(item,index) in ruleForm.fileOtherList" :key='index'>
                                      <td>{{item.fileUrl}}</td>
                                      <td>{{item.fileSize}}Mb</td>
                                      <td>
                                        <i
                                          @click="ruleForm.fileOtherList.splice(index,1)"
                                          style="color: #f56f6f;font-size: 24px;cursor: pointer;"
                                          class="iconfont icon-shan"
                                        ></i>
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </el-collapse-transition>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <!-- 转正式项目弹窗 -->
    <regularProject
      v-if="regularProjectShow"
      :regularProjectShow.sync="regularProjectShow"
    >
    </regularProject>
    <!-- 详情进度查看 -->
    <detailsProgress v-if="intentProgressStatus">

    </detailsProgress>
  </div>
</template>

<script>
import detailsProgress from "@/components/IntentionProject/detailsProgress.vue";
import viewItems from "@/components/IntentionProject/viewItems/index.vue";
import { getUserProject } from "@/api/views/IntentionProject/IntentionProject.js";
import "@/assets/fontStyle/itemData/iconfont.css";
import { getUserDetail } from "@/api/views/utils.js";
import { getUserAllUserDetail } from "@/api/views/addressBook/addressBook.js";
import { regionData, CodeToText, TextToCode } from "element-china-area-data";
import topTitle from "@/components/Top/topTitle.vue";
import regularProject from "@/components/IntentionProject/regularProject.vue";
export default {
  data() {
    return {
      intentProgressStatus:false,//查看进度状态
      windowInnerHeight:'',//获取高度
      addProjecShow:false,//新增意向项目状态
      userIntentList:[],//用户意向项目列表
      regularProjectShow:false,//转正式弹窗状态
      updataHeard: {
        "x-eco-client-appsession": "53a2b4a9dfed4f2aa5e352948b711890",
        "x-eco-client-version": "1.0.0",
        "x-eco-session": window.localStorage.getItem("token")
      },
      openData: true, //展开下拉资料状态
      participantShow: true, //添加参与人级联选择器隐藏
      participant: [], //选择后负责人
      changePerson: true, //更换负责人级联选择器隐藏
      personCharge: [], //选择后负责人的信息
      personInCharge: {
        value: "openID",
        label: "name",
        children: "userList"
      }, //级联数据赋值对象
      options: regionData,
      selectedOptions: [], //选择城市
      accessRole: 101, //权限等级
      openID: "", //当前登录员工openID
      showTitle: "意向项目", //顶部导航显示标题
      returnPath: "/", //顶部导航跳转路由位置
      departmentStatus: "", //当前部门人员名字
      departmentIndex: "", //当前部门人员index
      nowdepartmentData: {}, //当前选中部门人员详细信息
      // 当前部门列表
      departmentList: [],
      projectName: "", //当前选中项目名字
      projectIndex: "", //当前选中项目index
      ruleForm: {
        milestoneList: [
        // {
        //   milestoneTltie: "", //里程碑阶段标题
        //   deadline: "", //截止时间
        //   subTask: ["asdasd", "asdasd"] //子任务列表
        // }
        ], //里程碑列表
        oddNum: "", //项目类型
        projectName: "", //项目名称
        projectNum: "", //临时编号
        departmentID: "", //部门id
        projectType: 0, //项目类型
        projectPrice: "", //项目金额
        implementationInfor: {
        // chargeMan: {
        //   chargeManAvatar: "", //头像
        //   chargeManName: "" //姓名
        // }, //负责人
        userInfo: {
          avatar: '',
          userName:'',
          openID:'',
        }, //个人登录信息后可更换负责人信息
        participatingDepartments: [], //参与部门
        participant: [
          // {
          //   participantAvatar: "", //头像
          //   participantName: "" ,//姓名
          //   participantOpenID:''
          // }
        ] //参与人
      }, //实施信息列表
        fileQuotationList: [], //上传工作方案/报价的图片
        fileTenderingList: [], //上传招标的图片
        fileBidList: [], //上传投标的图片
        fileOtherList: [], //上传其他的图片
      }, //项目表单
      rules: {
        departmentID: [
          { required: true, message: "请选择负责部门", trigger: "change" }
        ],
        projectType: [
          { required: true, message: "请选择项目类型", trigger: "change" }
        ],
        projectName: [
          {
            required: true,
            message: "请输入项目名称",
            trigger: ["blur", "change"]
          },
          {
            min: 1,
            max: 50,
            message: "至少输入1个字符",
            trigger: ["blur", "change"]
          }
        ],
        projectNum: [
          {
            required: true,
            message: "请输入临时编号",
            trigger: ["blur", "change"]
          },
          {
            min: 1,
            max: 30,
            message: "至少输入1个字符",
            trigger: ["blur", "change"]
          }
        ],
        projectPrice: [
          {
            required: true,
            message: "请输入项目金额",
            trigger: ["blur", "change"]
          }
        ],
        oddNum: [
          {
            required: true,
            message: "请输入业主单位",
            trigger: ["blur", "change"]
          },
          {
            min: 1,
            max: 30,
            message: "至少输入1个字符",
            trigger: ["blur", "change"]
          }
        ]
      },
      subTaskLeng: null, //子任务数量

    };
  },
  components: {
    topTitle: topTitle,
    regularProject:regularProject,
    viewItems:viewItems,//查看详情
    detailsProgress:detailsProgress,//查看进度详情弹窗
  },
  updated() {
    if (this.ruleForm.milestoneList.length > 0) {
      console.log(this.ruleForm.milestoneList.length);
      for (let i in this.ruleForm.milestoneList) {
        this.subTaskLeng = this.ruleForm.milestoneList[i].subTask.length;
        console.log(this.ruleForm.milestoneList[i].subTask.length);
      }
    }
  },
  mounted() {
    this.accessRole = window.localStorage.getItem("accessRole");
    this.openID = window.localStorage.getItem("openID");
    this.getAllUser();
    this.getUserInfo();
    this.getUserProjecter();
    this.windowInnerHeight=window.innerHeight
  },
  methods: {
    // 左侧用户意向项目列表
    getUserProjecter() {
      let that = this;
      getUserProject().then(res => {
        if (res.messageType == 0) {
          that.userIntentList = res.result
          if (res.result.length > 0) {
            that.changeDepartment(res.result[0], 0);
          }
        }
      });
    },
    //上传其他的图片成功时
    upOtherloadFileSuccess(response, file, fileList) {
      console.log(response);
      console.log(file);
      console.log(fileList);
      this.ruleForm.fileOtherList.push({
        name: file.name,
        fileUrl: file.response.result.url,
        fileSize: file.response.result.size
      });
      console.log(this.ruleForm.fileOtherList);
    },
    //上传投标的图片成功时
    upBidloadFileSuccess(response, file, fileList) {
      console.log(response);
      console.log(file);
      console.log(fileList);
      this.ruleForm.fileBidList.push({
        name: file.name,
        fileUrl: file.response.result.url,
        fileSize: file.response.result.size
      });
      console.log(this.ruleForm.fileBidList);
    },
    //上传招标的图片成功时
    upTenderingloadFileSuccess(response, file, fileList) {
      console.log(response);
      console.log(file);
      console.log(fileList);
      this.ruleForm.fileTenderingList.push({
        name: file.name,
        fileUrl: file.response.result.url,
        fileSize: file.response.result.size
      });
      console.log(this.ruleForm.fileTenderingList);
    },
    // 上传工作方案/报价的图片成功时
    uploadFileSuccess(response, file, fileList) {
      console.log(response);
      console.log(file);
      console.log(fileList);
      this.ruleForm.fileQuotationList.push({
        name: file.name,
        fileUrl: file.response.result.url,
        fileSize: file.response.result.size
      });
      console.log(this.ruleForm.fileQuotationList);
    },
    // 上传前的检查
    beforeAvatarUpload(file) {
      console.log(file);
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = testmsg === "jpg";
      const extension2 = testmsg === "jpeg";
      const extension3 = testmsg === "gif";
      const extension4 = testmsg === "png";
      const isLt2M = file.size / 1024 / 1024 < 10; //这里做文件大小限制
      // if(!extension && !extension2&& !extension3 && !extension4) {
      //     this.$message({
      //         message: '上传文件只能是 jpg、jpeg、gif、png格式!',
      //         type: 'warning'
      //     });
      // }
      if (!isLt2M) {
        this.$message({
          message: "上传文件大小不能超过 10MB!",
          type: "warning"
        });
      }
      // return (extension || extension2|| extension3|| extension4) && isLt2M
      return isLt2M;
    },
    //删除参与人和匹配部门数据
    deleteParticipants(value){
      let that = this;
      let data = value
      var participantDepartmentArr=[]
      for (let i in that.ruleForm.implementationInfor.participant) {
        participantDepartmentArr = participantDepartmentArr.concat(that.ruleForm.implementationInfor.participant[i].participantDepartment)          
          that.ruleForm.implementationInfor.participatingDepartments=participantDepartmentArr       
      }
      that.ruleForm.implementationInfor.participatingDepartments = [...new Set(that.ruleForm.implementationInfor.participatingDepartments)]
          console.log(that.ruleForm.implementationInfor.participant.length)
      if(that.ruleForm.implementationInfor.participant.length <= 2){
        console.log(that.ruleForm.implementationInfor.participant.length)
      if (that.ruleForm.implementationInfor.participatingDepartments.join() == data.participantDepartment) {
        that.ruleForm.implementationInfor.participatingDepartments = []
      }
      }
     console.log(that.ruleForm.implementationInfor.participatingDepartments)
      console.log(data.participantDepartment)
    },
    //选择器选择参与人
    participantBtn(value) {
      let that = this;
      let id = value[1]
       that.ruleForm.implementationInfor.participant = [...new Set(that.ruleForm.implementationInfor.participant)]
      for(let i in that.departmentList){
        let obj = that.departmentList[i].userList.find(function(obj){
          return obj.openID ==id;//取出this.userList里的指定openID的那条数据所有的信息
        });
        if (obj != undefined) {
          let index = that.ruleForm.implementationInfor.participant.findIndex(item => item.participantOpenID === obj.openID)
            if (index < 0) {
                that.ruleForm.implementationInfor.participant.push({
                  participantOpenID: obj.openID,
                  participantName: obj.name,
                  participantAvatar: obj.avatar,
                  participantDepartment: obj.department
                });
            } else {
                that.ruleForm.implementationInfor.participant.splice(index, 1)
                that.ruleForm.implementationInfor.participant.push({
                  participantOpenID: obj.openID,
                  participantName: obj.name,
                  participantAvatar: obj.avatar,
                  participantDepartment: obj.department
                });
            }
           let indexer = that.ruleForm.implementationInfor.participatingDepartments.findIndex(item => item === obj.department)
            if (indexer < 0) {
              that.ruleForm.implementationInfor.participatingDepartments.push(obj.department)
            }else {
              that.ruleForm.implementationInfor.participatingDepartments.splice(indexer, 1)
              that.ruleForm.implementationInfor.participatingDepartments.push(obj.department)
            }
          console.log(that.ruleForm.implementationInfor.participatingDepartments)
        }
      }
      that.participantShow = !that.participantShow;
    },
    //添加参与人
    addParticipantBtn() {
      let that = this;
      that.participantShow = !that.participantShow;
    },
    //选择器选择负责人
    personInChargeBtn(value) {
      let that = this;
      let id = value[1]
      for(let i in that.departmentList){
        let obj = that.departmentList[i].userList.find(function(obj){
          return obj.openID ==id;//取出this.userList里的指定openID的那条数据所有的信息
        });
        if (obj != undefined) {
          that.ruleForm.implementationInfor.userInfo.avatar = obj.avatar
          that.ruleForm.implementationInfor.userInfo.userName = obj.name
          that.ruleForm.implementationInfor.userInfo.openID = obj.openID
        }
      }
        console.log(that.ruleForm.implementationInfor.userInfo)
      that.changePerson = !that.changePerson
    },
    //更改负责人
    leadingCadre() {
      let that = this;
      that.changePerson = !that.changePerson;
    },
    //获取登录个人信息
    getUserInfo() {
      let that = this;
      getUserDetail().then(res => {
        if (res.messageType == 0) {
          that.ruleForm.implementationInfor.userInfo.avatar = res.result.avatar;
          that.ruleForm.implementationInfor.userInfo.openID = res.result.openID;
          that.ruleForm.implementationInfor.userInfo.userName = res.result.realName;
        }
      });
    },
    //删除里程碑
    deletemilestoneLi(index) {
      let that = this;
      that.ruleForm.milestoneList.splice(index, 1);
      console.log(index);
    },
    //添加里程碑
    addMilepost() {
      let that = this;
      that.ruleForm.milestoneList.push({});
    },
    //选择省市区
    addressChange(arr) {
      console.log(arr);
      console.log(CodeToText[arr[0]], CodeToText[arr[1]], CodeToText[arr[2]]);
    },
    // 获取所有人员详细信息
    getAllUser() {
      this.openID = window.localStorage.getItem("openID");
      this.accessRole = window.localStorage.getItem("accessRole");
      var that = this;
      getUserAllUserDetail().then(res => {
        if (res.messageType == 0) {
          that.departmentList = res.result;
          for (let i in that.departmentList) {
            that.departmentList[i]["name"] =
              that.departmentList[i].departmentName;
            that.departmentList[i]["openID"] =
              that.departmentList[i].departmentID;
          }
          console.log(that.departmentList)
        } 
        // 部门赋值
        if (
          this.ruleForm.departmentID == "" ||
          this.ruleForm.departmentID == undefined
        ) {
          this.ruleForm.departmentID = parseInt(
            window.localStorage.getItem("departmentID")
          );
          console.log(window.localStorage.getItem("departmentID"));
        }
      });
    },
    // 切换部门人员列表时项目展示
    changeDepartment(data, index) {
      var that = this;
      that.departmentIndex = index;
      that.nowdepartmentData = data;
      that.departmentStatus = data.userName;
      var result = that.userIntentList.map(function(o) {
        o.isSubShow = false;
        return o;
      });
      that.userIntentList.forEach(i => {
        // userIntentList[i]的show属性不等于当前数据的isSubShow属性那么userIntentList[i]等于false
        if (i.isSubShow !== that.userIntentList[index].isSubShow) {
          i.isSubShow = true;
        }
      });
      data.isSubShow = !data.isSubShow;
    },
    // 切换项目列表时项目展示
    changeProject(data, index) {
      let that = this;
      that.projectIndex = index;
      that.projectName = data.projectName;
    }
  }
};
</script>

<style lang="scss" >
.viewIntentionProjectIndex {
  .bodyRight {
    .el-scrollbar__wrap {
      overflow: scroll;
      height: unset;
    }
  }
   /*弹出框样式更改*/
    .el-dialog__header{
      padding:0;
    }
    .el-dialog__body{
      padding:0;
    }
}
</style>
<style scoped lang="scss" src="@/styles/IntentionProject/index.scss">