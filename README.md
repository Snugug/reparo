# Reparo
[![Build Status](https://travis-ci.org/Snugug/reparo.svg?branch=master)](https://travis-ci.org/Snugug/reparo) [![Coverage Status](https://coveralls.io/repos/github/Snugug/reparo/badge.svg?branch=master)](https://coveralls.io/github/Snugug/reparo?branch=master)

Repository maintainer


## Local Development

Add a `config/local.js` file with the following information:

```javascript
module.exports = {
  github: {
    client: '{{client}}',
    secret: '{{secret}}'
  }
}
```

Replacing `{{client}}` with the Client ID and `{{secret}}` with the Client Secret from creating a [Developer Application](https://github.com/settings/developers) to test with. The Homepage URL should be `http://localhost:5000` and the Authorization Callback URL should be `http://localhost:5000/callback`. 

Then, run `npm run dev` or, if you have Gulp installed globally, `gulp`.
