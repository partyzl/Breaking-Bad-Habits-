const request = require('supertest');
const app = require('../../../server'); // the express server


let token;

beforeAll((done) => {
    request(app)
        .post('/login')
        .send({
            username: "cerise-at",
            password: "password",
        })
        .end((err, response) => {
            token = response.body.token; // save the token!
            done();
        });
});

describe('GET /', () => {
    // token not being sent - should respond with a 401
    test('It should require authorization', () => {
        return request(app)
            .get('/user/cerise-at')
            .then((response) => {
                expect(response.statusCode).toBe(403);
            });
    });

    // send the token - should respond with a 200
    test('It responds with JSON', () => {
        return request(app)
            .get('/')
            .set('Authorization', `Bearer ${token}`)
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.type).toBe('application/json');
            });
    });
});