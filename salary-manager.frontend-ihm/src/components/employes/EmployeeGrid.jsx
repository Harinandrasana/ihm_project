import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardBody,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import apiClient from "../../services/api-client";
import getCroppedImageUrl from "../../services/image-url";
import { Link } from "react-router-dom";

const EmployeeGrid = () => {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    try {
      const response = await apiClient.get("/allE");
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <SimpleGrid
        columns={{ sm: 3, md: 4, lg: 5, xl: 6 }}
        padding="10px"
        spacing={10}
      >
        {employees.map((employee) => (
          <React.Fragment key={employee.idEmploye}>
            <Box
              _hover={{
                transform: "scale(1.03)",
                transition: "transform .15s ease-in",
              }}
              borderRadius={10}
              overflow="hidden"
            >
              <Card backgroundColor="#eff6f6">
                <Image
                  src={
                    employee.image_url == null
                      ? getCroppedImageUrl(employee.image_url)
                      : `/src/assets/${employee.image_url}`
                  }
                  boxSize="100%"
                  height={270}
                  objectFit="cover"
                />
                <CardBody>
                  <Heading fontSize="2xl">
                    <Link to={`/employees/${employee.idEmploye}`}>
                      Employe: {employee.idEmploye}
                    </Link>
                  </Heading>
                </CardBody>
              </Card>
            </Box>
          </React.Fragment>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default EmployeeGrid;
