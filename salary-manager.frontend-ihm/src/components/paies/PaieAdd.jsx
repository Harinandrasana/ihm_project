import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Box,
  Container,
  HStack,
  Select,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import apiClient from "../../services/api-client";
import useNotification from "../../hooks/useNotification";

const PaieAdd = () => {
  const [paieValues, setPaiesValues] = useState({
    idPaie: 0,
    idEmploye: 0,
    mois: "",
    salaireNet: 0,
    salaireBrut: 0,
    totalDedution: 0,
    totalAvantage: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post("/paies", paieValues);
      onClose();
      displayToast("success", "Les paiements ont été faitent avec succès");
    } catch (error) {}
  };

  useEffect(() => {
    getPostes();
    getSalaire();
    getTauxD();
  }, []);

  const getPostes = async () => {
    const response = await apiClient.get("/postes");
    setPostes(response.data);
  };

  const getSalaire = async () => {
    const response = await apiClient.get(`/employee/${employeeId}`);
    return response.data;
  };

  const getTauxD = async () => {
    const response = await apiClient.get(`/deduction/${employeeId}`);
    return response.data;
  };

  const assignValue = () => {
    const salaireBrut = getSalaire();
    const tauxD = getTauxD();
    const totalD = (tauxD * salaireBrut) / 100;
    const salaireNet = salaireBrut - totalD;
    setPaiesValues(0, employeeId, mois, salaireNet, salaireBrut, totalD, 0);
  };

  return (
    <Container color="black" maxW="full" rounded={21} textAlign="center">
      <Box>
        <form onSubmit={handleSubmit}>
          <HStack spacing={15} textAlign="center" ml="auto" mr="auto">
            <Box>
              <Stack>
                <FormLabel>Poste</FormLabel>
                <Box bg="white" rounded={4}>
                  <Select
                    placeholder="Selectionner poste"
                    _placeholder={{ color: "#8c8c8c" }}
                    h={50}
                    onChange={(e) =>
                      setPaiesValues({
                        ...paieValues,
                        idPoste: parseInt(e.target.value),
                      })
                    }
                  >
                    {postes.map((poste) => (
                      <option key={poste.idPoste} value={poste.idPoste}>
                        {poste.nomPoste}
                      </option>
                    ))}
                  </Select>
                </Box>
                <FormControl id="nom">
                  <FormLabel>Nom</FormLabel>
                  <Input
                    color={"!black"}
                    bg="white"
                    h={50}
                    border="1px solid black"
                    type="text"
                    id="nom"
                    required
                    onChange={(e) =>
                      setPaiesValues({ ...paieValues, nom: e.target.value })
                    }
                    placeholder="Nom"
                    _placeholder={{ color: "#8c8c8c" }}
                  />
                </FormControl>
                <FormControl id="prenom">
                  <FormLabel>Prenom</FormLabel>
                  <Input
                    bg="white"
                    h={50}
                    border="1px solid black"
                    type="text"
                    id="prenom"
                    required
                    onChange={(e) =>
                      setPaiesValues({ ...paieValues, prenom: e.target.value })
                    }
                    placeholder="Prenom"
                    _placeholder={{ color: "#8c8c8c" }}
                  />
                </FormControl>
                <FormControl id="adresse">
                  <FormLabel>Adresse</FormLabel>
                  <Input
                    bg="white"
                    h={50}
                    border="1px solid black"
                    type="text"
                    id="adresse"
                    required
                    onChange={(e) =>
                      setPaiesValues({ ...paieValues, adresse: e.target.value })
                    }
                    placeholder="Adresse"
                    _placeholder={{ color: "#8c8c8c" }}
                  />
                </FormControl>
              </Stack>
            </Box>
            <Box mt={2}>
              <Stack>
                <FormControl id="email">
                  <FormLabel>Adresse email</FormLabel>
                  <Input
                    bg="white"
                    h={50}
                    border="1px solid black"
                    type="email"
                    id="email"
                    required
                    onChange={(e) =>
                      setPaiesValues({ ...paieValues, email: e.target.value })
                    }
                    placeholder="Adresse email"
                    _placeholder={{ color: "#8c8c8c" }}
                  />
                </FormControl>
                <FormControl id="tel">
                  <FormLabel>Telephone</FormLabel>
                  <Input
                    bg="white"
                    h={50}
                    border="1px solid black"
                    type="tel"
                    id="tel"
                    required
                    onChange={(e) =>
                      setPaiesValues({ ...paieValues, tel: e.target.value })
                    }
                    placeholder="Numero telephone"
                    _placeholder={{ color: "#8c8c8c" }}
                  />
                </FormControl>
                <FormControl id="dateEmbauche">
                  <FormLabel>dateEmbauche</FormLabel>
                  <Input
                    id="dateEmbauche"
                    required
                    onChange={(e) =>
                      setPaiesValues({
                        ...paieValues,
                        dateEmbauche: e.target.value,
                      })
                    }
                    mt={2}
                    placeholder="Select Date and Time"
                    _placeholder={{ color: "#8c8c8c" }}
                    size="md"
                    bg={"white"}
                    h={50}
                    type="date"
                  />
                </FormControl>
                <Box mt={3} ml="auto" mr="auto">
                  <HStack spacing={8}>
                    <Link to="/employees">
                      <Button p={7} bg="red" onClick={() => onClose()}>
                        Annuler
                      </Button>
                    </Link>
                    <Button p={7} type="submit" bg="green">
                      Valider
                    </Button>
                  </HStack>
                </Box>
              </Stack>
            </Box>
          </HStack>
        </form>
      </Box>
    </Container>
  );
};

export default PaieAdd;
