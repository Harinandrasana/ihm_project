const Employee = require("../models/EmployerM");

//cette fonction recpere tous les employer dans la base de donnees
exports.getAllEmployees = async (req, res) => {
    //appelle du metode getAll de EmployerM
    //En passant une fonction de rappel qui sera executer une fois que la requete est terminer

    const allEmploye = await Employee.getAll((err, data) => {
        if (err) {
            //si une erreur se produit lors de l'execution de la requete SQL dans le modele
            //renvoie une reponse HTTP avec le code d'erreur 500 et une message d'erreur
            res.status(500).json({ error: err.message });
        } else {
            //Si la requete est reussi renvois les employees recuperes dans la reponse HTTP
            res.json(data);
        }
    });

};


exports.addNewEmployer = async (req, res) => {

    //appelle de la methode getById definie dans EmployerM
    var idPoste = req.body.idPoste;
    var nom = req.body.nom;
    var prenom = req.body.prenom;
    var dateNaissance = req.body.dateNaissance;
    var adresse = req.body.adresse;
    var image_url = req.body.image_url;
    var email = req.body.email;
    var tel = req.body.tel;
    var dateEmbauche = req.body.dateEmbauche;
    try {
        const result = await Employee.addPaie(idPoste, nom, prenom, dateNaissance, adresse, image_url, email, tel, dateEmbauche);
        res.json({ msg: "ajout avec succès" });
        console.log(result);
    } catch (err) {
        res.status(500).json({ message: err.message || "Erreur lors de la création de l'employé." });
    }
};


exports.getEmployeById = async (req, res) => {
    try {
        var id = req.params.id;
        const data = await Employee.getById(id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateEmploye = async (req, res) => {

    try {
        const id = req.params.id;
        const newidPoste = req.body.idPoste;
        const newnom = req.body.nom;
        const newprenom = req.body.prenom;
        const newdateNaissance = req.body.dateNaissance;
        const newadresse = req.body.adresse;
        const newimage_url = req.body.image_url;
        const newemail = req.body.email;
        const newtel = req.body.tel;
        const newdateEmbauche = req.body.dateEmbauche;

        console.log(id)

        var x = await Employee.edit(id, newidPoste, newnom, newprenom, newdateNaissance, newadresse, newimage_url, newemail, newtel, newdateEmbauche);
        res.json({ mgs: "Modification avec succe" })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};


exports.deleteEmploye = async (req, res) => {
    try {
        var id = req.params.id;
        var result = await Employee.delete(id);
        if (result)
            res.json({ msg: "Suppression avec succe" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.cherche = async (req, res) => {
    try {
        // Extraction des paramètres de la requête
        const { idE, nom, prenom, email, adresse, tel, dateE } = req.query;

        // Appel de la fonction de recherche avec les paramètres
        const resultats = await Employee.recherche(idE, nom, prenom, email, adresse, tel, dateE);

        // Envoi des résultats au client
        res.status(200).json(resultats);
    } catch (error) {
        // Gestion des erreurs
        console.error(error);
        res.status(500).json({ message: "Une erreur est survenue lors de la recherche." });
    }
};

























// exports.getAllEmployees = (req, res) => {
//     Employee.getAll((err, data) => {
//        if (err) {
//          res.status(500).send({
//            message: err.message || "Erreur lors de la récupération des employés."
//          });
//        } else {
//          res.json(data);
//        }
//     });
// };