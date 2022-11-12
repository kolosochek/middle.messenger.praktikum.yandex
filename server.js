const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;

//static 
const static_url = path.join(__dirname, 'static')
const app = express();
app.use(express.static(static_url))


app.listen(PORT, () => {
  console.log(`Express server has been started on port ${PORT}`)
})
