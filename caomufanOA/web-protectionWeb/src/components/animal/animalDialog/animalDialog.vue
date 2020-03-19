<template>
  <el-dialog
    :visible.sync="animalDialogVisible"
    :show-close="false"
    :before-close="cancelModal"
    :append-to-body="true"
    top="1vh"
    :close-on-press-escape="true"
    custom-class="DialogVisible plantDialogVisible"
  >
    <div class="dialogBody">
<!--      标题部分-->
      <div class="dialogTitle">
        <div class="titleShowBox">
          <div class="titleShow">动物大纲</div>
          <div class="searchShow">
            <div class="SearchInputBox">
              <div class="searchIcon">
                <i class="iconfont iconsousuo"></i>
              </div>
              <div class="searchInput">
                <input
                  type="text"
                  v-model="searchVal"
                  @keydown.enter="searchNow()"
                  placeholder="请输入你要搜索的动物">
              </div>
              <div class="searchBtn">
                <a @click="searchNow">搜索</a>
              </div>
            </div>
            <div class="returnBtn">
              <a v-show="returnPageStatus!=0" @click="returnPage">返回</a>
            </div>
          </div>
        </div>
        <div class="dialogClose">
          <i @click="cancelModal()" class=" iconfont icon-guanbi"></i>
        </div>
      </div>

<!--      主要展示列表-->
      <div class="dialogShow">
        <!--        搜索列表页面-->
        <div v-show="searchShowStatus" class="searchBox">
          <searchListPage
            ref="searchPage"
            @searchShowStatus="getSearchPageData"
            :searchVal="searchVal"
            :unitID="unitid"
          ></searchListPage>
        </div>

<!--        纲列表-->
        <div  v-show="!searchShowStatus" class="classShowBox">
          <el-tabs v-model="classActive" @tab-click="getOrderListNow">
            <el-tab-pane
              v-for="(item,index) in classList"
              :label="item"
              :key="index"
              :name="item"></el-tab-pane>
          </el-tabs>
        </div>

        <div  v-show="!searchShowStatus" class="showBigShow">

      <!--    目展示-->
          <div class="orderShowBox">
            <el-scrollbar style="height: 100%">
              <ul>
                <li
                  v-for="(item,index) in orderList"
                  :key="index"
                  class="orderItem"
                  @click="getFamilyByOrder(item)"
                  :class="orderActive==item?'active':''">
                  {{item}}
                </li>
              </ul>
            </el-scrollbar>
          </div>

      <!--    列表展示-->
          <div class="showListBox">
            <el-scrollbar style="height: 100%">
              <!-- 科列表-->
              <div v-if="pageStatus==0" class="familyShowBox">
                <div v-for="(item,index) in familyList" :key="index" class="familItem">
                  <div class="familyTitleShow">
                    <div class="familyTitle">{{item.familyName}}（{{item.count}}种）</div>
                    <div class="familyTitleBtn">
                      <a @click="getSpeciesList(item.familyName)">查看全部</a>
                    </div>
                  </div>
                  <div class="familyShowList">
                    <div v-for="(itemc,indexc) in item.animals" :key="indexc" class="familyListItem"  @click="getDataDetail(itemc.animalID)">
                      <div class="familyItemImg">
                        <img v-if="itemc.img!=''&&itemc.img!=undefined" :src="itemc.img" alt="图片">
                        <img v-else src="@/assets/img/other/bird_Rectangle.png" alt="">
                      </div>
                      <div class="familyItemName">
                        {{itemc.animalName}}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

  <!--              种列表-->
              <div  v-else-if="pageStatus==1" class="speciesShowBox">
                <div class="speciesCrumbShow">
                  <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item class="speciesCrumbItem">
                      <a class="speciesCrumbA"  @click="getFamilyByOrder(orderActive)">大纲</a>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item class="speciesCrumbItem">
                      <a class="speciesCrumbA" >{{familyActive}}</a>
                    </el-breadcrumb-item>
                  </el-breadcrumb>
                </div>
                <div class="speciesListShow">
                  <div v-for="(item,index) in speciesList" :key="index" class="speciesItem"  @click="getDataDetail(item.animalID)">
                    <div class="speciesImg">
                      <img v-if="item.img!=''&&item.img!=undefined" :src="item.img" alt="图片">
                      <img v-else src="@/assets/img/other/bird_Rectangle.png" alt="">
                    </div>
                    <div class="speciesDataShow">
                      <div class="speciesItemName">{{item.animalName}}</div>
                      <div class="speciesItemEnName">{{item.scientificName}}</div>
                      <div class="speciesItemText">{{item.anotherName}}</div>
                    </div>
                  </div>
                </div>
              </div>

<!--            详情-->
                <div v-else-if="pageStatus==2" class="speciesDataBox">
<!--                  页头-->
                  <div class="speciesDataCrumbShow">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                      <el-breadcrumb-item class="speciesDataCrumbItem">
                        <a class="speciesCrumbA"  @click="getFamilyByOrder(orderActive)">大纲</a>
                      </el-breadcrumb-item>
                      <el-breadcrumb-item class="speciesDataCrumbItem">
                        <a class="speciesCrumbA" @click="getSpeciesList(familyActive)">{{familyActive}}</a>
                      </el-breadcrumb-item>
                      <el-breadcrumb-item class="speciesDataCrumbItem">
                        <a class="speciesCrumbA" >{{speciesActive}}</a>
                      </el-breadcrumb-item>
                    </el-breadcrumb>
                  </div>
                  <div class="dataShouBox">
<!--                    顶部部分-->
                    <div class="dataTopBox">
<!--                      左边的图和名展示-->
                      <div class="dataTopLeft">
                        <div class="dataImg">
                          <el-carousel v-show="speciesData.imgs!=''&&speciesData.imgs!=null" height="140px">
                            <el-carousel-item  v-for="item in speciesData.imgs" :key="item">
                              <img :src="item" >
<!--                              <el-image-->
<!--                                :src="item"-->
<!--                                z-index="9999999"-->
<!--                                :preview-src-list="speciesList.imgs">-->
<!--                              </el-image>-->
                            </el-carousel-item>
                          </el-carousel>
                          <img v-show="speciesData.imgs==''||speciesData.imgs==null"
                            src="@/assets/img/other/bird_Rectangle.png"
                            >
                          </img>
                        </div>
                        <div class="dataName">
                          <div class="dataNameName">{{speciesData.animalName}}</div>
                          <div class="dataNamePinyin">{{speciesData.pinYin}}</div>
                          <div class="dataNameEnName">{{speciesData.scientificName}}</div>
                        </div>
                      </div>
<!--                      右边的物种分类和声音播放-->
                      <div class="dataTopRight">
                        <div class="typeTitle">物种分类</div>
                        <div class="typeList">
                          <div class="typeShow">
                            <div class="typeNameList">
                              <div class="typeNameItem">目名</div>
                              <div class="typeNameItem">科名</div>
                              <div class="typeNameItem">属名</div>
                            </div>
                            <div class="typeDataList">
                              <div class="typeDataItem">{{speciesData.orderName}}</div>
                              <div class="typeDataItem">{{speciesData.familyName}}</div>
                              <div class="typeDataItem">{{speciesData.genusName}}</div>
                            </div>
                          </div>
                          <div class="typeAudio">
                            <img  @click="playerAudio" :hidden="playIng" src="@/assets/img/index/shengyin11.png" alt="声音">
                            <img @click="stopAudio" :hidden="!playIng" src="@/assets/img/index/zanting.png" alt="声音">
                            <div class='progress_box'>
                              <el-progress
                                class="audioPro"
                                type="circle"
                                :stroke-width='3'
                                :text-inside="false"
                                :width="52"
                                :percentage="playPro"
                                color="#ddd"></el-progress>
<!--                              <canvas  class="progress_canvas cavasbottopm"   id="canvasProgressbg">  </canvas>-->
<!--                              <canvas class="progress_canvas cavastop"   id="canvasProgress">  </canvas>-->
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

<!--                    中间部分-->
                    <div class="dataMidBox">
                      <div class="levelTitle">保护等级</div>
                      <div class="levelList">
                        <div class="levelShow">
                          <div class="levelNameList">
                            <div class="levelNameItem">国家保护等级</div>
                            <div class="levelNameItem">中国脊椎动物 红色名录等级 （2015-05）</div>
                            <div class="levelNameItem">IUCN等级 （2017-03）</div>
                            <div class="levelNameItem">CITES附录等级</div>
                          </div>
                          <div class="levelDataList">
                            <div class="levelDataItem">{{speciesData.chinaLv}}</div>
                            <div class="levelDataItem">{{speciesData.cnRedLv}}</div>
                            <div class="levelDataItem">{{speciesData.iUCNLv}}</div>
                            <div class="levelDataItem">{{speciesData.cITESLv}}</div>
                          </div>
                        </div>
                      </div>
                    </div>

<!--                    底部部分-->
                    <div class="dataBottonBox" v-if="speciesData.animalInfo!=''&&speciesData.animalInfo!=null">
                      <div class="dataTitle">详细内容</div>
                      <div class="dataListBox">
                        <div v-for="(item,index) in speciesData.animalInfo" class="dataListItem" :key="index">
                          <div class="dataItemTitle">
                            <div class="dataItemTitleText">{{item.title}}</div>
                            <div class="dataItemTitleIco">
<!--                              <img src="@/assets/img/index/bird.png" alt="鸟儿">-->
                            </div>
                          </div>
                          <div class="dataItemText">
                            {{item.content}}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </el-scrollbar>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
    import searchListPage from '../animalSearch/animalSearch.vue'
    import {getAnimalClass,getAnimalOrder,getAnimalByOrder,getAnimalDetail,getAnimalByFamily} from '@/api/components/animal/animalDialog.js'
    export default {
        name: "animalDialogVisible",
        props: ['animalDialogVisible','unitid'],
        data(){
          return{
              // 搜索列表的值
              searchVal:'',
              //搜索列表展示的状态
              searchShowStatus:false,
              // 返回按钮的状态 0不显示 1返回时的界面为大纲 2返回时的界面为搜索列表
              returnPageStatus:0,
              // 纲的所选值
              classActive:'',
              // 目的所选值
              orderActive:'',
              // 科的所选值
              familyActive:'',
              // 种的所选值
              speciesActive:'',
              // 播放的录音路径
              playUrl:'https://oss.caomufan.net/Birds/Records/1d7ad031d77a4a669fa3ca3af14996fd.mp3',
             // 定义一个新的录音事件
              nowAudio:'',
              // 是否正在播放
              playIng:false,
              // 播放事件的动画定时器
              countTimer:null,
              // 播放事件的动画定时器的数量
              count:0,
              // 播放事件的当前进度百分比
              playPro:0,
              // 页面展示的状态模块
              pageStatus:0,
              //纲的列表数据
              classList:[],
              // 目的列表数据
              orderList:[],
              // 科的列表数据
              familyList:[],
              // 种的列表数据
              speciesList:{},
              // 种的详情
              speciesData:{}
          }
        },
        created(){

        },
        mounted(){
          var that=this
          that.initpage()
        },
        methods:{
            // 初始化页面
            initpage()
            {
              var that= this

                that.getClassList()
            },
            // 返回按钮的状态
            returnPage(){
                var that=this
                let rPS=that.returnPageStatus
                if(rPS==1)
                {
                    that.searchShowStatus=false
                    that.pageStatus=0
                    that.returnPageStatus=0
                }else if(rPS==2)
                {
                    that.searchShowStatus=true
                    that.pageStatus=1
                    that.returnPageStatus=1
                }
                console.log(that.speciesList)
            },
            // 获取从搜索列表页面返回的数据
            getSearchPageData(data){
                var that=this
                that.searchShowStatus=data.searchShowStatus
                that.pageStatus=data.pageStatus
                that.returnPageStatus=data.returnPageStatus
                that.getDataDetail(data.id)
            },
            // 点击搜索
            searchNow(){
                var that=this
                let _searchVal=that.searchVal
                if(_searchVal.length>0)
                {
                    that.searchShowStatus=true
                    this.$refs.searchPage.getShowList(_searchVal);
                    that.returnPageStatus=1
                }else{
                    this.$message({
                        message: '请在搜索框输入动物名称',
                        type: 'warning'
                    });
                }

            },
            // 播放录音
            playerAudio(){
                var that=this
                that.nowAudio = new Audio()
                var audio=that.nowAudio
                if(that.speciesList.vioceUrl)
                {
                    audio.src = that.speciesList.vioceUrl

                    if(audio.paused)
                    {
                        let playPromise;
                        playPromise = audio.play();
                        if (playPromise) {
                            playPromise.then((res) => {
                                let _aduioDuration = that.nowAudio.duration.toFixed(2)
                                console.log(that.count)
                                that.countTimer=setInterval(
                                    function () {
                                        if (that.count < _aduioDuration) {
                                            console.log(parseInt(((that.count / _aduioDuration )*100)))
                                            that.playPro=parseInt(((that.count / _aduioDuration )*100))
                                            that.count=that.count+0.1;
                                        } else {
                                            clearInterval(that.countTimer);
                                            that.playPro=0
                                            that.count=0
                                            that.playIng=false
                                        }
                                    },100)
                                that.playIng=true
                                // 音频加载成功
                                // 音频的播放需要耗时
                                console.log(res)
                            }).catch((e) => {
                                // 音频加载失败
                                console.error(e);
                            });
                        }
                    }else{
                        console.log('在播放呀')
                    }
                }else{
                    this.$message.warning('数据库暂未录入该动物声音');
                }


            },
            // 停止录音
            stopAudio(){
                var that=this
                that.playIng=false
                that.playPro=0
                that.count=0
                clearInterval(that.countTimer);
                var audio=that.nowAudio
                audio.pause();

            },
            // 获取纲列表
            getClassList(){
                var that=this
                getAnimalClass(
                    {
                        UnitID:that.unitid
                    }
                ).then(res=>{
                    that.classList=res.result
                    if(res.result.length>0)
                    {
                        that.classActive=res.result[0]
                        this.getOrderListNow()
                    }
                    that.returnPageStatus=0
                })
            },
            // 根据纲获取目列表
            getOrderListNow(tab, event){
                    // console.log(tab, event);
                var that=this
                getAnimalOrder(
                    {
                        UnitID:that.unitid,
                        className:that.classActive
                    }
                ).then(res=>{
                    that.orderList=res.result
                    that.returnPageStatus=0
                    if(res.result.length>0)
                    {
                        that.orderActive=res.result[0]
                        this.getFamilyByOrder(that.orderActive)
                    }
                })
            },
            // 根据目获取科与动物详情的列表
            getFamilyByOrder(name){
                var that=this
                that.pageShowNow(0)
                that.orderActive=name
                getAnimalByOrder(
                    {
                        UnitID:that.unitid,
                        OrderName:that.orderActive,
                        maxCount:10
                    }
                ).then(res=>{
                    that.familyList=res.result
                    that.returnPageStatus=0
                    if(res.result.length>0){}
                })
            },
            // 根据目获取科列表
            getFamilyList(name){
              var that=this
                that.orderActive=name

                that.pageShowNow(0)

            },
            // 获取详情
            getDataDetail(dataId){
                // // 纲的所选值
                // classActive:'',
                //     // 目的所选值
                //     orderActive:'',
                //     // 科的所选值
                //     familyActive:'',
                //     // 种的所选值
                //     speciesActive:'',
                var that=this
                getAnimalDetail(
                    {
                        animalID:dataId
                    }
                ).then(res=>{
                    if(res.messageType==0)
                    {
                        that.speciesData=res.result
                        that.classActive=res.result.className
                        that.orderActive=res.result.orderName
                        that.familyActive=res.result.familyName
                        that.speciesActive=res.result.animalName

                        getAnimalOrder(
                            {
                                UnitID:that.unitid,
                                className:that.classActive
                            }
                        ).then(res=>{
                            that.orderList=res.result
                        })
                    }
                    that.pageShowNow(2)
                })

            },
            // 根据科获取种列表
            getSpeciesList(name){
                var that=this
                getAnimalByFamily(
                    {
                        unitID:that.unitid,
                        familyName:name
                    }
                ).then(res=>{
                  console.log(res)
                    that.speciesList=res.result.animals
                    that.familyActive=res.result.familyName
                    that.returnPageStatus=0
                    that.pageShowNow(1)
                })
            },
            // 页面展示对应模块
            pageShowNow(status)
            {
                var that=this
                that.pageStatus=status
            },
            // 关闭页面
            cancelModal(){
                var that=this

                // 判断是否有录音在播放中
                if(that.nowAudio)
                {
                    that.stopAudio()
                }

                // 关闭弹窗，触发父组件修改visible值
                this.$emit('update:animalDialogVisible', false);

            },
            // 画布绘制圆形播放动画
            writeCircle(){
                    var canvas=document.getElementById('canvasProgressbg')
                    var context= canvas.getContext("2d")
                    // canvasProgressbg canvasProgress
                    context.scale(2,2);
                    context.save();         //save和restore可以保证样式属性只运用于该段canvas元素
                    context.beginPath();    //开始路径
                    context.strokeStyle = "#EEF0F5";       //设置边线的颜色
                    context.lineWidth = 5;
                    context.arc(30, 30, 20, 0, Math.PI * 2, false);      //画一个圆的路径
                    context.stroke();       //绘制边线
//      this.context.restore();
                    context.closePath();


            },
        },
        components:
            {
                'searchListPage':searchListPage
            }
    }
</script>
<style>
  @import "./public.scss";

</style>

<style scoped lang="scss">
  @import "../../../assets/iconFont/closeIcon/iconfont.css";
  @import "../../../assets/iconFont/searchIcon/iconfont.css";
  @import "./animalDialog.scss";


</style>
