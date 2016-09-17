'use strict';

var app = require('../..');
import request from 'supertest';

var newBot;

describe('Bot API:', function() {
  describe('GET /api/bot', function() {
    var bots;

    beforeEach(function(done) {
      request(app)
        .get('/api/bot')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          bots = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(bots).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/bot', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/bot')
        .send({
          name: 'New Bot',
          info: 'This is the brand new bot!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newBot = res.body;
          done();
        });
    });

    it('should respond with the newly created bot', function() {
      expect(newBot.name).to.equal('New Bot');
      expect(newBot.info).to.equal('This is the brand new bot!!!');
    });
  });

  describe('GET /api/bot/:id', function() {
    var bot;

    beforeEach(function(done) {
      request(app)
        .get(`/api/bot/${newBot._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          bot = res.body;
          done();
        });
    });

    afterEach(function() {
      bot = {};
    });

    it('should respond with the requested bot', function() {
      expect(bot.name).to.equal('New Bot');
      expect(bot.info).to.equal('This is the brand new bot!!!');
    });
  });

  describe('PUT /api/bot/:id', function() {
    var updatedBot;

    beforeEach(function(done) {
      request(app)
        .put(`/api/bot/${newBot._id}`)
        .send({
          name: 'Updated Bot',
          info: 'This is the updated bot!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedBot = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBot = {};
    });

    it('should respond with the original bot', function() {
      expect(updatedBot.name).to.equal('New Bot');
      expect(updatedBot.info).to.equal('This is the brand new bot!!!');
    });

    it('should respond with the updated bot on a subsequent GET', function(done) {
      request(app)
        .get(`/api/bot/${newBot._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let bot = res.body;

          expect(bot.name).to.equal('Updated Bot');
          expect(bot.info).to.equal('This is the updated bot!!!');

          done();
        });
    });
  });

  describe('PATCH /api/bot/:id', function() {
    var patchedBot;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/bot/${newBot._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Bot' },
          { op: 'replace', path: '/info', value: 'This is the patched bot!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedBot = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedBot = {};
    });

    it('should respond with the patched bot', function() {
      expect(patchedBot.name).to.equal('Patched Bot');
      expect(patchedBot.info).to.equal('This is the patched bot!!!');
    });
  });

  describe('DELETE /api/bot/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/bot/${newBot._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when bot does not exist', function(done) {
      request(app)
        .delete(`/api/bot/${newBot._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
