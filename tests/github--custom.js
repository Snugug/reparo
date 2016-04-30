import test from 'ava';

const keys = [ 'config', 'debug', 'version', '3.0.0', 'constants', 'requestHeaders', 'gists', 'getGistsApi', 'gitdata', 'getGitdataApi', 'issues', 'getIssuesApi', 'authorization', 'getAuthorizationApi', 'orgs', 'getOrgsApi', 'statuses', 'getStatusesApi', 'pullRequests', 'getPullrequestsApi', 'repos', 'getReposApi', 'user', 'getUserApi', 'events', 'getEventsApi', 'releases', 'getReleasesApi', 'search', 'getSearchApi', 'markdown', 'getMarkdownApi', 'gitignore', 'getGitignoreApi', 'misc', 'getMiscApi' ];

test('Custom GitHub Host', t => {
  process.env['GH_API'] = 'github.company.com';
  process.env['GH_API_PATH'] = '/api/v3';

  const github = require('../lib/github');

  t.deepEqual(Object.keys(github), keys, 'Contains all endpoint functions');
  t.is(github.config.host, 'github.company.com', 'Custom GitHub API endpoint');
  t.is(github.config.pathPrefix, '/api/v3', 'GitHub public path prefix');
});
