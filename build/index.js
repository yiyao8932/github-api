'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('babel-polyfill');

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _attIssues = require('./routes/att-issues.routes');

var _attIssues2 = _interopRequireDefault(_attIssues);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koa2.default();
var PORT = process.env.PORT || 8888;

// att issues router config
app.use(_attIssues2.default.routes());

var server = app.listen(PORT).on("error", function (err) {
  console.error(err);
});

console.log('att-issues github api server launched!');

exports.default = server;