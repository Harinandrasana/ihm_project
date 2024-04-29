import React, { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";

const PaieStatus = ({ employeeId }) => {
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

  return (
    <Box>
      {data !== null ? (
        <CheckIcon color="green.500" boxSize={10} />
      ) : (
        <CloseIcon color="red.500" boxSize={10} />
      )}
    </Box>
  );
};

export default PaieStatus;
