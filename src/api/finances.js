/**
 * Created by user on 2018/3/9.
 */
import axios from 'axios'

/**
 * 退款申请
 * @param params
 * @returns {Promise.<TResult>}
 */
export function refundConfirm(params) {
  const url = `/api/finances/refund-confirm`
  return axios.get(url, {params: params}).then((res) => {
    return Promise.resolve(res.data)
  })
}
