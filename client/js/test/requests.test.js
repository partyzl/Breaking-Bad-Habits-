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
    
      describe('postHabit', () => {

          it('should make post request and call renderHabits func', async () => {

              fetch.mockResponseOnce(JSON.stringify(testData))
              await reqs.postHabit(e)

              expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'POST')
              expect(fetch.mock.calls[0][0]).toMatch("http://localhost:3000/habits")
              expect(renderHabits).toBeCalledWith([testData])
              expect(renderHabits).toHaveBeenCalledTimes(1)
              expect(console.warn).toHaveBeenCalledTimes(0)
              
            })

          it("expect login to console warn error message if post fails", async () => {
          
                fetch.mockReject(() => Promise.reject( "error"))
                await reqs.postHabit(e)
      
                expect(fetch).toHaveBeenCalledTimes(1)
                expect(renderHabits).toHaveBeenCalledTimes(0)
                expect(console.warn).toHaveBeenCalledTimes(1)
                
              })
       })
    
    describe('getHabits func ', () => {

        it('should make GET request', async () => {

            fetch.mockResponseOnce(JSON.stringify(testData))
            localStorage.setItem('id', 1)
            await reqs.getAllHabbits()

            expect(fetch.mock.calls[0][1]).toHaveProperty('method', 'GET')
            expect(fetch.mock.calls[0][0]).toMatch("http://localhost:3000/habits/1")
            expect(console.warn).toHaveBeenCalledTimes(0)
            
          })

        it("should console warn if GET request fails", async () => {
        
              fetch.mockReject(() => Promise.reject( "error"))
              await reqs.getAllHabbits()
    
              expect(fetch).toHaveBeenCalledTimes(1)
              expect(console.warn).toHaveBeenCalledTimes(1)  
            })
     })

