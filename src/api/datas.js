/**
 * Created by user on 2018/1/27.
 */
import axios from 'axios'
/**
 * 数据概况列表
 * @param params
 * @returns {Promise.<TResult>}
 */
export function datasList(prams) {
  const url = `/api/datas/index`
  return axios.post(url, prams).then((res) => {
    return Promise.resolve(res.data)
  })
}
