const db = require("../dbConfig");
const SQL = require("sql-template-strings"); //makes it a cleaner read for the sql queries

class User {
  constructor(data) {
    this.username = data.username;
    this.email = data.email;
    this.passwordDigest = data.password_Digest; //encrypted
  }

  static get all() {
    return new Promise(async (res, rej) => {
      try {
        let result = await db.run(SQL``);
        let users = result.rows.map((r) => new User(r));
        res(users);
      } catch (error) {
        rej(`Error getting all users: ${error}`);
      }
    });
  }

  static create({ username, email, password }) {
    return new Promise(async (res, rej) => {
      try {
        let result = await db.run(SQL``);
        let newUser = new User(result.rows[0]);
        res(newUser);
      } catch (error) {
        rej(`Error creating your user: $(error)`);
      }
    });
  }

  static findByUserName(username) {
    return new Promise(async (res, rej) => {
      try {
        let result = await db.run(SQL``);
        let user = new User(result.rows[0]);
        res(user);
      } catch (error) {
        rej(`Error finding this user: ${error}`);
      }
    });
  }
}
