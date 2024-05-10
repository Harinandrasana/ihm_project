import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Container,
  HStack,
  Select,
  Text
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import apiClient from "../../services/api-client";
import useNotification from "../../hooks/useNotification";

const DeductionEdit = ({ deductionId, onClose }) => {
  const [deduction, setDeduction] = useState(null);
  const [postes, setPostes] = useState([]);
  const { displayToast } = useNotification();
  const [isEmpty, setIsEmpty] = useState(false);

  const checkCurrentInput = () => {
    if(
      deduction.idPoste !== 0 &&
      deduction.design !== "" &&
      deduction.TauxD !== ""
    ) {
      setIsEmpty(!isEmpty);
    } else {
      setIsEmpty (true);
    }
  }

  useEffect(() => {
    getDeductionById();
    getPostes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.put(`/updateD/${deductionId}`, deduction);
      onClose();
      displayToast("success", "La deduction a été modifié avec succès");
    } catch (error) {
      console.log(error);
    }
  };

  const getDeductionById = async () => {
    const response = await apiClient.get(`oneD/${deductionId}`);
    setDeduction(response.data[0]);
  };

  const getPostes = async () => {
    try {
      const response = await apiClient.get("/allP");
      setPostes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeduction({ ...deduction, [name]: value });
  };

  if (!deduction) return <div>Loading...</div>;

  return (
    <Container color="black" maxW="full" rounded={21} textAlign="center">
      <Box>
        <form onSubmit={handleSubmit}>
          <HStack spacing={15} textAlign="center" ml="auto" mr="auto">
            <Box>
              <FormControl isRequired>
                <FormLabel>Poste</FormLabel>
                <Box bg="white" rounded={4}>
                  <Select
                    placeholder="Select option"
                    _placeholder={{ color: "#8c8c8c" }}
                    h={50}
                    name="idPoste"
                    value={deduction.idPoste}
                    onChange={handleChange}
                  >
                    {postes.map((poste) => (
                      <option key={poste.idPoste} value={poste.idPoste}>
                        {poste.nomPoste}
                      </option>
                    ))}
                  </Select>
                  {(isEmpty && deduction.idPoste === 0) && (
                    <Text color={"red"} fontSize={14} pl={'auto'}>
                      Veuiller selection un Poste
                    </Text>
                  )}
                </Box>
              </FormControl>
              <FormControl id="design" isRequired>

                <FormLabel>Designation</FormLabel>
                <Input
                  bg="white"
                  border="1px solid black"
                  h={50}
                  type="text"
                  id="design"
                  name="design"
                  required
                  value={deduction.design}
                  onChange={handleChange}
                  placeholder="Designation"
                  _placeholder={{ color: "#8c8c8c" }}
                />
                {(isEmpty && deduction.design === "") && (
                  <Text color={"red"} fontSize={14} pl={"auto"}>
                    Veuiller remplire le formulaire
                  </Text>
                )}
              </FormControl>
            </Box>
            <Box>
              <FormControl id="TauxD" isRequired>
                <FormLabel>Taux à déduire</FormLabel>
                <Input
                  bg="white"
                  border="1px solid black"
                  h={50}
                  mb={3}
                  type="number"
                  name="TauxD"
                  id="TauxD"
                  required
                  value={deduction.TauxD}
                  onChange={handleChange}
                  placeholder="taux déduit"
                  _placeholder={{ color: "#8c8c8c" }}
                />
                {(isEmpty && deduction.TauxD === "") && (
                  <Text color={"red"} fontSize={14} pl={"auto"}>
                    Veuiller remplire le formulaire
                  </Text>
                )}
              </FormControl>
              <Box mt={3} ml="auto" mr="auto">
                <HStack spacing={8}>
                  <Link to="/deductions">
                    <Button p={7} bg="red" onClick={() => onClose()}>
                      Annuler
                    </Button>
                  </Link>
                  <Button p={7} onClick={checkCurrentInput} type="submit" bg="green">

                    Valider
                  </Button>
                </HStack>
              </Box>
            </Box>
          </HStack>
        </form>
      </Box>
    </Container>
  );
};

export default DeductionEdit;
