/**
 * @jest-environment jsdom
 */

global.fetch = require('jest-fetch-mock');
console.warn = jest.fn();


let auth = require('../js/auth');

describe('auth tests', () => {

    let form;
    let e;

    beforeAll(() => {

        form = document.createElement('form');
        form.innerHTML =
            `<input type="text" name="username" value="abc" >
        <input type="password" id="password" name="password" value="abc" >`
        e = {
            preventDefault: jest.fn(),
            target: form
        }
    })

    beforeEach(() => {
        console.warn.mockClear();
        fetch.resetMocks();
    });

    describe('requestRegistration', () => {

        it('should do stuff')

    })
})

describe('requestRegistration', () => {

    it('should make post request with formData and pass to requstlogin func to 2nd request', async() => {

        fetch.mockResponseOnce(JSON.stringify({}))
        await auth.requestRegistration(e)

        expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'POST')
        expect(fetch.mock.calls[0].length).toBe(2)
        expect(fetch).toHaveBeenCalledTimes(2)

    })

    it("only 1 fetch request made if fetch returns rejected promise", async() => {
        fetch.mockReject(() => Promise.reject({ err: "ERROR: Creating user - Username Already Exists" }))
        await auth.requestRegistration(e)

        expect(fetch.mock.calls[0][0]).toMatch(
            "http://localhost:3000/auth/register"
        )
        expect(fetch).toHaveBeenCalledTimes(1)

    })
})

describe('registerSubmit', () => {

    it('should make post request to auth/login', async() => {

        fetch.mockResponseOnce(JSON.stringify({ token: "test token", success: true }))
        await auth.requestLogin(e)

        expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'POST')
        expect(fetch.mock.calls[0][0]).toMatch("http://localhost:3000/auth/login")
        expect(fetch.mock.calls[0][1]).toHaveProperty('body', JSON.stringify({ username: "abc", password: "abc" }));

    })

    it("expect login to console warn error message if username exists request fails", async() => {

        fetch.mockReject(() => Promise.reject("error"))
        await auth.requestLogin(e)

        expect(fetch.mock.calls[0][0]).toMatch("http://localhost:3000/auth/login")
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(console.warn.mock.calls[0][0]).toEqual("error")


    })
})

describe('Signing in and out functionality', () => {

    it('logout should empty locale storage', () => {

        localStorage.setItem('username', "test")
        auth.logout()

        expect(auth.currentUser()).toEqual(null)
    })
});