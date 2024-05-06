import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  Tr,
  Th,
  Thead,
  Tbody,
  Td,
  HStack,
  Button,
  Container,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Icon,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, AddIcon } from "@chakra-ui/icons";
import apiClient from "../../services/api-client";
import { Link } from "react-router-dom";
import DeductionAdd from "./DeductionAdd";
import DeductionEdit from "./DeductionEdit";
import useNotification from "../../hooks/useNotification";

const Deductions = () => {
  const [deduction, setDeduction] = useState([]);
  const [addMod, setAddMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { displayToast } = useNotification();

  useEffect(() => {
    getDeductions();
  }, []);

  const closeAndRefresh = () => {
    onClose();
    getDeductions();
  };

  const getDeductions = async () => {
    const response = await apiClient.get("/allD");
    setDeduction(response.data);
  };

  const deleteDeduction = async (id) => {
    try {
      await apiClient.delete(`/delD/${id}`);
      getDeductions();
      displayToast("success", "La déduction a été supprimer avec succès");
    } catch (error) {
      console.log(error);
    }
  };

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const OverlayTwo = () => (
    <ModalOverlay
      bg="rgba(172, 157, 172, 0.8)" // Couleur avec une opacité de 0.8
      backdropFilter={"inherit"}
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  return (
    <Container maxW="full" overflow="auto">
      <Button
        leftIcon={<AddIcon />}
        onClick={() => {
          setOverlay(<OverlayTwo />);
          setAddMode(true);
          onOpen();
        }}
        bg="#30e9a8"
        mb={5}
      >
        Ajouter des deductions
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose} size={"md"} si>
        {overlay}
        <ModalContent maxW={"600px"}>
          <ModalHeader textAlign="center">
            <Text>
              {addMod
                ? "Formulaire d'ajout de deductions"
                : `Modification du deduction N° ${selectedId}`}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody ml={"auto"} mr={"auto"}>
            {addMod ? (
              <DeductionAdd onClose={closeAndRefresh} />
            ) : (
              <DeductionEdit
                deductionId={selectedId}
                onClose={closeAndRefresh}
              />
            )}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>

      {/* tableaux d'affichage des deductions */}
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
                <Td verticalAlign="middle">{deduction.nomPoste}</Td>
                <Td verticalAlign="middle">{deduction.tauxD} %</Td>
                <Td verticalAlign="middle">
                  <HStack>
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
    </Container>
  );
};

export default Deductions;
