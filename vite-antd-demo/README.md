# Vue 3 + Typescript + Vite


## 要点

- 1 :deep() 替代   >>> 和 /deep/ (已废弃)
- 2

​````
() => import('./' + process.env.CODE_ENV)

替代

require('./' + process.env.CODE_ENV)
​````
- 3 a-table columns中scopeslots 配置无效, 将其内容移至slots, slot=customName 变更为 #customName

- 4 `ant-design-vue@3.x` a-icon 引入方式不同于其他组件, 导入@ant-design/icons-vue 自定义动态ICON

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

