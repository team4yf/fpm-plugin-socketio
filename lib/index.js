"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _koaSocket = require('koa-socket');

var _koaSocket2 = _interopRequireDefault(_koaSocket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  bind: function bind(fpm) {
    var io = new _koaSocket2.default();
    io.attach(fpm.app);
    var _io = fpm.app.io;
    fpm.registerAction('BEFORE_SERVER_START', function () {
      _io.on('connection', function (ctx) {
        console.log('Join event', ctx.socket.id);
      });
      _io.on('message', function (ctx) {
        _io.broadcast('message', ctx.data);
      });
      _io.on('login', function (ctx) {
        ctx.data.channel = 'online';
        _io.broadcast('message', ctx.data);
      });
    });

    fpm.registerAction('BEFORE_MODULES_ADDED', function (args) {
      var biz = args[0];
      biz.m = _lodash2.default.assign(biz.m, {
        websocket: {
          broadcast: function broadcast(arg) {
            _io.broadcast('message', arg);
            return { data: 1 };
          }
        }
      });
    });
  }
};