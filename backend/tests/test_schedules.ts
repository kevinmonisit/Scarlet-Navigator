const index = require('../api/index');
var assert = require('mocha');
const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/', index);

const req = request(app);

describe('basic api', () => {
  it('');
});

request(app)
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function (err, res) {
    if (err) throw err;
  });
