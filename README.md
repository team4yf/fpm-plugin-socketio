# fpm-plugin-socketio
the socketio plugin for fpm

## Basic Info
- Run Action Hook Name: `BEFORE_SERVER_START`
- ExtendModule Name: `socketio`
- Exception
  - [ ] `E.SocketIO.CLIENT_OFFLINE`
    ```javascript
	{
      errno: -10001, 
      code: 'CLIENT_OFFLINE', 
      message: 'The Client Id Not Online'
    }
	```
- `getDependencies()`
  - [x] `[]`
- The Reference Of The `Bind()` Method
  An BizModule Object Contains 2 Functions
  - [ ] `broadcast`
  - [ ] `send`

## Usage
- Broadcast message

  `fpm.execute('socketio.broadcast', message!Object) => Promise`
  - It always return a resolved Promise { data: 1}

- Send message to The client

  `fpm.execute('socketio.send', message!Object) => Promise`
  - message must contains a 'id' , otherwise it return a rejected promise

- Subscribe Event To Receive Message 
  - [ ] `#socketio/connect`
    ```javascript
	fpm.subscribe('#socketio/connect', (topic, data) => {
		console.info(data.id)
	})
	```
  - [ ] `#socketio/disconnect`
    ```javascript
	fpm.subscribe('#socketio/disconnect', (topic, data) => {
		console.info(data.id)
	})
	```
  - [ ] `#socketio/message`
    ```javascript
	fpm.subscribe('#socketio/message', (topic, data) => {
		console.info(data.id, data.data)
	})
	```