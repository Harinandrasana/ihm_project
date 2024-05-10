const db = require("../connectionDB/db");

class Users {

    static async singUp(identifient, password) {
        return new Promise(resolve => {
            db.query("INSERT INTO users(identifient, passWord) VALUES(?,?)", [identifient, password], (err, result) => {
                if(!err)
                    resolve(result);
            })
        })
    };

    static async Login(identifiant, password) {
        return new Promise(resolve => {
            db.query("SELECT * FROM users WHERE identifient=? AND passWord=?", [identifiant, password], (err, result) => {
                if(!err)
                    resolve(result);
            });
        });
    }

}
module.exports = Users;