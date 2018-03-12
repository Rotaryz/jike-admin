/**
 * Created by user on 2018/1/26.
 */
/**
 * Created by user on 2018/1/25.
 */
import axios from 'axios'

/**
 * 商家列表
 * @param params
 * @returns {Promise.<TResult>}
 */
export function merchanList(params) {
  const url = `/api/merchant/merchant-index`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
/**
 * 查看订单详情
 * @param params
 * @returns {Promise.<TResult>}
 */
export function merchantDetail(id) {
  const url = `/api/merchant/merchant-message/${id}`
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
/**
 * 添加备注
 * @param params
 * @returns {Promise.<TResult>}
 */
export function merchantMessage(id, params) {
  const url = `api/merchant/merchant-message/${id}`
  return axios.put(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
/**
 * 查看商圈列表
 * @param params
 * @returns {Promise.<TResult>}
 */
export function circlesDetail(params) {
  const url = `/api/merchant/circles-detail`
  return axios.get(url, {params: params}).then((res) => {
    return Promise.resolve(res.data)
  })
}
/**
 * 新增商圈
 * @param params
 * @returns {Promise.<TResult>}
 */
export function addCircle(params) {
  const url = `/api/merchant/add-circle`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
/**
 * 查看行业列表
 * @param params
 * @returns {Promise.<TResult>}
 */
export function industryDetail(params) {
  const url = `/api/merchant/industry-detail`
  return axios.get(url, {params: params}).then((res) => {
    return Promise.resolve(res.data)
  })
}
/**
 * 添加行业
 * @param params
 * @returns {Promise.<TResult>}
 */
export function indestryAdd(params) {
  const url = `/api/merchant/indestry-add`
  return axios.post(url, params).then((res) => {
    return Promise.resolve(res.data)
  })
}
/**
 * 开通商家服务
 * @param params
 * @returns {Promise.<TResult>}
 */
export function openService(params) {
  const url = `/api/merchant/open-service`
  return axios.get(url, {params: params}).then((res) => {
    return Promise.resolve(res.data)
  })
}
/**
 * 冻结商家服务
 * @param params
 * @returns {Promise.<TResult>}
 */
export function disable
(params) {
  const url = `/api/merchant/disable`
  return axios.get(url, {params: params}).then((res) => {
    return Promise.resolve(res.data)
  })
}

/**
 * 删除商圈
 * @param params
 * @returns {Promise.<TResult>}
 */
export function delCircle(params) {
  const url = `/api/merchant/del-circle`
  return axios.get(url, {params: params}).then((res) => {
    return Promise.resolve(res.data)
  })
}
