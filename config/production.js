const port = process.env.PORT || 5000;
const host = process.env.HOST;

module.exports = {
  github: {
    client: process.env.GH_CLIENT,
    secret: process.env.GH_SECRET,
    api: {
      debug: false,
    }
  },
  cookies: {
    secure: true,
    secret: process.env.COOKIE_SECRET,
  },
};
