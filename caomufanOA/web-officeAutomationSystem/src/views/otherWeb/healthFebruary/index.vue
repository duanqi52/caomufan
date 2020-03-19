<template>
  <div id="bodyCONTENT" class="otherWebHealthFebruary">
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
                <input type="text" v-model="formData.name" placeholder="请输入姓名">
              </div>
            </div>
            <div class="listItem">
              <div class="itemName">
                <span>性别</span>
              </div>
              <div class="itemInput" >
                <el-radio v-model="formData.sex" :label="0">男</el-radio>
                <el-radio v-model="formData.sex" :label="1">女</el-radio>
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
              <div class="itemInput " >
                <input type="number" v-model="formData.age" placeholder="请输入您的年龄">
              </div>
            </div>
            <div class="listItem">
              <div class="itemName">
                <span>是否返穗</span>
              </div>
              <div class="itemInput" >
                <el-radio v-model="formData.isComeback"  :label=true >是</el-radio>
                <el-radio v-model="formData.isComeback" :label=false >否</el-radio>
              </div>
            </div>
            <div class="listItem">
              <div class="itemName">
                <span v-if="formData.isComeback===false">预计返穗时间</span>
                <span  v-else>返穗时间</span>
              </div>
              <div class="itemInput hideborder" >
                <p style="font-size: 0.48rem"  @click="$refs.picker.open()" v-if="formData.comebackTime==''">请选择返穗时间</p>
                <p style="font-size: 0.48rem" @click="$refs.picker.open()" v-else>{{formData.comebackTime}}</p>
                <mt-datetime-picker
                  v-model="dateData"
                  ref="picker"
                  type="date"
                  :startDate="startDate"
                  @confirm="setReturnDate"
                  year-format="{value} 年"
                  month-format="{value} 月"
                  date-format="{value} 日">
                </mt-datetime-picker>
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
                <mt-popup
                  style="background: #fff;width: 100%"
                  v-model="show"
                  :modal=true
                  :closeOnClickModal="true"
                  position="bottom">
                  <mt-picker
                     :slots="myAddressSlots" @change="onMyAddressChange"></mt-picker>
                </mt-popup>

                <p @click="showAddress" style="font-size: 0.52rem">{{formData.province}} {{formData.city}} {{formData.county}}</p>
              </div>
            </div>
            <div class="listItem">
              <div class="itemName">
                <span>填表当天是否回公司现场办公</span>
              </div>
              <div class="itemInput" >
                <el-radio v-model="formData.isSiteOffice"  :label=true >是</el-radio>
                <el-radio v-model="formData.isSiteOffice" :label=false >否</el-radio>
              </div>
            </div>
            <div class="listItem">
              <div class="itemName">
                <span>填表前一天是否外出（外出去人群密集区，如：超市，市场等）</span>
              </div>
              <div class="itemInput" :class="!formData.isOutside||formData.isOutside==''?'hideborder':''">
                <el-radio @change="isOutsideChange" v-model="formData.isOutside" :label=true >是</el-radio>
                <el-radio @change="isOutsideChange" v-model="formData.isOutside" :label=false >否</el-radio>
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
                <input type="text" v-model="formData.destination" placeholder="请输入外出地点">
              </div>
            </div>
            <div  v-show="formData.isOutside&&formData.isOutside!=''" class="listItem">
              <div class="itemName">
                <span>交通工具</span>
              </div>
              <div class="itemInput">
                <input type="text" v-model="formData.trafficTools" placeholder="请输入外出交通工具">
              </div>
            </div>
            <div  v-show="formData.isOutside&&formData.isOutside!=''" class="listItem">
              <div class="itemName">
                <span>是否接触湖北籍人员</span>
              </div>
              <div class="itemInput" :class="formData.isOutside&&formData.isOutside!=''?'hideborder':''">
                <el-radio v-model="formData.contactHubei" :label=true >是</el-radio>
                <el-radio v-model="formData.contactHubei" :label=false >否</el-radio>
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
                <el-radio v-model="formData.familyStatus" label="正常" >正常</el-radio>
                <el-radio v-model="formData.familyStatus" label="发热" >发热</el-radio>
                <el-radio v-model="formData.familyStatus" label="没有同居人员" >没有同居人员</el-radio>
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
                    <input  type="checkbox" v-model="formData.selfStatus" value="身体健康"/>
                    <span>身体健康</span>
                  </label>
                </div>
                <div class="checkItem">
                  <label >
                    <div class="checkItemShow">
                      <img v-if="formData.selfStatus.indexOf('咳嗽')==-1" src="@/assets/images/otherWeb/xuanze.png" alt="">
                      <img v-else src="@/assets/images/otherWeb/xuanzhong.png" alt="">
                    </div>
                    <input  type="checkbox" v-model="formData.selfStatus" value="咳嗽"/>
                    <span>咳嗽</span>
                  </label>
                </div>
                <div class="checkItem">
                  <label >
                    <div class="checkItemShow">
                      <img v-if="formData.selfStatus.indexOf('感冒')==-1" src="@/assets/images/otherWeb/xuanze.png" alt="">
                      <img v-else src="@/assets/images/otherWeb/xuanzhong.png" alt="">
                    </div>
                    <input  type="checkbox" v-model="formData.selfStatus" value="感冒"/>
                    <span>感冒</span>
                  </label>
                </div>
                <div class="checkItem">
                  <label >
                    <div class="checkItemShow">
                      <img v-if="formData.selfStatus.indexOf('发烧')==-1" src="@/assets/images/otherWeb/xuanze.png" alt="">
                      <img v-else src="@/assets/images/otherWeb/xuanzhong.png" alt="">
                    </div>
                    <input  type="checkbox" v-model="formData.selfStatus" value="发烧"/>
                    <span>发烧</span>
                  </label>
                </div>
                <div class="checkItem">
                  <label >
                    <div class="checkItemShow">
                      <img v-if="formData.selfStatus.indexOf('乏力')==-1" src="@/assets/images/otherWeb/xuanze.png" alt="">
                      <img v-else src="@/assets/images/otherWeb/xuanzhong.png" alt="">
                    </div>
                    <input  type="checkbox" v-model="formData.selfStatus" value="乏力"/>
                    <span>乏力</span>
                  </label>
                </div>
                <div class="checkItem">
                  <label >
                    <div class="checkItemShow">
                      <img v-if="formData.selfStatus.indexOf('呼吸困难')==-1" src="@/assets/images/otherWeb/xuanze.png" alt="">
                      <img v-else src="@/assets/images/otherWeb/xuanzhong.png" alt="">
                    </div>
                    <input  type="checkbox" v-model="formData.selfStatus" value="呼吸困难"/>
                    <span>呼吸困难</span>
                  </label>
                </div>
                <div class="checkItem">
                  <label >
                    <div class="checkItemShow">
                      <img v-if="formData.selfStatus.indexOf('腹泻')==-1" src="@/assets/images/otherWeb/xuanze.png" alt="">
                      <img v-else src="@/assets/images/otherWeb/xuanzhong.png" alt="">
                    </div>
                    <input  type="checkbox" v-model="formData.selfStatus" value="腹泻"/>
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
                  :label=true >是</el-radio>
                <el-radio
                  @change="formData.isHavePatient?formData.isContactPatient='':formData.isContactPatient=false"
                  v-model="formData.isHavePatient"
                  :label=false >否</el-radio>
              </div>
            </div>
            <div class="listItem" v-show="formData.isHavePatient">
              <div class="itemName">
                <span>如存在，自己家人是否接触过</span>
              </div>
              <div class="itemInput">
                <el-radio v-model="formData.isContactPatient" :label=true >是</el-radio>
                <el-radio v-model="formData.isContactPatient" :label=false >否</el-radio>
              </div>
            </div>
            <div class="listItem">
              <div class="itemName">
                <span>其他状况描述</span>
              </div>
              <div class="itemInput hideborder">
                <textarea v-model="formData.otherExplain" placeholder="请输入其他状况描述"></textarea>
              </div>
            </div>
          </div>
        </div>

        <div class="sbumit">
          <a @click="updataData">提交</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import '@/assets/js/flexible.js'
  import request from '@/utils/request2'
  import { Picker } from 'mint-ui';
  import myaddress from '../../../../static/addres.json'
  import {dateForStringDate} from '@/assets/js/public.js'
  export default {
        name: "index",
        components: {
            'mt-picker': Picker
        },
        data(){
          return{
              startDate: new Date('2020-01-01'),
              dateData:'',
              show:false,
              myAddressSlots: [
                  {
                    flex: 1,
                    defaultIndex: 18,
                    values: Object.keys(myaddress),    //省份数组
                    className: 'slot1',
                    textAlign: 'center'
                  }, {
                    divider: true,
                    content: '-',
                    className: 'slot2'
                  }, {
                    flex: 1,
                    defaultIndex: 0,
                    values:Object.keys(myaddress['广东省']),
                    className: 'slot3',
                    textAlign: 'center'
                  },{
                    divider: true,
                    content: '-',
                    className: 'slot4'
                  },{
                    flex: 1,
                    values: [],
                    className: 'slot5',
                    textAlign: 'center'
                  }
        ],
              formData:{
                  time:'',
                  name:'',
                  age:'',
                  sex:-1,
                  province:'北京市',
                  city:'市辖区',
                  county:'东城区',
                  isOutside:'',
                  destination:'',
                  trafficTools:'',
                  familyStatus:'',
                  selfStatus:[],
                  otherExplain:'',
                  contactHubei:false,
                  isHavePatient:'',
                  isContactPatient:false,
                  isSiteOffice:'',
                  isComeback:'',
                  comebackTime:'',
              }
            }
        },
      created(){
          this.$nextTick(() => {
              document.querySelectorAll(".picker-items").forEach(el => {
                  el.addEventListener('touchmove',function(e) {
                      e.preventDefault()
                  }, false);
              })
          })
      },
        mounted() {
            this.getUserData()
            this.$nextTick(() => {  //vue里面全部加载好了再执行的函数   （类似于setTimeout）
                // this.myAddressSlots[0].defaultIndex = 0
                // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
                //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
            });

        },
        methods:{
            setReturnDate(val){
                this.formData.comebackTime=dateForStringDate(val)
                this.dateData=val;
                console.log(val)
            },
            // 是否外出的改变时
            isOutsideChange(){
                if(this.formData.isOutside)
                {
                    this.formData.contactHubei=''

                }else{
                    this.formData.destination=''
                    this.formData.trafficTools=''
                    this.formData.contactHubei=false
                }


            },
            // 显示地区弹窗
            showAddress(){
                this.show=true;
                console.log(this.myAddressSlots[4])
                if(this.myAddressSlots[4].values.length==0)
                {
                    this.$nextTick(() => {  //vue里面全部加载好了再执行的函数   （类似于setTimeout）
                        this.myAddressSlots[4].values=myaddress['广东省']['广州市']
                    });
                    this.myAddressSlots[4].values=myaddress['广东省']['广州市']
                    // console.log(this.myAddressSlots[4])
                }
            },
            // 地区的判断
            onMyAddressChange(picker, values) {
                if(myaddress[values[0]]){    //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
                    picker.setSlotValues(1,Object.keys(myaddress[values[0]])); //  Object.keys()会返回一个数组，当前省的数组
                    picker.setSlotValues(2,myaddress[values[0]][values[1]]); //  区/县数据就是一个数组

                    console.log(values)
                    if(values[1]!=undefined&&values[2]===undefined)
                    {
                        this.formData.province = values[0];
                        this.formData.city =values[1];
                        this.formData.county = '';
                    }
                    else if(values[1]===undefined||values[2]===undefined)
                    {
                        this.formData.province = values[0];
                        this.formData.city = '';
                        this.formData.county = '';
                    }else{
                        this.formData.province = values[0];
                        this.formData.city = values[1];
                        this.formData.county = values[2];
                    }

                }
            },
            // 获取用户信息
            getUserData(){
                var that=this

                let time=window.localStorage.getItem('time')
                if(time!=null)
                {
                    let oldTime=time.slice( 0,time.indexOf(' '))
                    var d = new Date();
                    var y = d.getFullYear(); // 年
                    var m = d.getMonth() + 1; // 月份从0开始的
                    var d = d.getDate(); //日
                    // 如果缓存的时间与当前日期想的等
                    if(oldTime == (y + '-' + this.conver(m) + '-' + this.conver(d)))
                    {
                        this.formData.province= window.localStorage.getItem('province')

                        // this.myAddressSlots[0].defaultIndex=this.formData.province
                        this.formData.city= window.localStorage.getItem('city')
                        this.formData.county= window.localStorage.getItem('county')
                        this.formData.isOutside= window.localStorage.getItem('isOutside')
                        this.formData.destination= window.localStorage.getItem('destination')
                        this.formData.trafficTools= window.localStorage.getItem('trafficTools')
                        this.formData.familyStatus= window.localStorage.getItem('familyStatus')
                        this.formData.selfStatus= window.localStorage.getItem('selfStatus')
                        this.formData.otherExplain= window.localStorage.getItem('otherExplain')
                        let contactHubei=window.localStorage.getItem('contactHubei')
                        if(contactHubei=='false')
                        {
                            that.formData.contactHubei=false
                        }else if(contactHubei=='true'){
                            that.formData.contactHubei=true
                        }
                        let isOutside=window.localStorage.getItem('isOutside')
                        if(isOutside=='false')
                        {
                            that.formData.isOutside=false
                        }else if(isOutside=='true'){
                            that.formData.isOutside=true
                        }
                        let isHavePatient= window.localStorage.getItem('isHavePatient')
                        if(isHavePatient=='false')
                        {
                            that.formData.isHavePatient=false
                        }else if(isHavePatient=='true'){
                            that.formData.isHavePatient=true
                        }

                        let isContactPatient= window.localStorage.getItem('isContactPatient')
                        if(isContactPatient=='false')
                        {
                            that.formData.isContactPatient=false
                        }else if(isContactPatient=='true'){
                            that.formData.isContactPatient=true
                        }

                        let isSiteOffice= window.localStorage.getItem('isSiteOffice')
                        if(isSiteOffice=='false')
                        {
                            that.formData.isSiteOffice=false
                        }else if(isSiteOffice=='true'){
                            that.formData.isSiteOffice=true
                        }

                        let selfStatus=window.localStorage.getItem('selfStatus')
                        if(selfStatus=='')
                        {
                            that.formData.selfStatus=[]
                        }else{
                            that.formData.selfStatus=selfStatus.split(",")
                        }

                        // this.formData.contactHubei=
                    }
                }

                console.log(1)
                this.getNowTime()
                let name=window.localStorage.getItem('name')
                let age=window.localStorage.getItem('age')
                let sex=window.localStorage.getItem('sex')
                let comebackTime=window.localStorage.getItem('comebackTime')
                let isComeback=window.localStorage.getItem('isComeback')
                if(isComeback=='false')
                {
                    that.formData.isComeback=false
                }else if(isComeback=='true'){
                    that.formData.isComeback=true
                }
                if(name!=null){
                    this.formData.name=name
                }
                if(age!=null){
                    this.formData.age=parseInt(age)
                }
                if(sex!=null){
                    this.formData.sex=parseInt(sex)
                }
                if(comebackTime!=null){
                    this.formData.comebackTime=comebackTime
                    this.dateData=new Date(comebackTime)
                }
            },
            // 获取当前填表时间
           getNowTime(){
               var myDate = new Date();
               //获取当前年
               var year = myDate.getFullYear();
               //获取当前月
               var month = myDate.getMonth() + 1;
               //获取当前日
               var date = myDate.getDate();
               var h = myDate.getHours(); //获取当前小时数(0-23)
               var m = myDate.getMinutes(); //获取当前分钟数(0-59)
               var s = myDate.getSeconds();
               //获取当前时间
               var now = year + '-' + this.conver(month) + "-" + this.conver(date) + " " + this.conver(h) + ':' + this.conver(m) + ":" + this.conver(s);
               this.formData.time=now
           },

            //日期时间处理
            conver(s) {
                  return s < 10 ? '0' + s : s;
              },
            // 设置缓存
            setlocalStorageNow(){
                var that=this


                window.localStorage.setItem('time',that.formData.time)
                window.localStorage.setItem('name',that.formData.name)
                window.localStorage.setItem('age',that.formData.age)
                window.localStorage.setItem('sex',that.formData.sex)
                window.localStorage.setItem('province',that.formData.province)
                window.localStorage.setItem('city',that.formData.city)
                window.localStorage.setItem('county',that.formData.county)
                window.localStorage.setItem('isOutside',that.formData.isOutside)
                window.localStorage.setItem('destination',that.formData.destination)
                window.localStorage.setItem('trafficTools',that.formData.trafficTools)
                window.localStorage.setItem('familyStatus',that.formData.familyStatus)
                window.localStorage.setItem('selfStatus',that.formData.selfStatus)
                window.localStorage.setItem('otherExplain',that.formData.otherExplain)
                window.localStorage.setItem('contactHubei',that.formData.contactHubei)
                window.localStorage.setItem('isHavePatient',that.formData.isHavePatient)
                window.localStorage.setItem('isContactPatient',that.formData.isContactPatient)
                window.localStorage.setItem('isSiteOffice',that.formData.isSiteOffice)
                window.localStorage.setItem('isComeback',that.formData.isComeback)
                window.localStorage.setItem('comebackTime',that.formData.comebackTime)
            },
            // 提交数据
            updataData(){
                var that=this
                var data=that.formData
                if(data.name==='')
                {
                    that.$message.error('你未填写姓名')
                }else if(data.sex===''||data.sex===-1)
                {
                    that.$message.error('你未填写性别')
                }else if(data.age==='')
                {
                    that.$message.error('你未填写年龄')
                }else if(data.isComeback==='')
                {
                    that.$message.error('你未填写是否返穗')
                }else if(data.comebackTime==='')
                {
                    that.$message.error('你未填写返穗时间')
                }else if(data.province==='')
                {
                    that.$message.error('你未填写当前所在省份')
                }else if(data.city===''||data.city==undefined)
                {
                    that.$message.error('你未填写当前所在城市')
                }
                else if(data.county===''||data.county==undefined)
                {
                    that.$message.error('你未填写当前所在县区')
                }else if(data.isSiteOffice==='')
                {
                    that.$message.error('你未填写填表当天是否回公司现场办公')
                }else if(data.isOutside==='')
                {
                    that.$message.error('你未填写填表前一天是否外出')
                }else if(data.isOutside==true&&data.destination==='')
                {
                    that.$message.error('你未填写外出地点')
                }else if(data.isOutside==true&&data.trafficTools==='')
                {
                    that.$message.error('你未填写外出交通工具')
                }else if(data.isOutside==true&&data.contactHubei==='')
                {
                    that.$message.error('你未填是否接触湖北籍人员')
                }
                else if(data.familyStatus==='')
                {
                    console.log(data.familyStatus)
                    that.$message.error('你未填写家人身体状况')
                }else if(data.selfStatus.toString()=='')
                {
                    that.$message.error('你未填写自己身体状况')
                }else if(data.isHavePatient===''||data.isHavePatient==null)
                {
                    that.$message.error('你未填写所在小区或社区是否存在疑似患者或确诊者')
                }else if(data.isHavePatient==true&&(data.isContactPatient===''||data.isContactPatient===null))
                {
                    that.$message.error('你未填如存在自己家人是否接触过')
                }else{
                    data.age=parseInt(data.age);
                    data.sex=parseInt(data.sex);
                    data.selfStatus=data.selfStatus.toString();
                    that.setlocalStorageNow()
                    request({
                        url: '/api/health',
                        method: 'post',
                        data
                    }).then(res=>{
                        if(res.messageType==0)
                        {
                            that.setlocalStorageNow()
                                that.$message.success('填写成功')
                            console.log(that.formData)

                        }else  if(res.messageType==1)
                        {
                            that.$message.warning(res.message)
                        }else{
                            that.$message.error(res.message)
                        }

                        if(that.formData=='')
                        {
                            that.formData.selfStatus=[]
                        }else{
                            that.formData.selfStatus=that.formData.selfStatus.split(",")
                        }
                    })
                }


                // console.log(that.formData)
            }
        }
    }
</script>
<style lang="scss" >
  .otherWebHealthFebruary{
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

<style lang="scss" scoped>

.hideborder{
  border: 0!important;
}

.moduleShowBody{
  width: 9.34rem;
  margin: 0 auto;
  .moduleListShow{
    .moduleItem{
      margin: 0.5rem 0px 0 0;
      border-bottom:2px solid #4ca824;
      .moduleTitle{
        line-height: 1rem;
        color: #4ca824;
        font-size: 0.52rem;
        img{
          margin-top: -0.1rem;
          width: 0.52rem;
          vertical-align:middle;
        }
      }
      .moduleList {
      }
        .listItem{
          padding: 0.4rem 0;
          .itemName{
           width: 100%;
            padding: 0.11rem 0;
            font-size: 0.52rem;
            color: #313233;
          }
          .itemInput{
            position: relative;
            padding: 0 0 0.43rem 0;
            border-bottom: 1px solid #ddd;
            color: #8a8a8a;
            input[type='text']{
              width: 100%;
              font-size: 0.48rem;
              color: #8a8a8a;
            }
            input[type='number']{
              width: 100%;
              font-size: 0.48rem;
              color: #8a8a8a;
            }
            textarea{
              width: 100%;
              font-size: 0.48rem;
              height: 1.44rem;
              padding: 0.2rem 0;
              color: #8a8a8a;
              /*background: #f9f9f9;*/
            }
            span{
              font-size: 0.48rem;
              color: #8a8a8a;
            }
            select{
              color: #8a8a8a;
              position: absolute;
              top: 0;
              left: 0;
              opacity: 0;
              width: 100%;
              font-size: 0.48rem;
              border: 0;
              line-height: 0.52rem;
              background:#fff;
            }
            .checkItem{
              width: 100%;
              border-bottom: 1px solid #ddd;
              padding: 0.2rem 0;
              label{
                font-size: 0.48rem;
                display: flex;
                position: relative;
                .checkItemShow{
                  margin-right: 0.1rem;
                  img{
                    width: 0.42rem;
                  }
                }
                input[type=checkbox]{
                  display: none;
                  left: 0;
                  width: 0.62rem;
                }
              }
            }
            .inputShowIcon{
              img{
                margin-top: 0.25rem;
                width: 0.42rem;
                vertical-align: center;
              }
            }
          }
        }

    }
  }
  .sbumit{
    padding: 0.6rem 0 0.6rem 0;
   a{
     display: inline-block;
     width: 100%;
     background: #4ca824;
     color: #fff;
     height: 1.2rem;
     line-height: 1.2rem;
     text-align: center;
     font-size: 0.48rem;
   }
  }

}
</style>
