import React, { useEffect, useState } from "react";
import apiClient from "../../services/api-client";
import getCroppedImageUrl from "../../services/image-url";
import {
  Flex,
  Image,
  Stack,
  Text,
  Card,
  CardBody,
  CardFooter,
  Heading,
  TableContainer,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

const Employee = ({ employeeId }) => {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    getEmployee();
  }, [employeeId]);

  const getEmployee = async () => {
    try {
      const response = await apiClient.get(`/oneE/${employeeId}`);
      setEmployee(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // Fonction pour formater la date au format 'jour mois année'
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("fr-FR", options).format(date);
  };

  if (!employee) return <div className="div">Loading...</div>;
  return (
    <Flex mt={5} mb={10} alignItems={"center"}>
      <Card
        direction={{ base: "column", sm: "row", md: "row", xl: "row" }}
        overflow="hidden"
        variant="outline"
        border={"none"}
        borderRight={"1px solid #d7d7d7"}
      >
        <Image
          objectFit="cover"
          minW={300}
          rounded={21}
          maxW={{ base: "100%", sm: "200px" }}
          src={getCroppedImageUrl(employee.image_url)}
          alt="Image de l'employe"
        />

        <Stack>
          <CardBody mt={-5}>
            <Heading size="md" mb={10}>
              <Text px={"15%"} bg={"gray.800"} color={"white"} py={5}>
                Informations de l'employé :
              </Text>
            </Heading>
            <TableContainer>
              <Table>
                <Tbody>
                  <Tr>
                    <Th>Identifiant</Th>
                    <Td>{employee.idEmploye}</Td>
                  </Tr>
                  <Tr>
                    <Th>Poste</Th>
                    <Td>{employee.nomPoste}</Td>
                  </Tr>
                  <Tr>
                    <Th>Nom</Th>
                    <Td>{employee.nom}</Td>
                  </Tr>
                  <Tr>
                    <Th>Prénom</Th>
                    <Td>{employee.prenom}</Td>
                  </Tr>
                  <Tr>
                    <Th>Date de naissance</Th>
                    <Td>{formatDate(employee.dateNaissance)}</Td>
                  </Tr>
                  <Tr>
                    <Th>Adresse</Th>
                    <Td>{employee.adresse}</Td>
                  </Tr>
                  <Tr>
                    <Th>Email</Th>
                    <Td>{employee.email}</Td>
                  </Tr>
                  <Tr>
                    <Th>Date d'embauche</Th>
                    <Td>{formatDate(employee.dateEmbauche)}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>

          <CardFooter>
            {/* <Button variant="solid" colorScheme="blue">
              Buy Latte
            </Button> */}
          </CardFooter>
        </Stack>
      </Card>
    </Flex>
  );
};

export default Employee;
