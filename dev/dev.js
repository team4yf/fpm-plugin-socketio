'use strict';
import { Fpm, Biz } from 'yf-fpm-server'
import plugin from '../src'
let app = new Fpm()
plugin.bind(app)
let biz = new Biz('0.0.1');
biz.addSubModules('demo',{})
app.addBizModules(biz);

app.subscribe('socketio.connect', (topic, data) => {
	console.log(data.id)
})

app.subscribe('socketio.message', (topic, data) => {
	console.log(data.id, data.data)
})

app.run()
