<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Server from 'src/extend/server'
import Main from 'src/components/Main.vue'
import locale from 'ant-design-vue/lib/locale-provider/zh_CN'
import { onBeforeMount, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import bus from 'vue3-eventbus'

const store = useStore()

let fullscreenLoading: Boolean = ref(true)
let serverLoading: Boolean = ref(false)

onBeforeMount(() => {
  bus.on('loading.show', () => {
    console.log('loading.show')
    serverLoading.value = true
  })
  bus.on('loading.hide', () => {
    serverLoading.value = false
  })
  bus.on('logout', () => {
    console.log('logout')
  })
})

onMounted(() => {
  Server({
    url: 'https://result.eolink.com/jxMfuwAe2436c7e8b31ef365264bbe2be8d2dd12246c7b4?uri=/user/getInfo',
    method: 'post'
  }).then(rst => {
    fullscreenLoading.value = false
    store.dispatch('initUserInfo', rst.data)
  })
})

</script>

<script lang="ts">
  export default {
    name: 'App',
    data () {
      return {}
    }
  }
</script>

<template>
  <a-config-provider :locale="locale">
    <template v-if="!fullscreenLoading">
      <Main/>
    </template>
    <a-spin
      class="fullscreen deep"
      :spinning="fullscreenLoading"
      tip="初始化中。。。。"
      size="large">
    </a-spin>
    <a-spin
      :delay="300"
      class="fullscreen light"
      :spinning="serverLoading"
      tip="正在加载数据中，请稍等。。。。"
      size="large">
    </a-spin>
  </a-config-provider>
</template>

<style lang="less" rel="stylesheet/less" type="text/less" scoped>
</style>
