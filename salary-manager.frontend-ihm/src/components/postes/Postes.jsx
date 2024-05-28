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
import PosteAdd from "./PosteAdd";
import PosteEdit from "./PosteEdit";
import useNotification from "../../hooks/useNotification";

const Postes = () => {
  const [postes, setPostes] = useState([]);
  const [addMod, setAddMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { displayToast } = useNotification();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    getPostes();
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    setIsSmallScreen(mediaQuery.matches);
    const handleChange = (event) => {
      setIsSmallScreen(event.matches);
    };
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  const closeAndRefresh = () => {
    onClose();
    getPostes();
  };

  const getPostes = async () => {
    const response = await apiClient.get("/allP");
    setPostes(response.data);
  };

  const deletePoste = async (id) => {
    try {
      await apiClient.delete(`/delP/${id}`);
      getPostes();
      displayToast("success", "Le poste a été supprimé avec succès");
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
        Ajouter des postes
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose} size={"md"} si>
        {addMod ? <OverlayTwo /> : <OverlayOne />}
        <ModalContent maxW={"600px"}>
          <ModalHeader textAlign="center">
            <Text>
              {addMod
                ? "Formulaire d'ajout de postes"
                : `Modification du poste N° ${selectedId}`}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody ml={"auto"} mr={"auto"}>
            {addMod ? (
              <PosteAdd onClose={closeAndRefresh} />
            ) : (
              <PosteEdit posteId={selectedId} onClose={closeAndRefresh} />
            )}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>

      {/* tableaux d'affichage des postes */}
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
          {/* <TableCaption>Listes des employes de la société</TableCaption> */}
          <Thead h={58}>
            <Tr verticalAlign="middle" borderBottom="2px solid #f3f2f2">
              <Th textAlign="center">Identifiant du poste</Th>
              <Th textAlign="center">Designation</Th>
              <Th textAlign="center">Salaire</Th>
              <Th textAlign="center">Description</Th>
              <Th textAlign="center">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {postes.map((poste) => (
              <Tr
                key={poste.idPoste}
                verticalAlign="middle"
                borderBottom="2px solid #f3f2f2"
              >
                <Td verticalAlign="middle" textAlign="center">
                  {poste.idPoste}
                </Td>
                <Td verticalAlign="middle" textAlign="center">
                  {poste.nomPoste}
                </Td>
                <Td verticalAlign="middle" textAlign="center">
                  {poste.salaire}
                </Td>
                <Td
                  verticalAlign="middle"
                  textAlign="center"
                  w={isSmallScreen ? "100%" : "auto"}
                  wordBreak={isSmallScreen ? "break-word" : "normal"}
                >
                  {poste.commentaire === "" ? "aucun" : poste.commentaire}
                </Td>
                <Td px={{ base: "2%", md: "2%", lg: "3%" }}>
                  <HStack spacing={2} textAlign={"center"}>
                    <Button
                      bg="#2388f6"
                      onClick={() => {
                        setSelectedId(poste.idPoste);
                        setAddMode(false);
                        onOpen();
                      }}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      bg="#dc1f09"
                      onClick={() => deletePoste(poste.idPoste)}
                    >
                      <DeleteIcon />
                    </Button>
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

export default Postes;
