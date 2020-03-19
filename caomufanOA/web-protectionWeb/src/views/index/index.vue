<template>
  <div id="ShowBody" class='ShowBody'>
<!--    头部-->
    <div class="TopShow">
      <div class="TopLogo">
        <img src="@/assets/img/index/Logo.png" alt="logo展示">
      </div>
      <div class="TopData">
        <div :hidden="!userInfo.isLogin" class="TopAvatar">
          <el-avatar class="TopAvatarImg" size="large" :src="userInfo.header"></el-avatar>
        </div>
        <div class="TopLogin">
          <div :hidden="!userInfo.isLogin" class="LoginName">{{userInfo.nickName}}</div>
         <div :hidden="!userInfo.isLogin" class="LoginBtn">
           <el-button type="text" @click="signOutLogin()">退出登录</el-button>
         </div>
          <div :hidden="userInfo.isLogin" class="LoginBtn">
            <el-button type="text" @click="loginDialogVisible=true">请登录</el-button>
          </div>
        </div>
      </div>
    </div>

<!--    下半部份-->
    <div class="BottomShow">
<!--      左上角浮动的搜索框-->
      <div class="contentSearch">
        <div class="conSearchShow" title="广州香江野生动物园">
          <div class="conSearchInput">
            <input
              @input="associateList()"
              @keydown.enter="goSearch(currentIndex)"
              @keydown.down="selectResultItem('down')"
              @keydown.up="selectResultItem('up')"
              @blur="bindSourceStatus = false"
              @focus="associateList()"
              v-model="addressActiveStatus"
              type="text"
              placeholder="请输入并选择保护地">
          </div>
          <div class="sconSearchIcom" @click="goNowProtect()">
            <i class="iconfont icon-dingwei" ></i>
          </div>
        </div>

        <div class="searchSourceBox" >
          <ul v-show="bindSourceStatus||isMouseOnSerchBox" @mouseenter="isMouseOnSerchBox = true" @mouseleave="isMouseOnSerchBox = false" >
            <li v-for="(item,index) in bindSource"
              :key="index"
              :class="currentIndex==index?'active':''"
              @click="goSearch(index)"
              :title="item.unitName">
              {{item.unitName}}
            </li>
          </ul>
        </div>
      </div>

<!--      左边的地区选择列表-->
      <div  class="bottomLeft" :class="leftStatus?'hiddenNow':''" ref="bottomLeft">
        <div class="bottomLeftBox" >
          <div class="searchInput" ref="searchInput">

          </div>
          <div class="searchRaduio" ref="searchRaduio">
            <el-radio-group v-model="topographyVal"  fill="red"   size="mini">
              <el-radio  label="0"><label style="color: #fff">保护区</label></el-radio>
              <el-radio label="1"><label style="color: #fff">湿地公园</label></el-radio>
            </el-radio-group>
          </div>
          <div class="searchList" ref="searchList"  :style="'height:'+searchList_H+'px'" >
            <div class="searchListBox">
              <el-collapse v-model="cittyActiveStatus"  accordion>
                <el-collapse-item v-for="(item,index) in listDataCitty.filter(item => item.type == topographyVal)"  :name="item.city" :key="index">
                    <template slot="title">
                      <label class="topographyTitle" >{{item.city}}</label>
                    </template>
                    <div class="topographyList"  >
                      <div
                        class="topographyItem"
                        @click="addressChange(chilItem.unitName,chilItem.unitID)"
                        :class="chilItem.unitName==addressActiveStatus?'active':''"
                        v-for="(chilItem,chilIndex) in item.list"
                        :key="chilIndex"
                        :title="chilItem.unitName">
                        <span></span>
                        <i style="color: #64a831">—</i>
                        {{chilItem.unitName}}
                      </div>
                    </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>
        </div>
        <div class="leftBtn">
          <img :hidden="leftStatus"  @click="leftStatus=true" src="@/assets/img/index/hiden.png" alt="">
          <img :hidden="!leftStatus"  @click="leftStatus=false" src="@/assets/img/index/show.png" alt="">
        </div>
      </div>

      <div class="bottomRight">
        <div class="mapBox">
          <div id="all-map" class="map" ></div>
          <!--    地图样式按钮-->
          <div class="mapClass">
            <transition name="draw">  <!--这里的name 和 css 类名第一个字段要一样-->
              <div class="mapClassList" v-show="btnListHiddenStatus">
                <div
                  class="mapBtnBox"
                  @click="btnData.infCamera.activeStatus==3?'':mapClassBtn(btnData.infCamera)"
                  :class="{active:btnData.infCamera.activeStatus==2,noclick:btnData.infCamera.activeStatus==3}">
                  <div class="mapBtn">
                    <i class="iconfont " :class="btnData.infCamera.iconClass"></i>
                    <div>{{btnData.infCamera.name}}</div>
                  </div>
                </div>
                <div
                  class="mapBtnBox"
                  @click="btnData.point.activeStatus==3?'':mapClassBtn(btnData.point)"
                  :class="{active:btnData.point.activeStatus==2,noclick:btnData.point.activeStatus==3}">
                  <div class="mapBtn">
                    <i class="iconfont " :class="btnData.point.iconClass"></i>
                    <div>{{btnData.point.name}}</div>
                  </div>
                </div>
                <div
                  class="mapBtnBox"
                  @click="btnData.samplePlot.activeStatus==3?'':mapClassBtn(btnData.samplePlot)"
                  :class="{active:btnData.samplePlot.activeStatus==2,noclick:btnData.samplePlot.activeStatus==3}">
                  <div class="mapBtn">
                    <i class="iconfont " :class="btnData.samplePlot.iconClass"></i>
                    <div>{{btnData.samplePlot.name}}</div>
                  </div>
                </div>
                <div
                  class="mapBtnBox"
                  @click="btnData.sampleLine.activeStatus==3?'':mapClassBtn(btnData.sampleLine)"
                  :class="{active:btnData.sampleLine.activeStatus==2,noclick:btnData.sampleLine.activeStatus==3}">
                  <div class="mapBtn">
                    <i class="iconfont " :class="btnData.sampleLine.iconClass"></i>
                    <div>{{btnData.sampleLine.name}}</div>
                  </div>
                </div>
                <div
                  class="mapBtnBox"
                  @click="btnData.class.activeStatus==3?'':mapClassBtn(btnData.class)"
                  :class="{active:btnData.class.activeStatus==2,noclick:btnData.class.activeStatus==3}">
                  <div class="mapBtn">
                    <i class="iconfont " :class="btnData.class.iconClass"></i>
                    <div>{{btnData.class.name}}</div>
                  </div>
                </div>
                <div
                  class="mapBtnBox"
                  @click="btnData.function.activeStatus==3?'':mapClassBtn(btnData.function)"
                  :class="{active:btnData.function.activeStatus==2,noclick:btnData.function.activeStatus==3}">
                  <div class="mapBtn">
                    <i class="iconfont " :class="btnData.function.iconClass"></i>
                    <div>{{btnData.function.name}}</div>
                  </div>
                </div>
              </div>
            </transition>

            <div class="mapBtnBox" @click="hiddenCheck" v-show="btnHiddenStatus" style=" border-bottom-left-radius: 0.2rem;border-bottom-right-radius: 0.2rem;">
              <div class="mapBtn">
                <i class="iconfont icon-shouqi"></i>
                <div>收起</div>
              </div>
            </div>
            <div class="mapBtnBox" @click="hiddenCheck" v-show="!btnHiddenStatus" style=" border-top-left-radius: 0.2rem;border-top-right-radius: 0.2rem;">
              <div class="mapBtn">
                <i class="iconfont icon-zhankai"></i>
                <div>展开</div>
              </div>
            </div>
          </div>


          <!--   动物 植物 图鉴列表按钮-->
          <div class="IllustratedList"  >
            <div class="mapBtnBox"
                 :class="{noclick:btnData.animal.activeStatus==3}"
                 @click="btnData.animal.activeStatus=='3'?'':animalDialogVisible = true">
              <div class="mapBtn">
                <i class="iconfont " :class="btnData.animal.iconClass"></i>
                <div>{{btnData.animal.name}}</div>
              </div>
            </div>
            <div class="mapBtnBox"
                 :class="{noclick:btnData.plant.activeStatus==3}"
                 @click="btnData.plant.activeStatus=='3'?'':plantDialogVisible = true">
              <div class="mapBtn" >
                <i class="iconfont" :class="btnData.plant.iconClass"></i>
                <div>{{btnData.plant.name}}</div>
              </div>
            </div>
          </div>

          <!--    卫星图层切换列表按钮-->
          <div class="positionListSatellite">
            <div class="mapBtnBox "
                 @click="changeSatellite()"
                 :class="satelliteBtn.activeStatus=='2'?'active':''">
              <div class="mapBtn" >
                <i class="iconfont iconweixing"></i>
                <div>卫星</div>
              </div>
            </div>
          </div>

          <!--    定位人列表按钮-->
          <div class="positionListPeople">
            <div class="mapBtnBox"
                 @click="getNowLocation()">
              <div class="mapBtn">
                <i class="iconfont icon-dingweiren"></i>
                <div>定位</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

<!--    弹窗部分-->
    <plantShow
      v-if="plantDialogVisible"
      :plantDialogVisible.sync="plantDialogVisible"
      :unitid="addressInfo.unitID">
    </plantShow>

    <animalShow
      v-if="animalDialogVisible"
      :animalDialogVisible.sync="animalDialogVisible"
      :unitid="addressInfo.unitID">
    </animalShow>

    <loginShow
      v-if="loginDialogVisible"
      :loginDialogVisible.sync="loginDialogVisible">
    </loginShow>
  </div>

</template>

<script>
    import '@/assets/iconFont/weixingIcon/iconfont.css'
    import {postwxsnslogin,getlogout} from '@/api/components/login/login.js'
    import {
        getunit,
        getUnitfunction,
        getPolygon,
        getPoint,
        getLine,
        postUnitPointByAnaly,
        postUnitBorderByAnaly} from '@/api/views/index.js'
    import {gcj_encrypt} from '@/assets/js/coordinateTranslation.js'
    import plantShow from '@/components/plant/plantDialog/plantDialog.vue'
    import animalShow from '@/components/animal/animalDialog/animalDialog.vue'
    import loginShow from '@/components/login/loginWechat.vue'
    import AMap from 'AMap'
    var map
    export default {
        name: "index",
        data(){
            return{
                currentIndex:-1,//当前搜索框选中的地区的index
                cittyActiveStatus:'',//当前选中的城市
                bindSource:[],//搜索时的联想列表数据
                bindSourceStatus:false,//搜索时的搜索联想列表展示状态
                isMouseOnSerchBox:false,//鼠标是否在搜索联想框里面
                loginDialogVisible:false,//登录弹窗状态
                animalDialogVisible:false, // 动物弹窗控制状态
                plantDialogVisible:false,// 植物弹窗控制状态
                geolocatioData:[],// 当前的手机的个人定位的gps定位配置
                leftStatus:false,//左边的地区的显示或隐藏状态
                searchList_H:0,// 左边展示列表的计算高度
                topographyVal:'0',// 选择地区类型的值  0 保护区或 1湿地公园
                btnHiddenStatus:true,//右侧的展开与收起切换按钮-展开和收起的状态
                btnListHiddenStatus:true,//是否展开地图上的浮动的样式按钮区展示状态
                addressActiveStatus:'',// 所选地区输入框的值
                // 当前所选区域的信息
                addressInfo:{
                    NowProtect:[113.75046785579495,23.041484209438455],//当前所选保护区坐标
                    addressName:'广东乳源南水湖国家湿地公园',
                    unitID:'543A9FCF-4770-4FD9-865F-030E562BE238',
                    nowPolygon:''
                },
                // 用户的个人信息
                userInfo:{
                    header:'',
                    nickName:'',
                    isLogin:false
                },
                // 当前景区的功能按钮数据
                selectData:{
                    infCamera:[],//红外
                    point:[],//样点
                    SamplePlot:[],//样地
                    sampleLine:[],//样线
                    class:[],//小班
                    function:[]//功能区
                },
                // yangdianImg yangdiImg hongwaiImg 对应的点的标记图片
                yangdianImg:require('../../assets/img/iTunes.png'),
                yangdiImg:require('../../assets/img/yangdi.png'),
                hongwaiImg:require('../../assets/img/hongwai.png'),
                // markersText 当前所有的点文本Text
                markersText:[],
                // markers 当前所有的点的覆盖物
                markers:[],
                // olylines 当前所有的折线覆盖物
                olylines:[],
                // polygons 当前所有的多边形覆盖物
                polygons:[],
                //btnData  右边功能按钮数据
                btnData:{
                    infCamera:{
                        activeStatus:'3',
                        name:'红外',
                        allowClien:false,
                        iconClass:'icon-hongwai'
                    },
                    point:{
                        activeStatus:'3',
                        name:'样点',
                        allowClien:false,
                        iconClass:'icon-yangdian'
                    },
                    samplePlot:{
                        activeStatus:'3',
                        name:'样地',
                        allowClien:false,
                        iconClass:'icon-yangdi'
                    },
                    sampleLine:{
                        activeStatus:'3',
                        name:'样线',
                        allowClien:false,
                        iconClass:'icon-yangxian'
                    },
                    class:{
                        activeStatus:'3',
                        name:'小班',
                        allowClien:false,
                        iconClass:'icon-xiaoban'
                    },
                    function:{
                        activeStatus:'3',
                        name:'功能区',
                        allowClien:false,
                        iconClass:'icon-gongnengqu'
                    },
                    animal:{
                        activeStatus:'3',
                        name:'动物',
                        allowClien:false,
                        iconClass:'icon-dongwu'
                    },
                    plant:{
                        activeStatus:'3',
                        name:'植物',
                        allowClien:false,
                        iconClass:'icon-zhiwu'
                    },
                },
                // 卫星按钮数据
                satelliteBtn:{
                    activeStatus:'1',
                    name:'卫星',
                    allowClien:false,
                    iconClass:'icon-zhiwu'
                },
                // 展示的地区列表数据
                listDataAddres:[],
                // 地区列表的城市  分为 reserve 保护区和 wetland 湿地公园
                listDataCitty:[],
                //卫星界面数据
                satel:''
            }
        },
        created() {

        },
        mounted(){
            // 初始化地图
            this.initMap()
            // 初始化当前定位
            this.autoLocation()
            // 设置某些模块的高度
            setTimeout(this.initPage(),200)
            // 窗口改变大小时触发
            window.onresize = () => {
                this.initPage()
            }
            // 初始化个人信息
            this.initUserInfo()
            // 监听登录时的跳转页信息
            this.listentResetGoPage()
        },
        methods:{
            // 卫星按钮切换
            changeSatellite(){
                var that=this
                if(that.satelliteBtn.activeStatus=='1'){
                    that.satel=new AMap.TileLayer.Satellite()
                    that.satelliteBtn.activeStatus='2'
                    that.satel.setMap(map);
                }else{
                    that.satelliteBtn.activeStatus='1'
                    that.satel.hide();
                }
            },
            // 地图样式点击切换
            mapClassBtn(item){
                var that=this
                var itemName=item.name
                if(item.activeStatus=='2')
                {
                    if(itemName==='红外'||itemName==='样点'||itemName==='样地')
                    {
                        that.clearSpot(itemName)
                    }else if(itemName==='样线')
                    {
                        that.clearLine(itemName)
                    }else if(itemName==='小班'||itemName==='功能区')
                    {
                        that.clearPolygon(itemName)
                    }
                    item.activeStatus='1'
                }else{
                    switch (itemName) {
                        case '红外':
                            that.createInfCamera()
                            break;
                        case '样点':
                            that.createPoint()
                            break;
                        case '样地':
                            that.createSamplePlot()
                            break;
                        case '样线':
                            that.createSampleLine()
                            break;
                        case '小班':
                            that.createClass()
                            break;
                        case '功能区':
                            that.createFunction()
                            break;
                        default :
                            console.log("你有误");
                            break;
                    }
                    item.activeStatus='2'
                }
           },
            // 生成红外数据
            createInfCamera(){
                var that=this
                let itemName='红外'
                getPoint({unitID:that.addressInfo.unitID,spatiatype:"InfCamera"}).then(res=>{
                    let _res=res.result
                    let fordata={}
                    for(let i in _res)
                    {
                        fordata={name:itemName,showData:'',data:_res[i],icon:that.hongwaiImg}
                        that.setSpotShow(fordata)
                    }
                })
            },
            // 生成样点数据
            createPoint(){
                var that=this
                let itemName='样点'
                getPoint({unitID:that.addressInfo.unitID,spatiatype:"Point"}).then(res=>{
                  let _res=res.result
                  let fordata={}
                  for(let i in _res)
                  {
                      fordata={name:itemName,showData:'',data:_res[i],icon:that.yangdianImg}
                      that.setSpotShow(fordata)
                  }
                })
            },
            // 生成样地数据
            createSamplePlot(){
                var that=this
                let itemName='样地'
                getPoint({unitID:that.addressInfo.unitID,spatiatype:"SamplePlot"}).then(res=>{
                    let _res=res.result
                    let fordata={}
                    for(let i in _res)
                    {
                        fordata={name:itemName,showData:'',showData:'',data:_res[i],icon:that.yangdiImg}
                        that.setSpotShow(fordata)
                    }
                })
            },
            // 生成样线数据
            createSampleLine(){
                var that=this
                let itemName='样线'
                getLine(
                    {
                        unitID:that.addressInfo.unitID,
                        spatiatype:"sampleLine"
                    }
                ).then(res=>{
                    let _res=res.result
                    for(let i in _res)
                    {
                        that.setLineShow(itemName,_res[i].line,'#c3fa27')
                    }
                })
            },
            // 生成小班数据
            createClass(){
                var that=this
                let itemName='小班'
                getPolygon(
                    {
                        unitID:that.addressInfo.unitID,
                        spatiatype:"Class"
                    }
                ).then(res=>{
                    let _res=res.result
                    let fordata={}
                    for(let i in _res)
                    {
                        fordata={
                            name:itemName,
                            data:_res[i],
                            backgroundColor:'rgba(255, 255, 255, 0)',
                            borderColor:'#608587',
                            zindex:3
                        }
                        that.setPolygonShow(fordata)
                    }
                })
            },
            // 生成功能区数据
            createFunction(){
                var that=this
                let itemName='功能区'
                let itemColor='#f0ee54'
                getPolygon(
                    {
                        unitID:that.addressInfo.unitID,
                        spatiatype:"function"
                    }
                ).then(res=>{
                    let _res=res.result
                    let fordata={}
                    for(let i in _res)
                    {
                        if(_res[i].name=='缓冲区')
                        {
                          itemColor='#f0ee54'
                        }else if(_res[i].name=='核心区'){
                          itemColor='#f87f7c'
                        }else{
                            // 剩下的是实验区
                          itemColor='#a3c325'
                        }
                        fordata={
                          name:itemName,
                          data:_res[i],
                          backgroundColor:itemColor,
                          borderColor:itemColor,
                          zindex:2
                        }
                        that.setPolygonShow(fordata)
                    }
                })
            },
            // 清除指定名称的点文本
            clearMarkersText(name){
                var that=this
                let clearData=[]
                let _markersText=that.markersText
                for(let i in _markersText){
                  if(_markersText[i].name===name)
                  {
                    map.remove(_markersText[i]);
                  }else{
                    clearData.push(_markersText[i])
                  }
                }
                that.markersText=clearData
            },
            // 清除指定名称的点
            clearSpot(name){
                var that=this
                let clearData=[]
                let _markers=that.markers
                for(let i in _markers){
                  if(_markers[i].name===name)
                  {
                    map.remove(_markers[i]);
                  }else{
                    clearData.push(_markers[i])
                  }
                }
                that.markers=clearData
            },
            // 展示点坐标 name 定义的名称 name:itemName,showData:'',data:_res[i],icon:that.yangdiImg      path 路径数据    url 坐标图片路径
            setSpotShow:function(fordata){
                var that =this
                var lnglatArr=[]
                    lnglatArr.push(fordata.data.lnglat)
                that.countZuobiao(lnglatArr).then(res=>{
                  let iconShow=''
                  if(fordata.icon=='')
                  {
                    iconShow = new AMap.Icon({
                        size: new AMap.Size(12, 12),// 图标尺寸
                        image: '//a.amap.com/jsapi_demos/static/demo-center/marker/marker.png',// 图标的取图地址
                        imageSize: new AMap.Size(12, 12),// 图标所用图片大小
                    });
                      var marker = new AMap.Marker({
                          position: res[0],
                          icon: iconShow,
                          anchor: 'center', //设置锚点
                          offset: new AMap.Pixel(0,0) //设置偏移量
                      });
                  }else{
                    iconShow=fordata.icon
                      var marker = new AMap.Marker({
                          position: res[0],
                          icon: iconShow,
                      });
                  }
                  // 将 icon 传入 marker
                  map.add(marker)
                  marker.name=fordata.name
                  marker.data=fordata.data
                  that.markers.push(marker)
                  if(fordata.name=='保护地')
                  {
                    var markerText = new AMap.Text({
                      text:fordata.showData,
                      style:{
                        'box-shadow': '0 2px 6px 0 rgba(114, 124, 245, .5)',
                          'margin-top':'-18px',
                        'text-align': 'center',
                        'color': 'blue'},
                      position: res[0]
                    });
                    map.add(markerText)
                    markerText.name=fordata.name
                    markerText.data=fordata.data
                    that.markersText.push(markerText)
                    markerText.on('click', function (e) {
                      that.addressActiveStatus=fordata.data.name
                      that.addressInfo.addressName=fordata.data.name
                      that.addressInfo.unitID=fordata.data.unitID
                      that.judgeNowSelectAddress()
                      console.log('你点击了'+fordata.name)
                    });
                    marker.on('click', function (e) {
                      that.addressActiveStatus=fordata.data.name
                      that.addressInfo.addressName=fordata.data.name
                      that.addressInfo.unitID=fordata.data.unitID
                      that.judgeNowSelectAddress()
                      console.log('你点击了'+fordata.name)
                    });
                  }
                })
            },
            // 清除指定名称的线
            clearLine(name){
                var that=this
                let clearData=[]
                let _olylines=that.olylines
                for(let i in _olylines){
                  if(_olylines[i].name===name)
                  {
                    map.remove(_olylines[i]);
                  }else {
                    clearData.push(_olylines[i])
                  }
                }
                that.olylines=clearData
            },
            // 展示直线  name 定义的名称      path 路径数据    color 填充颜色
            setLineShow:function(name,path,color){
                var that=this
                that.countZuobiao(path).then(res=>{
                    // 创建折线实例
                    var olyline = new AMap.Polyline({
                        path: res,
                        strokeDasharray: [10, 5],//勾勒形状轮廓的虚线和间隙的样式
                        borderWeight: 2, // 线条宽度，默认为 1
                        strokeColor: color, // 线条颜色
                        lineJoin: 'round' // 折线拐点连接处样式
                    });
                    // 将折线添加至地图实例
                    map.add(olyline);
                    olyline.name = name
                    that.olylines.push(olyline)
              })
            },
            // 清除指定名称的面
            clearPolygon(name)
            {
                var that=this
                let clearData=[]
                let _polygons=that.polygons
                for(let i in _polygons){
                  if(_polygons[i].name===name)
                  {
                    map.remove(_polygons[i]);
                  }else{
                    clearData.push(_polygons[i])
                  }
                }
                that.polygons=clearData
            },
            // 展示图层矢量图   name 图层名称   data 图层数据   polygon 路径数据  backgroundColor 填充颜色  borderColor  边框颜色   zindex 层级
            setPolygonShow:function(fordata){
                var that=this
                let addressData=fordata.data
                // AMap.convertFrom(addressData.polygon, 'gps', function (status, result) {
                //     if (result.info === 'ok') {
                //         var lnglats = result.locations; // Array.<LngLat>
                //         var polygon= new AMap.Polygon({
                //             path: lnglats,
                //             strokeColor: fordata.borderColor,
                //             strokeWeight: 2,
                //             strokeOpacity: 1,
                //             fillOpacity:0.4,
                //             fillColor: fordata.backgroundColor,
                //             zIndex: fordata.zindex,
                //         })
                //         map.add(polygon);
                //         map.setFitView([polygon]);
                //     }
                // });
                that.countZuobiao(addressData.polygon).then(res=>{
                        var polygon= new AMap.Polygon({
                          path: res,
                          strokeColor: fordata.borderColor,
                          strokeWeight: 2,
                          strokeOpacity: 1,
                          fillOpacity:0.4,
                          fillColor: fordata.backgroundColor,
                          zIndex: fordata.zindex,
                      })
                      map.add(polygon);
                      polygon.name=fordata.name
                      that.polygons.push(polygon)
                      if(fordata.name=='当前保护区')
                      {
                          that.addressInfo.nowPolygon=polygon
                          map.setFitView([polygon]);
                          polygon.on('click', function (e) {
                              map.setFitView([polygon]);
                              console.log('你点击了'+fordata.name)
                          });
                      }
                      if(fordata.name=='保护地')
                      {
                          polygon.on('click', function (e) {
                              that.addressActiveStatus=addressData.name
                              that.addressInfo.addressName=addressData.name
                              that.addressInfo.unitID=addressData.unitID
                              that.judgeNowSelectAddress()
                              console.log('你点击了'+addressData.name)
                          });
                      }
                })
            },

            // 转换gps坐标为高德的坐标
            countZuobiao(path){
                return new Promise( function (resolve, reject) {
                    let path222 = []
                    for (let p in path) {
                        path222.push(gcj_encrypt(path[p][0], path[p][1]))
                    }
                    resolve(path222)
                })
                // return new Promise( function (resolve, reject) {
                //     let maxL= Math.ceil(path.length / 1500);
                //
                //     console.log(maxL)
                //     var newpath=[]
                //     for(let i =0; i<maxL+1; i++)
                //     {
                //         if(maxL-i>1)
                //         {
                //             var patha=  (path.slice(i*1500,(i+1)*1500))
                //             var pathaa=[]
                //             console.log(1)
                //              AMap.convertFrom(patha, 'gps', function(status, result) {
                //                   console.log(result)
                //                 if (result.info === 'ok') {
                //                     pathaa=result.locations;
                //                     newpath=newpath.concat(pathaa)
                //                 }else{
                //
                //                 }
                //             })
                //              console.log(maxL-i)
                //         }else if(maxL==i){
                //             // setTimeout(
                //             //     function () {
                //              console.log(newpath)
                //              resolve(newpath)
                //
                //             //     },maxL*800
                //             // )
                //         }
                //         else{
                //             var pathb= path.slice(i*1500,path.length)
                //             var pathbb=[]
                //             AMap.convertFrom(pathb, 'gps', function(status, result) {
                //                 console.log(result)
                //                 if (result.info === 'ok') {
                //                     pathbb= result.locations;
                //                     newpath=newpath.concat(pathbb)
                //                     console.log(newpath)
                //                 }else{
                //                 }
                //             })
                //              console.log(maxL-i)
                //         }
                //
                //     }
                // }).catch((e) => { })
            },
            // 判断当前选中地区的按钮状态
            judgeNowSelectAddress(){
                var that=this;
                // 使左边的选项高亮对应的项
                let LDA=that.listDataAddres
                for(let i in LDA){
                    if(that.addressInfo.addressName==LDA[i].unitName)
                    {
                        that.topographyVal=LDA[i].type.toString()
                        that.cittyActiveStatus=LDA[i].city
                    }
                }
                // 使按钮设置为不可点击状态
                for(var ob in that.btnData)
                {
                    that.btnData[ob].activeStatus='3'
                }
                // 获取当前的功能按钮
                getUnitfunction({unitID:that.addressInfo.unitID}).then(res=>{
                  let _res=res.result
                  for(var i in _res)
                  {
                    if(_res[i]==true)
                    {
                      for(var b in that.btnData)
                      {
                        if(i==b)
                          {that.btnData[b].activeStatus='1'}
                        }}}
                })
                // 获取当前的地区的面数据
                getPolygon({unitID:that.addressInfo.unitID,spatiatype:"Boundary"}).then(res=>{
                  getPoint({unitID:that.addressInfo.unitID,spatiatype:"UnitCenter"}).then(res2=>{
                    if(res2.messageType==0)
                    {   let r2=res2.result
                        for (let r2i in r2)
                        {
                            that.addressInfo.NowProtect=r2[r2i].lnglat
                        }}
                  })
                  that.initData()
                  if(res.result.length>0)
                  {
                    map.clearMap();
                    let _res=res.result
                    let fordata={}
                    for(var i in _res)
                    {
                      fordata={
                        name:'当前保护区',
                        data:res.result[i],
                        backgroundColor:'#87cd53',
                        borderColor:'#608587',
                        zindex:1
                      }
                      that.setPolygonShow(fordata)
                    }
                  }
                })
            },
            // 隐藏或显示地图样式的按钮
            hiddenCheck(){
                var that=this
                if(that.btnHiddenStatus)
                {
                  that.btnListHiddenStatus=false
                  setTimeout(function () {
                      that.btnHiddenStatus=false
                  },1000)
                }else{
                  that.btnListHiddenStatus=true
                  that.btnHiddenStatus=true
                }
            },
            // 加载页面定位时的自动定位位置
            autoLocation(){
              var that=this
              map.plugin('AMap.Geolocation', function () {
                var geolocation = new AMap.Geolocation({
                  // 定位请求信息
                  enableHighAccuracy: true,//是否使用高精度定位，默认:true
                  timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                  maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                  convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                  showButton: false,        //显示定位按钮，默认：true
                  buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                  buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                  showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                  showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                  panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                  zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                });
                map.addControl(geolocation);
                that.geolocatioData=geolocation
                // 进行定位
                that. getNowLocation()
              });
            },
            // 获取当前的手机定位
            getNowLocation(){
              var that=this
              that.geolocatioData.getCurrentPosition();
              // 获取定位成功
              AMap.event.addListener(that.geolocatioData, 'complete', function (obj) {
                  // console.log(obj)
              }); // 返回定位信息
              // 获取定位失败
              AMap.event.addListener(that.geolocatioData, 'error', function (obj) {
                  alert(obj.info + '--' + obj.message);
                  // console.log(obj);
              });       // 返回定位出错信息
            },
            // 定位到当前的保护区
            goNowProtect(){
              var that=this
              // that.addressInfo.nowPolygon
              if(that.addressInfo.nowPolygon!='')
              {
                map.setFitView([that.addressInfo.nowPolygon]);
              }
              // map.setZoomAndCenter(10,that.addressInfo.NowProtect);
            },
            //.获取地区列表
            getUnitAddres(){
              var that=this
              getunit().then(res=>{
                that.listDataAddres=res.result
                // a1 保护区的城市列表 a2 湿地公园的城市列表 b1 处理过保护区的数据 b2处理过湿地公园的数据
                if(res.messageType==0)
                {
                  if(res.result.length>0)
                  {
                    var l=that.listDataAddres,
                      a1=[],
                      a2=[],
                      b1=[],
                      b2=[]
                    for(var i in l)
                    {
                      if(l[i].type==0)
                      {
                        if(a1.indexOf(l[i].city)==-1)
                        {
                          a1.push(l[i].city)
                          b1.push(
                            {
                              city:l[i].city,
                              type:0,
                              list:[l[i]]
                            }
                          )
                        }else{
                          b1[a1.indexOf(l[i].city)].list.push(l[i])
                        }
                      }else if(l[i].type=1){
                        if(a2.indexOf(l[i].city)==-1)
                        {
                          a2.push(l[i].city)
                          b2.push(
                            {
                              city:l[i].city,
                              type:1,
                              list:[l[i]]
                            }
                          )
                        }else{
                          b2[a2.indexOf(l[i].city)].list.push(l[i])
                        }
                      }
                    }
                    that.listDataCitty = b1.concat(b2)
                  }
                }else if(res.messageType==3){
                    that.userInfo.isLogin=false
                    that.loginDialogVisible=true
                }
                else{
                  that.$message(res.message)
                }
              })
            },
            // 初始化地图数据
            initData(){
               var that=this
                // map.clearMap()
                that.polygons=[]
                that.markers=[]
                that.olylines=[]
                that.polygons=[]
            },
            // 初始化页面
            initPage(){
                var that=this
                let bottomLeft_height= that.$refs.bottomLeft.offsetHeight;
                let searchInput_height=that.$refs.searchInput.offsetHeight;
                let searchRaduio_height= that.$refs.searchRaduio.offsetHeight;
                let height=((bottomLeft_height-searchInput_height)-searchRaduio_height)
                this.searchList_H=height
                // console.log(this.searchList_H)
                // 获取地区列表
                that.getUnitAddres()
            },
            // 初始化个人登录信息
            initUserInfo(){
                var that=this
                let header=localStorage.getItem('header')
                if(header)
                {
                    that.userInfo.header=header
                }
                let nickName=localStorage.getItem('nickName')
                if(nickName)
                {
                    that.userInfo.nickName=nickName
                }
                let token=localStorage.getItem('token')
                if(token)
                {
                    that.userInfo.isLogin=true
                    that.loginDialogVisible=false
                }else{
                    that.loginDialogVisible=true
                    that.userInfo.isLogin=false
                }
            },
            // 监听登录跳转页面的信息
            listentResetGoPage(){
              // 监听登录跳转页
              window.addEventListener('message', (e) => {
                  // console.log(e,e.data)
                  if(e.data.data){
                    if(e.data.data.code)
                    {
                      console.log('我要登录了')
                      this.loginDialogVisible=false
                      this.loginWechatNow(e.data.data.code)
                    }
                  }else{
                      // console.log('w我才不登录呀')
                  }
              }, false);
            },
            // 微信登录
              loginWechatNow(resCode){
                var that=this
                postwxsnslogin(
                    {code:resCode}
                ).then(res=>{
                    console.log(res)
                    if(res.messageType==0)
                    {
                      window.localStorage.setItem('header', res.result.header);
                      window.localStorage.setItem('nickName', res.result.nickName);
                      window.localStorage.setItem('token', res.result.session);
                      that.initUserInfo()
                      setTimeout(function () {
                          that.$router.go(0)
                      },500)
                    }else{
                      this.$message(res.messageType);
                      console.log('messageType:'+res.messageType)
                    }
                }).catch((e) => {
                    console.log(e)
                    }
                )
              },
            // 退出登录
            signOutLogin(){
                var that=this
                 getlogout().then(res=>{
                     if(res.messageType==0)
                     {
                         that.$message({
                             message: res.message,
                             type: 'success'
                         });
                         window.localStorage.removeItem('header')
                         window.localStorage.removeItem('nickName')
                         window.localStorage.removeItem('token')
                         that.userInfo.isLogin=false
                         setTimeout(function () {
                             that.$router.go(0)
                         },500)
                     }else{
                         that.$message({
                             message: res.message,
                             type: 'warning'
                         });
                         console.log(res)
                     }
                 })

            },
            // 地图初始化
            initMap(){
                var that=this
                map= new AMap.Map('all-map', {
                  resizeEnable: true,
                  mapStyle: "amap://styles/e465ad9a98cc8acb6095364c4536ead4",
                  // center: [113.75046785579495,23.041484209438455],
                  zoom: 10,
                });
                // 初始化数据
                if(that.userInfo.isLogin==false)
                {
                    that.loginDialogVisible=true
                }else{
                    this.initData()
                }

                map.on('movestart', function () {
                  // console.log('地图开始移动')
                });
                map.on('mapmove', function () {
                  // console.log('地图开始正在移动')
                });
                map.on('moveend', function () {
                    // map.clearMap();
                    // console.log('地图结束移动')
                    that.getNowAreaHas()
                });
            },
            // 数据分许获取当前区域是否有保护地
            getNowAreaHas(){
                var that=this
                let nowZoom=map.getZoom()
                that.clearMarkersText('保护地')
                that.clearPolygon('保护地')
                that.clearSpot('保护地')
                let points=[
                  {
                    x:map.getBounds().southwest.lng,
                    y:map.getBounds().southwest.lat
                  },
                  {
                    x:map.getBounds().northeast.lng,
                    y:map.getBounds().southwest.lat
                  },
                  {
                    x:map.getBounds().northeast.lng,
                    y:map.getBounds().northeast.lat
                  },
                  {
                    x:map.getBounds().southwest.lng,
                    y:map.getBounds().northeast.lat
                  },
                ]
                // console.log(that.addressInfo)
                // 判断当前缩放等级
                if(nowZoom<11)
                {
                  postUnitPointByAnaly({points}).then(res=>{
                    if(res.result)
                    {
                      if(res.result.length>0)
                      {
                        let _res=res.result
                        let fordata={}
                        for(var i in _res)
                        {
                          if(_res[i].unitID!=that.addressInfo.unitID)
                          {
                            // console.log(_res[i])
                            fordata={name:'保护地',showData:_res[i].name,data:_res[i],icon:''}
                            that.setSpotShow(fordata)
                          }
                        }
                      }
                    }
                  })
                }else{
                    postUnitBorderByAnaly({points}).then(res=>{
                      if(res.result)
                      {
                        if(res.result.length>0)
                        {
                          let _res=res.result
                          let fordata={}
                          for(var i in _res)
                          {
                            if(_res[i].unitID!=that.addressInfo.unitID)
                            {
                              fordata={
                                  name:'保护地',
                                  data:res.result[i],
                                  backgroundColor:'#87cd53',
                                  borderColor:'#608587',
                                  zindex:1
                              }
                              that.setPolygonShow(fordata)
                            }
                          }
                        }
                      }
                    })
                }
                // console.log('中心点：'+map.getCenter().toString())
                // console.log(map.getBounds())
                // console.log('西北点：'+map.getBounds().southwest.toString())
                // console.log('东北点：'+map.getBounds().northeast.lng+','+map.getBounds().southwest.lat)
                // console.log('东南点：'+map.getBounds().northeast.toString())
                // console.log('西南点：'+map.getBounds().southwest.lng+','+map.getBounds().northeast.lat)
            },
            // 搜索输入时联想列表
            associateList: function (){
              var that=this
              let inputSearch=that.addressActiveStatus
              var _associateData = that.listDataAddres
              let _bindSource = []
              that.currentIndex=-1
              if(inputSearch.length>0)
              {
                for (let i in _associateData)
                {
                  if (_associateData[i].unitName.indexOf(inputSearch)!=-1)
                  {
                    _bindSource.push(_associateData[i])
                  }
                }
                if (_bindSource.length!=0)
                {
                  that.bindSource=_bindSource
                  that.bindSourceStatus=true
                }else{
                  that.bindSource=[]
                  that.bindSourceStatus=false
                }
              }else{
                 console.log('未输入搜索的保护地')
              }
            },
            // 左侧地区点击事件
            addressChange(unitName,unitID){
              var that=this
              that.addressActiveStatus=unitName
              that.addressInfo.addressName=unitName
              that.addressInfo.NowProtect=''
              that.addressInfo.unitID=unitID
              that.judgeNowSelectAddress()
            },
            // 按上下键触发
            selectResultItem:function (status) {
              if (this.currentIndex === this.bindSource.length - 1) {
                this.currentIndex = 0
              } else if(this.currentIndex <-1)
              {
                this.currentIndex = -1
              }else {
                if(status=='up')
                {
                  this.currentIndex--
                }else if(status=='down'){
                  this.currentIndex++
                }
              }
            },
            // 开始搜索
            goSearch:function (currentIndex) {
                var that=this
                // console.log(that.bindSourceStatus +' '+ that.isMouseOnSerchBox)
                if(currentIndex>=0)
                {
                    const item=that.bindSource[currentIndex]
                    that.cittyActiveStatus=item.city
                    that.topographyVal=item.type.toString()
                    that.addressActiveStatus=item.unitName
                    that.isMouseOnSerchBox=false
                    that.bindSourceStatus=false
                }
            }
        },
        watch:{

        },
        computed: {

        },
        components:
            {
               'plantShow':plantShow,
                'animalShow':animalShow,
                'loginShow':loginShow
            }


    }
</script>
<style scoped src="@/styles/index.css">

</style>
<style>
  /*切换地形的单选按钮样式*/
  .searchRaduio .el-radio__input .el-radio__inner{
    width: 16px;
    height: 16px;
  }

  .searchRaduio .el-radio__input .el-radio__inner:hover{
    /*box-shadow: 0 0 4px #509729 inset;*/
  }
  .searchRaduio .el-radio__input.is-checked .el-radio__inner{
    border-color: #fff;
    background: #fff;
  }
  .searchRaduio .el-radio__input.is-checked .el-radio__inner::after{
    background-color:#509729;
    width: 10px;
    height: 10px
  }



  /*左边的地址列表*/
  .searchList .el-collapse{
    border: none;
  }

  .searchList .el-collapse .el-collapse-item .el-collapse-item__header{
    border-color: #509729;
    background:#64a831 ;
  }
  .searchList .el-icon-arrow-right{
    color: #fff;
  }
  .searchList .el-collapse-item__wrap{
    border: none;
  }
  .searchList .el-collapse-item__content{
    padding: 0;
    background: #509729;
  }




</style>
<style scoped>

</style>
