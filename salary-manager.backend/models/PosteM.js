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

    static async countPoste() {
        return new Promise(resolve => {
            db.query("SELECT COUNT(*) AS nbTotalPoste FROM postes", (err, result) => {
                if (!err)
                    resolve(result)
            })
        })
    }

    // static async searchPoste(id, nom, salaire) {
    //     return new Promise(resolve => {
    //         db.query("SELECT * FROM postes WHERE idPoste like ? ON nomPoste like ? ON salaire like ?", [id, `%${nom}%`, salaire], (err, result) => {
    //             if(!err)
    //                 resolve(result);
    //         })
    //     })
    // }

    static async searchPoste(id, nom, salaire) {
        return new Promise((resolve, reject) => {
            // Utilisation de placeholders dans la requête pour éviter l'injection SQL
            let query = "SELECT * FROM postes WHERE idPoste LIKE?";
            if (nom && nom !== '') { // Vérification si le nom n'est pas vide avant d'ajouter la condition
                query += " AND nomPoste LIKE?";
            }
            if (salaire) { // Vérification si le salaire existe avant d'ajouter la condition
                query += " AND salaire LIKE?";
            }

            db.query(query, [id, `%${nom}%`, salaire], (err, result) => {
                if (err) {
                    reject(err); // Gestion des erreurs en rejettant la promesse avec l'erreur
                } else {
                    resolve(result); // Résolution de la promesse avec les résultats
                }
            });
        });
    }



};

module.exports = Postes;