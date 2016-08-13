'use strict';

const gh = require('./index');

const all = (token, thing, action) => {
  const github = gh;

  gh.authenticate({
    type: 'oauth',
    token,
  });

  const getAll = (page, items) => {
    let list = items;

    return github[thing][action]({
      page,
      per_page: 100, // eslint-disable-line camelcase
    }).then(results => {
      list = list.concat(results);

      if (results.length < 100) {
        return list;
      }

      return getAll(page + 1, list);
    });
  };

  return getAll(1, []);
};

const user = token => {
  const github = gh;

  gh.authenticate({
    type: 'oauth',
    token,
  });

  return github.users.get({});
};


module.exports.all = all;
module.exports.user = user;
