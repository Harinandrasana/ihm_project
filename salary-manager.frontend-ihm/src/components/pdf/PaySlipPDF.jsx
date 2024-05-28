import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button } from "@chakra-ui/react";
import apiClient from "../../services/api-client";
import { FaPrint } from "react-icons/fa";

const PaySlipPDF = ({ employeeId }) => {
  const [deduction, setDeduction] = useState([]);
  const [totalTaux, setTotalTaux] = useState(0);
  const [totalMontant, setTotalMontant] = useState(0);
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    if (employeeId) {
      getDeduction();
      getEmployee();
    }
  }, [employeeId]);

  const getEmployee = async () => {
    try {
      const response = await apiClient.get(`/oneE/${employeeId}`);
      setEmployee(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getDeduction = async () => {
    try {
      const response = await apiClient.get(`/deductions/postes/${employeeId}`);
      setDeduction(response.data);
    } catch (error) {
      console.error("Error fetching deduction:", error);
      // Gérer les erreurs ici, par exemple en affichant un message à l'utilisateur
    }
  };

  useEffect(() => {
    if (deduction.length > 0) {
      const totalTaux = deduction.reduce(
        (acc, curr) => acc + parseFloat(curr.TauxD),
        0
      );
      setTotalTaux(totalTaux);

      const totalMontant = deduction.reduce(
        (acc, curr) =>
          acc + (parseFloat(curr.TauxD) * parseFloat(curr.salaire)) / 100,
        0
      );
      setTotalMontant(totalMontant);
    }
  }, [deduction]);

  const generatePDF = () => {
    const doc = new jsPDF();

    const title = "Bulletin de paie de l'employé N° " + employeeId;
    const pageWidth = doc.internal.pageSize.getWidth();
    const titleX = (pageWidth - doc.getTextWidth(title)) / 2;

    // Titre du document
    doc.text(title, titleX, 15);

    const data = [
      ["Libellé", "Base", "Taux", "Retenues Montant", "Montant total"],
      [
        "Total brut",
        deduction[0]?.salaire?.toFixed(2) || "0.00",
        "100.00",
        "0",
        deduction[0]?.salaire?.toFixed(2),
      ],
      ...deduction.map((deductionItem) => [
        deductionItem.design,
        "",
        parseFloat(deductionItem.TauxD)?.toFixed(2) || "0.00",
        (
          (parseFloat(deductionItem.TauxD) *
            parseFloat(deductionItem.salaire)) /
          100
        ).toFixed(2),
        (
          (parseFloat(deductionItem.TauxD) *
            parseFloat(deductionItem.salaire)) /
          100
        ).toFixed(2),
      ]),
      ["Total Deduit", "", totalTaux.toFixed(2), "", totalMontant.toFixed(2)],
      [
        "Net à payer",
        "",
        "",
        "",
        (deduction[0]?.salaire - totalMontant).toFixed(2) || "0.00",
      ],
    ];

    // ajouter des données en texte simple se positionnant vers la droite , et pas en table

    doc.autoTable({
      startY: 20,
      head: [data[0]],
      body: data.slice(1),
    });

    doc.save("bulletin_de_paie.pdf");
  };

  return (
    <Button bg="white" onClick={generatePDF}>
      <FaPrint />
    </Button>
  );
};

export default PaySlipPDF;
