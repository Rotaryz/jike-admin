/**
 * Created by user on 2018/1/25.
 */
import axios from 'axios'
import { BASE_URL } from 'api/config'

export function initAxios() {
  let authorization = localStorage.getItem('token') || sessionStorage.getItem('token')
  axios.defaults.headers.common['Authorization'] = authorization
  axios.defaults.baseURL = BASE_URL.api
}
