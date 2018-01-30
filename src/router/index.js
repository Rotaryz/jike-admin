import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// const Login = () => import('page/login/login') => 示例写法
const Login = () => import('page/login/login')
const Container = () => import('page/container/container')
const Data = () => import('page/data/data')
const Order = () => import('page/order/order')
const Client = () => import('page/client/client')
const BusinessList = () => import('page/business-list/business-list')
const BusinessGeneral = () => import('page/business-general/business-general')

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/container',
      name: 'Container',
      component: Container,
      children: [{
        path: 'data',
        component: Data
      }, {
        path: 'order',
        component: Order
      }, {
        path: 'businessList',
        component: BusinessList
      }, {
        path: 'businessGeneral',
        component: BusinessGeneral
      }, {
        path: 'client',
        component: Client
      }]
    }
  ]
})
