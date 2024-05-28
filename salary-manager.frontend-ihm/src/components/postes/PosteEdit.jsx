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
  Text,
  Center,
  ModalFooter,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import apiClient from "../../services/api-client";
import useNotification from "../../hooks/useNotification";

const PosteEdit = ({ posteId, onClose }) => {
  const [poste, setPoste] = useState(null);
  const { displayToast } = useNotification();
  const [isEmpty, setIsEmpty] = useState(false);

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
    if (poste.nomPoste !== "" && poste.salaire !== "") {
      setIsEmpty(!isEmpty);
    } else setIsEmpty(true);
  };

  return (
    <Box minW={550}>
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
            {isEmpty && poste.nomPoste === "" && (
              <Text color={"red"} fontSize={14} pl={"auto"}>
                Veuiller donner un nom de poste
              </Text>
            )}
          </FormControl>
          <FormControl id="salaire">
            <FormLabel>Salaire</FormLabel>
            <NumberInput
              defaultValue={30000}
              precision={2}
              step={0.2}
              bg="white"
              id="salaire"
              name="salaire"
              border="hidden"
              rounded={6}
              required
              placeholder="Entrer le montant du salaire"
              _placeholder={{ color: "#8c8c8c" }}
              type="number"
              value={poste.salaire}
              onChange={handleChange}
            >
              <NumberInputField height={50} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {isEmpty && poste.salaire === "" && (
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
          <ModalFooter>
            <Center mt={3} ml="auto">
              <HStack spacing={8}>
                <Link to="/postes">
                  <Button
                    p={7}
                    bg="red"
                    onClick={() => onClose()}
                    colorScheme="red"
                  >
                    Annuler
                  </Button>
                </Link>
                <Button
                  onClick={checkCurrentInput}
                  p={7}
                  type="submit"
                  colorScheme="green"
                >
                  Valider
                </Button>
              </HStack>
            </Center>
          </ModalFooter>
        </Stack>
      </form>
    </Box>
  );
};

export default PosteEdit;
