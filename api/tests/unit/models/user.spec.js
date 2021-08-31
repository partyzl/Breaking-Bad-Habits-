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
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [...user]});
            const result = await User.findByUserName("test@testy.com")
            expect(result.email).toEqual(user.email)
        }
    })

    describe('create', () => {

    })
})