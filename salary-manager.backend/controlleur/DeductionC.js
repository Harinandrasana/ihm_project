const Deductions = require("../models/DeductionM");

class DeductionControlleur {

    static async getAllDeduction(req, res) {
        const result = await Deductions.allDeduction();
        if (result)
            res.json(result);
    }

    static async addNewDeduction(req, res) {
        const nom = req.body.design;
        const tauxD = req.body.tauxD;
        const idPoste = req.body.idPoste;

        const result = await Deductions.addDeduction(nom, tauxD, idPoste);
        if (result)
            res.json({ message: "Ajout avec succe" });
        else
            res.json({ msg: "Erreur dans l'ajout" });
    }

    static async getDeductionById(req, res) {
        const id = req.params.id;
        const data = await Deductions.getById(id);
        if (data)
            res.json(data);
    }

    static async updateDeduction(req, res) {
        const id = req.params.id;
        const idPoste = req.body.idPoste;
        const nom = req.body.design;
        const taux = req.body.TauxD;
        console.log("idPoste", idPoste)

        const data = await Deductions.editDeduction(id, idPoste, nom, taux);
        if (data)
            res.json({ msg: "Modification avec succe" });
        else
            res.json({ msg: "Il y a un erreur" });
    }

    static async deleteDeduction(req, res) {
        const id = req.params.id;
        const y = await Deductions.deleteD(id);
        if (y)
            res.json({ msg: "Suppression avec succe " });
        else
            res.json({ msg: "Erreur de suppression" });
    }

    static async getDeductionEmploye(req, res) {
        const id = req.params.id;
        const data = await Deductions.getByEmploye(id);
        if (data)
            res.json(data);
    }

    static async countDeductions(req, res) {
        try {
            const result = await Deductions.countDeduction();
            res.json(result);
        } catch (error) {
            console.log(error);
        }
    }

}
module.exports = DeductionControlleur;

