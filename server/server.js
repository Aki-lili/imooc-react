const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user');
const app = express();
const server = require('http').Server(app) // http是自带得，在这里与socket关联起来
const io = require('socket.io')(server)
io.on('connection', function(socket) {
  socket.on('sendmsg', function(data) {
    console.log(data)
    io.emit('recvmsg', data)
  })
})
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)

server.listen(9093, function() {
  console.log('node app start at port 9093')
})