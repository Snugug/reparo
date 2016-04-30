'use strict';

const request = require('request');
const events = require('events');
const url = require('url');
const crypto = require('crypto');
const config = require('config');

module.exports = function() {
  const opts = {
    client: config.github.client,
    secret: config.github.secret,
    url: config.github.url,
    login: config.github.login,
    callback: config.github.callback,
    scope: config.github.scope,
    host: config.github.api.host,
  };

  const state = crypto.randomBytes(8).toString('hex');
  const urlObj = url.parse(opts.url);
  const emitter = new events.EventEmitter();

  let redirectURI = url.format(urlObj);

  if (opts.host === 'api.github.com') {
    opts.host = 'github.com';
  };

  urlObj.pathname = url.resolve(urlObj.pathname, opts.callback);
  redirectURI = url.format(urlObj);

  function addRoutes(router, loginCallback) {
    // compatible with flatiron/director
    router.get(opts.login, login)
    router.get(opts.callback, callback)
    if (!loginCallback) return
    emitter.on('error', function(token, err, resp, tokenResp, req) {
      loginCallback(err, token, resp, tokenResp, req)
    });
    emitter.on('token', function(token, resp, tokenResp, req) {
      loginCallback(false, token, resp, tokenResp, req)
    });
  };

  function login(req, resp) {
    const u = `https://${opts.host}/login/oauth/authorize`
        + '?client_id=' + opts.client
        + (opts.scope ? '&scope=' + opts.scope : '')
        + '&redirect_uri=' + redirectURI
        + '&state=' + state;

    resp.statusCode = 302;
    resp.setHeader('location', u);
    resp.end();
  }

  function callback(req, resp, cb) {
    const query = url.parse(req.url, true).query;
    const code = query.code;
    if (!code) return emitter.emit('error', {error: 'missing oauth code'}, resp);
    const u = `https://${opts.host}/login/oauth/access_token`
       + '?client_id=' + opts.client
       + '&client_secret=' + opts.secret
       + '&code=' + code
       + '&state=' + state;

    request.get({url:u, json: true}, function (err, tokenResp, body) {
      if (err) {
        if (cb) {
          err.body = body;
          err.tokenResp = tokenResp;
          return cb(err);
        }
        return emitter.emit('error', body, err, resp, tokenResp, req);
      }
      if (cb) {
        cb(null, body);
      }
      emitter.emit('token', body, resp, tokenResp, req);
    });
  }

  emitter.login = login;
  emitter.callback = callback;
  emitter.addRoutes = addRoutes;
  return emitter;
};
