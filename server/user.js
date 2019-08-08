const express = require('express');
const Router = express.Router();
const utils = require('utility')
const model = require('./model')
const User = model.getModel('user')
const _filter = { pwd: 0, __v: 0}
// info信息
Router.get('/list', function(req, res) {
  // User.remove({}, function(){}) //清空user数据
  var { type } = req.query // 根据前端传入的参数获取对应的数据
  User.find({ type }, function (err, doc) {
    return res.json({ code: 0, data: doc})
  })
})
Router.get('/info', function (req, res) {
  // 获取cookie
  const {userid} = req.cookies;
  if(!userid) {
    return res.json({
      code: 1
    })
  }
  User.findOne({ _id: userid }, _filter, function(err, doc) {
    if(err) {
      return res.json({code:1, msg:'SERVER ERROR'})
    }
    if(doc) {
      return res.json({ code: 0, data: doc })
    }
  })
})
// 登录
Router.post('/login', function(req, res){
  const { user, pwd } = req.body
  User.findOne({ user, pwd: md5Pwd(pwd) }, _filter , function (err, doc) {
    if (!doc) {
      return res.json({code:1, msg:"用户名不存在或者密码错误"})
    }
    res.cookie('userid', doc._id)
    return res.json({ code: 0, data: doc })
  })
})
// 注册
Router.post('/register', function(req, res){
  const { user, pwd, type} = req.body
  User.findOne({user}, function(err, doc){
    if(doc){
      return res.json({code:1,msg:"用户名重复"}) 
    }
    // 注册成功在reducer和localStorage里面存储用户信息
    const userModel = new User({user, type, pwd: md5Pwd(pwd)})
    userModel.save(function(err, doc){
      if (err){
        return res.json({code:1,msg:"SERVER ERROR"})
      }
      const { user, type, _id } = doc
      res.cookie('userid', _id)
      return res.json({ code: 0, data: { user, type, _id }})
    })
  })
})
// 加强密码验证
function md5Pwd(pwd) {
  const salt = 'kxl_is_good_283839sdj[]+!~~'
  return utils.md5(utils.md5(pwd+salt))
}
// 更新
Router.post('/update', function(req, res){
  const userid = req.cookies.userid;
  if(!userid){
    return res.json.dumps({code:1})
  }
  const body = req.body
  User.findByIdAndUpdate(userid, body, function(err, doc) {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({ code: 0, data })
  })
})
module.exports = Router