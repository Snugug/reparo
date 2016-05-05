module.exports = {
  server: {
    port: process.env.PORT,
    host: process.env.HOST
  },
  github: {
    client: process.env.GH_CLIENT,
    secret: process.env.GH_SECRET,
    url: process.env.HOST,
    api: {
      host: process.env.GH_API,
      pathPrefix: process.env.GH_API_PATH,
      debug: false,
    }
  },
  cookies: {
    secure: true,
    secret: process.env.COOKIE_SECRET,
  },
};
