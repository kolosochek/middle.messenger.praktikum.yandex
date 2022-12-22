const express = require('express');
const path = require('path');
const hostname = '0.0.0.0';
const PORT = process.env.PORT || 8080;

//static
const app = express();
app.use(express.static(path.join(__dirname, 'dist')));


app.listen(PORT, hostname, () => {
    console.log(`Express server has been started on port ${PORT}`)
})

