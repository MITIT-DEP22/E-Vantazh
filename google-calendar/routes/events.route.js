const express = require('express');
const router = express.Router();
const {authorize} = require("../services/auth.service");
const {addEvents} = require("../services/calendar.service");


router.post('/', async (req, res) => {
    try {
        const {summary, location, description, emails, dateStart, dateEnd} = req.body;
        const client = await authorize();
        return res.send(await addEvents(client, summary, location, description, emails, dateStart, dateEnd));
    } catch (e) {
        res.send(e)
    }
});


module.exports = router;
