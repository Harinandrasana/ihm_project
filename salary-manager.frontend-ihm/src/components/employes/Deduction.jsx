import React, { useEffect, useState } from "react";
import {
  Box,
  HStack,
  Progress,
  TableCaption,
  Tbody,
  Text,
  Thead,
} from "@chakra-ui/react";
import apiClient from "../../services/api-client";
import { TableContainer, Table, Tr, Td, Th } from "@chakra-ui/react";
import ShowerGraph from "../graph/ShowerGraph";

const Deduction = ({ employeeId }) => {
  const [deduction, setDeduction] = useState(null);
  const [totalTaux, setTotalTaux] = useState(0);
  const [totalMontant, setTotalMontant] = useState(0);

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
    deduction && (
      <HStack textAlign="center" spacing={20} mt={5}>
        <Box>
          <Box>
            {/* <Progress hasStripe value={10} />
            <Text>Demande de congé</Text> */}
          </Box>{" "}
          <TableContainer
            pt={0}
            mr={10}
            minW={400}
            textAlign={"center"}
            border="1px solid #f2f2f2"
            boxShadow={10}
            outline={10}
            color="black"
          >
            <Text bg={"gray.800"} fontSize={"25px"} color={"white"} p={3}>
              Grille salariale
            </Text>
            <Table mt={2}>
              <TableCaption>Grille de salaire de l'mployé</TableCaption>
              <Thead>
                <Tr>
                  <Th>Libellé</Th>
                  <Th>Taux</Th>
                  <Th>Montant</Th>
                </Tr>
              </Thead>
              <Tbody h={58}>
                <Tr borderBottom="2px solid #f3f2f2">
                  <Th>Salaire</Th>
                  <Td>{(100).toFixed(2)}%</Td>
                  <Td verticalAlign="middle">
                    {deduction[0]?.salaire.toFixed(2)} Ar
                  </Td>
                </Tr>
                {deduction.map((deductionItem, index) => (
                  <Tr key={index + 1}>
                    <Th>{deductionItem.design}</Th>
                    <Td verticalAlign="middle">
                      {deductionItem.TauxD?.toFixed(2)}%
                    </Td>
                    <Td verticalAlign="middle">
                      {(
                        (deductionItem.TauxD * deductionItem.salaire) /
                        100
                      ).toFixed(2)}{" "}
                      Ar
                    </Td>
                  </Tr>
                ))}
                <Tr>
                  <Th>Total Deduit</Th>
                  <Th>{totalTaux.toFixed(2)}%</Th>
                  <Td>{totalMontant.toFixed(2)} Ar</Td>
                </Tr>
                <Tr>
                  <Th>Net à payer</Th>
                  <Th></Th>
                  <Td>
                    {(deduction[0]?.salaire - totalMontant).toFixed(2)} Ar
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </HStack>
    )
  );
};

export default Deduction;
