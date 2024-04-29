const db = require("../connectionDB/db");
// const ToutEmployer = require('./toutEmplyer');


class Employee {

    static async getAll(callback) {
        db.query("SELECT *, nomPoste FROM salary_manager.employes LEFT JOIN salary_manager.postes ON employes.idPoste = postes.idPoste", (err, result) => {
            if (err) {
                callback(err, null); //si une erreur se produit renvoyer l'erreur
                return;
            }
            callback(null, result);
        });
    }

    static async addEmployer(idPoste, nom, prenom, dateNaissance, adresse, image_url, email, tel, dateEmbauche) {

        return new Promise(resolve => {
            const test = db.query(
                `INSERT INTO salary_manager.employes(idPoste, nom, prenom, dateNaissance, adresse, image_url, email, tel, dateEmbauche) VALUES(?, ?, ?,?, ?, ?, ?, ?, ?)`,
                [idPoste, nom, prenom, dateNaissance, adresse, image_url, email, tel, dateEmbauche],
                (err, result) => {
                    if (!err)
                        resolve(result); //si une erreur se produit renvoyer l'erreur
                }
            )
            console.log(test)
        });
    }

    static async getById(id) {
        return new Promise((resolve, reject) => {
            const test = db.query("SELECT *, nomPoste FROM employes LEFT JOIN postes ON employes.idPoste = postes.idPoste WHERE idEmploye=?", [id], (err, result) => {
                if (err) {

                    reject(err);
                }
                resolve(result);
            })
        })
        console.log(test)

    }

    static async edit(idEmploye, idPoste, nom, prenom, dateNaissance, adresse, image_url, email, tel, dateEmbauche) {
        return new Promise(resolve => {
            db.query("UPDATE employes set idPoste=?, nom=?, prenom=?, dateNaissance=?, adresse=?, image_url=?, email=?, tel=?, dateEmbauche=? WHERE idEmploye=?",
                [idPoste, nom, prenom, dateNaissance, adresse, image_url, email, tel, dateEmbauche, idEmploye],
                (error, result) => {
                    if (!error)
                        resolve(result);
                }
            )
        })
    };

    static async delete(id) {
        return new Promise(resolve => {
            db.query("DELETE FROM employes WHERE idEmploye = ?", [id], (err, result) => {
                if (err)
                    resolve(false);
                else
                    resolve(true);
            });
        });
    };

    static async recherche(idE, nom, prenom, email, adresse, tel, dateE) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM employes WHERE idEmploye = ? OR nom LIKE ? OR prenom LIKE ? OR email LIKE ? OR adresse LIKE ? OR tel LIKE ? OR dateEmbauche LIKE ?`;
            const params = [idE, `%${nom}%`, `%${prenom}%`, `%${email}%`, `%${adresse}%`, `%${tel}%`, `%${dateE}%`];

            db.query(query, params, (err, result) => {
                if (err) {
                    reject(err); // Properly handle errors by rejecting the promise
                } else {
                    resolve(result);
                }
            });
        });
    }


}

module.exports = Employee;