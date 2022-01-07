<template>
  <a-sub-menu :key="menu.id+''" v-bind="{...$attrs,...$props}" v-if="menu.child&&menu.child.length>0">
   <template #title>
     <span>{{menu.resName}}</span>
   </template>
    <template v-for="subitem in menu.child" :key="subitem.id+''">
      <c-menu-item :init-menu="subitem"></c-menu-item>
    </template>
  </a-sub-menu>
  <a-menu-item v-bind="{...$attrs,...$props}" :key="menu.id+''" v-else>
    <a :href="menu.href" @click="locationHref(menu.href)">{{menu.resName}}</a>
  </a-menu-item>
</template>
<script lang="ts" setup>
  import { Menu } from 'ant-design-vue'
  import { watchEffect } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  const route = useRoute()
  const router = useRouter()

  const props = defineProps({
    ...Menu.SubMenu.props,
    initMenu: {
      type: Object,
      default: function () {
          return {}
        }
    }
  })

  let menu = props.initMenu
  watchEffect(() => {
    menu = props.initMenu
  })

  function locationHref (href) {
    router.push(href.substring(1))
  }
</script>
<style lang="less" type="text/less" rel="stylesheet/less" scoped></style>
