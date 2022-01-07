<template>
  <div class="nopage">
    <img class="status-img" src="../assets/images/logo.png" alt="">
    <a-button class="nopage-text" type="primary" @click="gohome">404返回首页</a-button>
  </div>
</template>

<script>
export default {
  methods: {
    gohome () {
      this.$router.replace('/home')
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped  type="text/less">
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
