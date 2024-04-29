const Paie = require("../models/PaiesM");

//cette fonction recpere tous les employer dans la base de donnees
exports.getAllPaies = async (req, res) => {
    //appelle du metode getAll de EmployerM
    //En passant une fonction de rappel qui sera executer une fois que la requete est terminer

    const allPaies = await Paie.getAll((err, data) => {
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


exports.addNewPaie = async (req, res) => {

    //appelle de la methode getById definie dans EmployerM
    console.log(req.body)
    const idEmploye = req.body.idEmploye;
    const datePaie = req.body.datePaie;
    const salaireNet = req.body.salaireNet;
    const salaireBrut = req.body.salaireBrut;
    const totalDeduction = req.body.totalDeduction;
    const totalAvantage = req.body.totalAvantage;
    try {
        const result = await Paie.addPaie(idEmploye, datePaie, salaireNet, salaireBrut, totalDeduction, totalAvantage);
        res.json({ msg: "ajout avec succès" });
        console.log(result);
    } catch (err) {
        res.status(500).json({ message: err.message || "Erreur lors de la création du paie." });
    }
};


exports.getPaieById = async (req, res) => {
    try {
        var id = req.params.id;
        const data = await Paie.getById(id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPaieByEmployeeId = async (req, res) => {
    try {
        var id = req.params.id;
        const data = await Paie.getByEmployeeId(id);
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

        var x = await Paie.edit(id, newidPoste, newnom, newprenom, newdateNaissance, newadresse, newimage_url, newemail, newtel, newdateEmbauche);
        res.json({ mgs: "Modification avec succe" })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};


exports.deleteEmploye = async (req, res) => {
    try {
        var id = req.params.id;
        var result = await Paie.delete(id);
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
        const resultats = await Paie.recherche(idE, nom, prenom, email, adresse, tel, dateE);

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