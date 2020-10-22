import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 主页面
const mainPage = ()=>import('../views/mainPage/index')
const searchPage = ()=>import('../views/searchPage/index')
const loginPage = ()=>import('../views/loginPage/index')
const phone = ()=>import('../views/loginPage/components/phone')
const pwd = ()=>import('../views/loginPage/components/pwd')
// 子页面
const mine = ()=>import('../views/mine/index')
const find = ()=>import('../views/find/index')
const friend = ()=>import('../views/friend/index')
const videos = ()=>import('../views/videos/index')

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode:'history',
  routes: [
    {
      path:'/',
      redirect:'/mainPage/find',
      component: find
    },
    {
      path: '/mainPage',
      name: 'mainPage',
      component: mainPage,
      children: [
        {
          path:'/mainPage/find',
          name:'find',
          component: find
        },
        {
          path: '/mainPage/mine',
          name: 'mine',
          component: mine
        },
        {
          path:'/mainPage/friend',
          name:'friend',
          component:friend
        },
        {
          path:'/mainPage/videos',
          name:'videos',
          component:videos
        }
      ]
    },
    {
      path: '/searchPage',
      name: 'searchPage',
      component: searchPage
    },
    {
      path: '/loginPage',
      name: 'loginPage',
      component: loginPage
    },
    {
      path: '/phone',
      name: 'phone',
      component: phone
    },
    {
      path: '/pwd',
      name: 'pwd',
      component: pwd
    }
  ]
})
