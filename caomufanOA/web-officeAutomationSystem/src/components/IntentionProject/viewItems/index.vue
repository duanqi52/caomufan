<template>
  <div class="viewItems">
    <!-- 里程碑 -->
    <div id="allIitems">
      <ul>
        <li class="allIitemsList">
          <div class="allItemsTitle">
            <span>广州什么什么项目</span>
            <span>
              <span class="becomeBut">
                <i class="iconfont icon-tuijin" style="font-size: 20px;"></i> 转正式项目
              </span>
              <span class="editBut">
                <i class="iconfont icon-zhongmingming" style="font-size: 20px;"></i>编辑
              </span>
            </span>
          </div>
          <!-- 里程碑部分 -->
          <div class="allItemsMilepost">
            <div class="allItems">
              <ul id="allItemsList">
                <li>
                  <span>里程碑阶段1</span>
                  <br />
                  <span class="milength">1</span>
                  <br />
                  <span>2020-02-02</span>
                  <br />
                  <span class="subTask">
                    <i class="iconfont icon-zirenwu"></i>
                    <span class>0/10</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 表单 -->
    <div class="formContent">
      <el-form
        label-position="right"
        size="medium"
        ref="ruleForm"
        label-width="120px"
        class="formBody"
      >
        <div class="formItem">
          <el-form-item label="项目名称：" size="medium">
            <span></span>
          </el-form-item>
        </div>
        <div class="formItem">
          <el-form-item label="临时编号：">
            <span></span>
          </el-form-item>
        </div>
        <div class="formItem">
          <el-form-item label="负责部门：" prop="name">
            <span></span>
          </el-form-item>
        </div>
        <div class="formItem">
          <el-form-item label="项目类型：" prop="region">
            <span></span>
          </el-form-item>
        </div>
        <div class="formItem">
          <el-form-item label="业主单位：" prop="name">
            <span></span>
          </el-form-item>
        </div>
        <div class="formItem">
          <el-form-item label="项目金额：" prop="name">
            <span></span>
          </el-form-item>
        </div>
        <div class="formItem">
          <el-form-item label="项目所在地：" prop="name">
            <span></span>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <!-- 实施信息 -->
    <div style="padding: 0 30px">
      <div class="implementationInfo">
        <div class="implementationHead">
          <span>实施信息</span>
        </div>
        <div class="implementationContent">
          <ul class="chargeMan">
            <span class="chargeMans">项目负责人：</span>
            <li>
              <span class="el-avatar--circle headPortrait">
                <el-avatar
                  :size="50"
                  src="https://thirdwx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM5qENrfxjhzrTsrp7vajiadVBdyiclEUUZdUlta8x6O9fSAaay4EDlic0hJZjbDDg7MGoq39YqUPUicDw/132"
                ></el-avatar>
              </span>
              <span class="chargeName"></span>
            </li>
          </ul>
          <ul class="participatingDepartments">
            <span class="departments">参与部门：</span>
            <li>
              <span>啊手动阀手动阀</span>
            </li>
          </ul>
          <ul class="chargeMan">
            <span class="chargeMans">参与人：</span>
            <li>
              <span class="el-avatar--circle headPortrait">
                <el-avatar
                  :size="50"
                  src="https://thirdwx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM5qENrfxjhzrTsrp7vajiadVBdyiclEUUZdUlta8x6O9fSAaay4EDlic0hJZjbDDg7MGoq39YqUPUicDw/132"
                ></el-avatar>
              </span>
              <span class="chargeName">阿斯蒂芬</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 上传资料 -->
    <div class="remakeAccessories">
      <el-form
        label-position="right"
        size="medium"
        label-width="140px"
        class="formBody"
      >
        <el-form-item label="附件：">
          <div class="remakeAccessoriesList">
            <table border="1" cellspacing="0" cellpadding="0">
              <tr >
                <td
                  style="max-width: 400px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;"
                ></td>
                <td>MB</td>
                <td>
                  <a style="cursor: pointer;">
                    <i class="iconfont iconxiazai"></i>下载
                  </a>
                </td>
                <td class="bigImg">
                  <template
                  >
                    <el-image class="imgBigBox"></el-image>
                    <div class="bigBtn">
                      <i class="iconfont iconliulan"></i>浏览
                    </div>
                  </template>
                  <template>
                    <div class="bigBtn">
                      <a style="color: #ddd;">
                        <i class="iconfont iconliulan"></i>浏览
                      </a>
                    </div>
                  </template>
                </td>
              </tr>
            </table>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.viewItems {
  background-color: white;
  .allItemsMilepost {
    padding: 0 30px;
    .allItems {
      border-bottom: 1px solid #dedede;
    }
  }
  .becomeBut {
    background: #3b9414;
    padding: 8px 10px;
    color: #fff;
    border-radius: 5px;
  }
  .editBut {
    background: #3b9414;
    padding: 8px 10px;
    color: #fff;
    border-radius: 5px;
  }
  .formContent {
    .formBody {
      padding: 20px 30px;
      display: flex;
      flex-wrap: wrap;
      .formItem {
        width: 480px;
        margin: 0px 25px 0 0;
        font-size: 16px;
        span {
          display: block;
          background: #f8f8f8;
          padding: 0 10px;
          border-radius: 5px;
          min-height: 36px;
        }
        .el-select {
          width: 390px;
        }
      }
    }
  }
}
</style>
<style lang="scss" src="@/styles/IntentionProject/index.scss">