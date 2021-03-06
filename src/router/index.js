import Vue from 'vue'
import Router from 'vue-router'

import white from '@/page/white'
import index from '@/page/index'
import ranking from '@/page/ranking'
import answer from '@/page/answer'
import training from '@/page/training'
import cross from '@/components/answer/cross'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
   
    {
      path: '/',
      name: 'index',
      component: index,
      meta: {
      //  keepAlive:true,
      }
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: ranking,
      meta: {
        
      }
    },
    {
      path: '/answer',
      name: 'answer',
      component: answer,
      meta: {
        
      }
    },
    {
      path: '/cross',
      name: 'cross',
      component: cross,
      meta: {
        
      }
    },
    {
      path: '/training',
      name: 'training',
      component: training,
      meta: {
        
      }
    }
  ]
})
