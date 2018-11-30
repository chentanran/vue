import axios from "axios"

const baseURL = 'http://localhost:8888/api/private/v1/'
axios.defaults.baseURL = baseURL

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let token = localStorage.getItem("token");
    if(token){
        config.headers["Authorization"] = token
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 登入验证
export const checkUser = params => { return axios.post("login",params).then(res=>res.data) }
//获取用户列表
export const getUserList = params => { return axios.get("users", params).then(res=>res.data) }