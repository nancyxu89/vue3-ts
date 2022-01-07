<template>
  <div class="nopage">
    <img class="status-img" src="../assets/images/logo.png" alt="">
    <a-button
      style="background-color: #304156;border-color: #304156;color:#fff;"
      class="nopage-text"
      type="link">
      你没有权限访问此页面
    </a-button>
    <a-button class="nopage-text" type="primary" @click="gohome">添加权限</a-button>
  </div>
</template>

<script>
import Config from 'src/config/index'
export default {
  methods: {
    gohome () {
      this.$router.replace('/home')
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped type="text/less">
.nopage {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .status-img{
    margin-top: 60px;
  }
  .nopage-text {
    margin-top: 100px;
  }
}
</style>
