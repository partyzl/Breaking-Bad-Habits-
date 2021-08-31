const User = require('../../../Models/user');
const db = require('../../../dbConfig');

const pg = require('pg');
const { describe } = require('yargs');
const { beforeEach, afterAll, test } = require('jest-circus');
const { jest, expect } = require('@jest/globals');
jest.mock('pg')

describe('User', () => {
    beforeEach(() => jest.clearAllMocks());
    afterAll(() => jest.resetAllMocks());

    describe('find by username', () => {
        test('shows user by username'), async () => {
            let user = {
                username: "testy",
                email: "test@testy.com",
                passwordDigest: "testpass"
            }
            jest.spyOn(db, 'query') //might need to fix this line bc im pooling queries with run fn
                .mockResolvedValueOnce({rows: [...user]});
            const result = await User.findByUserName("testy")
            expect(result.username).toEqual(user.username)
        }
    })

    describe('create', () => {
        test('creates new user'), async () => {
            let user = {
                username: "testy",
                email: "test@testy.com",
                passwordDigest: "testpass"
            }
            jest.spyOn(db, 'query') //might need to fix this line bc im pooling queries with run fn
                .mockResolvedValueOnce({rows: [...user]});
            const result = User.create(user)
            expect(result).toHaveProperty('username');
        }
    })
})