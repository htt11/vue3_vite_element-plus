import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录页'
    }
  },
  {
    name: 'home',
    path: '/home',
    redirect: '/home/page1',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '主页'
    },
    children: [{
        name: 'page1',
        path: 'page1',
        component: () => import('@/views/home/child/page1/page1.vue'),
        meta: {
          title: '首页',
          hideInBread: true,
          hideInMenu: false,
          noCatch: true,
          access: '',
          icon: 'iconfont icon-yibiaopan'
        },
      },
      {
        name: 'page2',
        path: 'page2',
        component: () => import('@/views/home/child/page2/page2.vue'),
        meta: {
          title: '列表',
          hideInBread: true,
          hideInMenu: false,
          noCatch: true,
          access: '',
          icon: 'iconfont icon-liebiao1'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router