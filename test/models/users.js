/* global describe, before, after, beforeEach, it (from mocha) */
/* global expect, r, config, server */

describe('Model: User', () => {
  const User = db.models.User;
  const mocks = [{
    name: 'Marcio Mansur',
    username: 'marciomansur',
    password: "test",
    email: 'test@gmail.com'
  }, {
    name: 'Wesley Milan',
    username: 'wesleymilan',
    password: "33333333",
    email: 'wesleymilan@gmail.com'
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

  // Tests the authentication
  describe('POST /api/users/auth', () => {
    describe('status 200', () => {
      it('authenticates the user', done => {
        server.inject({
          method: 'POST',
          url: '/api/users/auth',
          payload: {
            email: 'test@gmail.com',
            password: 'test'
          }
        }, res => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.result.token).to.exist;
          expect(res.result.data.username).to.be.equal('marciomansur');

          done();
        })
      });
    });
    describe('status 400', () => {
      it('fails because password does not match', done => {
        server.inject({
          method: 'POST',
          url: '/api/users/auth',
          payload: {
            email: 'mrabeloo@gmail.com',
            password: 'another password'
          }
        }, res => {
          expect(res.statusCode).to.be.equal(400);

          done();
        });
      });
    });
  });

  describe('DELETE /api/users/{id}', () => {
    describe('status 200', () => {
      it('deletes an user', done => {
        done();
      });
    });
  });
});
