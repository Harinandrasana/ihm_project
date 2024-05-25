const Users = require("../models/users");

class UsersController {

    static async addUsers(req, res) {
        const identifient = req.body.identifient;
        const password = req.body.password;

        const result = await Users.singUp(identifiant, password);
        if(result)
            res.json({msg: "Ajout avec succe"});
        else
            res.json({msg: "problem d'ajout"});
    }


    static async Authentification(req, res) {
        try {
            const identifiant = req.body.identifiant;
            const password = req.body.password; 

            const result = await Users.Login(identifiant, password);
            if(result && result.length > 0) { 
                res.send(result);
            } else {
                res.json({msg: "fausse information"});
            }
        } catch (error) {
            res.json({msg: "Erreur interne", error: error.message});
            console.log(error);
        }
    }

    static async getUsersC(req, res) {
        try {
            const result = await Users.getUsers();
            res.json(result);
        } catch (error) {
            console.log(error);
        }
    }

}
module.exports= UsersController;