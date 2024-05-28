import React, { useState } from "react";
import Employee from "../components/employes/Employee";
import {
  Box,
  Container,
  SimpleGrid,
  GridItem,
  Grid,
  Center,
  Stack,
  Text,
  Divider,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Deduction from "../components/deductions/Deduction";
import ActionButton from "../components/employes/ActionButton";
import PaieStatus from "../components/paies/PaieStatus";
import AvantageCheckBox from "../components/avantages/AvantageCheckBox";

const EmployeeDetails = () => {
  const { employeeId: employeeId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

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
                <Box>
                  <Deduction employeeId={employeeId} />
                  <Center mt={5}>
                    <PaieStatus employeeId={employeeId} isLoading={isLoading} />
                  </Center>
                </Box>
                <Box>
                  <AvantageCheckBox />
                </Box>
              </Stack>
            </Box>
          </SimpleGrid>
        </GridItem>
      </Grid>
      <Divider />
      <Center mt={5}>
        <ActionButton employeeId={employeeId} setIsLoading={setIsLoading} />
      </Center>
    </Container>
  );
};

export default EmployeeDetails;
