<template>
	<div class="page-content clearfix">
    <component :is="asyncComponent" :key="routerKey"></component>
  </div>
</template>
<script lang="ts" setup>
	import { onMounted, createApp, defineAsyncComponent, computed, watchEffect } from 'vue'
	import { useRoute } from 'vue-router'
	import { useStore } from 'vuex'
	import { Skeleton } from 'ant-design-vue'
	import noPage from 'src/pages/noPage.vue'
	import noPowerPage from 'src/pages/noPowerPage.vue'

	const route = useRoute()
	const store = useStore()

	let routerKey = ''

	let loader = async function () {
		try {
			let path = getPath() || 'home'
			routerKey = path.replace(/\//g, '_')
			console.log(routerKey)
			let page = await import(`../pages/${path}.vue`)
			return hasPower(`${path}`) ? page : Promise.reject()
		} catch (error) {
			return import('src/pages/noPage.vue')
		}
	}

	function getAsyncComponent () {
		console.log(routerKey)
		return defineAsyncComponent(
			{
				loader: loader,
				delay: 20000,
				timeout: 1000,
				errorComponent: !hasPower(`${getPath()}`) ? noPowerPage : noPage,
				loadingComponent: Skeleton,
			}
		)
	}

	// 计算属性: 创建异步组件
	let asyncComponent = computed(() => getAsyncComponent())

	function getPath () {
		let params = route.params
		let arr = Object.values(params)
		return arr.join('/')
	}

	function hasPower (path) {
		let powerUrls = store.state.powerControl.powerUrl
		return powerUrls.indexOf(path) > -1
	}

	onMounted(() => {
		console.log('onMounted')
		store.dispatch('powerUpdate', { path: 'name', data: 'test'})
	})

</script>
<style lang="less" rel="stylesheet/less" type="text/less" scoped>
	.page-content {
		padding: 12px 18px;
	}
</style>
