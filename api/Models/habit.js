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

  static create(habit, selectedDays, userId) {
    return new Promise(async (res, rej) => {
      try {
        let result = await db.run(
          SQL`INSERT INTO habits (habit, selectedDays, userId)
          VALUE (${habit}, ${selectedDays}, ${userId});`
        );

        let newHabit = new Habit(result.rows[0]);
        res(newHabit);
      } catch (error) {
        rej(`Error creating new habit: ${error}`);
      }
    });
  }
}

module.exports = Habit;