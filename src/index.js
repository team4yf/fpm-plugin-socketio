"use strict";
import _ from 'lodash'
import IO from 'koa-socket'

const trimId = (id)=>{
  return _.trim(id, '/#')
}

export default {
  bind: (fpm) => {
    const io = new IO()
    io.attach( fpm.app )
    const _io = fpm.app.io
    const _clients = {}
    fpm.registerAction('BEFORE_SERVER_START', () => {
      _io.on( 'connection', ctx => {
        // let handshake = ctx.socket.handshake;
        const id = trimId(ctx.socket.id)
        _clients[id] = ctx.socket
        ctx.socket.emit('connected')
        fpm.publish('socketio.connect', {id: id})
      } )
      _io.on( 'disconnect', ctx => {
        const id = trimId(ctx.socket.id)
        delete _clients[id]
        fpm.publish('socketio.disconnect', {id: id})
      })
      _io.on( 'message', ctx => {
        const id = trimId(ctx.socket.id)
        fpm.publish('socketio.message',  {id: id, data: ctx.data})
      } )

      fpm.subscribe('socketio.send', (topic, data) => {
        const id = trimId(data.id)
        if(_.has(_clients, id)){
          delete data.id
          _clients[id].emit('message', data)
        }
      })

      fpm.subscribe('socketio.broadcast', (topic, data) => {
        _io.broadcast('message', data)
      })
    })
  }
}
