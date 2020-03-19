<template>
    <div class="content ">
      <img src="@/assets/images/caomufanLogo_144_144.png" alt="">
     <h1> 404！页面它不小心迷路啦！</h1>
      <router-link :to="{path:'/'}">
        <div class="goBtn" >
          <div class="goBtnShow">
            <span>点击返回首页</span>
          </div>
        </div>
      </router-link>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>

.content{
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background: #78bb5b;
}
img{
  margin: 40px 0;
}
h1{
  color:#257502;
}
  .goBtn{
    margin: 40px 0;
    background: #4ca824;
    color: #fff;
    display: inline-block;
    padding: 10px 15px;
    border-radius: 5px;
    font-size: 16px;
  }
</style>
