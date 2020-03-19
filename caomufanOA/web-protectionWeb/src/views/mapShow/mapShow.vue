<template>
  <div id="app">
    <div id="all-map" class="map" ></div>

    <!--    搜索框-->
    <div class="searchShowBox">
      <div class="searchShow" @click="goMiniApp('/pages/index/index')">
        广州香江野生动物园
      </div>
      <div class="searchIcon">
        <i @click="goNowProtect()" class="iconfont icon-dingwei"></i>
      </div>
    </div>

    <!--    地图样式按钮-->
    <div class="mapClass">
      <transition name="draw">  <!--这里的name 和 css 类名第一个字段要一样-->
        <div class="mapClassList" v-show="btnListHiddenStatus">
          <div  v-for="(item,index) in btnData" class="mapBtnBox" @click="mapClassBtn(item)" :class="{active:item.active}">
            <div class="mapBtn">
              <i class="iconfont " :class="item.iconClass"></i>
              <div>{{item.name}}</div>
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
          <i class="iconfont icon-shouqi1"></i>
          <div>展开</div>
        </div>
      </div>
    </div>

    <!--    图鉴列表按钮-->
    <div class="IllustratedList">

      <div class="mapBtnBox">
        <div class="mapBtn" @click="goMiniApp('/pages/Illustrated/animalIllustrated/animalIllustrated')">
          <i class="iconfont icon-hu"></i>
          <div>动物</div>
        </div>
      </div>
      <div class="mapBtnBox">
        <div class="mapBtn" @click="goMiniApp('/pages/Illustrated/plantIllustrated/plantIllustrated')">
          <i class="iconfont icon-siyecao"></i>
          <div>植物</div>
        </div>
      </div>
    </div>

    <!--    定位列表按钮-->
    <div class="positionList">
      <div class="mapBtnBox">
        <div class="mapBtn" @click="getNowLocation()">
          <i class="iconfont icon-dingwei1"></i>
          <div>定位</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import AMap from 'AMap'
    import Daily from '@/assets/js/tsconfig.js'
    import VConsole from 'VConsole'
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
                // yangdianImg yangdiImg hongwaiImg 对应的点的标记图片
                yangdianImg:require('@/assets/img/iTunes.png'),
                yangdiImg:require('@/assets/img/yangdi.png'),
                hongwaiImg:require('@/assets/img/hongwai.png'),
                // btnHiddenStatus 是否展开左边按钮区
                btnHiddenStatus:true,
                btnListHiddenStatus:true,
                // selectData  当前的左边按钮所展示的对应数据
                selectData:
                    {
                        // 红外
                        Infrared: [
                            {lnglat: [113.65046785579495,23.041484209438455], name: 1,id:1},
                            {lnglat: [113.76046785579495,22.851484209438455],name: 2,id:1},
                            {lnglat: [113.86046785579495,23.05148420943845], name: 3,id:1},
                            {lnglat: [113.65046785579495,23.041484209438455], name: 4,id:1},
                            {lnglat: [113.76046785579495,23.091484209438455], name: 5,id:1},



                        ],
                        // 样点
                        samplingPoint:[
                            {lnglat: [113.10046785579495,23.041484209438455], name: 1,id:1},
                            {lnglat: [113.56046785579495,23.001484209438455],name: 2,id:1},
                            {lnglat: [113.76046785579495,23.12148420943845], name: 3,id:1},
                            {lnglat: [113.75046785579495,23.041484209438455], name: 4,id:1},
                            {lnglat: [114.06046785579495,23.091484209438455], name: 5,id:1},
                        ],
                        // 样地
                        plotPlot:[
                            {lnglat: [113.65046785579495,22.91484209438455], name: 1,id:1},
                            {lnglat: [113.76046785579495,22.851484209438455],name: 2,id:1},
                            {lnglat: [113.99046785579495,23.05148420943845], name: 3,id:1},
                            {lnglat: [113.75046785579495,23.111484209438455], name: 4,id:1},
                            {lnglat: [113.76046785579495,22.891484209438455], name: 5,id:1},
                        ],
                        // 样线
                        lineTransect:[
                            [113.65046785579495,23.041484209438455],
                            [113.76046785579495,22.851484209438455],
                            [113.86046785579495,23.05148420943845],
                            [113.76046785579495,23.091484209438455]
                        ],
                        // 小班
                        subcompartment:[],
                        // 功能区
                        functionalArea:[]
                    }
                ,
                //btnData  左边功能按钮数据
                btnData:[
                    {
                        name:'红外',
                        iconClass:'icon-hongwai',
                        active:false
                    },
                    {
                        name:'样点',
                        iconClass:'icon-yangdian',
                        active:false
                    },
                    {
                        name:'样地',
                        iconClass:'icon-yangdi',
                        active:false
                    },
                    {
                        name:'样线',
                        iconClass:'icon-yangxian',
                        active:false
                    },
                    {
                        name:'小班',
                        iconClass:'icon-xiaoban',
                        active:false
                    },
                    {
                        name:'功能区',
                        iconClass:'icon-gongnengqu',
                        active:false
                    },
                ],
                // 当前的手机定位的gps定位配置
                geolocatioData:[],
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

            }
        },
        created(){

        },
        mounted(){
            this.initMap()
            this.zoomShow()
            this.mapBul()
            // this.setSpotShow()
            // this.setLineShow()
            // 获取当前的手机定位
            this.autoLocation()
        },

        methods:{
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
                // map.clearMap();
                // this.autoLocation()
                that.geolocatioData.getCurrentPosition();


                // 获取定位成功
                AMap.event.addListener(that.geolocatioData, 'complete', function (obj) {


                    console.log(obj)
                    // var res = '经纬度：' + obj.position +
                    //     '\n精度范围：' + obj.accuracy +
                    //     '米\n定位结果的来源：' + obj.location_type +
                    //     '\n状态信息：' + obj.info +
                    //     '\n地址：' + obj.formattedAddress +
                    //     '\n地址信息：' + JSON.stringify(obj.addressComponent, null, 4);
                    // alert(res);


                }); // 返回定位信息
                // 获取定位失败
                AMap.event.addListener(that.geolocatioData, 'error', function (obj) {
                    alert(obj.info + '--' + obj.message);
                    console.log(obj);
                });       // 返回定位出错信息

            },
            // 跳转回指定的小程序页面
            goMiniApp(urlMini){
                console.log(1)
                wx.miniProgram.navigateTo({
                    url:urlMini,
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
                map.setZoomAndCenter(10,that.NowProtect);
            },
            // 地图样式点击切换
            mapClassBtn(item){
                var that=this
                var itemName=item.name
                if(item.active)
                {
                    let clearData=[]
                    if(itemName==='红外'||itemName==='样点'||itemName==='样地')
                    {
                        let _markers=that.markers
                        console.log(_markers)
                        for(let i in _markers){
                            if(_markers[i].name===itemName)
                            {
                                map.remove(_markers[i]);
                                clearData.push(i)
                            }
                        }
                        for(let i in clearData){ // 删除markers数组中已删除的markers
                            that.markers.splice(clearData[i], 1);
                        }
                    }else if(itemName==='样线')
                    {
                        let _olylines=that.olylines
                        console.log(_olylines)
                        for(let i in _olylines){
                            if(_olylines[i].name===itemName)
                            {
                                map.remove(_olylines[i]);
                                clearData.push(i)
                            }
                        }
                        for(let i in clearData){ // 删除markers数组中已删除的markers
                            that.olylines.splice(clearData[i], 1);
                        }
                    }else if(itemName==='小班'||itemName==='功能区')
                    {
                        let _polygons=that.polygons
                        console.log(_polygons)
                        for(let i in _polygons){
                            if(_polygons[i].name===itemName)
                            {
                                map.remove(_polygons[i]);
                                clearData.push(i)
                            }
                        }
                        for(let i in clearData){ // 删除markers数组中已删除的markers
                            that.polygons.splice(clearData[i], 1);
                        }
                    }
                    item.active=false
                }else{
                    switch (itemName) {
                        case '红外':
                            that.setSpotShow(itemName,that.selectData.Infrared,that.hongwaiImg)
                            break;
                        case '样点':
                            that.setSpotShow(itemName,that.selectData.samplingPoint,that.yangdianImg)
                            break;
                        case '样地':
                            that.setSpotShow(itemName,that.selectData.plotPlot,that.yangdiImg)
                            break;
                        case '样线':
                            that.setLineShow(itemName,that.selectData.lineTransect,'#c3fa27')
                            break;
                        case '小班':
                            that.setPolygonShow(itemName, that.selectData.subcompartment,'red','#608587',3)
                            break;
                        case '功能区':
                            that.setPolygonShow(itemName, that.selectData.functionalArea,'blue','#608587',2)
                            break;
                        case '定位':
                            that.setPolygonShow(itemName, that.selectData.functionalArea,'blue','#608587',2)
                            break;
                        default :
                            console.log("你的分数有误");
                            break;
                    }
                    item.active=true
                }
            },
            // 地图初始化
            initMap(){
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
                    console.log(map.getCenter().toString())
                });
            },
            // 展示直线  name 定义的名称      path 路径数据    color 填充颜色
            setLineShow:function(name,path,color){
                var that=this
                // 创建折线实例
                var olyline = new AMap.Polyline({
                    path: path,
                    strokeDasharray: [10, 5],//勾勒形状轮廓的虚线和间隙的样式
                    borderWeight: 2, // 线条宽度，默认为 1
                    strokeColor: color, // 线条颜色
                    lineJoin: 'round' // 折线拐点连接处样式
                });
                // 将折线添加至地图实例
                map.add(olyline);
                olyline.name=name
                that.olylines.push(olyline)

            },
            // 展示点坐标 name 定义的名称      path 路径数据    url 坐标图片路径
            setSpotShow:function(name,path,url){
                var that =this
                console.log(path)
                // 创建样式对象
                var styleObject = [{
                    // url: 'https://a.amap.com/jsapi_demos/static/images/mass0.png',  // 图标地址
                    url: url,
                    size: new AMap.Size(20, 20),      // 图标大小
                    anchor:new AMap.Pixel (5,5) // 图标显示位置偏移量，基准点为图标左上角
                }]
                var marker = new AMap.MassMarks(path,{
                    zIndex:999,
                    zooms: [3, 19],  // 在指定地图缩放级别范围内展示海量点图层
                    style: styleObject  // 设置样式对象
                });

                marker.setData(path);

                marker.setMap(map);
                marker.name=name
                that.markers.push(marker)

            },
            // 展示图层矢量图   name 图层名称   path 路径数据  fillcolor 填充颜色  trokeColor  边框颜色   zindex 层级
            setPolygonShow:function(name,path,fillcolor,trokeColor,zindex){
                var that=this
                var polygon= new AMap.Polygon({
                    path: path,
                    strokeColor: trokeColor,
                    strokeWeight: 2,
                    strokeOpacity: 1,
                    fillOpacity:1,
                    fillColor: fillcolor,
                    zIndex: zindex,
                })
                map.add(polygon);
                polygon.name=name
                that.polygons.push(polygon)

                if(name=='保护地')
                {
                    polygon.on('click', function () {
                        console.log('你点击了保护地')
                    });
                }
            },
            // 生成图层坐标系
            mapBul:function(){

                let that=this
                let _Daily=Daily.data
                let _zoom=map.getZoom()
                for(let d in _Daily)
                {
                    let data1=[]
                    let data2=[]
                    data1=_Daily[d].coordinate.split(' ')
                    for(let i in data1)
                    {
                        let c=1
                        if(_zoom<15)
                        {
                            c=Math.pow(2,15-_zoom)
                        }
                        if(i%c==0)
                        {
                            data1[i]=data1[i].split(',')
                            data2.push(data1[i])
                        }
                    }
                    if(d==9)
                    {
                        that.selectData.subcompartment.push(data2)
                    }
                    if(d==3||d==1||d==2)
                    {
                        that.selectData.functionalArea.push(data2)
                    }
                    that.setPolygonShow('保护地', data2,'#87cd53','#608587',1)
                }
            },
            // 缩小等级切换
            zoomShow:function(){
                let that=this
                map.on('zoomstart', function () {
                    // map.clearMap();
                    // that.mapBul()
                    // that.setLineShow()
                    console.log('开始缩放')
                    console.log('当前等级：'+map.getZoom())
                });
                map.on('zoomchange', function () {

                    console.log('正在缩放')
                    console.log('当前等级：'+map.getZoom())
                });
                map.on('zoomend', function () {
                    console.log('缩放结束')
                    console.log('当前等级：'+map.getZoom())
                });
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
<style scoped src="@/styles/mapShow.css">

</style>
<style>


</style>
