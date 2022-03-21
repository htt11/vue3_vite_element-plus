import {
  createApp
} from 'vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// // 统一导入el-icon图标
import * as ElIconModules from '@element-plus/icons'

import App from './App.vue'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(ElementPlus)
// 统一注册el-icon图标
for (let iconName in ElIconModules) {
  app.component(iconName, ElIconModules[iconName])
}
app.mount('#app')