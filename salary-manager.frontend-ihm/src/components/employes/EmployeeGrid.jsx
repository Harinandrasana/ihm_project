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
import empimg from "../../assets/no-image-placeholder.webp";
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

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const imageURL = URL.createObjectURL(file)
  //     setEmployee({ ...employee, image_url: imageURL });
  //   }
  //   console.log(file.name);
  // };


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
                    employee.image_url
                    ? employee.image_url instanceof Blob
                      ? URL.createObjectURL(employee.image_url)
                      : `/src/assets/${employee.image_url}`
                    : empimg
                  }
                  boxSize="100%"
                  height={270}
                  objectFit="cover"
                />
                <CardBody>
                  <Heading fontSize="2xl">
                    <Link to={`/employees/${employee.idEmploye}`}>
                      Matricule : {employee.idEmploye} <br /> 
                      {/* Nom: {employee.nom} {employee.prenom} */}
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
