const port = process.env.PORT || 5000;
const host = 'http://localhost';

module.exports = {
  server: {
    port: port,
    host: host
  },
  github: {
    login: '/login',
    callback: '/callback',
    'url': `${host}:${port}`,
    scope: [
      'repo',
      'public_repo',
      'admin:repo_hook'
    ]
  }
}
