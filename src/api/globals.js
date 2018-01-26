/**
 * Created by user on 2018/1/25.
 */
import axios from 'axios'

/**
 * 省份商圈筛选
 * @param params
 * @returns {Promise.<TResult>}
 */
export function businessCircle(params) {
  const url = `/api/globals/filter/business-circle`
  return axios.get(url, {params: params}).then((res) => {
    return Promise.resolve(res.data)
  })
}
