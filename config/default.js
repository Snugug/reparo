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
    url: `${host}:${port}`,
    scope: [
      'repo',
      'public_repo',
      'admin:repo_hook'
    ],
    api: {
      version: '3.0.0',
      debug: true,
      protocol: 'https',
      host: process.env.GH_API || 'api.github.com',
      pathPrefix: process.env.GH_API_PATH || ''
    }
  },
  cookies: {
    secure: false,
    secret: process.env.COOKIE_SECRET || 'babka',
  },
}
