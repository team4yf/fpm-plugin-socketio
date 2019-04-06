"use strict";
const _ = require('lodash');
const IO = require('koa-socket');
const debug = require('debug')('fpm-plugin-socketio');

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

module.exports = {
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
        debug('new client connected %O', ctx.socket.id);
        fpm.publish('#socketio/connect', { id })
      } )

      _io.on( 'disconnect', ctx => {
        const id = trimId(ctx.socket.id)
        delete _clients[id]
        debug('client disconnected %O', ctx.socket.id);
        fpm.publish('#socketio/disconnect', { id })
      } )

      _io.on( 'message', ctx => {
        const id = trimId(ctx.socket.id)
        debug('emit message %O', {id, data: ctx.data});
        fpm.publish('#socketio/message',  {id, data: ctx.data})
      } )

      const sendToClient = (data) => {
        const id = trimId(data.id)
        if(_.has(_clients, id)){
          delete data.id
          _clients[id].emit(data.topic || 'message', data)
          return true
        }else{
          return false
        }
      }

      const bizModule = {
        broadcast: async (args) => {
          debug('[broadcast]: args %O', args);
          _io.broadcast(args.topic || 'message', args)
          return { data: 1 }
        },
        send: async (args) => {
          debug('[send]: args %O', args);
          if(sendToClient(args)){
            return { data: 1 }
          }else{
            Promise.reject(E.SocketIO.CLIENT_OFFLINE)
          }
        }
      }

      // extend module
      fpm.extendModule('socketio', bizModule)

      return bizModule
    })
  }
}
