"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _attIssues = require("../controllers/att-issues.controllers");

var Router = require("koa-router");
var router = new Router();
var REQUEST_URL = "/att-issues";

/*
 GET /att-issues
 return array of all public and open att issues on github with comments.
 */
router.get("" + REQUEST_URL, _attIssues.getAttIssues);

exports.default = router;