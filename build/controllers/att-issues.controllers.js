'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAttIssues = undefined;

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// ATT repo url
var REPOS_API = 'https://api.github.com/orgs/att/repos';

// ATT repo's issues url
var ISSUES_API = 'https://api.github.com/repos/att';

// authentication token for more requests.
var AUTH_TOKEN = 'token 866948791bcde00c337508127ae390019188a024';

// default rate limit.
// TODO: use 'HEAD url' to get actual rate limit from response header.
// e.g. X-RateLimit-Limit: 60
var DEFAULT_API_LIMIT = 60;

/*
  function for making Github request using fetch API.
  param: url for sending request
  return: response in JSON format.
 */
var asyncFetch = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
    var response, json;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _nodeFetch2.default)(url, {
              method: 'GET',
              headers: {
                'Authorization': AUTH_TOKEN,
                'User-Agent': 'att-issues-coding'
              }
            });

          case 3:
            response = _context.sent;
            _context.next = 6;
            return response.json();

          case 6:
            json = _context.sent;
            return _context.abrupt('return', json);

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](0);

            console.log(_context.t0);

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 10]]);
  }));

  return function asyncFetch(_x) {
    return _ref.apply(this, arguments);
  };
}();

/*
  a recursive function which get maximum 60 comments at a time until finishes all issues.
  param: attIssues - all issues, processed - current processed issues.
  return: return issues with comments.
 */
var getAttIssuesComments = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(attIssues, processed) {
    var endIndex, processIssues, commentsArrayPromises, commentsArray, i, attIssue, _attIssue, title, body, url, comments;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(attIssues.length === processed)) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt('return', attIssues);

          case 2:

            // end index to process
            endIndex = Math.min(processed + DEFAULT_API_LIMIT, attIssues.length);

            // slice issues array to limit number of request.

            processIssues = attIssues.slice(processed, endIndex);
            commentsArrayPromises = processIssues.map(function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(attIssue) {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return asyncFetch(attIssue.comments_url);

                      case 2:
                        return _context2.abrupt('return', _context2.sent);

                      case 3:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, undefined);
              }));

              return function (_x4) {
                return _ref3.apply(this, arguments);
              };
            }());

            // resolved comments.

            _context3.next = 7;
            return Promise.all(commentsArrayPromises);

          case 7:
            commentsArray = _context3.sent;


            // include comments in issues.
            for (i = 0; i < commentsArray.length; i++) {
              attIssue = attIssues[i + processed];
              _attIssue = attIssue, title = _attIssue.title, body = _attIssue.body, url = _attIssue.url;
              // format comments

              comments = commentsArray[i];

              comments = comments.map(function (_ref4) {
                var id = _ref4.id,
                    url = _ref4.url,
                    body = _ref4.body;

                return { id: id, url: url, body: body };
              });
              attIssue = {
                title: title,
                body: body,
                url: url,
                commentsCount: attIssue.comments,
                comments: comments
              };
              attIssues[i + processed] = attIssue;
            }
            _context3.next = 11;
            return getAttIssuesComments(attIssues, endIndex);

          case 11:
            return _context3.abrupt('return', _context3.sent);

          case 12:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function getAttIssuesComments(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var getAttIssues = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(ctx) {
    var attRepos, attIssuesPromises, attIssues, attIssuesWithComments;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return asyncFetch(REPOS_API);

          case 2:
            attRepos = _context5.sent;


            // Get issues in each repo
            attIssuesPromises = attRepos.map(function () {
              var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(attRepo) {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return asyncFetch(ISSUES_API + '/' + attRepo.name + '/issues');

                      case 2:
                        return _context4.abrupt('return', _context4.sent);

                      case 3:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                }, _callee4, undefined);
              }));

              return function (_x6) {
                return _ref6.apply(this, arguments);
              };
            }());
            _context5.next = 6;
            return Promise.all(attIssuesPromises);

          case 6:
            attIssues = _context5.sent;


            // [[issue1, issue2], [issue3], ...] => [issue1, issue2, issue3, ...]
            attIssues = attIssues.reduce(function (a, b) {
              return a.concat(b);
            }, []);

            // limit 60 requests can be sent concurrently
            _context5.next = 10;
            return getAttIssuesComments(attIssues, 0);

          case 10:
            attIssuesWithComments = _context5.sent;

            if (!ctx) {
              _context5.next = 15;
              break;
            }

            ctx.body = attIssuesWithComments;
            _context5.next = 16;
            break;

          case 15:
            return _context5.abrupt('return', attIssuesWithComments);

          case 16:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function getAttIssues(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getAttIssues = getAttIssues;