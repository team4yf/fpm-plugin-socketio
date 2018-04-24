# fpm-plugin-socketio
the socketio plugin for fpm

## Usage

- broadcast message
```javascript
fpm.publish('socketio.broadcast', message)
```

- send message to The client
```javascript
fpm.publish('socketio.send', message)
```

- receive message
```javascript
//connect
fpm.subscribe('socketio.connect', (topic, data) => {
	console.log(data.id)
})
//disconnect
fpm.subscribe('socketio.disconnect', (topic, data) => {
	console.log(data.id)
})
//message
fpm.subscribe('socketio.message', (topic, data) => {
	console.log(data.id, data.data)
})
```