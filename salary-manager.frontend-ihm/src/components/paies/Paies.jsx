import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  Tr,
  Th,
  Thead,
  Tbody,
  TableCaption,
  Td,
  Tfoot,
  HStack,
  Button,
  Box,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, AddIcon } from "@chakra-ui/icons";
import apiClient from "../../services/api-client";
import { Link } from "react-router-dom";
import usePdf from "../../hooks/usePdf";
import { FaPrint } from "react-icons/fa";

const Paies = () => {
  const [paies, setPaies] = useState([]);
  const { generatePDF } = usePdf();

  useEffect(() => {
    getPaies();
  }, []);

  const getPaies = async () => {
    const response = await apiClient.get("/paies");
    setPaies(response.data);
  };

  const deletePaie = async (id) => {
    try {
      await apiClient.delete(`/paies/${id}`);
      getPaies();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Link to="/paies/add">
        <Button leftIcon={<AddIcon />} bg="#30e9a8" mb={5}>
          Ajouter des paies
        </Button>
      </Link>
      <TableContainer
        mr={10}
        pt={2}
        px={5}
        border="1px solid #f2f2f2"
        roundedTopLeft={21}
        roundedTopRight={21}
        color="black"
        alignItems="center"
        alignContent="center"
      >
        <Table variant="striped" colorScheme="teal">
          {/* <TableCaption>Listes des employes de la societé</TableCaption> */}
          <Thead h={58}>
            <Tr borderBottom="2px solid #f3f2f2">
              <Th>N° payement</Th>
              <Th>Identifiant employe</Th>
              <Th>Date du paiement</Th>
              <Th>Salaire net</Th>
              <Th>Salaire brut</Th>
              <Th>Total déduit</Th>
              <Th>Total avantage</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paies.map((paie) => (
              <Tr key={paie.idPaie} borderBottom="2px solid #f3f2f2">
                <Td verticalAlign="middle">{paie.idPaie}</Td>
                <Td verticalAlign="middle">{paie.idEmploye}</Td>
                <Td verticalAlign="middle">{paie.mois}</Td>
                <Td verticalAlign="middle">{paie.salaireNet}</Td>
                <Td verticalAlign="middle">{paie.salaireBrut}</Td>
                <Td verticalAlign="middle">{paie.totalDeduction}</Td>
                <Td verticalAlign="middle">{paie.totalAvantage}</Td>
                <Td verticalAlign="middle">
                  <HStack>
                    {/* <Link to={`edit/${paie.idPaie}`}>
                      <Button bg="#2388f6" leftIcon={<EditIcon />}></Button>
                    </Link>
                    <Button
                      bg="#dc1f09"
                      leftIcon={<DeleteIcon />}
                      onClick={() => deletePaie(paie.idPaie)}
                    ></Button> */}
                    <Button bg="white" onClick={() => generatePDF()}>
                      <FaPrint />
                    </Button>{" "}
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Paies;
