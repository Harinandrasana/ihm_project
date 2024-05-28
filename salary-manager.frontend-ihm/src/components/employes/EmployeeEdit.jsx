import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Container,
  HStack,
  Select,
  Image,
  Center,
  InputGroup,
  Text,
  ModalFooter,
  InputLeftAddon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import apiClient from "../../services/api-client";
import useNotification from "../../hooks/useNotification";
import empimg from "../../assets/no-image-placeholder.webp";

const EmployeeEdit = ({ onClose, employeeId }) => {
  const [employee, setEmployee] = useState({
    idEmploye: 0,
    idPoste: 0,
    nom: "",
    prenom: "",
    dateNaissance: "",
    adresse: "",
    image_url: "",
    email: "",
    tel: "",
    dateEmbauche: "",
  });
  const { displayToast } = useNotification();
  const [postes, setPostes] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const currentDate = new Date();
  const minDate = new Date(
    currentDate.getFullYear() - 20,
    currentDate.getMonth(),
    currentDate.getDate()
  );

  const navigate = useNavigate();

  const checkCurrentInput = () => {
    if (
      employee.image_url !== "" &&
      employee.idPoste !== 0 &&
      employee.nom !== "" &&
      employee.prenom !== "" &&
      employee.dateNaissance !== ""
    ) {
      setVisible(!visible);
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  };

  useEffect(() => {
    getEmployee();
    getPostes();
  }, []);

  const getEmployee = async () => {
    try {
      const response = await apiClient.get(`/oneE/${employeeId}`);
      const fetchedEmployee = response.data[0];

      // Format dates
      fetchedEmployee.dateNaissance = format(
        new Date(fetchedEmployee.dateNaissance),
        "yyyy-MM-dd"
      );
      fetchedEmployee.dateEmbauche = format(
        new Date(fetchedEmployee.dateEmbauche),
        "yyyy-MM-dd"
      );

      setEmployee(fetchedEmployee);
    } catch (error) {
      console.log(error);
    }
  };

  const getPostes = async () => {
    const response = await apiClient.get("/allP");
    setPostes(response.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEmployee({ ...employee, image_url: file.name });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      employee.adresse !== "" &&
      employee.email !== "" &&
      employee.tel !== "" &&
      employee.dateEmbauche !== ""
    ) {
      try {
        await apiClient.put(`/updateE/${employeeId}`, employee);
        displayToast("success", "L'employé a été modifié avec succès");
        navigate(`/employees/${employeeId}`);
        onClose();
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsEmpty(true);
    }
  };

  const setErrorBorder = () => {
    return "1px solid red";
  };

  return (
    <Container color="black" maxW="full" rounded={21} textAlign="center">
      <Box>
        <form onSubmit={handleSubmit}>
          <HStack spacing={15} textAlign="center" ml="auto" mr="auto">
            <Box>
              <HStack {...(visible && { display: "none" })}>
                <Box mt={10}>
                  <FormControl id="image">
                    <FormLabel htmlFor="imageUpload">
                      <Image
                        rounded={21}
                        height={280}
                        minW={220}
                        objectFit="cover"
                        src={
                          employee.image_url
                            ? `/src/assets/${employee.image_url}`
                            : empimg
                        }
                        cursor="pointer"
                        alt="photo de l'employe"
                      />
                      <Text pl={50} pr={50}>
                        Photo de l'employe
                      </Text>
                      <Input
                        id="imageUpload"
                        type="file"
                        onChange={handleImageChange}
                        display="none"
                      />
                      {isEmpty && !employee.image_url && (
                        <Text color={"red"} fontSize={10} pr={"10%"} pl={"20%"}>
                          Veuillez sélectionner une image
                        </Text>
                      )}
                    </FormLabel>
                  </FormControl>
                </Box>
                <Box w="90%">
                  <FormControl mt={2} isRequired>
                    <FormLabel>Poste</FormLabel>
                    <Select
                      placeholder="Sélectionner le poste"
                      _placeholder={{ color: "#8c8c8c" }}
                      border={
                        isEmpty && employee.idPoste === 0
                          ? setErrorBorder()
                          : "1px solid black"
                      }
                      h={50}
                      onChange={handleInputChange}
                      name="idPoste"
                      value={employee.idPoste}
                    >
                      {postes.map((poste) => (
                        <option key={poste.idPoste} value={poste.idPoste}>
                          {poste.nomPoste}
                        </option>
                      ))}
                    </Select>
                    {isEmpty && employee.idPoste === 0 && (
                      <Text color={"red"} fontSize={10} pr={130}>
                        Veuillez sélectionner un poste
                      </Text>
                    )}
                  </FormControl>
                  <FormControl mt={3} id="nom" isRequired>
                    <FormLabel>Nom</FormLabel>
                    <Input
                      color={"!black"}
                      bg="white"
                      h={50}
                      type="text"
                      id="nom"
                      required
                      border={
                        isEmpty && employee.nom === ""
                          ? setErrorBorder()
                          : "1px solid black"
                      }
                      onChange={handleInputChange}
                      placeholder="Nom"
                      _placeholder={{ color: "#8c8c8c" }}
                      name="nom"
                      value={employee.nom}
                    />
                    {isEmpty && employee.nom === "" && (
                      <Text color={"red"} fontSize={10} pl={"auto"} pr={"50%"}>
                        Veuillez insérer le nom
                      </Text>
                    )}
                  </FormControl>
                  <FormControl mt={3} id="prenom">
                    <FormLabel>Prénom</FormLabel>
                    <Input
                      bg="white"
                      h={50}
                      type="text"
                      id="prenom"
                      required
                      border={
                        isEmpty && employee.prenom === ""
                          ? setErrorBorder()
                          : "1px solid black"
                      }
                      onChange={handleInputChange}
                      placeholder="Prénom"
                      _placeholder={{ color: "#8c8c8c" }}
                      name="prenom"
                      value={employee.prenom}
                    />
                  </FormControl>
                  <FormControl id="dateNaissance" isRequired>
                    <FormLabel>Date de naissance</FormLabel>
                    <Input
                      id="dateNaissance"
                      required
                      border={
                        isEmpty && employee.dateNaissance === ""
                          ? setErrorBorder()
                          : "1px solid black"
                      }
                      onChange={handleInputChange}
                      placeholder="Select Date and Time"
                      _placeholder={{ color: "#8c8c8c" }}
                      size="md"
                      bg={"white"}
                      h={50}
                      type="date"
                      max={minDate.toISOString().split("T")[0]}
                      name="dateNaissance"
                      value={employee.dateNaissance}
                    />
                    {isEmpty && employee.dateNaissance === "" && (
                      <Text color={"red"} fontSize={10} pr={130}>
                        Veuillez sélectionner une date
                      </Text>
                    )}
                  </FormControl>
                </Box>
              </HStack>

              <Box {...(!visible && { display: "none" })}>
                <HStack>
                  <Box mt={10}>
                    <FormControl id="image">
                      <FormLabel>
                        <Image
                          rounded={21}
                          height={280}
                          minW={220}
                          objectFit="cover"
                          src={
                            employee.image_url
                              ? `/src/assets/${employee.image_url}`
                              : empimg
                          }
                          alt="photo de l'employe"
                        />
                        <Text pl={50} pr={50}>
                          Photo de l'employe
                        </Text>
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
                    <FormControl mt={3} id="adresse" isRequired>
                      <FormLabel>Adresse</FormLabel>
                      <Input
                        bg="white"
                        h={50}
                        type="text"
                        id="adresse"
                        required
                        border={
                          isEmpty && employee.adresse === ""
                            ? setErrorBorder()
                            : "1px solid black"
                        }
                        onChange={handleInputChange}
                        placeholder="Adresse"
                        _placeholder={{ color: "#8c8c8c" }}
                        name="adresse"
                        value={employee.adresse}
                      />
                      {isEmpty && employee.adresse === "" && (
                        <Text color={"red"} fontSize={10} pr={130}>
                          Veuillez insérer une adresse
                        </Text>
                      )}
                    </FormControl>
                    <FormControl mt={3} id="email" isRequired>
                      <FormLabel>Adresse email</FormLabel>
                      <Input
                        bg="white"
                        h={50}
                        type="email"
                        id="email"
                        required
                        border={
                          isEmpty && employee.email === ""
                            ? setErrorBorder()
                            : "1px solid black"
                        }
                        onChange={handleInputChange}
                        placeholder="Adresse email"
                        _placeholder={{ color: "#8c8c8c" }}
                        name="email"
                        value={employee.email}
                      />
                      {isEmpty && employee.email === "" && (
                        <Text color={"red"} fontSize={10} pr={130}>
                          Veuillez sélectionner une email
                        </Text>
                      )}
                    </FormControl>
                    <FormControl mt={3} id="tel" isRequired>
                      <FormLabel>Téléphone</FormLabel>
                      <InputGroup
                        h={50}
                        border={
                          isEmpty && employee.tel === ""
                            ? setErrorBorder()
                            : "1px solid black"
                        }
                      >
                        <InputLeftAddon h={50}>+261</InputLeftAddon>
                        <Input
                          h={50}
                          type="tel"
                          required
                          maxLength={9} // Limiter la longueur du numéro à 9 chiffres après le code pays
                          placeholder="XX-XX-XXX-XX"
                          _placeholder={{ color: "#8c8c8c" }}
                          onChange={handleInputChange}
                          name="tel"
                          value={employee.tel.replace("+261", "")}
                        />
                      </InputGroup>
                      {isEmpty && employee.tel === "" && (
                        <Text color={"red"} fontSize={10} pr={100}>
                          Veuillez insérer le numéro de téléphone
                        </Text>
                      )}
                    </FormControl>
                    <FormControl mt={1} id="dateEmbauche" isRequired>
                      <FormLabel>Date d'embauche</FormLabel>
                      <Input
                        id="dateEmbauche"
                        required
                        border={
                          isEmpty && employee.dateEmbauche === ""
                            ? setErrorBorder()
                            : "1px solid black"
                        }
                        onChange={handleInputChange}
                        placeholder="Select Date and Time"
                        _placeholder={{ color: "#8c8c8c" }}
                        size="md"
                        bg={"white"}
                        h={50}
                        type="date"
                        max={new Date().toISOString().split("T")[0]} // Bloquer les dates après aujourd'hui
                        name="dateEmbauche"
                        value={employee.dateEmbauche}
                      />
                      {isEmpty && employee.dateEmbauche === "" && (
                        <Text color={"red"} fontSize={10} pr={130}>
                          Veuillez sélectionner une date
                        </Text>
                      )}
                    </FormControl>
                  </Box>
                </HStack>
              </Box>
            </Box>
          </HStack>
          <ModalFooter>
            <Center mt={3} ml="auto">
              <Box {...(!visible && { display: "none" })}>
                <HStack spacing={4}>
                  <Button
                    p={6}
                    onClick={() => setVisible(!visible)}
                    colorScheme="gray"
                  >
                    Retour
                  </Button>
                  <Button p={6} type="submit" colorScheme="green">
                    Valider
                  </Button>
                </HStack>
              </Box>
              <Box {...(visible && { display: "none" })}>
                <Button p={6} onClick={checkCurrentInput}>
                  Suivant
                </Button>
              </Box>
            </Center>
          </ModalFooter>
        </form>
      </Box>
    </Container>
  );
};

export default EmployeeEdit;
