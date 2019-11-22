const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const chaiHttp = require('chai-http');

const chai = require('chai');
const userModel = require('../db/models/user_models/UserModel.js');
const user = require('../user/User');

const { expect } = chai;

chai.use(chaiHttp);
app.use(bodyParser.json());
describe('user', () => {
  describe('Sign In', () => {
    describe('Correct', () => {
      it('Sign In correct request with email and password', (done) => {
        const request = { login: 'Piska@ad.erd', password: 'A1267ddc' };
        chai
          .request(app.use('/', user))
          .post('/SignIn')
          .send(request)
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
      it('Sign In correct request with login and password', (done) => {
        const request = { login: 'Darina', password: 'A1267ddc' };
        chai
          .request(app.use('/', user))
          .post('/SignIn')
          .send(request)
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
    });
    describe('Incorrect', () => {
      it('Sign in with no password', (done) => {
        const request = { login: 'Darina', password: '' };
        chai
          .request(app.use('/', user))
          .post('/SignIn')
          .send(request)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
      it('Sign in with no number at password', (done) => {
        const request = { login: 'Piska@ad.erd', password: 'Password' };
        chai
          .request(app.use('/', user))
          .post('/SignIn')
          .send(request)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
      it('Sign in with no capital letter at password', (done) => {
        const request = { login: 'Piska@ad.erd', password: 'password123' };
        chai
          .request(app.use('/', user))
          .post('/SignIn')
          .send(request)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
      it('Sign in with cyrillic at password', (done) => {
        const request = { login: 'Piska@ad.erd', password: 'пассворд123' };
        chai
          .request(app.use('/', user))
          .post('/SignIn')
          .send(request)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
      it('Sign in with symbols at password', (done) => {
        const request = { login: 'Piska@ad.erd', password: 'Password!123' };
        chai
          .request(app.use('/', user))
          .post('/SignIn')
          .send(request)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
      it('Sign in with short password', (done) => {
        const request = { login: 'Piska@ad.erd', password: 'Password12' };
        chai
          .request(app.use('/', user))
          .post('/SignIn')
          .send(request)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
      it('Sign in with spaces in password', (done) => {
        const request = { login: 'Piska@ad.erd', password: 'Password 123' };
        chai
          .request(app.use('/', user))
          .post('/SignIn')
          .send(request)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
      it('Sign in with no lowercase letter password', (done) => {
        const request = { login: 'Piska@ad.erd', password: 'password123' };
        chai
          .request(app.use('/', user))
          .post('/SignIn')
          .send(request)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
      it('Sign in with symbols in email', (done) => {
        const request = { login: 'Pisk!a@ad.erd', password: 'Password123' };
        chai
          .request(app.use('/', user))
          .post('/SignIn')
          .send(request)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
      it('Sign in with no `.` after `@` in email', (done) => {
        const request = { login: 'Piska@aderd', password: 'Password123' };
        chai
          .request(app.use('/', user))
          .post('/SignIn')
          .send(request)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
      it("Sign in with no letter before '@' in email", (done) => {
        const request = { login: '@ad.erd', password: 'Password123' };
        chai
          .request(app.use('/', user))
          .post('/SignIn')
          .send(request)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
      it('Sign in with cyrillic in email', (done) => {
        const request = { login: 'Писка@ad.erd', password: 'Password123' };
        chai
          .request(app.use('/', user))
          .post('/SignIn')
          .send(request)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
      it('Sign in with cyrillic in login', (done) => {
        const request = { login: 'Дарина', password: 'Password123' };
        chai
          .request(app.use('/', user))
          .post('/SignIn')
          .send(request)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
      it('Sign in with spaces in login', (done) => {
        const request = { login: 'Dari na', password: 'Password123' };
        chai
          .request(app.use('/', user))
          .post('/SignIn')
          .send(request)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
      it('Sign in with no login/email', (done) => {
        const request = { login: '', password: 'Password123' };
        chai
          .request(app.use('/', user))
          .post('/SignIn')
          .send(request)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
    });
  });
  describe('SignUp', (done) => {
    before(() => {
      userModel.user.destroy({
        where: {
          login: 'Nita',
        },
      });
    });
    after(() => {
      userModel.user.destroy({
        where: {
          login: 'Nita',
        },
      });
    });
    describe('Correct', (done) => {
      it('Sign up wit correct email,login,password', (done) => {
        const request = { login: 'Nita', email: 'Nta@ad.erd', password: 'Password123' };
        chai
          .request(app.use('/', user))
          .post('/SignUp')
          .send(request)
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
    });
    describe('Incorrect', (done) => {
      it('Sign up with no password', (done) => {
        const request = { login: 'Darina', email: 'Niita@ad.erd', password: '' };
        chai
          .request(app.use('/', user))
          .post('/SignUp')
          .send(request)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
      it('Sign up with no number at password', (done) => {
        const request = { login: 'Piska', email: 'Niita@ad.erd', password: 'Password' };
        chai
          .request(app.use('/', user))
          .post('/SignUp')
          .send(request)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
      it('Sign up with no capital letter at password', (done) => {
        const request = { login: 'Piska', email: 'Niita@ad.erd', password: 'password123' };
        chai
          .request(app.use('/', user))
          .post('/SignUp')
          .send(request)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
      it('Sign up with cyrillic at password', (done) => {
        const request = { login: 'Piska', email: 'Niita@ad.erd', password: 'пассворд123' };
        chai
          .request(app.use('/', user))
          .post('/SignUp')
          .send(request)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
      it('Sign up with symbols at password', (done) => {
        const request = { login: 'Piska', email: 'Niita@ad.erd', password: 'Password!123' };
        chai
          .request(app.use('/', user))
          .post('/SignUp')
          .send(request)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
      it('Sign up with short password', (done) => {
        const request = { login: 'Piska', email: 'Niita@ad.erd', password: 'Password12' };
        chai
          .request(app.use('/', user))
          .post('/SignUp')
          .send(request)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
      it('Sign up with spaces in password', (done) => {
        const request = { login: 'Piska', email: 'Niita@ad.erd', password: 'Password 123' };
        chai
          .request(app.use('/', user))
          .post('/SignUp')
          .send(request)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
      it('Sign up with no lowercase letter password', (done) => {
        const request = { login: 'Piska', email: 'Piska@ad.erd', password: 'password123' };
        chai
          .request(app.use('/', user))
          .post('/SignUp')
          .send(request)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
      it('Sign up with no `@` in email', (done) => {
        const request = { login: 'Niita', email: 'Piskaad.erd', password: 'Password123' };
        chai
          .request(app.use('/', user))
          .post('/SignUp')
          .send(request)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
      it('Sign up with symbols in email', (done) => {
        const request = { login: 'Niita', email: 'Pisk!a@ad.erd', password: 'Password123' };
        chai
          .request(app.use('/', user))
          .post('/SignUp')
          .send(request)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
      it('Sign up with no `.` after `@` in email', (done) => {
        const request = { login: 'Niita', email: 'Piska@aderd', password: 'Password123' };
        chai
          .request(app.use('/', user))
          .post('/SignUp')
          .send(request)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
      it("Sign up with no letter before '@' in email", (done) => {
        const request = { login: 'Niita', email: '@.erd', password: 'Password123' };
        chai
          .request(app.use('/', user))
          .post('/SignUp')
          .send(request)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
      it('Sign up with cyrillic in email', (done) => {
        const request = { login: 'Niita', email: 'Niita@ad.erd', password: 'Password123' };
        chai
          .request(app.use('/', user))
          .post('/SignUp')
          .send(request)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
      it('Sign up with cyrillic in login', (done) => {
        const request = { login: 'Дарина', email: 'Niita@ad.erd', password: 'Password123' };
        chai
          .request(app.use('/', user))
          .post('/SignUp')
          .send(request)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
      it('Sign up with spaces in login', (done) => {
        const request = { login: 'Dari na', email: 'Niita@ad.erd', password: 'Password123' };
        chai
          .request(app.use('/', user))
          .post('/SignUp')
          .send(request)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
      it('Sign up with no login', (done) => {
        const request = { login: '', email: 'Niita@ad.erd', password: 'Password123' };
        chai
          .request(app.use('/', user))
          .post('/SignUp')
          .send(request)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
      it('Sign up with no ename', (done) => {
        const request = { login: 'Login123', email: '', password: 'Password123' };
        chai
          .request(app.use('/', user))
          .post('/SignUp')
          .send(request)
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
      });
    });
  });
});
