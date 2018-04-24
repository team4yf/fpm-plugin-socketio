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
        fpm.publish('socketio.connect', {id: ctx.socket.id})
      } )
      _io.on( 'message', ctx => {
        fpm.publish('socketio.message',  {id: ctx.socket.id, data: ctx.data})
      } )

      fpm.subscribe('socketio.broadcast', (topic, data) => {
        _io.broadcast('message', data)
      })
    })
  }
}
