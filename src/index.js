"use strict";
import _ from 'lodash'
import IO from 'koa-socket'

export default {
  bind: (fpm) => {
    const io = new IO()
    io.attach( fpm.app )
    const _io = fpm.app.io
    fpm.registerAction('BEFORE_SERVER_START', () => {
      _io.on( 'connection', ctx => {
        console.log( 'Join event', ctx.socket.id )
      } )
      _io.on( 'message', ctx => {
        _io.broadcast('message', ctx.data)
      } )
      _io.on( 'login', ctx => {
        ctx.data.channel = 'online'
        _io.broadcast('message', ctx.data)
      } )
    })

    fpm.registerAction('BEFORE_MODULES_ADDED', (args) => {
      let biz = args[0]
      biz.m = _.assign(biz.m, {
        websocket: {
          broadcast: (arg) =>{
            _io.broadcast('message', arg)
            return {data: 1}
          }
        }
      })
      
    })
  }
}
