import React from "react";
import BarChartComponent from "../components/graph/BachartComponent";
import Employee from "../components/employes/Employee";
import {
  Box,
  HStack,
  Container,
  SimpleGrid,
  GridItem,
  Grid,
  Center,
  Progress,
  Stack,
  Checkbox,
  Text,
  Divider,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import PieChartComponent from "../components/graph/CustomToltip";
import Deduction from "../components/employes/Deduction";
import ActionButton from "../components/employes/ActionButton";
import Avantages from "../components/avantages/Avantages";

const EmployeeDetails = () => {
  const { employeeId: employeeId } = useParams();

  return (
    <Container maxW={"full"} h={"auto"}>
      <Grid
        borderLeft={"3px solid #bcbcbc"}
        borderRight={"3px solid #bcbcbc"}
        px={5}
        rounded={16}
        mb={5}
      >
        <GridItem>
          <SimpleGrid columns={{ sm: 1, md: 1, lg: 2, xl: 2 }} spacing={0}>
            <Box minW={745}>
              <Employee employeeId={employeeId} />
            </Box>
            <Box height="auto" minW={450} ml={10} px={5}>
              <Stack spacing={5} direction="row">
                <Deduction employeeId={employeeId} />
                <Box
                  mt={5}
                  borderLeft={"1px solid #d7d7d7"}
                  pl={5}
                  rounded={16}
                >
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
              </Stack>
            </Box>
          </SimpleGrid>
        </GridItem>
      </Grid>
      <Divider />
      <Center mt={5}>
        <ActionButton employeeId={employeeId} />
      </Center>
    </Container>
  );
};

export default EmployeeDetails;
