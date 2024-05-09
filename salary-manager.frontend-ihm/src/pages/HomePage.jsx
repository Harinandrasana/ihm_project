import { Text, Container, Box, Flex, Spacer } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import apiClient from "../services/api-client";
// import { countEmploye } from "../../../salary-manager.backend/models/EmployerM";

const HomePage = () => {

  const [nbrEmploye, setNbrEmploye] = useState(0);
  const [nbrPoste, setNbrPoste] = useState(0);
  const [nbrDeduction, setNbrDeduction] = useState(0);
  useEffect(() => {
    countEmploye();
    countPoste();
    countDeduction();
  }, []);

  const countEmploye = async () => {
    const result = await apiClient.get('/count');
    setNbrEmploye(result.data[0].nbTotalEmploye);
    // console.log(result.data[0].nbTotalEmploye);
  }

  const countPoste = async () => {
    const result = await apiClient.get('/countP');
    setNbrPoste(result.data[0].nbTotalPoste);
  }

  const countDeduction = async () => {
    const result = await apiClient.get('/countD');
    setNbrDeduction(result.data[0].nbTotalDeduction);
  }
  
      {/* <Text color="black">Bienvenue dans la page d'Accueil</Text> */}
  return (
    <Container maxW="full">
      <Box>
        <Flex>
          <Box borderColor="red"  height="100%" mx={"auto"} w="200px" h="200px" bg="gray" color="black" p={4} borderRadius="md">
            <Text textAlign="center" >Nombre total des EMPLOYEES</Text>
            <Spacer />
            <Text textAlign="center" fontSize={"20px"} mt="45px">{nbrEmploye}</Text>
          </Box>
          <Box height="100%" mx={"auto"} w="200px" h="200px" bg="blue.500" color="white" p={4} borderRadius="md">
            <Text textAlign="center">Nombre total des POSTES:</Text>
            <Spacer />
            <Text textAlign="center" fontSize={"20px"} mt="45px">{nbrPoste}</Text>
          </Box>
          <Box height="100%" mx={"auto"} w="200px" h="200px" bg="blue.500" color="white" p={4} borderRadius="md">
            <Text textAlign="center">Nombre total des DEDUCITONS:</Text>
            <Spacer />
            <Text textAlign="center" fontSize={"20px"} mt="45px">{nbrDeduction}</Text>
          </Box>
        </Flex>
      </Box>
    </Container>
  )
};

export default HomePage;
