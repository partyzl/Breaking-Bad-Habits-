
const { afterAll, test, expect } = require('@jest/globals');
const { beforeEach } = require('jest-circus');
const { testNameToKey } = require('jest-snapshot/build/utils');
//const { describe } = require('yargs');
const userController = require('../../../Controllers/user')

const User = require('../../../Models/user')


//mocking
const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }));
const mockRes = { status: mockStatus };

describe('user controller', () => {
    beforeEach(() => jest.clearAllMocks());
    afterAll(() => jest.resetAllMocks());

    describe('get by username', () => {
        test('it returns a user with a 200 status code', async() => {
            let testUser = {
                username: 'testy',
                email: 'test@testy.com',
                passwordDigest: 'testpass'
            }
            jest.spyOn(User, 'findByUserName')
                .mockResolvedValue(new User(testUser))

            const mockReq = { params: { username: 'testy' } }
            await User.findByUserName(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(new User(testUser));
        })
    })
});