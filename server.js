const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 80;

//static
const app = express();
app.use(express.static(path.join(__dirname, 'dist')));


app.listen(PORT, () => {
    console.log(`Express server has been started on port ${PORT}`)
})

