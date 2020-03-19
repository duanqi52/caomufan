<template>
  <div id="app">
    <div id="all-map" class="map" ></div>

<!--    搜索框-->
    <div class="searchShowBox">
      <div class="searchShow" @click="goMiniApp('/pages/index/index')">
         {{addressInfo.addressName}}
      </div>
     <div class="searchIcon">
       <i @click="goNowProtect()" class="iconfont icon-dingwei"></i>
     </div>
    </div>

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

<!--    图鉴列表按钮-->
    <div class="IllustratedList">
      <div class="mapBtnBox"
           :class="{noclick:btnData.animal.activeStatus==3}"
           @click="btnData.animal.activeStatus=='3'?'':goMiniApp('/pages/Illustrated/animalIllustrated/animalIllustrated')">
        <div class="mapBtn">
          <i class="iconfont " :class="btnData.animal.iconClass"></i>
          <div>{{btnData.animal.name}}</div>
        </div>
      </div>
      <div class="mapBtnBox"
           :class="{noclick:btnData.plant.activeStatus==3}"
           @click="btnData.plant.activeStatus=='3'?'':goMiniApp('/pages/Illustrated/plantIllustrated/plantIllustrated')">
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

<!--    定位列表按钮-->
    <div class="positionList">
      <div class="mapBtnBox">
        <div class="mapBtn" @click="getNowLocation()">
          <i class="iconfont icon-dingweiren"></i>
          <div>定位</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
    import VConsole from 'VConsole'

    import '@/assets/iconFont/weixingIcon/iconfont.css'
    import AMap from 'AMap'
    import {
        getUnitfunction,
        getPolygon,
        getPoint,
        getLine,
        postUnitPointByAnaly,
        postUnitBorderByAnaly} from '@/api/index/index.js'
    import {gcj_encrypt} from '@/assets/js/coordinateTranslation.js'
    var map

    // var vConsole = new VConsole();

/*
* btnHiddenStatus 地图样式按钮是否展开
* btnData 地图样式按钮数据
*
* */
export default {

  name: 'App',
    data(){
      // adas
      return{
          loginNum:0,
      // yangdianImg yangdiImg hongwaiImg 对应的点的标记图片
      yangdianImg:require('./assets/img/iTunes.png'),
      yangdiImg:require('./assets/img/yangdi.png'),
      hongwaiImg:require('./assets/img/hongwai.png'),
          // btnHiddenStatus 是否展开左边按钮区
      btnHiddenStatus:true,
      btnListHiddenStatus:true,
          // selectData  当前的左边按钮所展示的对应数据
      selectData:
          {
              // 红外
              Infrared: [],
              // 样点
              samplingPoint:[],
              // 样地
              plotPlot:[],
              // 样线
              lineTransect:[],
              // 小班
              subcompartment:[],
              // 功能区
              functionalArea:[]
          }
      ,
          //btnData  左边功能按钮数据
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
          // 当前的手机定位的gps定位配置
          geolocatioData:[],
          // markersText 当前所有的点文本Text
          markersText:[],
          // markers 当前所有的点的覆盖物
          markers:[],
          // olylines 当前所有的折线覆盖物
          olylines:[],
          // polygons 当前所有的多边形覆盖物
          polygons:[],
          // NowProtect 当前所选保护区
          NowProtect:[113.75046785579495,23.041484209438455],
          //NowMyself 当前自己的定位
          NowMyself:[],
          // 当前所选区域的信息
          addressInfo:{
              NowProtect:[113.75046785579495,23.041484209438455],//当前所选保护区坐标
              addressName:'',
              unitID:'',
              nowPolygon:''
          },
          //卫星界面数据
          satel:''

      }
    },
    created(){
      var that=this
      // console.log(this.$route.query.unitId)

    },
    mounted(){
        var that=this
        console.log(that.getUrlKey('token'))
        window.localStorage.setItem('token',that.getUrlKey('token'))
        // 初始化地图
        that.initMap()
        // 初始化当前定位
        that.autoLocation()

        if(this.getUrlKey('unitId')!=null)
        {
          that.addressInfo.unitID=that.getUrlKey('unitId')
          that.judgeNowSelectAddress()
        }
        if(that.getUrlKey('name')!=null)
        {
            that.addressInfo.addressName=that.getUrlKey('name')
        }


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
        // 获取url参数
        getUrlKey (name) {
            return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
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
                if(that.getUrlKey('unitId')==null)
                {
                    console.log(1)
                    that. getNowLocation()
                }
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
                // alert(obj.info + '--' + obj.message);
                console.log(obj);
            });       // 返回定位出错信息
        },
        // 跳转回指定的小程序页面
        goMiniApp(urlMini){
            wx.miniProgram.navigateTo({
                url:urlMini+'?UnitID='+this.addressInfo.unitID,
                success: function(){
                    console.log('success')
                },
                fail: function(){
                    console.log('fail');
                },
                complete:function(){
                    console.log('complete');
                }
            });
        },
        // 定位到当前的保护区
        goNowProtect(){
            var that=this
            // that.addressInfo.nowPolygon
            if(that.addressInfo.nowPolygon!='')
            {
                map.setFitView([that.addressInfo.nowPolygon]);
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
                    console.log(_res[i])
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
            let contentShow=''
            let iconShow=''
            var lnglatArr=[]
            lnglatArr.push(fordata.data.lnglat)
            that.countZuobiao(lnglatArr).then(res=> {
                if (fordata.icon == '') {
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
                } else {
                    iconShow = fordata.icon
                    var marker = new AMap.Marker({
                        position: res[0],
                        icon: iconShow,
                    });
                }

                map.add(marker)
                marker.name = fordata.name
                marker.data = fordata.data
                that.markers.push(marker)
                if (fordata.name == '保护地') {
                    var markerText = new AMap.Text({
                        text: fordata.showData,
                        style: {
                            'box-shadow': '0 2px 6px 0 rgba(114, 124, 245, .5)',
                            'text-align': 'center',
                            'color': 'blue'
                        },
                        position: res[0]
                    });
                    map.add(markerText)
                    markerText.name = fordata.name
                    markerText.data = fordata.data
                    that.markersText.push(markerText)
                    markerText.on('click', function (e) {
                        that.addressActiveStatus = fordata.data.name
                        that.addressInfo.addressName = fordata.data.name
                        that.addressInfo.unitID = fordata.data.unitID
                        that.judgeNowSelectAddress()
                        console.log('你点击了' + fordata.name)
                    });
                    marker.on('click', function (e) {
                        that.addressActiveStatus = fordata.data.name
                        that.addressInfo.addressName = fordata.data.name
                        that.addressInfo.unitID = fordata.data.unitID
                        that.judgeNowSelectAddress()
                        console.log('你点击了' + fordata.name)
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
            that.countZuobiao(path).then(res=> {
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
            console.log(fordata)
            let addressData=fordata.data
            that.countZuobiao(addressData.polygon).then(res=> {
                var polygon = new AMap.Polygon({
                    path: res,
                    strokeColor: fordata.borderColor,
                    strokeWeight: 2,
                    strokeOpacity: 1,
                    fillOpacity: 1,
                    fillColor: fordata.backgroundColor,
                    zIndex: fordata.zindex,
                })
                map.add(polygon);
                polygon.name = fordata.name
                that.polygons.push(polygon)
                if (fordata.name == '当前保护区') {
                    that.addressInfo.nowPolygon = polygon
                    map.setFitView([polygon]);
                    polygon.on('click', function (e) {
                        console.log('你点击了' + fordata.name)
                    });
                }
                if (fordata.name == '保护地') {
                    polygon.on('click', function (e) {
                        that.addressActiveStatus = addressData.name
                        that.addressInfo.addressName = addressData.name
                        that.addressInfo.unitID = addressData.unitID
                        that.judgeNowSelectAddress()
                        console.log('你点击了' + addressData.name)
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
                if(res.messageType==0)
                {
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
                }

            })
        },
      // 地图初始化
        initMap(){
            var that=this
            map= new AMap.Map('all-map', {
                resizeEnable: true,
                mapStyle: "amap://styles/e465ad9a98cc8acb6095364c4536ead4",
                center: [113.75046785579495,23.041484209438455],
                zoom: 10,
            });
            map.on('movestart', function () {
                console.log('地图开始移动')
            });
            map.on('mapmove', function () {
                console.log('地图开始正在移动')
            });
            map.on('moveend', function () {
                console.log('地图结束移动')
                that.getNowAreaHas()
            });
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
                                    console.log(_res[i])
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
        },

        // 隐藏或显示地图样式的按钮
        hiddenCheck(){
            var that=this
            if( that.btnHiddenStatus)
            {
                that.btnListHiddenStatus=false
                    setTimeout(function () {
                        that.btnHiddenStatus=false
                    },1000)
            }else{
                that.btnListHiddenStatus=true

                    that.btnHiddenStatus=true

            }
        }
    },

  components: {

  }
}
</script>
<style scoped src="@/style/app.css">

</style>
<style>


</style>
