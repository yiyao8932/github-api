import fetch from 'node-fetch';

// ATT repo url
const REPOS_API = `https://api.github.com/orgs/att/repos`;

// ATT repo's issues url
const ISSUES_API = `https://api.github.com/repos/att`;

// authentication token for more requests.
const AUTH_TOKEN = `token 866948791bcde00c337508127ae390019188a024`;

// default rate limit.
// TODO: use 'HEAD url' to get actual rate limit from response header.
// e.g. X-RateLimit-Limit: 60
const DEFAULT_API_LIMIT = 60;

/*
  function for making Github request using fetch API.
  param: url for sending request
  return: response in JSON format.
 */
const asyncFetch = async (url) => {
  try {
    const response = await fetch(
      url,
      {
        method: 'GET',
        headers: {
          'Authorization': AUTH_TOKEN,
          'User-Agent': 'att-issues-coding',
        }
      }
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

/*
  a recursive function which get maximum 60 comments at a time until finishes all issues.
  param: attIssues - all issues, processed - current processed issues.
  return: return issues with comments.
 */
const getAttIssuesComments = async (attIssues, processed) => {
  if(attIssues.length === processed){ // if all issues are finished
    return attIssues;
  }

  // end index to process
  const endIndex = Math.min(processed + DEFAULT_API_LIMIT, attIssues.length);

  // slice issues array to limit number of request.
  const processIssues = attIssues.slice(processed, endIndex);
  const commentsArrayPromises = processIssues.map(async attIssue => await asyncFetch(attIssue.comments_url));

  // resolved comments.
  let commentsArray = await Promise.all(commentsArrayPromises);

  // include comments in issues.
  for(let i = 0; i < commentsArray.length; i++){
    let attIssue = attIssues[i + processed];
    let { title, body, url} = attIssue;
    // format comments
    let comments = commentsArray[i];
    comments = comments.map(({id, url, body}) => {
      return {id, url, body};
    });
    attIssue = {
      title,
      body,
      url,
      commentsCount: attIssue.comments,
      comments
    };
    attIssues[i + processed] = attIssue;
  }
  return await getAttIssuesComments(attIssues, endIndex);
};


const getAttIssues = async ctx => {
  // Get repos under ATT organization
  const attRepos = await asyncFetch(REPOS_API);

  // Get issues in each repo
  const attIssuesPromises = attRepos.map(async attRepo => await asyncFetch(`${ISSUES_API}/${attRepo.name}/issues`));
  let attIssues = await Promise.all(attIssuesPromises);

  // [[issue1, issue2], [issue3], ...] => [issue1, issue2, issue3, ...]
  attIssues = attIssues.reduce((a, b) => {
    return a.concat(b);
  }, []);

  // limit 60 requests can be sent concurrently
  const attIssuesWithComments = await getAttIssuesComments(attIssues, 0);

  // response
  if(ctx){
    ctx.body = attIssuesWithComments;
  }
  else{
    return attIssuesWithComments;
  }
};

export { getAttIssues };