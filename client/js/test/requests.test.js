const functions = require('../requests')
import fetchMock from "jest-fetch-mock";

jest.mock

let reqs = require('../requests')

describe('requests', () => {

    const form = document.createElement('form')
    form.innerHTML = 
       `<input type="text" id="name" name="name" value="Eating" >
        <input type="text" id="desc" name="desc" value="eating 100000 calories" />
        <input type="text" id="freq" name="freq" value="daily" >`
    let e = {preventDefault: jest.fn(),
        target:form }


    testData = {
        id: 1,
        name: "Water Break",
        habit_desc: "Take a water break",
        frequency: "daily",
        streak_track: 4,
        streak_start: "test",
        streak_end: "test",
        user_id: 1
      }

    beforeEach(() => {
        updateStreak.mockClear()
        renderHabits.mockClear();
        console.warn.mockClear();
        fetch.resetMocks();
      });
