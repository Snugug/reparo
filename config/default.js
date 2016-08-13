const port = process.env.PORT || 5000;
const host = process.env.HOST || 'http://localhost';

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
      debug: false,
      protocol: 'https',
      host: process.env.GH_API || 'api.github.com',
    },
  },
  cookies: {
    secure: false,
    secret: process.env.COOKIE_SECRET || 'babka',
  },
};
