import test from 'ava';

const keys = [ 'config', 'debug', 'Promise', 'routes', 'constants', 'requestHeaders', 'responseHeaders', 'authorization', 'getAuthorizationApi', 'activity', 'getActivityApi', 'gists', 'getGistsApi', 'gitdata', 'getGitdataApi', 'issues', 'getIssuesApi', 'migrations', 'getMigrationsApi', 'misc', 'getMiscApi', 'orgs', 'getOrgsApi', 'pullRequests', 'getPullrequestsApi', 'reactions', 'getReactionsApi', 'repos', 'getReposApi', 'search', 'getSearchApi', 'users', 'getUsersApi', 'enterprise', 'getEnterpriseApi', ];

test('Default GitHub Auth', t => {
  const github = require('../lib/github');

  t.deepEqual(Object.keys(github), keys, 'Contains all endpoint functions');
  t.is(github.config.host, 'api.github.com', 'GitHub public API endpoint');
  t.is(github.config.pathPrefix, '/', 'GitHub public path prefix');
});
