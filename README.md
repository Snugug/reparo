# Reparo
[![Build Status](https://travis-ci.org/Snugug/reparo.svg?branch=master)](https://travis-ci.org/Snugug/reparo) [![Coverage Status](https://coveralls.io/repos/github/Snugug/reparo/badge.svg?branch=master)](https://coveralls.io/github/Snugug/reparo?branch=master)

https://reparo.herokuapp.com/

Manage your repository metadata!

Current functionality:
  - Label management and style guide generation

Go to [Reapro](https://reparo.herokuapp.com/), find your repository (or repositories), and build your label style guide! Your repo's labels will be updated, a PR to manage your labels moving forward will be made, and if you've created a wiki, a [Label Style Guide](https://github.com/Snugug/reparo/wiki/Label-Style-Guide) will be generated.

You can get Reparo to automatically deploy updates to your labels on every new PR, allowing you to truly manage your labels from GitHub. Run `npm install -g reparo` to install the Reparo command line tools, make sure you've got `GH_TOKEN` and `REPO_SLUG` environment variables (set to a [Personal Access Token](https://github.com/settings/tokens) and your repo in `user/repo` form respectively), and run `reparo`! If you've deployed Reparo, you can also set `REPARO` to the URL of your Reparo install.

If you're deploying with Travis, you can also do the following with those [environment variables set](https://docs.travis-ci.com/user/environment-variables/):

```yaml
before_depoy: npm install -g reparo
deploy:
  - provider: script
    script: reparo
    on:
      branch: master
```


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
