<template>
	<div class="page-main">
		<Sidebar/>
    <div class="right">
	    <Header/>
      <router-view :key="routerKey"/>
    </div>
	</div>
</template>
<script lang="ts" setup>
	import bus from 'vue3-eventbus'
	import Server from 'src/extend/server'
	import Header from 'src/components/Header.vue'
	import Sidebar from 'src/components/Sidebar.vue'
	import { computed, onMounted } from 'vue'
	import { useRoute } from 'vue-router'
	import { useStore } from 'vuex'
	const route = useRoute()
	const store = useStore()

	let powerUrl = [].concat(store.state.powerControl.powerUrl)
	let allPowerUrl = [].concat(store.state.powerControl.allPowerUrl)
	let openRefs = Object.assign(store.state.powerControl.openRefs, {})
	let routerKey = computed(() => {
			return route.path + '_' + new Date()
		})
	function  arrHasStr (arr, str) {
		let isHasPower = false
		arr.forEach((item) => {
			if (item === str) {
				isHasPower = true
			}
		})
		return isHasPower
	}

	function getPower (data, list) {
		for (let i = 0, len = data.length; i < len; i++) {
			if (data[i].permissionCode) {
				list.push(data[i].permissionCode)
			}
			if (data[i].child) {
				getPower(data[i].child, list)
			}
			if (data[i].specialPerm) {
				getPower(data[i].specialPerm, list)
			}
		}
	}

	let walk = function (data, deep, keys = [], powers) {
		if (data instanceof Array) {
			for (let i = data.length - 1; i >= 0; i--) {
				let value = data[ i ]
				let href = (value.href || '').replace(/(^#\/|^#|^\/)/, '') // 去除# #/
				if (value.href) allPowerUrl.push(href)
				if (value.powerCode && !arrHasStr(powers, value.powerCode)) {
					data.splice(i, 1)
				} else {
					// 记录可访问的路由地址
					if (value.href) powerUrl.push(href)
					// 递归处理菜单-权限
					if (value.child && value.child.length > 0) {
						walk(value.child, deep + 1, keys.concat(value.id + ''), powers)
					} else {
						openRefs['/' + href] = keys.concat(value.id + '')
					}
				}
			}
		}
	}
	function getMenues () {
		Server({
			url: 'https://result.eolink.com/jxMfuwAe2436c7e8b31ef365264bbe2be8d2dd12246c7b4?uri=/blog-site-v3-ts/queryMenu',
			method: 'get',
			needLoading: true
		}).then(rst => {
			let list = []
			getPower(rst.data, list)
			walk(rst.data, 1, [], list)
			store.dispatch('powerUpdate', { path: 'powerUrl', data: powerUrl })
			store.dispatch('powerUpdate', { path: 'allPowerUrl', data: allPowerUrl })
			store.dispatch('powerUpdate', { path: 'openRefs', data: openRefs })
			store.dispatch('initMenuData', rst.data)
		})
	}

	onMounted(() => {
		getMenues()
	})
</script>
<style lang="less" rel="stylesheet/less" type="text/less" scoped>
	@import 'src/assets/style/base.less';
	.page-main{
		width: 100%;
		display: flex;
		background: #f0f2f5;
		height: calc(~"100vh - @{footerHeight}");
		.right {
			width: calc(~"100% - @{sidebarWidth}");
		}
	}
</style>
