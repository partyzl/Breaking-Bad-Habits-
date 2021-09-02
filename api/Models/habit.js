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

  //  Get all habits of the user
  static sortByUserName(username) {
    return new Promise(async (res, rej) => {
      try {
        let result = await db.query(
          SQL`SELECT habit, selectedDays FROM habit 
          WHERE username = ${username};`
        );
        let habits = result.rows.map((r) => new Habit(r));
        res(habits);
      } catch (error) {
        rej(`Error finding habits: ${error}`);
      }
    });
  }

  //   find specific habit by habitId
  static findById(habitId) {
    return new Promise(async (res, rej) => {
      try {
        let result = await db.query(
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

  //   create new habit
  static create(habit, selectedDays, username) {
    return new Promise(async (res, rej) => {
      try {
        let habitData = await db.query(
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

  //  update the frequency of the habit
  static update(habit, selectedDAys, username) {
    return new Promise(async (res, rej) => {
      try {
        let result = await db.query(
          SQL`UPDATE habit 
          SET selectedDays = ${selectedDAys} 
          WHERE username = ${username} AND habit = ${habit};`
        );
        res(result);
      } catch (error) {
        rej(`Error udating habit: ${error}`);
      }
    });
  }

  delete(habit, username) {
    return new Promise(async (res, rej) => {
      try {
        let result = await db.query(
          SQL`DELETE FROM ${habit} 
          WHERE username = ${username};`
        );
        res(`${habit} is removed from your list!`);
      } catch (error) {
        rej(`Error removing ${habit} from your list`);
      }
    });
  }

  static checkHabitId(habit, username) {
    return new Promise(async (res, rej) => {
      try {
        let targetHabitId = await db.query(
          SQL`SELECT habitId FROM habits 
            WHERE habit = ${habit} AND username = ${username};`
        );
        res(targetHabitId);
      } catch (error) {
        rej(`Error finding habit Id: ${error}`);
      }
    });
  }

  static checkDateDiff(habit, username) {
    return new Promise(async (res, rej) => {
      try {
        let habitId = this.checkHabitId(habit, username);
        let dateDiff = await db.query(
          SQL`SELECT DATEDIFF
          (day, (SELECT MAX(date) FROM track 
          WHERE habitId = ${habitId}), 
          GETDATE());`
        );
        res(dateDiff);
      } catch (error) {
        rej(`Error checking DateDiff: ${error}`);
      }
    });
  }

  static checkWeekdayDiff(habit, username) {
    return new Promise(async (res, rej) => {
      try {
        let selectedDays = await db.query(
          SQL`SELECT selectedDays FROM habits 
          WHERE habit = ${habit} AND username = ${username};`
        );
        let dayDiffArr = [];
        for (let day of selectedDays) {
          dayDiffArr.push(
            Math.abs(day - selectedDays[selectedDays.indexOf(day) + 1])
          );
        }
        res(dayDiffArr);
      } catch (error) {
        rej(`Error checking sleceted weekdays: ${error}`);
      }
    });
  }

  static calculateStreak(habit, username) {
    return new Promise(async (res, rej) => {
      try {
        let dateDiff = this.checkDateDiff(habit, username);
        let dayDiffArr = this.checkWeekdayDiff(habit, username);
        if (dateDiff > 7 || !dayDiffArr.includes(dateDiff)) {
          let streak = 1;
        } else {
          let streak = await db.query(
            SQL`SELECT streak FROM 
            (SELECT streak, MAX(date) FROM track);`
          );
          streak++;
        }
        res(streak);
      } catch (error) {
        rej(`Error calculating streak: ${error}`);
      }
    });
  }
}

module.exports = Habit;
