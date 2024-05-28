const db = require("../connectionDB/db");

class Deductions {

    static async allDeduction() {
        return new Promise(resolve => {
            db.query("SELECT *, nomPoste FROM deductions LEFT JOIN postes ON deductions.idPoste = postes.idPoste ORDER BY deductions.idDeduction DESC ", (err, result) => {
                if (!err)
                    resolve(result);
            });
        });
    }

    static async addDeduction(nom, taux, idPoste) {
        return new Promise(resolve => {
            db.query("INSERT INTO deductions(design, TauxD, idPoste) VALUES(?,?,?)", [nom, taux, idPoste], (err, result) => {
                if (!err)
                    resolve(result);
            });
        });
    }

    static async getById(id) {
        return new Promise(resolve => {
            const test = db.query("SELECT * FROM deductions WHERE idDeduction=?", [id], (err, result) => {
                if (!err)
                    resolve(result);
            });
            console.log(test)
        });
    }

    static async editDeduction(id, idPoste, nom, taux) {
        return new Promise(resolve => {
            db.query("UPDATE deductions SET idPoste=?, design=?, TauxD=? WHERE idDeduction=?", [idPoste, nom, taux, id], (err, result) => {
                if (!err)
                    resolve(result);
            });
        });
    }

    static async deleteD(id) {
        return new Promise(resolve => {
            db.query("DELETE FROM deductions WHERE idDeduction=?", [id], (err, result) => {
                if (!err)
                    resolve(result);
            });
        });
    }

    static async getByEmploye(id) {
        return new Promise(resolve => {
            db.query("SELECT postes.nomPoste,postes.salaire,deductions.idDeduction,deductions.design, deductions.TauxD FROM salary_manager.deductions LEFT JOIN salary_manager.postes ON deductions.idPoste = postes.idPoste LEFT JOIN salary_manager.employes ON employes.idPoste = postes.idPoste WHERE employes.idEmploye =? ORDER BY deductions.idPoste", [id], (err, result) => {
                if (!err)
                    resolve(result);
            });
        });
    }


    static async countDeduction() {
        return new Promise(resolve => {
            db.query("SELECT COUNT(*) AS nbTotalDeduction FROM deductions",
                (err, result) => {
                    if (!err)
                        resolve(result);
                })
        })
    }
};


module.exports = Deductions;