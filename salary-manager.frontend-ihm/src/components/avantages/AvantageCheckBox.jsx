import { Box, Checkbox, Divider, Text } from "@chakra-ui/react";
import React from "react";

const AvantageCheckBox = () => {
  return (
    <Box mt={5} borderLeft={"1px solid #d7d7d7"} pl={5} rounded={16}>
      <Text fontSize={21}>Cas d'avantages: </Text>
      <Divider />
      <Checkbox colorScheme="red" defaultChecked mt={5}>
        Congés payés
      </Checkbox>
      <Divider />
      <Checkbox colorScheme="green" defaultChecked mt={5}>
        Congés non payé
      </Checkbox>
      <Divider />
      <Checkbox colorScheme="green" defaultChecked mt={5}>
        Congés partielle
      </Checkbox>
      <Divider />
    </Box>
  );
};

export default AvantageCheckBox;
