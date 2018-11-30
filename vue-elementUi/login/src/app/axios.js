import axios from "axios"

const baseURL = 'http://localhost:8888/api/private/v1/'
axios.defaults.baseURL = baseURL

// 登入验证
export const checkUser = params => { return axios.post("login",params).then(res=>res.data) }