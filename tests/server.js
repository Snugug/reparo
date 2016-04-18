import test from 'ava';
import request from 'supertest';
import app from '../libs/server';

test.beforeEach(t => {
  // Ignoring this param reassign as it's the standard for AVA to allow users to assign context to the tests
  t.context.request = request(app.app); // eslint-disable-line no-param-reassign
});

test.cb('Site Landing Page', t => {
  t.context.request
    .get('/')
    .end((err, res) => {
      t.is(err, null, 'Should not have an error');
      t.is(res.status, 200, 'Should return status 200');
      t.regex(res.text, /DOCTYPE html/, 'Should have an HTML doctype');
      t.end();
    });
});
