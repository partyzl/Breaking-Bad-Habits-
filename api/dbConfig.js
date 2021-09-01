const {Pool} = require('pg');

const pool = new Pool();

// const run = (q, values, cb) => {
//     return pool.query(q, values, cb)
// };

module.exports = pool;
