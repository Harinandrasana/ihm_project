const db = require("../connectionDB/db");

class Postes {

    static async getAll() {
        return new Promise(resolve => {
            db.query("SELECT * FROM postes ORDER BY idPoste DESC", [], (err, result) => {
                if (!err)
                    resolve(result);
            })
        })
    }

    static async selectPostForE() {
        return new Promise(resolve => {
            db.query("SELECT idPoste, nomPoste FROM postes", [], (err, result) => {
                if (!err)
                    resolve(result);
            });
        });
    }

    static async addPoste(nom, salaire, commentaire) {

        return new Promise(resolve => {
            db.query("INSERT INTO postes(nomPoste, salaire, commentaire) VALUES(?,?,?)",
                [nom, salaire, commentaire], (err, result) => {
                    if (!err)
                        resolve(true)
                    else
                        resolve(false)
                })
        });
    }

    static async getById(id) {

        return new Promise(resolve => {
            db.query("SELECT * FROM postes WHERE idPoste=?", [id], (err, result) => {
                if (!err)
                    resolve(result);
            })
        })

    }

    static async editPoste(id, nom, salaire, comment) {

        return new Promise(resolve => {
            db.query("UPDATE postes SET nomPoste=?, salaire=?, commentaire=? WHERE idPoste=?",
                [nom, salaire, comment, id],
                (err, result) => {
                    if (!err)
                        resolve(result);
                }
            )
        });

    }

    static async delete(id) {
        return new Promise(resolve => {
            db.query("DELETE FROM postes WHERE idPoste=?", [id], (err, result) => {
                if (err)
                    resolve(false)
                else
                    resolve(true)
            });
        });
    }

};

module.exports = Postes;