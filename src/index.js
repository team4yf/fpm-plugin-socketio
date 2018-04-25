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

      // extend module
      fpm.extendModule('websocket', {
        broadcast:async function(args){
          return new Promise( (resolve, reject) => {
            _io.broadcast('message', args)
            resolve({ data: 1 })
          })
        },
        send:async function(args){
          return new Promise( (resolve, reject) => {
            if(sendToClient(args)){
              resolve({ data: 1 })
            }else{
              reject({ errno: -1300, message: 'The Client Id Not Online'})
            }
          })
        }
      })

      fpm.subscribe('socketio.send', (topic, data) => {
        sendToClient(data)
      })

      fpm.subscribe('socketio.broadcast', (topic, data) => {
        _io.broadcast('message', data)
      })
    })
  }
}
