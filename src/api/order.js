/**
 * Created by user on 2018/1/25.
 */
import axios from 'axios'

/**
 * 订单列表
 * @param params
 * @returns {Promise.<TResult>}
 */
export function orderList(params) {
  const url = `/api/order/order-index`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
/**
 * 查看订单详情
 * @param params
 * @returns {Promise.<TResult>}
 */
export function orderDetail(id) {
  const url = `/api/order/order-manage/${id}`
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
