<template>
  <div class="Body otherWebHealthList" >
    <div class="showBox">
<!--      时间标题-->
      <div class="timeTitle">
        <div class="timeTitleLfet">
          <span @click="setDay('1')"><</span>
        </div>
        <div class="timeTitleTxt">
          <a @click="$refs.picker.open()">{{showTime}}</a>
          <mt-datetime-picker
            ref="picker"
            v-model="pickerVisible"
            type="date"
            @confirm="handleConfirm"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日">
          </mt-datetime-picker>
        </div>
        <div class="timeTitleRight">
          <span @click="setDay('2')">></span>
        </div>
      </div>
<!--      人数统计-->
      <div class="peopleTotal">
        <div class="peopleTotalItem">
          <div class="peopleName">
            <span style="color: #4ca824">已上报：</span>
          </div>
          <div class="peopleNum">
            <span >{{submittedCount}}人</span>
          </div>
        </div>
        <div class="peopleTotalItem">
          <div class="peopleName">
            <span style="color: #f44e4e">未上报：</span>
          </div>
          <div class="peopleNum">
            <span >{{totalCount-submittedCount}}人</span>
          </div>
        </div>
      </div>

<!--      列表-->
      <div class="listBox">
        <div class="listTitle">
          <div class="listTitleItem">
            <span>姓名</span>
          </div>
          <div class="listTitleItem">
            <span style="width: 0.94rem">身体情况</span>
          </div>
          <div class="listTitleItem">
            <span style="width: 0.94rem">家人状况</span>
          </div>
          <div class="listTitleItem">
            <span style="width: 1.58rem">是否接触湖北籍</span>
          </div>
          <div class="listTitleItem">
            <span  style="width: 1.18rem">是否接触患者</span>
          </div>
          <div class="listTitleItem">
            <span>详情</span>
          </div>
        </div>
        <div class="listShow">

          <template  v-for="(item,index) in showlist">
            <div class="listItem">
              <div class="itemShow">
                <span>{{item.name}}</span>
              </div>
              <div class="itemShow">
                <span v-if="item.selfStatus!=''">{{item.selfStatus}}</span>
                <span v-else>-</span>
              </div>
              <div class="itemShow">
                <span v-if="item.familyStatus!=''">{{item.familyStatus}}</span>
                <span v-else>-</span>
              </div>
              <div class="itemShow">
                <span v-if="item.selfStatus==''&&item.familyStatus==''">-</span>
                <span v-else-if="item.contactHubei===true">是</span>
                <span v-else-if="item.contactHubei===false">否</span>
                <span v-else>-</span>
              </div>
              <div class="itemShow">
                <span v-if="item.selfStatus==''&&item.familyStatus==''">-</span>
                <span v-else-if="item.isContactPatient===true">是</span>
                <span v-else-if="item.isContactPatient===false">否</span>
                <span v-else>-</span>
              </div>
              <div class="itemShow">
                <a v-if="item.selfStatus==''&&item.familyStatus==''" style="color: #ddd">查看</a>
                <router-link
                  v-else
                  :to="{
                    path:'/otherWeb/healthDetail',
                     query: {id: item.iD}
                     }">查看</router-link>
              </div>
            </div>
          </template>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
    import '@/assets/js/flexible.js'
    import request from '@/utils/request2'
    import { DatetimePicker } from 'mint-ui';
    export default {
        name: "list",
        data(){
            return{
                showTime:'',
                pickerVisible:'',
                submittedCount:0,
                totalCount:0,
                showlist:[],
                lodingShow:''
            }
        },
        mounted(){
            this.init()
            this.getList()
        },
        methods:{
            // 获取列表
            getList(){
                var that=this;
                let time=that.showTime
                that.lodingShow= this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                request({
                    url: '/api/health/List',
                    method: 'get',
                    params:{
                        time:time
                    }
                }).then(res=>{
                    that.lodingShow.close();
                    if(res.messageType==0)
                    {
                        that.showlist=res.result.list
                        that.submittedCount=res.result.submittedCount;
                        that.totalCount=res.result.totalCount;
                    }else{
                        that.$message.error(res.totalCount)
                    }
                    console.log(res)
                })
            },
            setDay(setNum){
                let curDate = this.pickerVisible
                if(setNum==='1')
                {
                    var preDate = new Date(curDate.getTime() - 24*60*60*1000);
                    this.showTime=this.getNowTime(preDate)
                    this.pickerVisible=preDate

                    this.getList()
                }else if(setNum==='2')
                {
                    var nextDate  = new Date(curDate.getTime() +24*60*60*1000);
                    this.showTime=this.getNowTime(nextDate)
                    this.pickerVisible=nextDate

                    this.getList()
                }

            },
            // 初始化数据
            init(){
                let myDate = new Date();
                this.showTime=this.getNowTime(myDate)
                this.pickerVisible=this.getNowTime(myDate)
            },
            // 时间插件
            handleConfirm(val){
                // this.pickerVisible=this.getNowTime(val)
                this.showTime=this.getNowTime(val)
                this.getList()
            },
            // 获取当前填表时间
            getNowTime(myDate){

                //获取当前年
                var year = myDate.getFullYear();
                //获取当前月
                var month = myDate.getMonth() + 1;
                //获取当前日
                var date = myDate.getDate();
                //获取当前时间
                var now = year + '-' + this.conver(month) + "-" + this.conver(date);
                return now
            },

            //日期时间处理
            conver(s) {
                return s < 10 ? '0' + s : s;
            },

        }
    }
</script>

<style scoped lang="scss" src="@/styles/otherWeb/healthFebruary/list.scss">

</style>
