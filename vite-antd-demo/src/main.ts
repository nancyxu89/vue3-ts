import { createApp } from 'vue'
import "src/assets/style/App.less"
import App from './App.vue'
import CSubMenu from 'src/components/SubMenu/index.ts'
import router from 'src/router.ts'
import store from 'src/store'
import Server from 'src/extend/server'
import { message, notification, Modal } from 'ant-design-vue'
import { setupAntd } from "src/extend/Antdv"
import eventBus from 'vue3-eventbus'

console.log(Server)
const app = createApp(App)
setupAntd(app) // 新增++

app.use(eventBus, {
  globalPropertyName: '$bus'
})
app.use(CSubMenu)
app.use(router)
app.use(store)
app.provide('$error', Modal.error)
app.provide('$message', message) //全局注册,  provide/inject, (inject('$message') as any).success("inject")
app.provide('$notification', notification)
app.mount('#app')
