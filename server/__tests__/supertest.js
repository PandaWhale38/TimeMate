const request = require('supertest');
const db = require('../db');
//const loginModels = require('../models/logins.model.js')
const Logins = db.logins;
const bcrypt = require('bcrypt');

const server = 'http://localhost:8080';

// require in sequelize methods for updating db
// add beforeAll and afterAll to create and delete user
describe('route testing', () => {
  // beforeAll((done) => {
  //   // if fakeUser123 exists in db, delete him
  //   Logins.destroy({
  //     where: {
  //       username: 'fakeUser123',
  //     },
  //   }).then(done());
  // });

  // sample from unit 12:
  // describe('Route integration', () => {
  //   describe('/', () => {
  //     describe('GET', () => {
  //       // Note that we return the evaluation of `request` here! It evaluates to
  //       // a promise, so Jest knows not to say this test passes until that
  //       // promise resolves. See https://jestjs.io/docs/en/asynchronous
  //       it('responds with 200 status and text/html content type', () => {
  //         return request(server)
  //           .get('/')
  //           .expect('Content-Type', /text\/html/)
  //           .expect(200);
  //       });
  //     });
  //   });
  // });

  // // test login routes
  // describe('/', () => {
  //   describe('POST', () => {
  //     it('responds to successful login with 201 status and json body with properties success, emp_id, and first_name', () => {
  //       return request(server)
  //         .post('/login')
  //         .send({ username: 'kev2', password: '1234' })
  //         .expect('Content-Type', /application\/json/)
  //         .expect(201)
  //         .then((response) => {
  //           console.log('response is: ' + JSON.stringify(response.body));
  //           //   expect(response.body.Success).toBeInstanceOf(String);
  //           expect(typeof response.body.Success).toEqual('string');
  //           expect(typeof response.body.emp_id).toEqual('number');
  //           expect(typeof response.body.first_name).toEqual('string');
  //         });
  //     });
  //   });
  //   describe('POST', () => {
  //     it('response to bad login credentials with 401 status code and error message', () => {
  //       return request(server)
  //         .post('/login')
  //         .send({ username: 'fake', password: 'fake' })
  //         .expect(401)
  //         .then((response) => {
  //           expect(response.body.error).toEqual('Wrong login credentials');
  //         });
  //     });
  //   });
  // });

  // // should create an employee
  // describe('Create an employee', () => {
  //   describe('/create', () => {
  //     describe('POST', () => {
  //       it('creates an employee in the database', () => {
  //         return request(server)
  //           .post('/create/create')
  //           .send({
  //             first_name: 'test',
  //             last_name: 'test',
  //             emp_role: 1,
  //             username: 'fakeUser123',
  //             password: 'goodpw',
  //             hourly_wage: 3.5,
  //           })
  //           .expect(200)
  //           .then(async (response) => {
  //             //sequelize: check DB for newly created user
  //             const user = await Logins.findOne({
  //               where: {
  //                 username: 'fakeUser123',
  //               },
  //             });
  //             console.log(user);
  //             expect(user.username).toEqual('fakeUser123');
  //           });
  //       });
  //     });
  //   });
  // });

  // should clock in and clock out
//   describe('Hours worked', () => {
//     describe('/currentemphours', () => {
//       describe('GET', () => {
//         // Note that we return the evaluation of `request` here! It evaluates to
//         // a promise, so Jest knows not to say this test passes until that
//         // promise resolves. See https://jestjs.io/docs/en/asynchronous
//         it('responds with 200 status and ', () => {
//           return (
//             request(server)
//               .post('/currentemphours')
//               //MAKE SURE EMP_ID IS VALID OTHERWISE THIS TEST WILL FAIL
//               .send({ emp_id: 17 })
//               .expect('Content-Type', /application\/json/)
//               .expect(200)
//               .expect((res) => {
//                 console.log('res.body:', res.body);
//                 expect(typeof res.body.totals).toEqual('number');
//               })
//           );
//         });
//       });
//     });
//   });
// });
// // should get employee hours worked
// describe('Hours worked', () => {
//     describe('/currentemphours', () => {
//       describe('GET', () => {
//         // Note that we return the evaluation of `request` here! It evaluates to
//         // a promise, so Jest knows not to say this test passes until that
//         // promise resolves. See https://jestjs.io/docs/en/asynchronous
//         it('responds with 200 status and text/html content type', () => {
//           return request(server)
//             .post('/currentemphours')
//             //MAKE SURE EMP_ID IS VALID OTHERWISE THIS TEST WILL FAIL
//             .send({emp_id: 4})
//             .expect('Content-Type', /application\/json/)
//             .expect(200)
//             .expect((res) => {
//                 expect(typeof res.body).toEqual('number');
//               });
//         });
//       });
//     });
//   });
