const Paie = require("../models/PaiementM");

class PaieControlleur {

    static async addNewPaiment(req, res) {
        // const idE = req.body.idEmploye;
        // const idD = req.body.idDeduction;
        // const idA = req.body.idAvantage;
        // const mois = req.body.mois;
        // const salaireN = req.body.salaireNet
        const values = [
            req.body.idEmploye,
            req.body.idDeduction,
            req.body.idAvantage,
            req.body.mois,
            req.body.salaireNet 
        ]
    }

}

module.exports = PaieControlleur;