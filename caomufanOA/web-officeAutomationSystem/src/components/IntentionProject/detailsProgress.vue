<template>
  <div>
    <!-- 遮罩层弹窗 -->
    <div class="popup" ref="mask" v-show="isShow">
      <div class="popup_view">
        <!-- 头部 -->
        <div style="height: 50px;" class="popupTitle">
          <span>进度详情</span>
          <i class="iconfont icon-guanbi" id="fork_cha" @click="cancel()"></i>
        </div>
        <!-- 内容 -->
        <div class="popupContent">
          <!-- 标题信息 -->
          <div class="popupContentMilepost">
            <div class="milepostInfo">
              <span>里程碑阶段3</span>
              <span>
                <span style="width: 150px;color: #888888;">负责人：</span>
                <span style="width: 150px;color: #888888;">截至时间：</span>
              </span>
            </div>
            <div class="milepostInfo">
              <span>
                收款金额：
                <span class="avatarCen">10000</span>
              </span>
              <span class="avatarInfo" style="margin-top: 15px;">
                <span class="avatarInfo" style="width: 150px;">
                  <el-avatar :size="45" :src="circleUrl" style="margin-right: 10px;"></el-avatar>张三丰
                </span>
                <span
                  class="avatarCen"
                  style="width: 150px;align-items: center;display: inline-flex;"
                >
                  <i
                    class="iconfont icon-jiezhishijian"
                    style="font-size: 25px;margin-right: 10px;"
                  ></i>2020-02-02
                </span>
              </span>
            </div>
          </div>
          <!-- 子任务 -->
          <div class="subTask">
            <div class="subTaskTitle">
              <span>
                <i class="iconfont icon-zirenwu"></i>子任务
              </span>
              <span style="color:#82BC69">5/5</span>
            </div>
            <el-progress :percentage="100" status="success" style="margin: 10px 0;"></el-progress>
          </div>
          <ul class="subTaskNum">
            <li>
              <p class="subTaskNum_xiao">1.啊实打实大苏打实打实大啊实打实大苏打实打实大啊实打实大苏打实打实大啊实打实大苏打实打实大啊实打实大苏打实打实大苏打</p>
              <span
                class="avatarTime"
                style="width: 150px;align-items: center;display: inline-flex;"
              >
                <i class="iconfont icon-jiezhishijian" style="font-size: 25px;margin-right: 10px;"></i>2020-02-02
              </span>
            </li>
            <li>
              <p class="subTaskNum_xiao">1.啊实打实大苏打实打实大啊实打实大苏打实打实大啊实打实大苏打实打实大啊实打实大苏打实打实大啊实打实大苏打实打实大苏打</p>
              <span
                class="avatarTime"
                style="width: 150px;align-items: center;display: inline-flex;"
              >
                <i class="iconfont icon-jiezhishijian" style="font-size: 25px;margin-right: 10px;"></i>2020-02-02
              </span>
            </li>
            <li>
              <p class="subTaskNum_xiao">1.啊实打实大苏打实打实大啊实打实大苏打实打实大啊实打实大苏打实打实大啊实打实大苏打实打实大啊实打实大苏打实打实大苏打</p>
              <span
                class="avatarTime"
                style="width: 150px;align-items: center;display: inline-flex;"
              >
                <i class="iconfont icon-jiezhishijian" style="font-size: 25px;margin-right: 10px;"></i>2020-02-02
              </span>
            </li>
            <li>
              <p
                class="subTaskNum_you"
              >2.啊实打实大苏打实打实啊实打实大苏打实打实大啊实打实大苏打实打实大啊实打实大苏打实打实大啊实打实大苏打实打实大啊实打实大苏打实打实大大苏打</p>
              <span class="avatarTime">
                <i class="iconfont icon-jiezhishijian" style="font-size: 25px;"></i>
              </span>
            </li>
            <li>
              <p
                class="subTaskNum_you"
              >2.啊实打实大苏打实打实啊实打实大苏打实打实大啊实打实大苏打实打实大啊实打实大苏打实打实大啊实打实大苏打实打实大啊实打实大苏打实打实大大苏打</p>
              <span class="avatarTime">
                <i class="iconfont icon-jiezhishijian" style="font-size: 25px;"></i>
              </span>
            </li>
          </ul>
          <!-- 评论 -->
          <div class="comment">
            <div class="commentTitle">
              <span>
                <i class="iconfont icon-pinglun"></i>评论
              </span>
            </div>
            <ul class="commentNum">
              <li>
                <el-avatar :size="45" :src="circleUrl" style="margin-right: 10px;"></el-avatar>
                <div class="commentInfo">
                  <div class="commentInfoTitle">
                    <span>陈医生</span>
                    <span class="commentInfoTime">2020-02-22 &nbsp;&nbsp;&nbsp; 20:30:12</span>
                  </div>
                  <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
                </div>
                <span class="iconShan">
                  <i class="iconfont icon-shan"></i>
                </span>
              </li>
              <li>
                <el-avatar :size="45" :src="circleUrl" style="margin-right: 10px;"></el-avatar>
                <div class="commentInfo">
                  <div class="commentInfoTitle">
                    <span>陈医生</span>
                    <span class="commentInfoTime">2020-02-22 &nbsp;&nbsp;&nbsp; 20:30:12</span>
                  </div>
                  <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
                </div>
                <span class="iconShan">
                  <i class="iconfont icon-shan"></i>
                </span>
              </li>
              <li>
                <el-avatar :size="45" :src="circleUrl" style="margin-right: 10px;"></el-avatar>
                <div class="commentInfo">
                  <div class="commentInfoTitle">
                    <span>陈医生</span>
                    <span class="commentInfoTime">2020-02-22 &nbsp;&nbsp;&nbsp; 20:30:12</span>
                  </div>
                  <p>内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</p>
                </div>
                <span class="iconShan">
                  <i class="iconfont icon-shan"></i>
                </span>
              </li>
            </ul>
            <!-- 创建时间 -->
            <div class="establish">
              <span class="establisher">张三丰创建于：2020-02-22 &nbsp;20:30:12</span>
            </div>
          </div>
        </div>
        <!-- 底部 -->
        <div class="sending">
          <el-avatar :size="45" :src="circleUrl" style="margin-left: 23px;"></el-avatar>
          <el-input
            type="text"
            placeholder="评论文字上限2000字"
            v-model="commentText"
            maxlength="2000"
            show-word-limit
            style="width: 915px;"
          ></el-input>
          <button>发送</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["wenz", "urls"],
  data() {
    return {
      commentText: "", //评论文字
      isShow: true,
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    };
  },
  components: {},
  mounted() {
    // console.log(this.isShow)
    this.$refs.mask.style.height =
      document.getElementById("app").clientHeight + "px";
    if (this.isShow == false) {
      document.body.style.overflow = "visible";
    }
  },
  methods: {
    cancel() {
      let that = this;
      that.isShow = !that.isShow;
    }
  }
};
</script>

<style lang="scss" scoped>
.popup {
  width: 100%;
  background-color: rgba(178, 178, 178, 0.5);
  bottom: 0;
  left: 0;
  position: fixed;
  z-index: 998;
  min-height: 2000px;
  .popup_view {
    position: fixed;
    width: 1150px;
    height: 750px;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 1000;
    background-color: white;
    // 头部
    .popupTitle {
      height: 50px;
      border-bottom: 1px solid #dfdfdf;
      span {
        font-size: 16px;
        margin: 13px 0 0 20px;
        display: inline-block;
      }
    }
    // 内容
    .popupContent {
      padding: 0 40px;
      height: 625px;
      overflow-y: auto;
      //  标题信息
      .popupContentMilepost {
        padding: 25px 0;
        font-size: 16px;
        padding-left: 20px;
        .milepostInfo {
          display: flex;
          justify-content: space-between;
          align-items: center;

          span {
            display: inline-block;
          }
          .avatarInfo {
            display: inline-flex;
            align-items: center;
          }
          .avatarCen {
            background-color: #f8f8f8;
            color: #888888;
            padding: 7px 10px;
          }
        }
      }
      //   子任务
      .subTask {
        border-bottom: 1px solid #e0e0e0;

        .subTaskTitle {
          display: flex;
          justify-content: space-between;
          font-size: 16px;
        }
      }
      .subTaskNum {
        font-size: 16px;
        margin-bottom: 30px;
        li {
          border-bottom: 1px solid #e0e0e0;
          height: 60px;
          padding: 0 20px 0 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .subTaskNum_xiao {
            display: inline-block;
            width: 770px;
            color: rgb(136, 136, 136);
            text-decoration: line-through;
            text-overflow: ellipsis; //文字溢出隐藏多余的 ... 代替
            overflow: hidden; //文字溢出隐藏
            white-space: nowrap;
          }
          .subTaskNum_you {
            display: inline-block;
            width: 870px;
            text-overflow: ellipsis; //文字溢出隐藏多余的 ... 代替
            overflow: hidden; //文字溢出隐藏
            white-space: nowrap;
          }
          .avatarTime {
            background-color: #f8f8f8;
            color: #888888;
            padding: 7px 10px;
            height: 40px;
          }
        }
      }
      // 评论
      .comment {
        .commentTitle {
          font-size: 16px;
          span {
            display: flex;
            align-items: center;
            i {
              font-size: 25px;
            }
          }
        }
        .commentNum {
          li {
            padding: 15px 0;
            border-bottom: 1px solid #e0e0e0;
            .el-avatar {
              float: left;
            }
            .commentInfo {
              display: inline-block;
              overflow: hidden;
              clear: both;
              font-size: 16px;
              width: 88%;
              .commentInfoTitle {
                .commentInfoTime {
                  font-size: 14px;
                  color: rgb(136, 136, 136);
                  margin-left: 15px;
                }
              }
            }
            .iconShan {
              float: right;
              margin: 20px 20px 0 0;
              cursor: pointer;
              i {
                font-size: 25px;
              }
            }
          }
        }
        .establish {
          margin: 20px 0;
          .establisher {
            font-size: 16px;
            color: #888;
          }
        }
      }
    }
    // 底部
    .sending {
      border-top: 2px solid #e0e0e0;
      height: 75px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      button {
        outline: none;
        background-color: #4ca824;
        color: white;
        width: 70px;
        height: 40px;
        border: 0;
        cursor: pointer;
      }
    }
  }
  #fork_cha {
    float: right;
    font-size: 26px;
    opacity: 0.5;
    margin-top: 10px;
    margin-right: 10px;
    cursor: pointer;
  }
  .el-progress {
    .el-progress-bar {
      padding-right: 0 !important;
    }
    .el-progress__text {
      visibility: hidden;
    }
  }
}
</style>