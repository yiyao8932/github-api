'use strict';

var _chai = require('chai');

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("server", function () {
  it("server should exist.", function () {
    (0, _chai.expect)(_index2.default).to.exist;
  });
  it("server can listen.", function () {
    (0, _chai.expect)(_index2.default.listen).to.exist;
  });
});