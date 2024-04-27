import React, { useEffect, useState } from "react";
import { Button, Container, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import apiClient from "../../services/api-client";
import useNotification from "../../hooks/useNotification";
import EmployeeModal from "./EmployeeModal";
import EmployeeGrid from "./EmployeeGrid";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [addMod, setAddMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { displayToast } = useNotification();

  const handleSubmit = async (employeeId) => {
    try {
      const updatedPaieValues = await assignValue(employeeId);
      await apiClient.post("/paies", updatedPaieValues);
      setPaiesValues({
        idPaie: 0,
        idEmploye: 0,
        mois: "",
        salaireNet: 0,
        salaireBrut: 0,
        totalDedution: 0,
        totalAvantage: 0,
      });
      displayToast("success", "Les paiements ont été faits avec succès");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const closeAndRefresh = () => {
    onClose();
    getEmployees();
  };

  const getEmployees = async () => {
    try {
      const response = await apiClient.get("/allE");
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxW="full" overflow="auto">
      <Button
        leftIcon={<AddIcon />}
        onClick={() => {
          setAddMode(true);
          onOpen();
        }}
        bg="#30e9a8"
        mb={5}
      >
        Ajouter des employés
      </Button>
      <EmployeeModal
        isOpen={isOpen}
        onClose={onClose}
        addMod={addMod}
        selectedId={selectedId}
        closeAndRefresh={closeAndRefresh}
      />
      <EmployeeGrid />
    </Container>
  );
};

export default Employees;
