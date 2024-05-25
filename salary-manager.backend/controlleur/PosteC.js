const Postes = require("../models/PosteM");

class PosteControlleur {

    static async getAllPoste(req, res) {
        var result = await Postes.getAll();
        if(result)
            res.json(result);
    }

    static async addNewPoste(req, res) {
        const nom = req.body.nomPoste;
        const salaire = req.body.salaire;
        const commentaire = req.body.commentaire;salaire
        var add = await Postes.addPoste(nom, salaire, commentaire);
        if(add)
            res.json({message: "Ajout avec succe"});
        else    
            res.json({message: "Il y a une erreur"}) ;
    }
    
    static async getPosteById(req, res) {
        const id = req.params.id;
        const x = await Postes.getById(id);
        if(x)
            res.send(x);
    }

    static async updatePoste(req, res) {
        const id = req.params.id;
        const nom = req.body.nomPoste;
        const salaire = req.body.salaire;
        const commentaire = req.body.commentaire;
        const up = await Postes.editPoste(id, nom, salaire, commentaire);
        if(up)
            res.json({message: "Modification avec succe"});
        else
            res.json({msg: "Il y a une erreur"});
    }

    static async deletePoste(req, res) {
        const id = req.params.id;
        const result = await Postes.delete(id);
        if(result)
            res.json({message: "Supression avec succe"});
        else
            res.send("Il y a un erreur ");
    }

    static async selectIdNomPoste(req, res) {
        const data = await Postes.selectPostForE();
        if(data)
        res.json(data);
    }

    static async countPostes(req, res) {
        try {
            const result = await Postes.countPoste();
            res.json(result);
        } catch (error) {
            res.json(error)
            console.log(error);
        }
    }

    static async posteRecherche(req, res) {
        try {
            const id = req.query.idPoste;
            const nom = req.query.nomPoste;
            const salaire = req.query.salaire;

            const result = await Postes.searchPoste(id, nom, salaire);
            res.json(result);
            console.log(result)
        } catch (error) {
            res.json(error);
            console.log(error);
        }
    }

};

module.exports= PosteControlleur;