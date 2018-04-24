# fpm-plugin-socketio
the socketio plugin for fpm

## Usage

- broadcast message
```javascript
fpm.publish('socketio.broadcast', message)
```

- receive message
```javascript
fpm.subscribe('socketio.connect', (topic, data) => {
	console.log(data.id)
})

fpm.subscribe('socketio.message', (topic, data) => {
	console.log(data.id, data.data)
})
```