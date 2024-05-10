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
        const identifient = req.body.identifient;
        const passWord = req.body.passWord;

        const result = await Users.Login(identifient, passWord)
        if(result)
            
            res.json({ms: "Information valide"});
        else{
            res.json({nsg: "erreur"});
            console.log("fausse information");
        }
    }

}
module.exports= UsersController;