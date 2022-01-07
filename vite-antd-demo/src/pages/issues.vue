<script lang="ts">
	export default { name: 'issues' }
</script>
<script setup lang="ts">
	import { ref, reactive, toRef, toRefs, shallowReactive, inject, onMounted } from 'vue'
	import Server from 'src/extend/server'
	import { message } from 'ant-design-vue'
	import { Icon } from 'src/extend/ICON.ts'

	const tableData = ref([])

	const columns = [
		{
			dataIndex: 'name',
			key: 'name',
			slots: { title: 'customTitle', customRender: 'name' },
		},
		{
			title: 'Age',
			dataIndex: 'age',
			key: 'age',
		},
		{
			title: 'Address',
			dataIndex: 'address',
			key: 'address',
		},
		{
			title: 'Tags',
			key: 'tags',
			dataIndex: 'tags',
			slots: { customRender: 'tags' },
		},
		{
			title: '操作',
			key: 'action',
			slots: { customRender: 'action' },
		},
	]

	let issues = ref(['require in not defined,可以使用()=>import(**)代替',
		'inject()只能放在setup()生命周期里运行，不能放在别的周期里运行，也不能放在事件周期里运行',
	'ant-design-vue@next  vue-router@next, 注意安装包'])
	let test2 = ['require in not defined,可以使用()=>import(**)代替']
	let test = reactive({
		list: ['require in not defined,可以使用()=>import(**)代替']
	})

	const mes = inject('$message')

	const getList = () => {
		Server({
			url: 'https://result.eolink.com/iCZI8zma415a792aa291378d2f6fdebca6eb56db8d81f69?uri=/index',
			method: 'post',
			needLoading: true,
			data: {
				auditStatus: 1,
				currentPage: 1,
				pageSize: 10,
				prdType: {}
			}
		}).then(rst => {
			tableData.value = [
				{
					key: '1',
					name: 'John Brown',
					age: 32,
					address: 'New York No. 1 Lake Park',
					tags: ['nice', 'developer'],
				},
				{
					key: '2',
					name: 'Jim Green',
					age: 42,
					address: 'London No. 1 Lake Park',
					tags: ['loser'],
				},
				{
					key: '3',
					name: 'Joe Black',
					age: 32,
					address: 'Sidney No. 1 Lake Park',
					tags: ['cool', 'teacher'],
				},
			]
		})
	}

	const handleClick = () => {
		console.log('click')
		issues.value = ['config/index.ts 中 require in not defined,可以使用()=>import(**)代替']
//		test = ['config/index.ts 中 require in not defined,可以使用()=>import(**)代替  test reactive']
		test2[0] = 'config/index.ts 中 require in not defined,可以使用()=>import(**)代替  test2 no ref reactive'
		test.list = toRefs(['config/index.ts 中 require in not defined,可以使用()=>import(**)代替  test reactive'])
		console.log(issues)
		console.log(test)
		console.log(test2)
		mes?.success('test $message injected.')
	}

	onMounted(() => {
		getList()
	})

</script>
<template>
	<div class="issues">
		<a-table
			:columns="columns"
			:data-source="tableData">
	    <template #name="{text}">{{ text }}</template>
	    <template #customTitle>Name</template>
			<template #tags="{record}">
	      <a-tag
		      v-for="tag in record.tags"
		      :key="tag"
		      :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
	      >
	        {{ tag.toUpperCase() }}
	      </a-tag>
	    </template>
	    <template #action="{text, record}">
	      <a>Invite 一 {{ record.name }}</a>
	      <a-divider type="vertical" />
	      <a>Delete</a>
	      <a-divider type="vertical" />
	      <a class="ant-dropdown-link"> More actions <Icon type="DownOutlined" /></a>
	    </template>
		</a-table>
		<!--<p v-for="(val,index) in test.list" :key="'key_'+index">{{val}}</p>-->
		<!--<p v-for="(val,index) in issues" :key="'key_'+index">{{val}}</p>-->
		<!--<p v-for="(val,index) in test2" :key="'key_'+index">{{val}}</p>-->
		<!--<a-button @click="handleClick">click me</a-button>-->
		<!--<a-button @click="getList">getList</a-button>-->
	</div>
</template>
<style lang="less" rel="stylesheet/less" scoped></style>
