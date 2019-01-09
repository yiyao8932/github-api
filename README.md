# AT&T Test Project

Thank you for reviewing my test project. Here are some introductions and instructions.

The project is deployed on amazon web service.

Deployed Link: [Amazon Web Service](http://ec2-52-90-70-222.compute-1.amazonaws.com:8888/att-issues)

## Tech Stack

Dependencies: Nodejs + Koa.js + koa-router + Github API + node-fetch

Dev Dependencies: Babel + Nodemon + Mocha + Chai

## Restful API Spec

```json
API: GET /att-issues
Result:
[
  {
    title,
    body,
    url,
    commentsCount,
    comments [
      {
        id,
        url,
        body
  	  },
  	  ...
    ]
  },
  ...
]
```

## Quick Start

Local Development

```shell
npm i
npm run serve
```

Production build/serve

```Shell
# Production build
npm run build
# Production build + start
npm start
```

Unit test

```Shell
npm test
```