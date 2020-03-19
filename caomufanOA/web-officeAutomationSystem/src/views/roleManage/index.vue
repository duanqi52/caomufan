<template>
  <div class="bodyShow viewsroleManageindex">
    <div class="bodyBox">
      <div class="topShow">
        <topTitle
          style="width: 100%"
          :returnPath="returnPath"
          :showTitle="showTitle">
        </topTitle>
      </div>
      <div class="contentBody">
        <el-scrollbar  style="height: 100%">

        <div class="BodyBox">
          <div class="companyTitle">
            <div class="companyName">
              <img style="width: 25px;height: 25px" src="@/assets/images/icon.png" alt="1">
              <span>广州草木蕃环境科技有限公司</span>

            </div>
            <div class="companyBtnBox" >
              <div class="companyBtn" v-show="!delPeopleStatus">
                <a @click="delPeopleStatus=true"><i class="iconfont icon-shanchu"></i>删除</a>
              </div>
              <div class="companyBtn" v-show="delPeopleStatus">
                <a @click="delPeopleStatus=false"><i class="iconfont icon-tijiao"></i>完成</a>
              </div>
            </div>

          </div>
          <div class="BodyShow">
            <div class="bodyshowMargin"></div>
            <div class="bodyshowList">
              <div
                v-for="(item,index) in listData"
                class="roleItem"
                :class="[item.roleName=='总经理'||item.roleName=='财务负责人'||item.roleName=='出纳'||item.roleName=='会计'?'smallItem':'longItem']">
                <div class="roleTitle">
                  <span>{{item.roleName}}</span>
                </div>
                <div class="rolePeopleList">
                  <template v-for="(itemL,indexL) in item.users">
                    <div v-if="item.roleName!='部门分管领导'&&item.roleName!='部门负责人'" class="rolePeopleItem">
                      <div class="peopelItemBox">
                        <div class="peopelTitle">
                          <img src="@/assets/images/roleManage/title4.png" alt="">
                          <div class="titleList">
                            <div v-if="item.roleName.length<4" class="titleItem titileItem1">
                              <span>{{item.roleName}}</span>
                            </div>
                            <div v-else-if="item.roleName.length>3" class="titleItem titileItem2">
                              <p>{{item.roleName.slice(0,2)}}</p>
                              <p>{{item.roleName.slice(2,10)}}</p>
                            </div>
                          </div>
                        </div>
                        <div v-show="delPeopleStatus" class="peopelDel">
                          <img @click="deletePeople(itemL,item.roleID,0)" src="@/assets/images/addressBook/delPeople.png" alt="">
                        </div>
                        <div  class="peopleImg">
                          <el-avatar class="peopleImgShow" :size="65" :src="itemL.avatarUrl"></el-avatar>
                        </div>
                        <div class="peolpleData">
                          <div class="peopleTop">
                            <div class="peopleDataItem">
                              <div class="peopleDataName">姓名</div>
                              <div class="peopleDataInput">
                                <span>{{itemL.realName}}</span>
                              </div>
                            </div>
                            <div class="peopleDataItem">
                              <div class="peopleDataName">电话</div>
                              <div class="peopleDataInput" style="color: #4ca824">{{itemL.mobilePhone}}</div>
                            </div>
                          </div>
                          <div class="peopleBottom">
                            <div class="peopleDataItem">
                              <div class="peopleDataName">部门</div>
                              <div class="peopleDataInput">{{itemL.departmentName}}</div>
                            </div>
                            <div class="peopleDataItem">
                              <div class="peopleDataName">职位</div>
                              <div class="peopleDataInput">{{itemL.position}}</div>
                            </div>
                            <div class="peopleDataItem">
                              <div class="peopleDataName">邮箱</div>
                              <div class="peopleDataInput">{{itemL.email}}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--                  部门分管领导'  '部门负责人  加载部分-->
                    <template v-else v-for="itemLD in itemL.departments">
                      <div  class="rolePeopleItem">
                        <div class="peopleTitle"><!--   管理部门-->
                          <img src="@/assets/images/roleManage/departmentTitle.png" alt="">
                          <div class="peopleTitleTxt">
                            <span>{{itemLD.departmentName}}</span>
                          </div>
                        </div>
                        <div class="peopelItemBox">
                          <div class="peopelTitle">
                            <img src="@/assets/images/roleManage/title4.png" alt="">
                            <div class="titleList">
                              <div v-if="item.roleName.length<4" class="titleItem titileItem1">
                                <span>{{item.roleName}}</span>
                              </div>
                              <div v-else-if="item.roleName.length>3" class="titleItem titileItem2">
                                <p>{{item.roleName.slice(0,2)}}</p>
                                <p>{{item.roleName.slice(2,10)}}</p>
                              </div>
                            </div>
                          </div>
                          <div v-show="delPeopleStatus" class="peopelDel">
                            <img @click="deletePeople(itemL,item.roleID,itemLD.departmentID)" src="@/assets/images/addressBook/delPeople.png" alt="">
                          </div>
                          <div  class="peopleImg">
                            <el-avatar class="peopleImgShow" :size="65" :src="itemL.avatarUrl"></el-avatar>
                          </div>
                          <div class="peolpleData">
                            <div class="peopleTop">
                              <div class="peopleDataItem">
                                <div class="peopleDataName">姓名</div>
                                <div class="peopleDataInput">
                                  <span>{{itemL.realName}}</span>
                                </div>
                              </div>
                              <div class="peopleDataItem">
                                <div class="peopleDataName">电话</div>
                                <div class="peopleDataInput" style="color: #4ca824">{{itemL.mobile}}</div>
                              </div>
                            </div>
                            <div class="peopleBottom">
                              <div class="peopleDataItem">
                                <div class="peopleDataName">部门</div>
                                <div class="peopleDataInput">{{itemL.departmentName}}</div>
                              </div>
                              <div class="peopleDataItem">
                                <div class="peopleDataName">职位</div>
                                <div class="peopleDataInput">{{itemL.position}}</div>
                              </div>
                              <div class="peopleDataItem">
                                <div class="peopleDataName">邮箱</div>
                                <div class="peopleDataInput">{{itemL.email}}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>

                  </template>
                  <div v-if="(item.roleName=='总经理'||item.roleName=='财务负责人'||item.roleName=='出纳'||item.roleName=='会计')&&(item.users.length>0)"
                       class="rolePeopleAddItem" style="display: none" >
                    <div class="addRolePeople" @click="showAddDialog(item)">
                      <i class="iconfont icon-zeng">2</i>
                    </div>
                  </div>
                  <div v-else
                       class="rolePeopleAddItem">
                    <div class="addRolePeople" @click="showAddDialog(item)">
                      <i class="iconfont icon-zeng"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bodyshowMargin"></div>

          </div>

        </div>


        </el-scrollbar >
      </div>
    </div>

<!--    <addDepartmentCharge-->
<!--    v-if="addDepartmentChargeStatus"-->
<!--    :addDepartmentChargeVisible.sync="addDepartmentChargeStatus"-->
<!--    :roleId="nowRoleID"-->
<!--    :roleName="nowRoleName"-->
<!--    >-->
<!--    </addDepartmentCharge>-->

    <addDepartmentBoss
      v-if="addDepartmentBossVisible"
      :roleData="nowRoleData"
      @refreshNowPage="getListShow"
      :addDepartmentBossVisible.sync="addDepartmentBossVisible"
    >
    </addDepartmentBoss>
  </div>
</template>

<script>
    import {getRoleUser,deleteRoleUser} from '@/api/views/roleManage/roleManage.js'
    import topTitle from '@/components/Top/topTitle.vue'
    import addDepartmentCharge from '@/components/roleManage/addDepartmentCharge.vue'
    import addDepartmentBoss from '@/components/roleManage/addDepartmentBoss.vue'
    export default {
        name: "index",
        data(){
            return{
                showTitle:'角色管理',
                returnPath:'/',
                delPeopleStatus:false,//删除图标按钮展示状态
                addDepartmentChargeStatus:false,//添加部门分管领导弹窗状态
                addDepartmentBossVisible:false,//添加部门负责人弹窗状态
                nowData:{},
                nowRoleID:'',//当前选中角色ID
                nowRoleName:'',//当前选中角色名称
                listData:[
                    // {
                    //     name:'部门分管领导',
                    //     list:[
                    //         {
                    //             name:'练习生',
                    //             tel:'+86-15236214155',
                    //             department:'综合办',
                    //             position:'总经理',
                    //             email:'las@caomufan.com',
                    //             img:'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3333145089,190536566&fm=26&gp=0.jpg',
                    //             title:'部门分管领导',
                    //             positionList:['恭喜发财部','身体健康部','恭喜发财部','身体健康部']
                    //         },
                    //     ]
                    // },
                ],
            }
        },
        mounted(){
            this.getListShow()
        },
        methods:{
            // 获取列表
            getListShow(){
                console.log(1)
                getRoleUser().then(res=>{
                    if(res.messageType==0)
                    {
                        let newL=res.result.roles
                        let lzong=[]
                        let lcai=[]
                        let lother=[]
                        let newshowL=[]
                        for(let i in newL)
                        {
                            if(newL[i].roleName=='总经理')
                            {
                                lzong.push(newL[i])
                            }
                            else if(newL[i].roleName=='财务负责人')
                            {
                                lcai.push(newL[i])
                            }else{
                                lother.push(newL[i])
                            }
                        }
                        newshowL=lzong.concat(lcai).concat(lother)
                        this.listData=newshowL
                    }
                    console.log(res)
                })
            },
            // 展示添加弹窗
            showAddDialog(data){
              var that=this;
              that.nowRoleData=data
              // if(name=='部门分管领导')
              // {
              //     that.addDepartmentChargeStatus=true
              // }else{
                  that.addDepartmentBossVisible=true
              // }

            },
            //删除员工
            deletePeople(data,roldID,departmentID){
                var that=this
                console.log(data,roldID,departmentID)
                this.$confirm('此操作将删除该员工, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ud={
                        openID:data.openID,
                        roleID:roldID,
                        departmentID:departmentID
                    };
                    deleteRoleUser(ud).then(res=>{
                        if(res.messageType==0)
                        {
                            that.$message.success('删除成功')
                            that.getListShow()
                        }else{
                            that.$message.error(res.message)
                        }
                    })
                }).catch(() => {

                });
            }
        },
        components:{
            'topTitle':topTitle,
            'addDepartmentCharge':addDepartmentCharge,
            'addDepartmentBoss':addDepartmentBoss
        }
    }
</script>
<style lang="scss">
  .viewsroleManageindex{
    /*弹出框样式更改*/
    .el-dialog__header{
      padding:0;
    }
    .el-dialog__body{
      padding:0;
    }
  }

</style>

<style scoped lang="scss" src="@/styles/roleManage/index.scss">

</style>
