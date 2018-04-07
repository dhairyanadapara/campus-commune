const express = require('express');


let app = express();

app.listen(3000,'192.168.43.87',()=>{
    console.log('Server is up');
})