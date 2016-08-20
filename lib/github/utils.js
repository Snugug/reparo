'use strict';

const gh = require('./index');

const all = (token, thing, action, opts) => {
  const github = gh(token);

  const getAll = (page, items) => {
    const options = Object.assign({}, opts, {
      page,
      per_page: 100, // eslint-disable-line camelcase
    });

    let list = items;

    return github[thing][action](options).then(results => {
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
  const github = gh(token);

  return github.users.get({});
};


module.exports.all = all;
module.exports.user = user;
