const db = require("../connectionDB/db");

class Paie {

    static async addP(idE, idD, idA, mois, salaireN, salaireB, totalD, totalA) {
        return new Promise(resolve => {
            db.query("INSERT INTO paies(idEmploye, mois, totalDeduction, totalAvantage) VALUES(?,?,?,?,?,?,?,?)",
                [idE, idD, idA, mois, salaireN, salaireB, totalD, totalA],
                (err, result) => {
                    if (!err)
                        resolve(result);
                }
            )
        });
    }

    static async totalD(totalD) {
        return new Promise(resolve => {
            db.query("SELECT idEmploye, mois, SUM(montantD) as totalDeduction, SUM(montantA) as totalAvantage FROM paies JOIN deduction ON paies.idDeduction = deductions.idDeduction JOIN avantage ON paies.idAvantage=avantages.idAvantage GOUPE BY idEmloye, moi", [totalD], (err, result) => {
                if (!err)
                    resolve(result);
            });

        });
    }

}
module.exports = Paie;