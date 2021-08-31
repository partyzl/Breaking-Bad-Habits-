const db = require("../dbConfig");
const SQL = require("sql-template-strings"); //makes it a cleaner read for the sql queries
const res = require("express/lib/response");

class Habit {
  constructor(data) {
    this.username = data.username;
    this.habitId = data.habitId;
    this.habit = data.habit;
    this.selectedDays = data.selectedDays;
  }

  static get sortByUserNAme(username){
      return new Promise (async(res,rej)=>{
          try {
              let result = await db.run(
                  SQL`SELECT habit, selectedDays FROM habit 
                  WHERE username = ${username};`);
                let habits = result.rows.map((r) => new Habit(r));
                res(habits);
          } catch (error){
              rej(`Error finding habits: ${error}`);
          }
      })
  }

  static findById(habitId) {
    return new Promise(async (res, rej) => {
      try {
        let result = await db.run(
          SQL`SELECT * FROM habit 
          WHERE habitId = ${habitId};`
        );
        let habit = new Habit(result.rows[0]);
        res(habit);
      } catch (error) {
        rej(`Error finding habit: ${error}`);
      }
    });
  }

  static create(habit, selectedDays, username) {
    return new Promise(async (res, rej) => {
      try {
        let habitData = await db.run(
          SQL`INSERT INTO habits (habit, selectedDays)
          VALUE (${habit}, ${selectedDays})
            WHERE username = ${username};`
        );

        let newHabit = new Habit(habitData.rows[0]);
        res(newHabit);
      } catch (error) {
        rej(`Error creating new habit: ${error}`);
      }
    });
  }

  static update(habit, selectedDAys, username){
      return new Promise(async(res,rej)=>{
          try {let result = await db.run(
              SQL`UPDATE habit
              SET selectedDays = ${selectedDAys}
              WHERE username = ${username} AND habit = ${habit};`);
              res(result)
          }catch(error){
              rej(`Error udating habit: ${error}`);
          }
      })
  }

  delete(habit, username){
      return new Promise (async(res,rej)=>{
          try{
              let result = await db.run(
                  SQL`DELETE FROM ${habit} 
                  WHERE username = ${username};`)
              res(`${habit} is removed from your list!`)
          } catch(error){
              rej(`Error removing ${habit} from your list`)
          }
      })
  }
}

module.exports = Habit;