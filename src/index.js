import React from "react"
import ReactDom from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk"; //处理异步的中间件
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// 路由页面
import Login from './container/login/login'
import Register from './container/register/register'
import Chat from './container/chat/chat'
import BossInfo from './container/boss/bossinfo'
import Genius from './container/genius/geniusinfo'
import Dashboard from './component/dashboard/dashboard'

import AuthRoute from './component/authroute/authroute'
import reducers from './reducer'
import './config'
const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():f=>f
))
ReactDom.render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <AuthRoute></AuthRoute>
          <Switch>
            <Route path="/bossinfo" component={BossInfo}></Route>
            <Route path="/geniusinfo" component={Genius}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/chat/:user" component={Chat}></Route>
            {/* 404 */}
            <Route component={Dashboard}></Route> 
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('root')
)
