const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const adminRouter = require('./router/admin');

const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(adminRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, '/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on ${port}.`);
});

