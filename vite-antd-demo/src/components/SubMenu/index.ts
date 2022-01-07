// 1.引入封装好的全局组件地址
import CSubMenu from 'src/components/SubMenu/index.vue'

// 2.导出
export default{
  install (app) {
    // 此处形参为main.js文件中use()方法自动传进来的Vue实例
    app.component('cMenuItem', CSubMenu)
  }
}
