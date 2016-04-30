import test from 'ava';

const keys = [ 'config', 'debug', 'version', '3.0.0', 'constants', 'requestHeaders', 'gists', 'getGistsApi', 'gitdata', 'getGitdataApi', 'issues', 'getIssuesApi', 'authorization', 'getAuthorizationApi', 'orgs', 'getOrgsApi', 'statuses', 'getStatusesApi', 'pullRequests', 'getPullrequestsApi', 'repos', 'getReposApi', 'user', 'getUserApi', 'events', 'getEventsApi', 'releases', 'getReleasesApi', 'search', 'getSearchApi', 'markdown', 'getMarkdownApi', 'gitignore', 'getGitignoreApi', 'misc', 'getMiscApi' ];

test('Default GitHub Auth', t => {
  const github = require('../../lib/github');

  t.deepEqual(Object.keys(github), keys, 'Contains all endpoint functions');
  t.is(github.config.host, 'api.github.com', 'GitHub public API endpoint');
  t.is(github.config.pathPrefix, '/', 'GitHub public path prefix');
});
