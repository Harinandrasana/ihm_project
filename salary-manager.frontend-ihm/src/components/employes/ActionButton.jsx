import { Button, HStack, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import EmployeeModal from "./EmployeeModal";
import apiClient from "../../services/api-client";
import displayToast from "../../hooks/useNotification";
import { useNavigate } from "react-router-dom";
import useNotification from "../../hooks/useNotification";
import { DeleteIcon, EditIcon, AddIcon } from "@chakra-ui/icons";

const ActionButton = ({ employeeId }) => {
  const { displayToast } = useNotification();
  const navigate = useNavigate();
  const [addMod, setAddMode] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deduction, setDeduction] = useState(null);
  const [totalTaux, setTotalTaux] = useState(0);
  const [totalMontant, setTotalMontant] = useState(0);
  const [paieValues, setPaiesValues] = useState({
    idPaie: 0,
    idEmploye: 0,
    datePaie: "",
    salaireNet: 0,
    salaireBrut: 0,
    totalDedution: 0,
    totalAvantage: 0,
  });

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
    } catch (error) {
      console.error("Error fetching deduction:", error);
      // Gérer les erreurs ici, par exemple en affichant un message à l'utilisateur
    }
  };

  useEffect(() => {
    if (deduction) {
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
      <Button bg="#50f8c4">Payer</Button>
    </HStack>
  );
};

export default ActionButton;
