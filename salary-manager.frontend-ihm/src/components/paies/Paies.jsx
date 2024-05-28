import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  Tr,
  Th,
  Thead,
  Tbody,
  Td,
  HStack,
  Button,
} from "@chakra-ui/react";
import apiClient from "../../services/api-client";
import PaySlipPDF from "../pdf/PaySlipPDF";

const Paies = () => {
  const [paies, setPaies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getPaies();
  }, [currentPage]);

  const getPaies = async () => {
    try {
      const response = await apiClient.get(
        `/paies?_page=${currentPage}&_limit=2`
      );
      setPaies(response.data);
    } catch (error) {
      console.error("Error fetching paies:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR"); // Format the date as "dd/mm/yyyy"
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <Box>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>N° payment</Th>
            <Th>Employee ID</Th>
            <Th>Date of payment</Th>
            <Th>Net salary</Th>
            <Th>Gross salary</Th>
            <Th>Total deductions</Th>
            <Th>Total benefits</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paies.map((paie) => (
            <Tr key={paie.idPaie}>
              <Td>{paie.idPaie}</Td>
              <Td>{paie.idEmploye}</Td>
              <Td>{formatDate(paie.datePaie)}</Td>
              <Td>{paie.salaireNet}</Td>
              <Td>{paie.salaireBrut}</Td>
              <Td>{paie.totalDeduction}</Td>
              <Td>{paie.totalAvantage}</Td>
              <Td>
                <HStack>
                  <PaySlipPDF employeeId={paie.idEmploye} />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <HStack mt={4} spacing={4} justify="center">
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <Button onClick={handleNextPage}>Next</Button>
      </HStack>
    </Box>
  );
};

export default Paies;
