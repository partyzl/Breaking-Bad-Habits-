const app = require('./server');
const Port = process.env.PORT || 3000;

app.listen(Port, () => {
    console.log(`Allll aboard! This server is departing from Port ${Port}! Choo choo!`);
})