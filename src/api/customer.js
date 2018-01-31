/**
 * Created by user on 2018/1/27.
 */
import axios from 'axios'
/**
 * 查看客户管理列表
 * @param params
 * @returns {Promise.<TResult>}
 */
export function customers(prams) {
  const url = `/api/customers/index`
  return axios.post(url, prams).then((res) => {
    return Promise.resolve(res.data)
  })
}
/**
 * 查看获取微信用户信息
 * @param params
 * @returns {Promise.<TResult>}
 */
export function wechatdata(prams) {
  const url = `/api/customers/wechatdata-info`
  return axios.post(url, prams).then((res) => {
    return Promise.resolve(res.data)
  })
}
/**
 * 查看获取订单用户信息
 * @param params
 * @returns {Promise.<TResult>}
 */
export function customerInfo(prams) {
  const url = `/api/customers/customer-info`
  return axios.post(url, prams).then((res) => {
    return Promise.resolve(res.data)
  })
}
/**
 * 对用户添加备注
 * @param params
 * @returns {Promise.<TResult>}
 */
export function customerRemark(prams) {
  const url = `/api/customers/remark`
  return axios.post(url, prams).then((res) => {
    return Promise.resolve(res.data)
  })
}
