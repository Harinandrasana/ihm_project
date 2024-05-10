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
  Text
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import apiClient from "../../services/api-client";
import useNotification from "../../hooks/useNotification";

const DeductionAdd = ({ onClose }) => {
  const [values, setValues] = useState({
    idDeduction: 3,
    idPoste: 0,
    design: "",
    tauxD: "",
  });
  const { displayToast } = useNotification();
  const [postes, setPostes] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    apiClient
      .post("/addD", values)
      .then((res) => {
        onClose();
        displayToast("success", "La déduction a été ajouté avec succès");
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getPostes();
  }, []);

  const getPostes = async () => {
    const response = await apiClient.get("/allP");
    setPostes(response.data);
  };

  const [isEmpty, setIsEmpty] = useState(false);

  const checkCurrentInput = () => {
    if(
      values.idPoste !== 0 &&
      values.design !== "" &&
      values.tauxD !== ""
    ) {
      setIsEmpty(!isEmpty);
    } else {
      setIsEmpty(true);
    }
  }

  return (
    <Container color="black" maxW="full" rounded={21} textAlign="center">
      <Box>
        <form onSubmit={handleSubmit}>
          <Stack>
            <FormControl isRequired >
              <FormLabel>Poste</FormLabel>
              <Box bg="white" rounded={4}>
                <Select
                  placeholder="Selectionner poste"
                  h={50}
                  _placeholder={{ color: "#8c8c8c" }}
                  onChange={(e) =>
                    setValues({
                      ...values,
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
                  {(isEmpty && values.idPoste === 0) && (
                    <Text color={"red"} fontSize={14} pl={"auto"} >
                      Veuiller selection un Poste
                    </Text>
                  )}
              </Box>
            </FormControl>
            
            <FormControl id="design" isRequired>

              <FormLabel>Designation</FormLabel>
              <Input
                color={"!black"}
                bg="white"
                h={50}
                border="1px solid black"
                type="text"
                id="design"
                required
                onChange={(e) =>
                  setValues({ ...values, design: e.target.value })
                }
                placeholder="Designation du deduction"
                _placeholder={{ color: "#8c8c8c" }}
              />
              {(isEmpty && values.design === "") && (
                <Text color={"red"} fontSize={14} pl={"auto"}>
                  Veuiller remplire le formulaire
                </Text>
              )}
            </FormControl>
            <FormControl id="tauxD" isRequired>
              <FormLabel>Taux à déduire</FormLabel>
              <Input
                bg="white"
                border="1px solid black"
                h={50}
                type="number"
                id="tauxD"
                required
                onChange={(e) =>
                  setValues({ ...values, tauxD: e.target.value })
                }
                placeholder="taux déduit"
                _placeholder={{ color: "#8c8c8c" }}
              />
              {(isEmpty && values.tauxD === "") && (
                <Text color={"red"} fontSize={14} pl={"auto"} >
                  Veuiller remplire le formulaire
                </Text>
              )}
            </FormControl>
            <Box mt={2} ml="auto" mr="auto">
              <HStack spacing={8}>
                <Link to="/postes">
                  <Button p={7} bg="red" onClick={() => onClose()}>
                    Annuler
                  </Button>
                </Link>

                <Button p={7} onClick={checkCurrentInput} type="submit" bg="green">
                {/* <Button onClick={checkCurrentInput} p={7} type="submit" bg="green"> */}

                  Valider
                </Button>
              </HStack>
            </Box>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default DeductionAdd;
