import axios from "axios"

const baseURL = 'https://127.0.0.1/api/privatc/v1/'
axios.defaults.baseURL = baseURL

// 登入验证
export const checkUser = params => { return axios.post("login",params).then(res=>res.data) }