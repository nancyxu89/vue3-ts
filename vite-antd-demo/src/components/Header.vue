<template>
  <header class="header">
    <div style="flex: 1 1 0%;">
      <a class="app-name" href="#/">{{description}}</a>
    </div>
    <div class="right-wrap">
      <a-popover trigger="hover" style="margin-right: 20px;">
        <template #content>
          <div style="width: 160px;display: flex;justify-content: space-between;">
            <a-button @click="changePassword">修改密码</a-button>
            <a-button @click="logout">退出</a-button>
          </div>
        </template>
        <span class="content">
          <span>{{userInfo.userName}}&nbsp;&nbsp;{{userInfo.jobNumber}}</span>
        </span>
      </a-popover>
    </div>
  </header>
</template>
<script>
import { mapState } from 'vuex'
import Config from 'src/config'
import Package from '../../package.json'

export default {
  name: 'AppHeader',
  data () {
    return {
      description: Package.description,
    }
  },
  computed: mapState({
    userInfo: state => state.userInfo || {}
  }),
  methods: {
    changePassword () {
      window.location.href = `${Config.ssoHost}#/password/`
    },
    /**
     * 登出
     */
    logout () {
      this.$confirm({
        title: '提示',
        content: '确认登出系统',
        type: 'warning',
        onOk: () => {
          window.location.replace(`${Config.ssoHost}?action=logout&url=${encodeURIComponent(window.location.href)}`)
        },
        onCancel: () => {
          this.$message.info('已取消登出')
        }
      })
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less" scoped type="text/less">
  @import 'src/assets/style/base.less';
  .header{
    width: 100%;
    height: @headerHeight;
    display: flex;
    align-items: center;
    background: @headerColor;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    color: @mainColor;
    font-size: 14px;
    .app-name{
      padding: 0 12px;
      font-size: 18px;
      font-weight: 400;
      color: #fff;
    }
    .city-name {
      width: 120px;
      margin-left: 4px;
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
    }
    .city-scope {
      text-decoration: underline;
      margin: 0 12px;
      cursor: pointer;
    }
    .right-wrap{
      height: @headerHeight;
      padding: 0 12px;
      cursor: pointer;
      box-sizing: border-box;
      display: flex;
      float: right;
      margin-left: auto;
      overflow: hidden;
      :deep(.content){
        padding: 0 16px;
        margin-right: 16px;
        &:hover,&:focus {
          background-color: rgba(169, 169, 169, .07);
        }
      }
      .dropdown-main {
        height: 100%;
        padding: 0 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &:hover {
          background: rgba(0,0,0,.025)
        }
      }
      .content {
        height: 100%;
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
  }
</style>
