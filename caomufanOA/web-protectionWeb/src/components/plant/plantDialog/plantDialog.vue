<template>
  <el-dialog
    :visible.sync="plantDialogVisible"
    :show-close="false"
    :before-close="cancelModal"
    :close-on-press-escape="true"
    custom-class="DialogVisible plantDialogVisible"
  >
    <div class="dialogBody">
      <!--      标题部分-->
      <div class="dialogTitle">
        <div class="titleShowBox">
          <div class="titleShow">植物大纲</div>
          <div class="searchShow">
            <div class="SearchInputBox">
              <div class="searchIcon">
                <i class="iconfont iconsousuo"></i>
              </div>
              <div class="searchInput">
                <input type="text" v-model="searchVal" placeholder="请输入你要搜索的植物">
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
        <!--        纲列表-->
<!--        <div class="classShowBox">-->
<!--          <el-tabs v-model="classActive">-->
<!--            <el-tab-pane label="鸟纲" name="first"></el-tab-pane>-->
<!--            <el-tab-pane label="兽纲" name="second"></el-tab-pane>-->
<!--            <el-tab-pane label="爬行纲" name="third"></el-tab-pane>-->
<!--            <el-tab-pane label="鱼纲" name="fourth"></el-tab-pane>-->
<!--            <el-tab-pane label="蝶纲" name="five"></el-tab-pane>-->
<!--          </el-tabs>-->
<!--        </div>-->
<!--        搜索列表页面-->
        <div v-show="searchShowStatus" class="searchBox">
          <searchListPage
            ref="searchPage"
            @searchShowStatus="getSearchPageData"
            :unitID="unitid"
            :searchVal="searchVal"></searchListPage>
        </div>

<!--        图鉴列表展示页面-->
        <div v-show="!searchShowStatus" class="showBigShow">
          <!--    科展示-->
          <div class="orderShowBox">
            <el-scrollbar style="height: 100%">
              <ul>
                <li
                  v-for="(item,index) in FamilyList"
                  :key="index"
                  class="orderItem"
                  @click="getGenusByFamily(item)"
                  :class="familyActive==item?'active':''">
                  {{item}}
                </li>
              </ul>
            </el-scrollbar>
          </div>

          <!--    列表展示-->
          <div class="showListBox">
            <el-scrollbar style="height: 100%">
              <!-- 属列表-->
              <div v-if="pageStatus==0" class="familyShowBox">
                <div v-for="(item,index) in genusList" :key="index" class="familItem">
                  <div class="familyTitleShow">
                    <div class="familyTitle">{{item.genusName}}（{{item.count}}种）</div>
                    <div class="familyTitleBtn">
                      <a @click="getGenusList(item.genusName)">查看全部</a>
                    </div>
                  </div>
                  <div class="familyShowList">
                    <div v-for="(itemc,indexc) in item.plants" :key="indexc" class="familyListItem"  @click="getDataDetail(itemc.plantID)">
                      <div class="familyItemImg">
                        <img v-if="itemc.img!=''&&itemc.img!=undefined" :src="itemc.img" alt="图片">
                        <img v-else src="@/assets/img/other/bird_Rectangle.png" alt="">
                      </div>
                      <div class="familyItemName">
                        {{itemc.plantName}}
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
                      <a class="speciesCrumbA"  @click="getGenusByFamily(familyActive)">大纲</a>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item class="speciesCrumbItem">
                      <a class="speciesCrumbA" >{{genusActive}}</a>
                    </el-breadcrumb-item>
                  </el-breadcrumb>
                </div>
                <div class="speciesListShow">
                  <div v-for="(item,index) in speciesList" :key="index" class="speciesItem"  @click="getDataDetail(item.plantID)">
                    <div class="speciesImg">
                      <img v-if="item.img!=''&&item.img!=undefined" :src="item.img" alt="图片">
                      <img v-else src="@/assets/img/other/bird_Rectangle.png" alt="">
                    </div>
                    <div class="speciesDataShow">
                      <div class="speciesItemName" :title='item.plantName'>{{item.plantName}}</div>
                      <div class="speciesItemEnName" :title="item.scientificName">{{item.scientificName}}</div>
                      <div class="speciesItemText" :title="item.anotherName">{{item.anotherName}}</div>
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
                      <a class="speciesCrumbA"  @click="getGenusByFamily(familyActive)">大纲</a>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item class="speciesDataCrumbItem">
                      <a class="speciesCrumbA" @click="getGenusList(genusActive)">{{genusActive}}</a>
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
                      </div>
                      <div class="dataName">
                        <div class="dataNameName">{{speciesData.name}}</div>
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
                          <div class="levelNameItem">保护批次</div>
                          <div class="levelNameItem">是否受保护</div>
                          <div class="levelNameItem"></div>
                        </div>
                        <div class="levelDataList">
                          <div class="levelDataItem">{{speciesData.nationalProtectionLevel}}</div>
                          <div class="levelDataItem">{{speciesData.protectBatch}}</div>
                          <div class="levelDataItem">{{speciesData.protect}}</div>
                          <div class="levelDataItem"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!--                    底部部分-->
                  <div class="dataBottonBox">
                    <div class="dataTitle">详细内容</div>
                    <div class="dataListBox">
                      <div v-for="(item,index) in speciesData.plantInfo" class="dataListItem" :key="index">
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
    import searchListPage from '../plantSearch/plantSearch.vue'
    import {getPlantFamily,getPlantByFamily,getPlantDetail,getPlantByGenus} from '@/api/components/plant/plantDialog.js'
    export default {
        name: "plantDialog",
        props: ['plantDialogVisible','unitid'],
        data(){
            return{
                // 搜索列表的值
                searchVal:'',
                //搜索列表展示的状态
                searchShowStatus:false,
                // 返回按钮的状态
                returnPageStatus:0,
                // 科的所需值
                familyActive:'',
                // 属的所需值
                genusActive:'',
                // 种的所需值
                speciesActive:'',
                // 页面展示的状态模块
                pageStatus:0,
                // 科的列表数据
                FamilyList:[],
                // 属的列表数据
                genusList:[],
                // 种的列表数据
                speciesList:[],
                // 种的详情数据
                speciesData:{}
            }
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
                that.getFamilyList()
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
            },
            // 获取从搜索列表页面返回的数据
            getSearchPageData(data){
                var that=this
                console.log(data)
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
                        message: '请在搜索框输入植物名称',
                        type: 'warning'
                    });
                }

            },
            // 获取所有的科
            getFamilyList(){
                var that=this;
                console.log(that.unitid)

                getPlantFamily(
                    {'UnitID':that.unitid}
                ).then(res=>{
                    that.FamilyList=res.result
                    if(res.result.length>0)
                    {
                        that.familyActive=res.result[0]
                        this.getGenusByFamily(that.familyActive)
                    }
                    that.pageShowNow(0)
                    that.returnPageStatus=0
                })
            },
            // 获取详情
            getDataDetail(dataId){
                var that=this
                // // 科的所需值
                // familyActive:'',
                //     // 属的所需值
                //     genusActive:'',
                //     // 种的所需值
                //     speciesActive:'',

                getPlantDetail(
                    {
                        PlantID:dataId
                    }
                ).then(res=>{
                    if(res.messageType==0)
                    {
                        that.speciesData=res.result
                        that.familyActive=res.result.familyName
                        that.genusActive=res.result.genusName
                        that.speciesActive=res.result.name
                    }
                    that.pageShowNow(2)
                })
            },
            // 根据科获取属列表
            getGenusList(name){
                var that=this
                getPlantByGenus(
                    {
                        'UnitID':that.unitid,
                        'GenusName':name
                    }
                ).then(res=>{
                    that.genusActive=res.result.genusName
                    that.speciesList=res.result.plants
                    that.returnPageStatus=0
                    that.pageShowNow(1)
                })
            },
            // 根据科获取属列表与植物详情的列表
            getGenusByFamily(name){
                var that=this
                that.familyActive=name
                getPlantByFamily(
                    {UnitID:that.unitid,familyName:name,maxCount:10}
                ).then(res=>{
                    that.genusList=res.result
                    that.returnPageStatus=0
                    that.pageShowNow(0)
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
                this.$emit('update:plantDialogVisible', false);

            },
        },
        components:
            {
                'searchListPage':searchListPage
            }
    }
</script>
<style>
  @import "./publis.scss";
  </style>

  <style scoped lang="scss">
  @import "../../../assets/iconFont/closeIcon/iconfont.css";
  @import "../../../assets/iconFont/searchIcon/iconfont.css";
  @import "./plantDialog.scss";


  </style>

