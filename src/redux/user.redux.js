import axios from 'axios'
import { getRedirectPath } from '../unit'
// action
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const LOGOUT = 'LOGOUT'

//初始info信息
const initState = {
  redirectTo:"",
  isAuth:"",
  msg:"",
  user:"",
  type:""
}
// reducer 类似vuex
export function user(state = initState, action) {
  switch (action.type){
    case AUTH_SUCCESS:
      return { ...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload }
    case LOAD_DATA:
    return { ...state, ...action.payload}
    case ERROR_MSG:
      return { ...state, msg: action.msg, isAuth: false }
    case LOGOUT:
      return { ...initState, redirectTo: '/login' } // action设置为初始值initState
    default:
      return state
  }
}
function authSuccess(obj) {
  const { pwd, ...data } = obj;
  return { type: AUTH_SUCCESS, payload: data }
}
function errorMsg(msg){
  return { msg, type: ERROR_MSG }
}
// 登录成功在reducer和localStorage里面存储用户信息
export function loadData(userinfo) {
  return { type: LOAD_DATA, payload: userinfo }
}
// 注册
export function register({user, pwd, repeatpwd, type}){
  if(!user||!pwd||!type){
    return errorMsg('用户名密码不允许为空')
  }
  if (pwd !== repeatpwd){
    return errorMsg('两次输入的密码不一致')
  }
  return dispatch => {
    axios.post('/user/register', { user, pwd, type }).then(res => {
      if(res.status === 200 && res.data.code === 0){
        dispatch(authSuccess({ user, pwd, type }))
      }else{
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}
// 登录
export function login({user, pwd}){
  if (!user || !pwd) {
    return errorMsg('用户名密码不允许为空')
  }
  return dispatch => {
    axios.post('/user/login', { user, pwd }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}
// 更新
export function update(data){
 return dispatch => {
  axios.post('/user/update', data).then(res =>{
    if (res.status === 200 && res.data.code === 0) {
      dispatch(authSuccess(res.data.data))
    } else {
      dispatch(errorMsg(res.data.msg))
    }
  })
 }
}
// 退出登录
export function logoutSubmit(){
  return { type: LOGOUT }
}
