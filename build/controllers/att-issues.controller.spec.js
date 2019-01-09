'use strict';

var _chai = require('chai');

var _attIssues = require('./att-issues.controllers');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

describe("issues controller", function () {
  it("getAttIssues should exist.", function () {
    (0, _chai.expect)(_attIssues.getAttIssues).to.exist;
  });
  it("getAttIssues can return.", function () {
    (0, _chai.expect)((0, _attIssues.getAttIssues)()).to.exist;
  });
  it("getAttIssues can return.", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var issues;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _attIssues.getAttIssues)();

          case 2:
            issues = _context.sent;

            (0, _chai.expect)(issues).to.exist;
            (0, _chai.expect)(issues.length).be.above(0);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  })));
});