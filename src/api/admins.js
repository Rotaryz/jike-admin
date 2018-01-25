/**
 * Created by user on 2018/1/24.
 */
import {ERR_OK} from './config'
import axios from 'axios'

export function login() {
  const url = `/api/admins/login`
  return axios.post(url).then((res) => {
    if (res.data.error === ERR_OK) {
      return Promise.resolve(res.data.data)
    } else {
      return Promise.resolve(res.data)
    }
  })
}
