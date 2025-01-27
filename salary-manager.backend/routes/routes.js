const express = require("express");
const router = express.Router();
const EmployeC = require("../controlleur/EmployerC");
const DeductionControlleur = require("../controlleur/DeductionC");
const PosteControlleur = require("../controlleur/PosteC");
const AvantageControlleur = require("../controlleur/AvantageC");
const PaieControlleur = require("../controlleur/PaiesC");
const UsersController = require("../controlleur/usersC");


//route pour tous les traitement de l'EMPLOYE 
router.post('/addE', EmployeC.addNewEmployer);
router.get('/allE', EmployeC.getAllEmployees);
router.get('/oneE/:id', EmployeC.getEmployeById);
router.delete('/delE/:id', EmployeC.deleteEmploye);
router.put('/updateE/:id', EmployeC.updateEmploye);

//route pour tous les traitement de POSTE
router.get('/allP', PosteControlleur.getAllPoste);
router.post('/addP', PosteControlleur.addNewPoste);
router.get('/oneP/:id', PosteControlleur.getPosteById);
router.delete('/delP/:id', PosteControlleur.deletePoste);
router.put('/updateP/:id', PosteControlleur.updatePoste);
router.get('/idNomP', PosteControlleur.selectIdNomPoste);

//route pour tous les traitement de DEDUCTION
router.get('/allD', DeductionControlleur.getAllDeduction);
router.post('/addD', DeductionControlleur.addNewDeduction);
router.get('/oneD/:id', DeductionControlleur.getDeductionById);
router.put('/updateD/:id', DeductionControlleur.updateDeduction);
router.delete('/delD/:id', DeductionControlleur.deleteDeduction);
router.get('/deductions/postes/:id', DeductionControlleur.getDeductionEmploye);

//route pour tous les traitement des AVANTAGES
router.post('/addA', AvantageControlleur.addNewAvantage);
router.get('/allA', AvantageControlleur.getAllAvantage);
router.get('/oneA/:id', AvantageControlleur.getOneAvantage);
router.put('/updateA/:id', AvantageControlleur.updateAvantage);
router.delete('/delA/:id', AvantageControlleur.deleteAvantage);

//route pour tous les paies
//route pour tous les traitement des AVANTAGES
router.post('/paies', PaieControlleur.addNewPaie);
router.get('/paies', PaieControlleur.getAllPaies);
router.get('/paies/:id', PaieControlleur.getPaieByEmployeeId);
// router.put('/updateA/:id', AvantageControlleur.updateAvantage);
// router.delete('/delA/:id', AvantageControlleur.deleteAvantage);

//route pour le login
router.post('/addLog', UsersController.addUsers);
router.post('/login', UsersController.Authentification);
router.get('/getUsers', UsersController.getUsersC);

module.exports = router;