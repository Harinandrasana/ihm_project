import { Button, HStack, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import EmployeeModal from "./EmployeeModal";
import apiClient from "../../services/api-client";
import { useNavigate } from "react-router-dom";
import { DeleteIcon, EditIcon, AddIcon } from "@chakra-ui/icons";
import { Icon } from "@chakra-ui/react";
import { FaMoneyCheckAlt } from "react-icons/fa";
import useNotification from "../../hooks/useNotification";

const ActionButton = ({ employeeId }) => {
  const { displayToast } = useNotification();
  const navigate = useNavigate();
  const [addMod, setAddMode] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deduction, setDeduction] = useState(null);
  const [totalTaux, setTotalTaux] = useState(0);
  const [totalMontant, setTotalMontant] = useState(0);
  const [salaireBrut, setSalaireBrut] = useState(0);
  const [salaireNet, setSalaireNet] = useState(0);

  const closeAndRefresh = () => {
    onClose();
    getEmployees();
  };

  const deleteEmployee = async () => {
    try {
      await apiClient.delete(`/delE/${employeeId}`);
      navigate("/employees");
      displayToast("success", "L'employé a été supprimé avec succès");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDeduction();
  }, [employeeId]);

  const getDeduction = async () => {
    try {
      const response = await apiClient.get(`/deductions/postes/${employeeId}`);
      setDeduction(response.data);
      console.log("deduction", response.data);
    } catch (error) {
      console.error("Error fetching deduction:", error);
      // Gérer les erreurs ici, par exemple en affichant un message à l'utilisateur
    }
  };

  useEffect(() => {
    if (deduction) {
      const salaire = deduction[0]?.salaire;
      setSalaireBrut(salaire);

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

      const salaireNet = salaire - totalMontant;
      setSalaireNet(salaireNet);
    }
  }, [deduction]);

  const handlePaie = async () => {
    try {
      if (salaireBrut !== 0 && salaireNet !== 0 && totalMontant !== 0) {
        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${String(
          today.getMonth() + 1
        ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
        const response = await apiClient.post("/paies", {
          idEmploye: employeeId,
          datePaie: formattedDate,
          salaireNet: salaireNet,
          salaireBrut: salaireBrut,
          totalDeduction: totalMontant,
          totalAvantage: 0,
        });
        if (response) {
          displayToast(
            "success",
            "Le paiement de l'employé a été effectué avec succès"
          );
        }
      } else {
        console.error(
          "Erreur : Les valeurs nécessaires ne sont pas définies correctement."
        );
      }
    } catch (error) {
      console.error("Error to add paies", error);
    }
  };

  return (
    <HStack>
      <Button
        leftIcon={<EditIcon />}
        onClick={() => {
          setAddMode(false);
          onOpen();
        }}
        bg="#22bbf6"
      ></Button>
      <EmployeeModal
        isOpen={isOpen}
        onClose={onClose}
        addMod={addMod}
        selectedId={employeeId}
        closeAndRefresh={closeAndRefresh}
      />
      <Button bg="#dc1f09" onClick={() => deleteEmployee()}>
        <DeleteIcon />
      </Button>
      <Button bg="#50f8c4">
        <Icon as={FaMoneyCheckAlt} boxSize={6} onClick={() => handlePaie()} />
      </Button>
    </HStack>
  );
};

export default ActionButton;
