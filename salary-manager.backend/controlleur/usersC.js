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
            const identifiant = req.body.identifient;
            const password = req.body.passWord;

            const result = await Users.Login(identifiant, password);
            if(result) {
                res.json({msg: "Information valide"})
            }
            res.json({msg: "fausse information"});    
        } catch (error) {
            res.json(error)
            console.log(error)
        }
    }

}
module.exports= UsersController;