# The Impression of Persistence
---

## Installation
- Clone or download this repo
- Open your terminal and navigate to the api folder
- Run the following to install necessary dependencies
```
npm i
```
---
## Usage

- Ensure you have nothing running with the following script 
```
bash _scripts/teardown.sh
```
- Run the server with
```
bash _scripts/startDev.sh
```
---
## Change Log

- Users can register and login
- User can create habits
- User can tick off habits daily
- User can view their daily and monthly success

## Technologies used

<details>
  <summary><b>Client</b></summary>
  
  
  - HTML
  - CSS
  - JavaScript
  - [NPM](https://www.npmjs.com/)
    - [concurrently](https://www.npmjs.com/package/concurrently)
    - [watchify](https://www.npmjs.com/package/watchify)
    - [jest](https://www.npmjs.com/package/jest)
    - [jwt-decode](https://www.npmjs.com/package/jwt-decode)

</details>

<details>
  <summary><b>Server</b></summary>

- [Docker](https://www.docker.com/)
- [NodeJs](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)

  - [express](https://www.npmjs.com/package/express)
  - [cors](https://www.npmjs.com/package/cors)
  - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
  - [pg](https://www.npmjs.com/package/pg)
  - [bcrypt](https://www.npmjs.com/package/bcrypt)
  - [jest](https://www.npmjs.com/package/jest)
  - [supertest](https://www.npmjs.com/package/supertest)
  - [nodemon](https://www.npmjs.com/package/nodemon)

</details>

<details>
  <summary><b>Database</b></summary>

- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)
  
  </details>

## Wins and Challenges

### Wins
  - Dashboard looks amazing
  - Server works
  - Kenneths functions
  - Calendar feature
  - Auth and Auth

### Challenges
  
  - Being in our group there was a 60% chance you were moving house this week
  - Auth and Auth - but we got it to work in the end
  - Calendar feature + styling for it
  - Testing
</details>

## Routes

| CRUD      | Method | Routes |
| :---        |    :----:   |          ---: |
| Create      | Post       | /auth/register  |
| Create   | Post        | /auth/login      |
| Create      | Post       | /user/habits/:id  |
| Read      | Get      | /user/:id   |
| Read   | Get       | /user/habits      |
| Put   | Update       | /user/habits/:id|
| Delete      | Delete       | /user/habits/:id   |



  
