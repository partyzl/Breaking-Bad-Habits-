const db = require("../dbConfig");
const SQL = require("sql-template-strings"); //makes it a cleaner read for the sql queries
const res = require("express/lib/response");

class Tracker {
  constructor(data) {
    this.habitId = data.habitId;
    this.streak = data.streak;
    this.date = data.date;
  }

  static checkRecord(habitId) {}

  static completed(habitId) {
    return new Promise(async (res, rej) => {
      try {
      } catch (error) {}
    });
  }
}
