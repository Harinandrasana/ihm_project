const db = require("../connectionDB/db");

class Avantages {

    static async addA(nom, taux) {
        return new Promise(resolve => {
            db.query("INSERT INTO avantages(design, montantA) VALUES(?,?)", [nom, taux], (err, result) => {
                if (!err)
                    resolve(result);
            });
        });
    }

    static async getAll() {
        return new Promise(resolve => {
            db.query("SELECT * FROM avantages", [], (err, result) => {
                if (!err)
                    resolve(result);
            });
        });
    }

    static async getOne(id) {
        return new Promise(resolve => {
            db.query("SELECT * FROM avantages WHERE idAvantage=?", [id], (err, result) => {
                if (!err)
                    resolve(result);
            });
        });
    }

    static async editAvantage(id, nom, taux) {
        return new Promise(resolve => {
            db.query("UPDATE avantages SET design=?, montantA=? WHERE idAvantage=?", [nom, taux, id], (err, result) => {
                if (!err)
                    resolve(true)
                else
                    resolve(false)
            });
        });
    }

    static async deleteA(id) {
        return new Promise(resolve => {
            db.query("DELETE FROM avantages WHERE idAvantage=?", [id], (err, result) => {
                if (!err)
                    resolve(result);
            });
        });
    }

}
module.exports = Avantages;