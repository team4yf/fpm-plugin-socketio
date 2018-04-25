## 1.0.2 (2017-04-25)

Feature
- Add `websocket.broadcast` & `websocket.send` To BizModules Automaticlly

## 1.0.0 (2017-04-24)

Feature
- Add `http-server` Develope Dep, can RUN command: `yarn run dev:client` Then Test The websocket Client
- You can Code `fpm.publish('socketio.broadcast', message)` To broadcast message

TODO
- Add socket id 
- Add send message to the client with id `fpm.publish('socket.send', { id, message} )`
- Add more channel/event
## 0.0.4 (2017-07-03)

Feature

- publish the message data from socketio server

## 0.0.3 (2017-04-21)

Feature

- add `websocket.broadcast` api
