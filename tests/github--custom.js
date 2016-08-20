import test from 'ava';

const keys = [ 'config', 'debug', 'Promise', 'routes', 'constants', 'requestHeaders', 'responseHeaders', 'authorization', 'getAuthorizationApi', 'activity', 'getActivityApi', 'gists', 'getGistsApi', 'gitdata', 'getGitdataApi', 'issues', 'getIssuesApi', 'migrations', 'getMigrationsApi', 'misc', 'getMiscApi', 'orgs', 'getOrgsApi', 'pullRequests', 'getPullrequestsApi', 'reactions', 'getReactionsApi', 'repos', 'getReposApi', 'search', 'getSearchApi', 'users', 'getUsersApi', 'enterprise', 'getEnterpriseApi', ];

test('Custom GitHub Host', t => {
  process.env['GH_API'] = 'github.company.com';

  const github = require('../lib/github')();

  t.deepEqual(Object.keys(github), keys, 'Contains all endpoint functions');
  t.is(github.config.host, 'github.company.com', 'Custom GitHub API endpoint');
  t.is(github.config.pathPrefix, '/api/v3', 'GitHub public path prefix');
});
