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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import apiClient from "../../services/api-client";
import useNotification from "../../hooks/useNotification";

const PosteEdit = ({ posteId, onClose }) => {
  const [poste, setPoste] = useState(null);
  const { displayToast } = useNotification();

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

  return (
    <Container color="black" maxW="full" rounded={21} textAlign="center">
      <Box>
        <form onSubmit={handleSubmit}>
          <Stack>
            <FormControl id="nomPoste">
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
            </FormControl>
            <FormControl id="salaire">
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
                <Button p={7} type="submit" bg="green">
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
