import React, { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import useNotification from "../../hooks/useNotification";

const DeductionsTable = () => {
  const [deduction, setDeduction] = useState([]);
  const [addMod, setAddMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { displayToast } = useNotification();

  useEffect(() => {
    getDeductions();
  }, []);

  const getDeductions = async () => {
    const response = await apiClient.get("/allD");
    setDeduction(response.data);
  };

  return (
    <TableContainer
      pt={5}
      p={10}
      mr={10}
      textAlign={"center"}
      border="4px solid #f2f2f2"
      boxShadow={10}
      outline={10}
      rounded={16}
      color="black"
    >
      <Table>
        {/* <TableCaption>Listes des employes de la societé</TableCaption> */}
        <Thead h={58}>
          <Tr borderBottom="2px solid #f3f2f2">
            <Th>Identifiant</Th>
            <Th>Designation</Th>
            <Th>Poste</Th>
            <Th>Taux déduit</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {deduction.map((deduction) => (
            <Tr key={deduction.idDeduction} borderBottom="2px solid #f3f2f2">
              <Td verticalAlign="middle">{deduction.idDeduction}</Td>
              <Td verticalAlign="middle">{deduction.design}</Td>
              <Td verticalAlign="middle">{deduction.idPoste}</Td>
              <Td verticalAlign="middle">{deduction.tauxD}</Td>
              <Td verticalAlign="middle">
                <HStack spacing={8} textAlign={"center"}>
                  <Container>
                    <Button
                      bg="#2388f6"
                      mr={8}
                      onClick={() => {
                        setSelectedId(deduction.idDeduction);
                        setOverlay(<OverlayTwo />);
                        setAddMode(false);
                        onOpen();
                      }}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      bg="#dc1f09"
                      onClick={() => deleteDeduction(deduction.idDeduction)}
                    >
                      <DeleteIcon />
                    </Button>
                  </Container>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default DeductionsTable;
