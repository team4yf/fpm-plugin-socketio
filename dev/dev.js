'use strict';
const { Fpm } = require('yf-fpm-server');
const plugin = require('../src');
let app = new Fpm()
const ref = plugin.bind(app)
console.info(ref)
let biz = app.createBiz('0.0.1');
biz.addSubModules('demo',{})
app.addBizModules(biz);

app.subscribe('#socketio/connect', (topic, data) => {
	console.log(data.id)
})

app.subscribe('#socketio/message', (topic, data) => {
	console.log(data.id, data.data)
})

app.run()
