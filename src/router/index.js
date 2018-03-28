import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// const Login = () => import('page/login/login') => 示例写法
const Login = () => import('page/login/login')
const Container = () => import('page/container/container')
const Data = () => import('page/data/data')
const Order = () => import('page/order/order')
const OrderInquiry = () => import('page/monies-inquiry/monies-inquiry')
const Client = () => import('page/client/client')
const BusinessList = () => import('page/business-list/business-list')
const BusinessGeneral = () => import('page/business-general/business-general')
const Account = () => import('page/account/account')

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
      path: 'monies-inquiry',
      component: OrderInquiry
    }, {
      path: 'businessList',
      component: BusinessList
    }, {
      path: 'businessGeneral',
      component: BusinessGeneral
    }, {
      path: 'client',
      component: Client
    }, {
      path: 'account',
      component: Account
    }]
  }
  ]
})
