import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Box,
  Container,
  HStack,
  Select,
  Center,
  Image,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../services/api-client";
import useNotification from "../../hooks/useNotification";
import empimg from "../../assets/no-image-placeholder.webp";

const EmployeeEdit = ({ employeeId, onClose }) => {
  const [employee, setEmployee] = useState(null);
  const [postes, setPostes] = useState([]);
  const { displayToast } = useNotification();
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getEmployee();
    getPostes();
  }, []);

  const getEmployee = async () => {
    try {
      const response = await apiClient.get(`/oneE/${employeeId}`);
      console.log(response.data);
      setEmployee(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getPostes = async () => {
    try {
      const response = await apiClient.get("/allP");
      setPostes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.put(`/updateE/${employeeId}`, employee);
      onClose();
      window.location.reload();
      displayToast("success", "L'employé a été modifié avec succès");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEmployee({ ...employee, image_url: file.name });
    }
    console.log(file.name);
  };

  if (!employee) return <div>Loading...</div>;

  return (
    <Container color="black" maxW="full" rounded={21} textAlign="center">
      <Box>
        <form onSubmit={handleSubmit}>
          <HStack spacing={15} textAlign="center" ml="auto" mr="auto">
            {/* premier formulaire */}
            <Box>
              <HStack {...(visible && { display: "none" })}>
                <Box mt={10}>
                  <FormControl id="image">
                    <FormLabel htmlFor="imageUpload">
                      <Image
                        rounded={21}
                        height={280}
                        objectFit="cover"
                        src={
                          employee.image_url
                            ? employee.image_url instanceof Blob
                              ? URL.createObjectURL(employee.image_url)
                              : `/src/assets/${employee.image_url}`
                            : empimg
                        }
                        cursor="pointer"
                      />
                      Image
                      <Input
                        id="imageUpload"
                        type="file"
                        onChange={handleImageChange}
                        display="none"
                      />
                    </FormLabel>
                  </FormControl>
                </Box>
                <Box w="90%">
                  <FormLabel>Poste</FormLabel>
                  <Box bg="white" rounded={4}>
                    <Select
                      placeholder="Select option"
                      h={50}
                      _placeholder={{ color: "#8c8c8c" }}
                      name="idPoste"
                      value={employee.idPoste}
                      onChange={handleChange}
                    >
                      {postes.map((poste) => (
                        <option key={poste.idPoste} value={poste.idPoste}>
                          {poste.nomPoste}
                        </option>
                      ))}
                    </Select>
                  </Box>
                  <FormControl id="nom">
                    <FormLabel>Nom</FormLabel>
                    <Input
                      color={"!black"}
                      bg="white"
                      h={50}
                      border="1px solid black"
                      type="text"
                      name="nom"
                      value={employee.nom}
                      onChange={handleChange}
                      required
                      placeholder="Nom"
                      _placeholder={{ color: "#8c8c8c" }}
                    />
                  </FormControl>
                  <FormControl id="prenom">
                    <FormLabel>Prenom</FormLabel>
                    <Input
                      bg="white"
                      h={50}
                      border="1px solid black"
                      type="text"
                      name="prenom"
                      value={employee.prenom}
                      onChange={handleChange}
                      required
                      placeholder="Prenom"
                      _placeholder={{ color: "#8c8c8c" }}
                    />
                  </FormControl>
                  <FormControl id="dateNaissance">
                    <FormLabel>Date de naissance</FormLabel>
                    <Input
                      id="dateNaissance"
                      name="dateNaissance"
                      required
                      value={employee.dateNaissance}
                      onChange={handleChange}
                      mt={2}
                      placeholder="Select Date and Time"
                      _placeholder={{ color: "#8c8c8c" }}
                      size="md"
                      bg={"white"}
                      h={50}
                      type="date"
                    />
                  </FormControl>
                </Box>
              </HStack>

              {/* Formulaire suivant */}
              <Box {...(!visible && { display: "none" })}>
                <HStack>
                  <Box w="90%">
                    <FormControl id="adresse">
                      <FormLabel>Adresse</FormLabel>
                      <Input
                        bg="white"
                        h={50}
                        border="1px solid black"
                        type="text"
                        name="adresse"
                        value={employee.adresse}
                        onChange={handleChange}
                        required
                        placeholder="adresse"
                        _placeholder={{ color: "#8c8c8c" }}
                      />
                    </FormControl>
                    <FormControl id="email">
                      <FormLabel>Adresse email</FormLabel>
                      <Input
                        bg="white"
                        h={50}
                        border="1px solid black"
                        type="email"
                        name="email"
                        value={employee.email}
                        onChange={handleChange}
                        required
                        placeholder="email"
                        _placeholder={{ color: "#8c8c8c" }}
                      />
                    </FormControl>
                  </Box>
                  <Box w="90%" mt={2}>
                    <FormControl id="tel">
                      <FormLabel>Telephone</FormLabel>
                      <Input
                        bg="white"
                        h={50}
                        border="1px solid black"
                        type="tel"
                        name="tel"
                        value={employee.tel}
                        onChange={handleChange}
                        required
                        placeholder="telephone"
                        _placeholder={{ color: "#8c8c8c" }}
                      />
                    </FormControl>
                    <FormControl id="dateEmbauche">
                      <FormLabel>dateEmbauche</FormLabel>
                      <Input
                        id="dateEmbauche"
                        name="dateEmbauche"
                        required
                        value={employee.dateEmbauche}
                        onChange={handleChange}
                        mt={2}
                        placeholder="Select Date and Time"
                        _placeholder={{ color: "#8c8c8c" }}
                        size="md"
                        bg={"white"}
                        h={50}
                        type="date"
                      />
                    </FormControl>
                  </Box>
                </HStack>
              </Box>
            </Box>
          </HStack>
          <Center mt={3} ml="auto">
            <Box {...(!visible && { display: "none" })}>
              <HStack spacing={8}>
                <Button p={7} onClick={() => setVisible(!visible)}>
                  retour
                </Button>
                {/* <Link to="/employees">
                  <Button p={7} bg="red" onClick={() => onClose()}>
                    Annuler
                  </Button>
                </Link> */}
                <Button p={7} type="submit" bg="green">
                  Valider
                </Button>
              </HStack>
            </Box>
            <Box {...(visible && { display: "none" })}>
              <Button onClick={() => setVisible(!visible)}>suivant</Button>
            </Box>
          </Center>
        </form>
      </Box>
    </Container>
  );
};

export default EmployeeEdit;
