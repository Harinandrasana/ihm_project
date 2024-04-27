import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const usePdf = () => {
    const generatePDF = () => {
        // Créer un nouveau document PDF
        const doc = new jsPDF();

        // Ajouter le titre de la fiche de paie
        doc.text("Bulletin de paie", 10, 10);

        // Données du tableau de la fiche de paie
        const data = [
            ["Libellé", "Base", "Taux", "Retenues Montant", "Charges Patronales"],
            ["Total brut", "3000$", "100%", "0$", "300$"],
            ["Assurance santé", "3000$", "100%", "0$", "300$"],
            ["Assurance retraite", "3000$", "100%", "0$", "300$"],
            ["Assurance chomage", "3000$", "100%", "0$", "300$"],
            ["Heures supplémentaires", "500$", "25%", "125$", "50$"],
            // Ajoutez plus de lignes de données si nécessaire
        ];

        // Générer le tableau avec les données
        doc.autoTable({
            startY: 20, // Position de départ du tableau en y
            head: [data[0]], // En-tête du tableau
            body: data.slice(1), // Corps du tableau (à partir de la deuxième ligne)
        });

        // Télécharger le PDF
        doc.save("bulletin_de_paie.pdf");
    };

    return { generatePDF };
};

export default usePdf;
