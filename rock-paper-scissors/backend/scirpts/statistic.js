const { User } = require("./user.js");

class Statistic {
    constructor() {
        this.table = {
            Andrey: {
                win: 5,
                lose: 2
            },
            Boris: {
                win: 10,
                lose: 3
            },
        };
    }

    getUserStat(username) {
        const checkUser = this.table[username];
        if (checkUser) {
            return this.table[username];
        }
        return new User(username);
    }

    addUserStat(user) {
        this.table[user.name] = {
            win: user.win,
            lose: user.lose
        }
    }

    getAllStat() {
        const result = [];
        const userNames = Object.keys(this.table);
        for (let i = 0; i < userNames.length; i++) {
            const username = userNames[i];
            const user = new User(username);
            user.setStat(this.table[username].win, this.table[username].lose);
            result.push(user);
        }
        return result;
    }
}

const statistic = new Statistic();

module.exports = {
    stat: statistic
}
