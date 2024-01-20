const express = require('express');
const router = express.Router();
const { stat } = require('./scirpts/statistic');
const { User } = require('./scirpts/user');

router.get('/', (req, res) => {
    const user = new User('User');
    res.render('home.njk', {
        user,
        signin: true
    });
});

router.get('/signin', function (req, res) {
    const username = req.query.username;
    const userStat = stat.getUserStat(username);
    const user = new User(username);
    const allStat = stat.getAllStat();
    user.setStat(userStat.win, userStat.lose);
    res.render('home.njk', {
        user,
        allStat,
        signin: false
    });
});

module.exports = router;
