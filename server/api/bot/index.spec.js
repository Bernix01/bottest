'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var botCtrlStub = {
  index: 'botCtrl.index',
  show: 'botCtrl.show',
  create: 'botCtrl.create',
  upsert: 'botCtrl.upsert',
  patch: 'botCtrl.patch',
  destroy: 'botCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var botIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './bot.controller': botCtrlStub
});

describe('Bot API Router:', function() {
  it('should return an express router instance', function() {
    expect(botIndex).to.equal(routerStub);
  });

  describe('GET /api/bot', function() {
    it('should route to bot.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'botCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/bot/:id', function() {
    it('should route to bot.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'botCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/bot', function() {
    it('should route to bot.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'botCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/bot/:id', function() {
    it('should route to bot.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'botCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/bot/:id', function() {
    it('should route to bot.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'botCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/bot/:id', function() {
    it('should route to bot.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'botCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
