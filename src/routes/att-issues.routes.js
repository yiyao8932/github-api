import { getAttIssues } from '../controllers/att-issues.controllers';

const Router = require("koa-router");
const router = new Router();
const REQUEST_URL = `/att-issues`;

/*
 GET /att-issues
 return array of all public and open att issues on github with comments.
 */
router.get(`${REQUEST_URL}`, getAttIssues);

export default router;