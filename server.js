const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 8080;

//static
const app = express();
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', function (request, response) {
    response.sendFile(path.resolve(path.join(__dirname, 'dist'), 'index.html'));
});
app.listen(PORT, () => {
    console.log(`Express server has been started on port ${PORT}`)
})
module.exports = app;
