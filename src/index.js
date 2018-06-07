"use strict";
import _ from 'lodash'
import IO from 'koa-socket'

const E = {
  SocketIO: {
    CLIENT_OFFLINE: {
      errno: -10001, 
      code: 'CLIENT_OFFLINE', 
      message: 'The Client Id Not Online'
    }
  }
}

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
        fpm.publish('#socketio/connect', { id })
      } )

      _io.on( 'disconnect', ctx => {
        const id = trimId(ctx.socket.id)
        delete _clients[id]
        fpm.publish('#socketio/disconnect', { id })
      } )

      _io.on( 'message', ctx => {
        const id = trimId(ctx.socket.id)
        fpm.publish('#socketio/message',  {id, data: ctx.data})
      } )

      const sendToClient = (data) => {
        const id = trimId(data.id)
        if(_.has(_clients, id)){
          delete data.id
          _clients[id].emit('message', data)
          return true
        }else{
          return false
        }
      }

      const bizModule = {
        broadcast: async (args) => {
          return new Promise( (resolve, reject) => {
            _io.broadcast('message', args)
            resolve({ data: 1 })
          })
        },
        send: async (args) => {
          return new Promise( (resolve, reject) => {
            if(sendToClient(args)){
              resolve({ data: 1 })
            }else{
              reject(E.SocketIO.CLIENT_OFFLINE)
            }
          })
        }
      }

      // extend module
      fpm.extendModule('socketio', bizModule)

      return bizModule
    })
  }
}
