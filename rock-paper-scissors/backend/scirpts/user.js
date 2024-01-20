class User {
    constructor(name) {
        this.name = name;
        this.win = 0;
        this.lose = 0;
    }

    setStat(win, lose) {
        this.win = win;
        this.lose = lose;
    }
}

module.exports = {
    User
}
