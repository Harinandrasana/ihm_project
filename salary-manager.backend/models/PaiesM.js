const db = require("../connectionDB/db");
// const ToutEmployer = require('./toutEmplyer');


class Employee {

    static async getAll(callback) {
        db.query("SELECT * FROM salary_manager.paies;", (err, result) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, result);
        });
    }

    static async addPaie(idEmploye, datePaie, salaireNet, salaireBrut, totalDeduction, totalAvantage) {

        return new Promise(resolve => {
            const test = db.query(
                "INSERT INTO salary_manager.paies(idEmploye, datePaie, salaireNet, salaireBrut, totalDeduction, totalAvantage) VALUES (?, ?, ?, ?, ?, ?)",
                [idEmploye, datePaie, salaireNet, salaireBrut, totalDeduction, totalAvantage],
                (err, result) => {
                    if (!err)
                        resolve(result);
                }
            )
            console.log(test)
        });
    }

    static async getById(id) {
        return new Promise((resolve, reject) => {
            const test = db.query("SELECT * FROM paies WHERE idPaie=?", [id], (err, result) => {
                if (err) {

                    reject(err);
                }
                resolve(result);
            })
        })
        console.log(test)

    }

    // static async delete(id) {
    //     return new Promise(resolve => {
    //         db.query("DELETE FROM employes WHERE idEmploye = ?", [id], (err, result) => {
    //             if (err)
    //                 resolve(false);
    //             else
    //                 resolve(true);
    //         });
    //     });
    // };

    // static async recherche(idE, nom, prenom, email, adresse, tel, dateE) {
    //     return new Promise((resolve, reject) => {
    //         const query = `SELECT * FROM paies WHERE idEmploye = ?`;
    //         const params = [idE, `%${nom}%`, `%${prenom}%`, `%${email}%`, `%${adresse}%`, `%${tel}%`, `%${dateE}%`];

    //         db.query(query, params, (err, result) => {
    //             if (err) {
    //                 reject(err); // Properly handle errors by rejecting the promise
    //             } else {
    //                 resolve(result);
    //             }
    //         });
    //     });
    // }


}

module.exports = Employee;