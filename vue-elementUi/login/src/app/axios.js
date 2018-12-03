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
//修改用户状态
export const changeStatus = params => { return axios.put(`users/${params.uid}/state/${params.type}`).then(res => res.data) }
//添加用户
export const addUser = params => { return axios.post("users", params).then(res=>res.data) }
//根据id获取用户信息
export const getUserInfo = params => { return axios.get(`users/${params.id}`).then(res => res.data) }
//编辑用户提交
export const editUser = params => { return axios.put(`users/${params.id}`,params).then(res => res.data) }
//删除用户
export const deleteUser = params => { return axios.delete(`users/${params.id}`).then(res => res.data) }
//获取身份列表
export const rolesUser = params => { return axios.get("roles").then(res => res.data) }
//分配用户角色
export const allotRoles = params => { return axios.put(`users/${params.id}/role`, {id:params.id, rid:params.rid}).then(res => res.data) }