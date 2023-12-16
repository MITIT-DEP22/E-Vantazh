const express = require('express');
const path = require('path');
const cors = require("cors");
const eventsRoute = require('./routes/events.route');
const https = require("https");
const fs = require("fs");

require('dotenv').config();

const app = express();
const PORT = process.env.PORT

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/create-action', eventsRoute);

https.createServer({
        key: fs.readFileSync(process.env.SSL_KEY_PATH),
        cert: fs.readFileSync(process.env.SSL_CERT_PATH),
    },
    app).listen(PORT, () => {
    console.log(`Server started on ${PORT} port`)
})