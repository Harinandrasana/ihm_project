import React, { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

const PaieStatus = ({ employeeId, isLoading }) => {
  const [data, setData] = useState(null); // Utiliser null comme valeur initiale pour data

  const checkPaieIfExist = async () => {
    try {
      const response = await apiClient.get(`/paies/${employeeId}`);
      console.log(response.data);
      if (response.data.length !== 0) {
        // Utiliser response.data.length !== 0 pour vérifier si le tableau n'est pas vide
        setData(response.data);
      } else {
        setData(null);
      }
    } catch (error) {
      console.log(error);
      setData(null);
    }
  };

  useEffect(() => {
    checkPaieIfExist();
    const interval = setInterval(() => {
      checkPaieIfExist();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading === true)
    return <CircularProgress isIndeterminate color="green.300" />;
  return (
    <Box>
      {data !== null ? (
        <Box alignItems={"center"}>
          <Box mx={"40%"}>
            <CheckIcon color="green.500" boxSize={10} />
          </Box>
          <Text color="green">Paiement effectué</Text>
        </Box>
      ) : (
        <Box>
          <Box mx={"40%"}>
            <CloseIcon color="red.500" boxSize={10} />
          </Box>
          <Text color="red">En attente de paiement</Text>
        </Box>
      )}
    </Box>
  );
};

export default PaieStatus;
