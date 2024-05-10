import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Box,
  Container,
  HStack,
  Textarea,
  Text
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import apiClient from "../../services/api-client";
import useNotification from "../../hooks/useNotification";

const PosteAdd = ({ onClose }) => {
  const [values, setValues] = useState({
    idPoste: 0,
    nomPoste: "",
    salaire: "",
    commentaire: "",
  });
  const { displayToast } = useNotification();

  function handleSubmit(e) {
    e.preventDefault();
    apiClient
      .post("/addP", values)
      .then((res) => {
        onClose();
        displayToast("success", "L'employé a été ajouté avec succès");
      })
      .catch((err) => console.log(err));
  }

  const [isEmpty, setIsEmpty] = useState(false);

  const checkCurrentInput = () => {
    if(
      values.nomPoste !== "" &&
      values.salaire !== ""
    ){
      setIsEmpty(!isEmpty);
    } else {
      setIsEmpty(true);
    }
  }

  const setErrorBorder = () => {
    return "1px solid red";
  };


  return (
    <Container color="black" maxW="full" rounded={21} textAlign="center">
      <Box>
        <form onSubmit={handleSubmit}>
          <Stack>
            <FormControl id="nomPoste" isRequired>
              <FormLabel>Designation</FormLabel>
              <Input
                color={"!black"}
                bg="white"
                h={50}
                border="1px solid black" 
                type="text"
                id="nomPoste"
                name="nomPoste"
                required
                onChange={(e) =>
                  setValues({ ...values, nomPoste: e.target.value })
                }
                placeholder="Entrer la designation du poste"
                _placeholder={{ color: "#8c8c8c" }}
              />
              {
                (isEmpty && values.nomPoste === "") && (
                  <Text color={"red"} fontSize={14} pl="auto" >
                    Veuiller remplire le formulaire
                  </Text>
                )
              }
            </FormControl>
            <FormControl id="salaire" isRequired>
              <FormLabel>Salaire</FormLabel>
              <Input
                bg="white"
                h={50}
                border="1px solid black"
                type="number"
                id="salaire"
                name="salaire"
                required
                onChange={(e) =>
                  setValues({ ...values, salaire: e.target.value })
                }
                placeholder="Entrer montant du salaire"
                _placeholder={{ color: "#8c8c8c" }}
              />
              {
                (isEmpty && values.salaire === "") && (
                  <Text color={"red"} fontSize={14} pl={"auto"}>
                    Veuiller specifier une salaire

                  </Text>
                )
              }
            </FormControl>
            <FormControl id="commmentaire">
              <FormLabel>Description</FormLabel>
              <Textarea
                bg="white"
                h={50}
                border="1px solid black"
                id="commentaire"
                onChange={(e) =>
                  setValues({ ...values, commentaire: e.target.value })
                }
                placeholder="Ajouter les descriptions du poste"
                _placeholder={{ color: "#8c8c8c" }}
              />
            </FormControl>
            <Box mt={2} ml="auto" mr="auto">
              <HStack spacing={8}>
                <Link to="/postes">
                  <Button p={7} bg="red" onClick={() => onClose()}>
                    Annuler
                  </Button>
                </Link>
   {/* <Button p={7} onClick={checkCurrentInput} type="submit" bg="green"> */}

                <Button onClick={checkCurrentInput} p={7} type="submit" bg="green">
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

export default PosteAdd;
