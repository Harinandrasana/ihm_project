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
  Textarea,
<<<<<<< HEAD
  Text
=======
  Text,
>>>>>>> sedra
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import apiClient from "../../services/api-client";
import useNotification from "../../hooks/useNotification";

const PosteEdit = ({ posteId, onClose }) => {
  const [poste, setPoste] = useState(null);
  const { displayToast } = useNotification();
  const [isEmpty, setIsEmpty] = useState(false);
<<<<<<< HEAD

  const checkCurrentInput = () => {
    if(
      poste.nomPoste !== "" &&
      poste.salaire !== ""
    ) {
      setIsEmpty(!isEmpty);
    } else setIsEmpty(true);

  }
=======
>>>>>>> sedra

  useEffect(() => {
    getPosteById();
  }, []);

  const getPosteById = async () => {
    try {
      const response = await apiClient.get(`/oneP/${posteId}`);
      setPoste(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.put(`/updateP/${posteId}`, poste).then((res) => {
        onClose();
        displayToast("success", "Le poste a été modifié avec succès");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPoste({ ...poste, [name]: value });
  };

  if (!poste) return <div>Loading...</div>;

  const checkCurrentInput = () => {
    if(
      poste.nomPoste !== "" &&
      poste.salaire !== ""
    ) {
      setIsEmpty(!isEmpty);
    } else setIsEmpty(true);

  }

  return (
    <Container color="black" maxW="full" rounded={21} textAlign="center">
      <Box>
        <form onSubmit={handleSubmit}>
          <Stack>
            <FormControl id="nomPoste" isRequired>
              <FormLabel>Designation</FormLabel>
              <Input
                bg="white"
                h={50}
                border="1px solid black"
                placeholder="Designation du poste"
                _placeholder={{ color: "#8c8c8c" }}
                type="text"
                name="nomPoste"
                id="nomPoste"
                required
                value={poste.nomPoste}
                onChange={handleChange}
              />
              {(isEmpty && poste.nomPoste === "") && (
                <Text color={"red"} fontSize={14} pl={"auto"}>
                  Veuiller donner un nom de poste
                </Text>
              )}
            </FormControl>
            <FormControl id="salaire" isRequired>
              <FormLabel>Salaire</FormLabel>
              <Input
                bg="white"
                h={50}
                border="1px solid black"
                placeholder="Montant salaire"
                _placeholder={{ color: "#8c8c8c" }}
                type="number"
                name="salaire"
                id="salaire"
                required
                value={poste.salaire}
                onChange={handleChange}
              />
              {(isEmpty && poste.salaire === "") && (
                <Text color={"red"} fontSize={14} pl={"auto"}>
                  Veuiller rajouter un salaire
                </Text>
              )}
            </FormControl>
            <FormControl id="commentaire">
              <FormLabel>Description</FormLabel>
              <Textarea
                bg="white"
                h={50}
                border="1px solid black"
                type="text"
                name="commentaire"
                id="commentaire"
                value={poste.commentaire}
                onChange={handleChange}
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
<<<<<<< HEAD
                <Button p={7} onClick={checkCurrentInput} type="submit" bg="green">
=======
                <Button onClick={checkCurrentInput} p={7} type="submit" bg="green">
>>>>>>> sedra
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

export default PosteEdit;
