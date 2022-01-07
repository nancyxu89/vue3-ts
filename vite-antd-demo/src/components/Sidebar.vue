<template>
  <aside class="sidebar">
    <div class="description-wrapper">
      <a href="#/"><h1>{{description}}</h1></a>
    </div>
    <a-menu
      theme="dark"
      @openChange="handleOpenChange"
      @select="handleSelectChange"
      @click="handleClick"
      :default-open-keys="openKeys"
      :open-keys.sync="openKeys"
      :selected-keys="[current]"
      mode="inline">
      <template v-for="menu in menuData" :key="menu.id+''">
        <c-menu-item :init-menu="menu"></c-menu-item>
      </template>
    </a-menu>
  </aside>
</template>

<script lang="ts" setup>
  import { computed, watchEffect, onMounted, ref, reactive, toRefs, toRef } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import { Menu } from 'ant-design-vue'
  import CMenuItem from 'src/components/SubMenu/index.vue'
  import Package from '../../package.json'

  const route = useRoute()
  const router = useRouter()
  const store = useStore()

  interface Info {
    openKeys?: string [];
    current?: string
  }

  let description = Package.description

  let relatedInfo: Info = reactive({openKeys: [], current: ''})
  let { openKeys, current } = toRefs(relatedInfo)

  let menuData = computed(() => store.state.menuData)

  watchEffect(() => {
    relatedInfo = { ...getRelatedInfo() }

    openKeys.value = relatedInfo.openKeys
    current.value = relatedInfo.current
  })

  function getRelatedInfo() {
    let openRefs = Object.assign(store.state.powerControl.openRefs, {})
    let keys = openRefs[route.path] || []
    let openKeys = []
    let current = ''
    if (keys.length > 0) {
      openKeys = JSON.parse(JSON.stringify(keys))
      current =  keys[keys.length - 1]
    }
    return {
      openKeys: openKeys,
      current: current,
    }
  }

  function handleClick ({ item, key, keyPath }) {
    console.log(openKeys)
  }
  function handleSelectChange (item) {
    current = item.key
  }
  function handleOpenChange (keys) {
    openKeys = keys
  }
  function locationHref (href) {
    console.log(route, router)
    router.push(href.substring(1))
  }
</script>

<style lang="less" rel="stylesheet/less" type="text/less" scoped>
  @import 'src/assets/style/base.less';
  .description-wrapper {
    height: @headerHeight;
    position: relative;
    padding: 0 12px;
    overflow: hidden;
    background: @mainColor;
    cursor: pointer;
    transition: all .3s;
    a {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        display: inline-block;
        height: 32px;
        vertical-align: middle;
      }
      h1 {
        display: inline-block;
        /*margin: 0 0 0 12px;*/
        color: #fff;
        font-weight: 600;
        font-size: 20px;
        vertical-align: middle;
        animation: fade-in;
        animation-duration: .3s;
      }
    }
  }
  .sidebar{
    width: @sidebarWidth;
    height: 100%;
    background: @mainColor;
    flex-shrink: 0;
  }
</style>
