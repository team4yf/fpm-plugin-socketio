"use strict";
import _ from 'lodash'
import IO from 'koa-socket'

export default {
  bind: (fpm) => {
    const io = new IO()
    fpm.registerAction('BEFORE_SERVER_START', () => {
      io.attach( fpm.app )
      const _io = fpm.app.io
      _io.on( 'connection', ctx => {
        console.log( 'Join event', ctx.socket.id )
      } )
      _io.on( 'message', ctx => {
        _io.broadcast('message', ctx.data)
      } )
      _io.on( 'login', ctx => {
        console.log('login', JSON.stringify(ctx.data))
        ctx.data.channel = 'online'
        _io.broadcast('message', ctx.data)
      } )
    })
  }
}
