"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _koaSocket = require('koa-socket');

var _koaSocket2 = _interopRequireDefault(_koaSocket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  bind: function bind(fpm) {
    var io = new _koaSocket2.default();
    fpm.registerAction('BEFORE_SERVER_START', function () {
      io.attach(fpm.app);
      var _io = fpm.app.io;
      _io.on('connection', function (ctx) {
        console.log('Join event', ctx.socket.id);
      });
      _io.on('message', function (ctx) {
        _io.broadcast('message', ctx.data);
      });
      _io.on('login', function (ctx) {
        console.log('login', (0, _stringify2.default)(ctx.data));
        ctx.data.channel = 'online';
        _io.broadcast('message', ctx.data);
      });
    });
  }
};