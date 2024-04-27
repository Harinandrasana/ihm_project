const Avantages = require("../models/AvantageM");

class AvantageControlleur {

    static async addNewAvantage(req, res) {
        const nom = req.body.design;
        const taux = req.body.montantA;
        const data = await Avantages.addA(nom, taux);
        if(data)
            res.json({msg: "Ajout avec succe"});
        else    
            res.json({msg: "Il y a un erreur"});
    }

    static async getAllAvantage(req, res) {
        const result = await Avantages.getAll();
        if(result)
            res.json(result);
    }

    static async getOneAvantage(req, res) {
        const id = req.params.id;
        const result = await Avantages.getOne(id);
        if(result)
            res.json(result);
    }

    static async updateAvantage(req, res) {
        const id = req.params.id;
        const nom = req.body.design;
        const taux = req.body.montantA;
        const x = await Avantages.editAvantage(id, nom, taux);
        if(x)
            res.json({msg: "Modification avec succe"});
        else    
            res.json({msg: "Il y a un erreur"});
    }

    static async deleteAvantage(req, res) {
        const id = req.params.id;
        const y = await Avantages.deleteA(id);
        if(y)
            res.json({msg: "Suppression avec succe"});
        else
            res.json({msg: "Il y a un erreur"});
    }

}
module.exports = AvantageControlleur;