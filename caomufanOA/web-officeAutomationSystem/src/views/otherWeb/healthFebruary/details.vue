<template>
  <div id="bodyCONTENT" class="otherWebHealthDetails">
    <div class="moduleShowBody">
      <div class="moduleListShow">
        <!--        第一个模块-----基本信息-->
        <div class="moduleItem">
          <div class="listItem">
            <div class="itemName">
              <span>填表时间</span>
            </div>
            <div class="itemInput">
              <p style="color: #f56c6c;font-size: 0.3rem">15点后填报不加入当天统计,请大家15点前填报信息</p>
              <span>{{formData.time}}</span>
              <!--              <input disabled="true" type="text" v-model="formData.time" placeholder="请输入填表时间">-->
            </div>
          </div>
          <div class="moduleTitle">
            <img src="@/assets/images/otherWeb/icon1.png">
            <span>基本信息</span>
          </div>
          <div class="moduleList">
            <div class="listItem">
              <div class="itemName">
                <span>姓名</span>
              </div>
              <div class="itemInput">
                <input disabled type="text" v-model="formData.name" placeholder="请输入姓名">
              </div>
            </div>
            <div class="listItem">
              <div class="itemName">
                <span>性别</span>
              </div>
              <div class="itemInput" >
                <el-radio disabled v-model="formData.sex" :label="0">男</el-radio>
                <el-radio disabled v-model="formData.sex" :label="1">女</el-radio>
                <!--                <div class="inputShowText">-->
                <!--                  <span v-if="formData.sex==0">男</span>-->
                <!--                  <span v-if="formData.sex==1">女</span>-->
                <!--                </div>-->
                <!--                <div class="inputShowIcon">-->
                <!--                  <img src="@/assets/images/otherWeb/xiala.png" alt="">-->
                <!--                </div>-->
                <!--                <select  name="public-choice" v-model="formData.sex" >-->
                <!--                  <option :value=0  >男</option>-->
                <!--                  <option :value=1  >女</option>-->
                <!--                </select>-->
              </div>
            </div>
            <div class="listItem">
              <div class="itemName">
                <span>年龄</span>
              </div>
              <div class="itemInput hideborder" >
                <input disabled="true" type="number" v-model="formData.age" placeholder="请输入您的年龄">
              </div>
            </div>
            <div class="listItem">
              <div class="itemName">
                <span>是否返穗</span>
              </div>
              <div class="itemInput" >
                <el-radio disabled v-model="formData.isComeback"  :label=true >是</el-radio>
                <el-radio disabled v-model="formData.isComeback" :label=false >否</el-radio>
              </div>
            </div>
            <div class="listItem">
              <div class="itemName">
                <span v-if="formData.isComeback===false">预计返穗时间</span>
                <span  v-else>返穗时间</span>
              </div>
              <div class="itemInput hideborder" >
                <p style="font-size: 0.48rem"  v-if="formData.comebackTime===''||formData.comebackTime==null">无</p>
                <p style="font-size: 0.48rem"  v-else>{{formData.comebackTime.substring(0, 10)}}</p>
              </div>
            </div>
          </div>
        </div>

        <!--        日常信息-->
        <div class="moduleItem" >
          <div class="moduleTitle">
            <img src="@/assets/images/otherWeb/icon1.png">
            <span>日常信息</span>
          </div>
          <div class="moduleList">
            <div class="listItem">
              <div class="itemName">
                <span>目前所在地</span>
              </div>
              <div class="itemInput"  >
               <p style="font-size: 0.52rem">{{formData.province}} {{formData.city}} {{formData.county}}</p>
              </div>
            </div>
            <div class="listItem">
              <div class="itemName">
                <span>填表当天是否回公司现场办公</span>
              </div>
              <div class="itemInput" >
                <el-radio disabled v-model="formData.isSiteOffice"  :label=true >是</el-radio>
                <el-radio disabled v-model="formData.isSiteOffice" :label=false >否</el-radio>
              </div>
            </div>
            <div class="listItem">
              <div class="itemName">
                <span>填表前一天是否外出</span>
              </div>
              <div class="itemInput" :class="!formData.isOutside||formData.isOutside==''?'hideborder':''">
                <el-radio :disabled="true"  v-model="formData.isOutside" :label=true >是</el-radio>
                <el-radio :disabled="true" v-model="formData.isOutside" :label=false >否</el-radio>
                <!--                <div class="inputShowText">-->
                <!--                  <span v-if="formData.isOutside">是</span>-->
                <!--                  <span v-if="!formData.isOutside">否</span>-->
                <!--                </div>-->
                <!--                <div class="inputShowIcon">-->
                <!--                  <img src="@/assets/images/otherWeb/xiala.png" alt="">-->
                <!--                </div>-->
                <!--                <select  name="public-choice" v-model="formData.isOutside" >-->
                <!--                  <option :value=true  >是</option>-->
                <!--                  <option :value=false  >否</option>-->
                <!--                </select>-->
              </div>
            </div>
            <div v-show="formData.isOutside&&formData.isOutside!=''" class="listItem">
              <div class="itemName">
                <span>外出地点</span>
              </div>
              <div class="itemInput" >
                <input disabled="true" type="text" v-model="formData.destination" placeholder="请输入外出地点">
              </div>
            </div>
            <div  v-show="formData.isOutside&&formData.isOutside!=''" class="listItem">
              <div class="itemName">
                <span>交通工具</span>
              </div>
              <div class="itemInput">
                <input disabled="true" type="text" v-model="formData.trafficTools" placeholder="请输入外出交通工具">
              </div>
            </div>
            <div  v-show="formData.isOutside&&formData.isOutside!=''" class="listItem">
              <div class="itemName">
                <span>是否接触湖北籍人员</span>
              </div>
              <div class="itemInput" :class="formData.isOutside&&formData.isOutside!=''?'hideborder':''">
                <el-radio :disabled="true" v-model="formData.contactHubei" :label=true >是</el-radio>
                <el-radio :disabled="true" v-model="formData.contactHubei" :label=false >否</el-radio>
                <!--                <div class="inputShowText">-->
                <!--                  <span v-if="formData.contactHubei">是</span>-->
                <!--                  <span v-if="!formData.contactHubei">否</span>-->
                <!--                </div>-->
                <!--                <div class="inputShowIcon">-->
                <!--                  <img src="@/assets/images/otherWeb/xiala.png" alt="">-->
                <!--                </div>-->
                <!--                <select  name="public-choice" v-model="formData.contactHubei" >-->
                <!--                  <option :value=true  >是</option>-->
                <!--                  <option :value=false >否</option>-->
                <!--                </select>-->
              </div>
            </div>
          </div>
        </div>

        <!--        健康状况-->
        <div class="moduleItem">
          <div class="moduleTitle">
            <img src="@/assets/images/otherWeb/icon1.png">
            <span>健康状况</span>
          </div>
          <div class="moduleList">
            <div class="listItem">
              <div class="itemName">
                <span>同居人员状况</span>
              </div>
              <div class="itemInput">
                <el-radio :disabled="true" v-model="formData.familyStatus" label="正常" >正常</el-radio>
                <el-radio :disabled="true" v-model="formData.familyStatus" label="发热" >发热</el-radio>
                <el-radio :disabled="true" v-model="formData.familyStatus" label="没有同居人员" >没有同居人员</el-radio>
                <!--                <div class="inputShowText">-->
                <!--                  <span v-if="formData.familyStatus=='正常'">正常</span>-->
                <!--                  <span v-if="formData.familyStatus=='发热'">发热</span>-->
                <!--                </div>-->
                <!--                <div class="inputShowIcon">-->
                <!--                  <img src="@/assets/images/otherWeb/xiala.png" alt="">-->
                <!--                </div>-->
                <!--                <select  name="public-choice" v-model="formData.familyStatus" >-->
                <!--                  <option value="正常"  >正常</option>-->
                <!--                  <option value="发热"  >发热</option>-->
                <!--                </select>-->
              </div>
            </div>
            <div class="listItem">
              <div class="itemName">
                <span>自身状况</span>
              </div>
              <div class="itemInput" style="border-bottom: 0">
                <div class="checkItem">
                  <label>
                    <div class="checkItemShow">
                      <img v-if="formData.selfStatus.indexOf('身体健康')==-1" src="@/assets/images/otherWeb/xuanze.png" alt="">
                      <img v-else src="@/assets/images/otherWeb/xuanzhong.png" alt="">
                    </div>
                    <input disabled="true"  type="checkbox" v-model="formData.selfStatus" value="身体健康"/>
                    <span>身体健康</span>
                  </label>
                </div>
                <div class="checkItem">
                  <label >
                    <div class="checkItemShow">
                      <img v-if="formData.selfStatus.indexOf('咳嗽')==-1" src="@/assets/images/otherWeb/xuanze.png" alt="">
                      <img v-else src="@/assets/images/otherWeb/xuanzhong.png" alt="">
                    </div>
                    <input disabled="true"  type="checkbox" v-model="formData.selfStatus" value="咳嗽"/>
                    <span>咳嗽</span>
                  </label>
                </div>
                <div class="checkItem">
                  <label >
                    <div class="checkItemShow">
                      <img v-if="formData.selfStatus.indexOf('感冒')==-1" src="@/assets/images/otherWeb/xuanze.png" alt="">
                      <img v-else src="@/assets/images/otherWeb/xuanzhong.png" alt="">
                    </div>
                    <input disabled="true"  type="checkbox" v-model="formData.selfStatus" value="感冒"/>
                    <span>感冒</span>
                  </label>
                </div>
                <div class="checkItem">
                  <label >
                    <div class="checkItemShow">
                      <img v-if="formData.selfStatus.indexOf('发烧')==-1" src="@/assets/images/otherWeb/xuanze.png" alt="">
                      <img v-else src="@/assets/images/otherWeb/xuanzhong.png" alt="">
                    </div>
                    <input disabled="true" type="checkbox" v-model="formData.selfStatus" value="发烧"/>
                    <span>发烧</span>
                  </label>
                </div>
                <div class="checkItem">
                  <label >
                    <div class="checkItemShow">
                      <img v-if="formData.selfStatus.indexOf('乏力')==-1" src="@/assets/images/otherWeb/xuanze.png" alt="">
                      <img v-else src="@/assets/images/otherWeb/xuanzhong.png" alt="">
                    </div>
                    <input disabled="true" type="checkbox" v-model="formData.selfStatus" value="乏力"/>
                    <span>乏力</span>
                  </label>
                </div>
                <div class="checkItem">
                  <label >
                    <div class="checkItemShow">
                      <img v-if="formData.selfStatus.indexOf('呼吸困难')==-1" src="@/assets/images/otherWeb/xuanze.png" alt="">
                      <img v-else src="@/assets/images/otherWeb/xuanzhong.png" alt="">
                    </div>
                    <input disabled="true" type="checkbox" v-model="formData.selfStatus" value="呼吸困难"/>
                    <span>呼吸困难</span>
                  </label>
                </div>
                <div class="checkItem">
                  <label >
                    <div class="checkItemShow">
                      <img v-if="formData.selfStatus.indexOf('腹泻')==-1" src="@/assets/images/otherWeb/xuanze.png" alt="">
                      <img v-else src="@/assets/images/otherWeb/xuanzhong.png" alt="">
                    </div>
                    <input disabled="true" type="checkbox" v-model="formData.selfStatus" value="腹泻"/>
                    <span>腹泻</span>
                  </label>
                </div>

              </div>
            </div>
            <div class="listItem">
              <div class="itemName">
                <span>所在小区或社区是否存在疑似患者或确诊者</span>
              </div>
              <div class="itemInput">
                <el-radio
                  @change="formData.isHavePatient?formData.isContactPatient='':formData.isContactPatient=false"
                  v-model="formData.isHavePatient"
                  :disabled="true"
                  :label=true >是</el-radio>
                <el-radio
                  @change="formData.isHavePatient?formData.isContactPatient='':formData.isContactPatient=false"
                  v-model="formData.isHavePatient"
                  :disabled="true"
                  :label=false >否</el-radio>
              </div>
            </div>
            <div class="listItem" v-show="formData.isHavePatient">
              <div class="itemName">
                <span>如存在，自己家人是否接触过</span>
              </div>
              <div class="itemInput">
                <el-radio :disabled="true" v-model="formData.isContactPatient" :label=true >是</el-radio>
                <el-radio :disabled="true" v-model="formData.isContactPatient" :label=false >否</el-radio>
              </div>
            </div>
            <div class="listItem">
              <div class="itemName">
                <span>其他状况描述</span>
              </div>
              <div class="itemInput hideborder">
                <textarea :disabled="true" v-model="formData.otherExplain" placeholder="请输入其他状况描述"></textarea>
              </div>
            </div>
          </div>
        </div>

        <div class="sbumit">
          <router-link  :to="{path:'/otherWeb/healthList'}">
            <a >返回</a>
          </router-link>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
    import '@/assets/js/flexible.js'
    import request from '@/utils/request2'
    export default {
        name: "detail",
        data(){
            return{
                id:'',
                formData:{
                    selfStatus:[],
                    comebackTime:''
                }
            }
        },
        mounted(){
            this.id=this.$route.query.id;
            this.getdetail();
            console.log(this.$route.query)
        },
        methods:{
            getdetail(){
                var that=this;
                let id=that.id
                request({
                    url: '/api/health/detail',
                    method: 'get',
                    params:{
                        id:id
                    }
                }).then(res=>{
                    if(res.messageType==0)
                    {
                        this.formData=res.result
                        this.formData.time = this.formData.time.replace('T', ' ');
                        // that.showlist=res.result.list
                        // that.submittedCount=res.result.submittedCount;
                        // that.totalCount=res.result.totalCount;
                    }else{
                        that.$message.error(res.totalCount)
                    }
                    console.log(res)
                })
            }
        }
    }
</script>
<style lang="scss" >
  .otherWebHealthDetails{
    .el-radio{
      font-size: 0.48rem;
      .el-radio__inner{
        width: 0.32rem;
        height: 0.32rem;
      }
      .el-radio__inner::after{
        width: 0.12rem;
        height: 0.12rem;
      }
      .el-radio__label{
        font-size: 0.48rem;
        color: #8a8a8a;
      }
    }
  }

</style>
<style scoped lang="scss" src="@/styles/otherWeb/healthFebruary/details.scss">

</style>
