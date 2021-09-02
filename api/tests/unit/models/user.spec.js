const User = require('../../../Models/user');
const db = require('../../../dbConfig');

const pg = require('pg');
const { describe } = require('yargs');
const { test, expect } = require('@jest/globals');
const { query } = require('express');
// const { describe } = require('yargs');
// const { beforeEach, afterAll, test } = require('jest-circus');
// const { jest, expect } = require('@jest/globals');
jest.mock('pg')

describe('User', () => {
    beforeEach(() => jest.clearAllMocks());
    afterAll(() => jest.resetAllMocks());

    describe('find by username', () => {
        test('shows user by username', async() => {
            let user = {
                username: "testy",
                email: "test@testy.com",
                passwordDigest: "testpass"
            }
            jest.spyOn(db, 'query') //might need to fix this line bc im pooling queries with run fn
                .mockResolvedValueOnce({ rows: [user] });
            const result = await User.findByUserName("testy")
            expect(result.username).toEqual(user.username)
        })

        test('returns error', async () => {
            const userData = {
                username: 'testy', 
                email: 'test@testy.com', 
                password_digest: 'password'};
            const username = userData.username;

            try {
                jest.spyOn(db, 'query').mockRejectedValueOnce(Error());
                await User.findByUserName(username);
            } catch (err) {
                expect(err).toContain('Error retrieving user:');
            }
        })
    })

    describe('create', () => {
        test('creates new user', async() => {
            let user = {
                username: "testy",
                email: "test@testy.com",
                passwordDigest: "testpass"
            }
            jest.spyOn(db, 'query') //might need to fix this line bc im pooling queries with run fn
                .mockResolvedValueOnce({ rows: [user] });
            const result = await User.create(user)
            expect(result).toHaveProperty('username');
        })

        test('returns error on bad create', async () => {
            const newUser = {
                username: 'testy', 
                email: 'test@testy.com', 
                password: 'password'};

            try {
                jest.spyOn(db, 'query').mockRejectedValueOnce(Error());
                await User.create(newUser);
            } catch (err) {
                expect(err).toContain('Error creating user:');
            }
        })

    });

    describe('getAll', () => {
        test('returns all users eventho I dont want to irl', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [{}, {}, {}]});

            const all = await User.all;

            expect(all.length).toEqual(5)
        })
    })
});