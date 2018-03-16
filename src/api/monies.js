/**
 * Created by user on 2018/3/6.
 */
/**
 * Created by user on 2018/1/26.
 */
/**
 * Created by user on 2018/1/25.
 */
import axios from 'axios'

/**
 * 订单查询
 * @param params
 * @returns {Promise.<TResult>}
 */
export function ordersInquiry(params) {
  const url = `/api/monies/orders`
  return axios.get(url, {params: params}).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 审核提现
 * @param params
 * @returns {Promise.<TResult>}
 */
export function checkWithdrawal(params) {
  const url = `/api/monies/check-withdrawal`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
/**
 * 订单查看详情
 * @param params
 * @returns {Promise.<TResult>}
 */
export function orderDetail(params) {
  const url = `/api/monies/order-detail`
  return axios.get(url, {params: params}).then((res) => {
    return Promise.resolve(res.data)
  })
}
