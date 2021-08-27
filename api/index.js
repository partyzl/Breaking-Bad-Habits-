const app = require('express');
const Port = process.env.PORT || 3000;

app.listen(Port, ()=>{
    console.log(`server is listening at ${Port}`);
})