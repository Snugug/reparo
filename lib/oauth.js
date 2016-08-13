'use strict';

const request = require('request');
const events = require('events');
const url = require('url');
const crypto = require('crypto');
const config = require('config');
const _ = require('lodash');

module.exports = () => {
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
  }

  urlObj.pathname = url.resolve(urlObj.pathname, opts.callback);
  redirectURI = url.format(urlObj);

  const login = (req, res) => {
    const u = `https://${opts.host}/login/oauth/authorize`
        + `?client_id=${opts.client}`
        + `${opts.scope ? `&scope=${opts.scope}` : ''}`
        + `&redirect_uri=${redirectURI}`
        + `&state=${state}`;

    _.set(res, 'statusCode', 302);
    res.setHeader('location', u);
    res.end();
  };

  const callback = (req, resp, cb) => {
    const query = url.parse(req.url, true).query;
    const code = query.code;

    const u = `https://${opts.host}/login/oauth/access_token`
       + `?client_id=${opts.client}`
       + `&client_secret=${opts.secret}`
       + `&code=${code}`
       + `&state=${state}`;

    if (!code) {
      return emitter.emit('error', { error: 'missing oauth code' }, resp);
    }

    return request.get({
      url: u,
      json: true,
    }, (err, tokenResp, body) => {
      if (err) {
        if (cb) {
          const error = err;
          error.body = body;
          error.tokenResp = tokenResp;

          return cb(error);
        }

        return emitter.emit('error', body, err, resp, tokenResp, req);
      }

      if (cb) {
        return cb(null, body);
      }

      return emitter.emit('token', body, resp, tokenResp, req);
    });
  };

  const addRoutes = (router, loginCallback) => {
    // compatible with flatiron/director
    router.get(opts.login, login);
    router.get(opts.callback, callback);

    if (!loginCallback) {
      return;
    }

    emitter.on('error', (token, err, resp, tokenResp, req) => {
      loginCallback(err, token, resp, tokenResp, req);
    });

    emitter.on('token', (token, resp, tokenResp, req) => {
      loginCallback(false, token, resp, tokenResp, req);
    });
  };

  emitter.login = login;
  emitter.callback = callback;
  emitter.addRoutes = addRoutes;

  return emitter;
};
