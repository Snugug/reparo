module.exports = {
  server: {
    port: process.env.PORT,
    host: process.env.HOST
  },
  github: {
    client: process.env.GH_CLIENT,
    secret: process.env.GH_SECRET,
    'url': process.env.HOST,
  }
}

