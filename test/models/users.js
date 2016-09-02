/* global describe, before, after, beforeEach, it (from mocha) */
/* global expect, r, config, server */

describe('Model: User', () => {
  const User = db.models.User;
  const mocks = [{
    name: 'Marcio Mansur',
    username: 'marciomansur',
    password: "123123",
    email: 'mrabeloo@gmail.com'
  }];

  // POST test case
  describe('POST /api/users', () => {
    describe('status 200', () => {
      it('creates a new user', (done) => {
        server.inject({
          method: 'POST',
          url: '/api/users',
          payload: mocks[0]
        }, (res) => {

          expect(res.statusCode).to.be.equal(200);
          expect(res.result.name).to.eql(mocks[0].name);
          expect(res.result.username).to.eql(mocks[0].username);
          expect(res.result.email).to.eql(mocks[0].email);
          expect(res.result.admin).to.eql(false);
          expect(res.result.active).to.eql(false);

          done();
        });
      });
    });
  });

});
