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
        <div class="titleShow">植物大纲</div>
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

        <div class="showBigShow">
          <!--    目展示-->
          <div class="orderShowBox">
            <ul>
              <li
                v-for="(item,index) in orderList"
                :key="index"
                class="orderItem"
                @click="getFamilyList(index)"
                :class="orderActive==index?'active':''">
                {{item.name}}
              </li>
            </ul>
          </div>

          <!--    列表展示-->
          <div class="showListBox">
            <!-- 科列表-->
            <div v-if="pageStatus==0" class="familyShowBox">
              <div v-for="(item,index) in familyList" :key="index" class="familItem">
                <div class="familyTitleShow">
                  <div class="familyTitle">{{item.name}}（{{item.num}}种）</div>
                  <div class="familyTitleBtn">
                    <a @click="pageShowNow(1)">查看全部</a>
                  </div>
                </div>
                <div class="familyShowList">
                  <div v-for="(itemc,indexc) in item.children" :key="indexc" class="familyListItem"  @click="pageShowNow(2)">
                    <div class="familyItemImg">
                      <img :src="itemc.img" alt="图片">
                    </div>
                    <div class="familyItemName">
                      {{itemc.name}}
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
                    <a class="speciesCrumbA"  @click="getFamilyList(0)">大纲</a>
                  </el-breadcrumb-item>
                  <el-breadcrumb-item class="speciesCrumbItem">
                    <a class="speciesCrumbA" >蕉鹃科</a>
                  </el-breadcrumb-item>
                </el-breadcrumb>
              </div>
              <div class="speciesListShow">
                <div v-for="(item,index) in speciesList" :key="index" class="speciesItem"  @click="getDataDetail()">
                  <div class="speciesImg">
                    <img :src="item.img" alt="图片">
                  </div>
                  <div class="speciesDataShow">
                    <div class="speciesItemName">{{item.name}}</div>
                    <div class="speciesItemEnName">{{item.Enname}}</div>
                    <div class="speciesItemText">{{item.text}}</div>
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
                    <a class="speciesCrumbA"  @click="getFamilyList(0)">大纲</a>
                  </el-breadcrumb-item>
                  <el-breadcrumb-item class="speciesDataCrumbItem">
                    <a class="speciesCrumbA" @click="getSpeciesList()">满江红科</a>
                  </el-breadcrumb-item>
                  <el-breadcrumb-item class="speciesDataCrumbItem">
                    <a class="speciesCrumbA" >破铜钱草</a>
                  </el-breadcrumb-item>
                </el-breadcrumb>
              </div>
              <div class="dataShouBox">
                <!--                    顶部部分-->
                <div class="dataTopBox">
                  <!--                      左边的图和名展示-->
                  <div class="dataTopLeft">
                    <div class="dataImg">
                      <img src="https://ss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=2214286946,3875766843&fm=74&app=80&f=JPEG&size=f121,90" alt="图片">
                    </div>
                    <div class="dataName">
                      <div class="dataNameName">破铜钱草</div>
                      <div class="dataNamePinyin">dà lán jiāo juān</div>
                      <div class="dataNameEnName">Corythaeola cristata</div>
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
                          <div class="typeDataItem">银杏目</div>
                          <div class="typeDataItem">满江红科</div>
                          <div class="typeDataItem">破铜钱草属</div>
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
                        <div class="levelDataItem">未列入</div>
                        <div class="levelDataItem">未列入</div>
                        <div class="levelDataItem">未列入</div>
                        <div class="levelDataItem">未列入</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!--                    底部部分-->
                <div class="dataBottonBox">
                  <div class="dataTitle">详细内容</div>
                  <div class="dataListBox">
                    <div class="dataListItem">
                      <div class="dataItemTitle">
                        <div class="dataItemTitleText">别名</div>
                        <div class="dataItemTitleIco">
                          <img src="@/assets/img/index/bird.png" alt="鸟儿">
                        </div>
                      </div>
                      <div class="dataItemText">
                        都是满江红呀啊啊啊啊啊啊
                      </div>
                    </div>
                    <div class="dataListItem">
                      <div class="dataItemTitle">
                        <div class="dataItemTitleText">别名</div>
                        <div class="dataItemTitleIco">
                          <img src="@/assets/img/index/bird.png" alt="鸟儿">
                        </div>
                      </div>
                      <div class="dataItemText">
                        都是满江红呀啊啊啊啊啊啊都是满江红呀啊啊啊啊啊啊都是满江红呀啊啊啊啊啊啊都是满江红呀啊啊啊啊啊啊都是满江红呀啊啊啊啊啊啊都是满江红呀啊啊啊啊啊啊都是满江红呀啊啊啊啊啊啊
                      </div>
                    </div>
                    <div class="dataListItem">
                      <div class="dataItemTitle">
                        <div class="dataItemTitleText">别名</div>
                        <div class="dataItemTitleIco">
                          <img src="@/assets/img/index/bird.png" alt="鸟儿">
                        </div>
                      </div>
                      <div class="dataItemText">
                        都是满江红呀啊啊啊啊啊啊呀啊啊啊啊啊啊
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
    export default {
        name: "plantDialog",
        props: {
            plantDialogVisible: {
                type: Boolean,
                default: false
            },
            iddd:{
                type: Number,
                default:'1'
            }
        },
        data(){
            return{
                // 纲的所选值
                classActive:'second',
                // 目的所需值
                orderActive:0,
                // 页面展示的状态模块
                pageStatus:0,
                // 目的列表数据
                orderList:[
                    {
                        name:'柳絮目'
                    },
                    {
                        name:'槐叶苹目'
                    },
                    {
                        name:'银杏目'
                    },
                    {
                        name:'水龙骨目'
                    },

                ],
                // 科的列表数据
                familyList:[
                    {
                        name:'满江红科',
                        num:'15',
                        children:[
                            {
                                name:'破铜钱草',
                                img:'https://ss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=2214286946,3875766843&fm=74&app=80&f=JPEG&size=f121,90'
                            },
                            {
                                name:'破铜钱草',
                                img:'https://ss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=2214286946,3875766843&fm=74&app=80&f=JPEG&size=f121,90'
                            },
                            {
                                name:'破铜钱草',
                                img:'https://ss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=2214286946,3875766843&fm=74&app=80&f=JPEG&size=f121,90'
                            },
                            {
                                name:'破铜钱草',
                                img:'https://ss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=2214286946,3875766843&fm=74&app=80&f=JPEG&size=f121,90'
                            },
                            {
                                name:'破铜钱草',
                                img:'https://ss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=2214286946,3875766843&fm=74&app=80&f=JPEG&size=f121,90'
                            },
                            {
                                name:'破铜钱草',
                                img:'https://ss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=2214286946,3875766843&fm=74&app=80&f=JPEG&size=f121,90'
                            },
                            {
                                name:'破铜钱草',
                                img:'https://ss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=2214286946,3875766843&fm=74&app=80&f=JPEG&size=f121,90'
                            },

                        ]
                    },
                    {
                        name:'满江红科',
                        num:'15',
                        children:[
                            {
                                name:'破铜钱草',
                                img:'https://ss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=2214286946,3875766843&fm=74&app=80&f=JPEG&size=f121,90'
                            },
                            {
                                name:'破铜钱草',
                                img:'https://ss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=2214286946,3875766843&fm=74&app=80&f=JPEG&size=f121,90'
                            },
                            {
                                name:'破铜钱草',
                                img:'https://ss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=2214286946,3875766843&fm=74&app=80&f=JPEG&size=f121,90'
                            },
                            {
                                name:'破铜钱草',
                                img:'https://ss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=2214286946,3875766843&fm=74&app=80&f=JPEG&size=f121,90'
                            },
                            {
                                name:'破铜钱草',
                                img:'https://ss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=2214286946,3875766843&fm=74&app=80&f=JPEG&size=f121,90'
                            },
                            {
                                name:'破铜钱草',
                                img:'https://ss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=2214286946,3875766843&fm=74&app=80&f=JPEG&size=f121,90'
                            },
                            {
                                name:'破铜钱草',
                                img:'https://ss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=2214286946,3875766843&fm=74&app=80&f=JPEG&size=f121,90'
                            },

                        ]
                    },
                ],
                // 种的列表数据
                speciesList:[
                    {
                        name:'破铜钱草',
                        Enname:'Corythaeola cristata',
                        text:'破铜钱草好好吃',
                        img:'https://ss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=2214286946,3875766843&fm=74&app=80&f=JPEG&size=f121,90'
                    },
                    {
                        name:'破铜钱草',
                        Enname:'Corythaeola cristata',
                        text:'破铜钱草好好吃',
                        img:'https://ss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=2214286946,3875766843&fm=74&app=80&f=JPEG&size=f121,90'
                    },
                    {
                        name:'破铜钱草',
                        Enname:'Corythaeola cristata',
                        text:'破铜钱草好好吃',
                        img:'https://ss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=2214286946,3875766843&fm=74&app=80&f=JPEG&size=f121,90'
                    }
                ]
            }
        },
        mounted(){




        },
        methods:{

            // 获取目列表
            getFamilyList(index){
                var that=this
                that.pageShowNow(0)
                that.orderActive=index
            },
            // 获取详情
            getDataDetail(){
                var that=this

                that.pageShowNow(2)
            },
            // 获取种列表
            getSpeciesList(){
                var that=this

                that.pageShowNow(1)
            },
            // 页面展示对应模块
            pageShowNow(status)
            {
                var that=this
                console.log(1)
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
        }
    }
</script>
<style>
  .el-progress-circle__track{
    stroke:#64a831;
  }
  /*弹出框*/
  .DialogVisible{
    width:1080px;
    height:820px;
  }
  .el-dialog__header{
    padding: 0;
  }
  .el-dialog__body{
    padding: 0;
  }


  /*固定弹出框在中间*/
  .el-dialog{
    margin:0 !important;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    /*height:600px;*/
    max-height:calc(100% - 30px);
    max-width:calc(100% - 30px);
  }
  .el-dialog .el-dialog__body {
    flex: 1;
    overflow: auto;
  }

  /*纲列表的切换tab*/
  .classShowBox .el-tabs__header{
    padding:  0 15px;
    margin:  0;
  }
  .classShowBox .el-tabs__nav-wrap::after{
    background: #fff;
  }
  .classShowBox .el-tabs__item{
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    padding: 0 10px;
    min-width: 80px;
    text-align: center;
  }
  .classShowBox .el-tabs__item:hover{
    color: #64a831;
  }
  .classShowBox .el-tabs__item.is-active {
    color: #64a831;
  }
  .classShowBox .el-tabs__active-bar{
    background-color:#64a831;
  }

  </style>

  <style scoped lang="scss">
  @import "../assets/iconFont/closeIcon/iconfont.css";


  /* 标题部分 */
  .dialogTitle{
    background: #64a831;
    display: flex;
    height: 56px;
    line-height: 56px;
    padding: 0 20px;
    color: #fff;
    font-size: 18px;
    justify-content: space-between;
  }

  .dialogClose{
    cursor: pointer;
  }


  /* 主要展示列表部分 */
  .dialogShow{

  }
  .showBigShow{
    display: flex;
    height: 764px;
    width: 100%;
    /* 目列表 */
    .orderShowBox{
      width: 110px;
      height: 100%;
      overflow: auto;
      .orderItem{
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        cursor: pointer;
        font-size: 16px;
      }
      .orderItem.active{
        width: 100%;
        background: #e9e9e9;
        color: #70ad45;
      }
    }
  // 列表展示
    .showListBox{
      width: 970px;
      height: 100%;
      overflow: auto;
      background: #e9e9e9;
    // 科列表
      .familyShowBox{
        .familItem{
          width: 950px;
          background: #fff;
          margin:  16px auto 16px auto;
        // 标题
          .familyTitleShow{
            font-size: 16px;
            display: flex;
            justify-content: space-between;
            padding: 0 24px ;
            height: 52px;
            line-height: 52px;
            .familyTitle{
              color: #888888;
            }
            .familyTitleBtn{
              height: 36px;
              width: 90px;
              a{
                margin-top: 7px;
                width: 100%;
                height: 100%;
                background: #64a831;
                text-align: center;
                line-height: 36px;
                color: #fff;
                display: inline-block;
              }
            }
          }
        // 科列表展示
          .familyShowList{
            padding: 5px 0 0 25px;
            display: flex;
            flex-wrap:wrap;
            .familyListItem{
              box-shadow: 0 0 10px #ddd;
              margin-right: 25px;
              margin-bottom: 25px;
              width: 160px;
              cursor: pointer;
              .familyItemImg{
                img{
                  width: 160px;
                  height: 110px;
                }
              }
              .familyItemName{
                height: 50px;
                line-height: 50px;
                font-size: 16px;
                text-align: center;
              }
            }
          }
        }
      }

    // 种列表
      .speciesShowBox{
      // 页头
        .speciesCrumbShow{
          width: 916px;
          background: #fff;
          margin: 20px auto;
          height: 60px;
          padding: 0 0 0 24px;
          .speciesCrumbItem{
            font-size: 16px;
            line-height: 60px;
          }
        }
      // 种列表展示
        .speciesListShow{
          padding: 0 0 0 20px;
          display: flex;
          flex-wrap: wrap;
          .speciesItem{
            margin: 0 20px 20px 0;
            width: 455px;
            height: 140px;
            background: #fff;
            display: flex;

            .speciesImg{
              width: 230px;
              height: 100%;
              img{
                width: 100%;
                height: 100%;
              }
            }
            .speciesDataShow{
              padding: 20px 20px 0 20px;
              font-size: 16px;
              .speciesItemName{
                font-size: 16px;
                line-height: 30px;
              }
              .speciesItemEnName{
                color: #888888;
                font-style: italic;
                line-height: 40px;
              }
              .speciesItemText{
                color: #888888;
              }
            }
          }
        }
      }

    // 详情样式
      .speciesDataBox{
      // 页头
        .speciesDataCrumbShow{
          width: 916px;
          background: #fff;
          margin: 20px auto;
          height: 60px;
          padding: 0 0 0 24px;
          .speciesDataCrumbItem{
            font-size: 16px;
            line-height: 60px;
          }
        }
      // 数据的展示
        .dataShouBox{
          margin: 20px auto;
          width: 940px;
        // 头部
          .dataTopBox{
            width: 100%;
            height: 140px;
            display: flex;
          // 头部的左边
            .dataTopLeft{
              display: flex;
              background: #fff;
              width: 460px;
              margin: 0 20px 0 0;
              .dataImg{
                width: 210px;
                height: 100%;
                img{
                  width: 100%;
                  height: 100%;
                }
              }
              .dataName{
                padding: 10px 20px 0 20px;
                .dataNameName{
                  font-size: 20px;
                  line-height: 40px;
                  color: #313233;
                }
                .dataNamePinyin{
                  font-size: 16px;
                  color:#888888;
                  font-style: italic;
                  line-height: 40px;
                }
                .dataNameEnName{
                  font-size: 16px;
                  color:#888888;
                  font-style: italic;
                }
              }
            }
          // 头部的右边
            .dataTopRight{
              background: #fff;
              width: 460px;
              .typeTitle{
                width: 80px;
                background: #64a831;
                color: #fff;
                text-align: center;
                height: 25px;
                font-size: 16px;
                line-height: 25px;
              }
              .typeList{
                display: flex;
                .typeShow{
                  padding: 10px 0 0 0 ;
                  .typeNameList{
                    display: flex;
                    line-height: 36px;
                    border-bottom: 1px solid #ddd;
                    width: 336px;
                    margin: 0 28px;
                    .typeNameItem{
                      width: 112px;
                      text-align: center;
                      font-size: 16px;
                      color: #888888;
                    }
                  }
                  .typeDataList{
                    display: flex;
                    width: 336px;
                    margin: 0 28px;
                    .typeDataItem{
                      padding: 10px 0 0 0 ;
                      width: 112px;
                      text-align: center;
                      font-size: 16px;
                    }
                  }
                }
                .typeAudio{
                  position: relative;

                  img{
                    position: absolute;
                    top:20px;
                    left: 6px;
                    width: 42px;
                    height: 42px;
                    z-index: 99;
                  }
                  .progress_box{
                    position: absolute;
                    z-index: 9;
                    top: 15px;
                    left: 0;
                    width:60px;
                    height: 60px;

                    position: relative;
                    .progress_canvas{
                      position: absolute;
                      top: 0;
                      left: 0;
                      width:60px;
                      height: 60px;
                    }
                    .cavasbottopm{
                      z-index: 9;
                    }
                    .cavastop{
                      z-index: 99;
                    }
                  }
                }
              }
            }
          }

        // 中间部分
          .dataMidBox{
            background: #fff;
            width: 100%;
            margin: 20px 0;
            .levelTitle{
              width: 80px;
              background: #64a831;
              color: #fff;
              text-align: center;
              height: 25px;
              font-size: 16px;
              line-height: 25px;
            }
            .levelList{
              .levelShow{
                .levelNameList{
                  display: flex;
                  width: 864px;
                  margin: 0 auto;
                  border-bottom: 1px solid #ddd;
                  height: 80px;
                  text-align: center;
                  justify-content: center;
                  align-items:center;
                  .levelNameItem{
                    width: 120px;
                    padding: 0 47px;
                    font-size: 16px;
                    color: #888888;
                  }
                }
                .levelDataList{
                  display: flex;
                  width: 864px;
                  margin: 0 auto;
                  padding: 10px 0 20px 0;
                  .levelDataItem{
                    text-align: center;
                    width: 216px;
                    font-size: 16px;
                    color: #313233;
                  }
                }
              }
            }
          }

        // 底部部分
          .dataBottonBox{
            background: #fff;
            width: 100%;
            margin: 20px 0;
            .dataTitle{
              width: 80px;
              background: #64a831;
              color: #fff;
              text-align: center;
              height: 25px;
              font-size: 16px;
              line-height: 25px;
            }
            .dataListBox{
              .dataListItem{
                .dataItemTitle{
                  position: relative;
                  padding: 10px 0 0 0;
                  .dataItemTitleText{
                    height: 24px;
                    font-size: 16px;
                    line-height: 24px;
                    color: #74b113;
                    width: 90px;
                    padding: 0 10px;
                    border-bottom: 1px solid #74b113;
                  }
                  .dataItemTitleIco{
                    position: absolute;
                    top: 13px;
                    left: 93px;
                    width: 20px;
                    height: 30px;
                    img{
                      width: 100%;
                      height: 100%;
                    }
                  }
                }
                .dataItemText{
                  padding: 15px 10px;
                  font-size: 16px;
                }
              }
            }
          }

        }
      }
    }
  }

  // 所有页头的A属性
  .speciesCrumbA{
    font-weight: 500;
  }
  .speciesCrumbA:hover{
    color: #000;
  }

  .showBigShow .orderShowBox::-webkit-scrollbar {display:none}
  .showListBox::-webkit-scrollbar {display:none}


  /* 科列表 */


</style>

