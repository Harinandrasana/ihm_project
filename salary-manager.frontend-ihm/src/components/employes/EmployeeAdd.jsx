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
  border,
} from "@chakra-ui/react";
import apiClient from "../../services/api-client";
import useNotification from "../../hooks/useNotification";
import empimg from "../../assets/no-image-placeholder.webp";

const EmployeeAdd = ({ onClose }) => {
  const [values, setValues] = useState({
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

  const checkCurrentInput = () => {
    if (
      values.image_url !== "" &&
      values.idPoste !== 0 &&
      values.nom !== "" &&
      values.prenom !== "" &&
      values.dateNaissance !== ""
    ) {
      setVisible(!visible);
      setIsEmpty(!isEmpty);
    } else {
      setIsEmpty(true);
    }
  };

  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    getPostes();
  }, []);

  const getPostes = async () => {
    const response = await apiClient.get("/allP");
    setPostes(response.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValues({ ...values, image_url: file.name });
    }
  };

  const handleSubmit = async (e) => {
    if (
      values.adresse !== "" &&
      values.email !== "" &&
      values.tel !== "" &&
      values.dateEmbauche !== ""
    ) {
      e.preventDefault();
      try {
        await apiClient.post("/addE", values);
        onClose();
        displayToast("success", "L'employé a été ajouté avec succès");
      } catch (error) {
        // Gérer les erreurs ici
      }
    } else {
      setIsEmpty(true);
    }
  };

  const setErrorBorder = () => {
    return "1px solid red";
  };

  const formatPhoneNumber = (input) => {
    const cleaned = ("" + input).replace(/\D/g, "");
    const countryCode = "+261";
    const areaCode = cleaned.slice(0, 3); // Madagascar a un indicatif régional à 3 chiffres
    const firstSegment = cleaned.slice(3, 5);
    const secondSegment = cleaned.slice(5, 7);
    const thirdSegment = cleaned.slice(7, 9);
    const fourthSegment = cleaned.slice(9); // Ajustement pour le quatrième segment
    return `${countryCode}-${areaCode}-${firstSegment}-${secondSegment}-${thirdSegment}-${fourthSegment}`;
  };

  const handlePhoneNumberChange = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedPhoneNumber);
    setValues({ ...values, tel: formattedPhoneNumber });
  };

  console.log("idposte values", values.idPoste);

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
                        minW={220}
                        objectFit="cover"
                        src={
                          values.image_url
                            ? values.image_url instanceof Blob
                              ? URL.createObjectURL(values.image_url)
                              : `/src/assets/${values.image_url}`
                            : empimg
                        }
                        cursor="pointer"
                        alt="photo de l'employe"
                      />
                      <Text pl={50} pr={50}>
                        Photo l'employe
                      </Text>
                      <Input
                        id="imageUpload"
                        type="file"
                        onChange={handleImageChange}
                        display="none"
                      />
                      {isEmpty && values.image_url === 0 && (
                        <Text color={"red"} fontSize={10} pr={"10%"} pl={"20%"}>
                          Veuller selectionner une image
                        </Text>
                      )}
                    </FormLabel>
                  </FormControl>
                </Box>
                <Box w="90%">
                  <FormControl mt={2} isRequired>
                    <FormLabel>Poste</FormLabel>
                    <Select
                      placeholder="Selectionner poste"
                      _placeholder={{ color: "#8c8c8c" }}
                      border={
                        isEmpty === true && values.idPoste === 0 && values.id
                          ? setErrorBorder()
                          : "1px solid black"
                      }
                      h={50}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          idPoste: parseInt(e.target.value),
                        })
                      }
                    >
                      {postes.map((poste) => (
                        <option key={poste.idPoste} value={poste.idPoste}>
                          {poste.nomPoste}
                        </option>
                      ))}
                    </Select>
                    {isEmpty && values.idPoste === 0 && (
                      <Text color={"red"} fontSize={10} pr={130}>
                        Veuller selectionner un poste
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
                        isEmpty && values.nom === ""
                          ? setErrorBorder()
                          : "1px solid black"
                      }
                      onChange={(e) =>
                        setValues({ ...values, nom: e.target.value })
                      }
                      placeholder="Nom"
                      _placeholder={{ color: "#8c8c8c" }}
                    />
                    {isEmpty && values.nom === "" && (
                      <Text color={"red"} fontSize={10} pl={"auto"} pr={"50%"}>
                        Veuiller inserer le nom !
                      </Text>
                    )}
                  </FormControl>
                  <FormControl mt={3} id="prenom">
                    <FormLabel>Prenom</FormLabel>
                    <Input
                      bg="white"
                      h={50}
                      type="text"
                      id="prenom"
                      required
                      border={
                        isEmpty && values.prenom === ""
                          ? setErrorBorder()
                          : "1px solid black"
                      }
                      onChange={(e) =>
                        setValues({ ...values, prenom: e.target.value })
                      }
                      placeholder="Prenom"
                      _placeholder={{ color: "#8c8c8c" }}
                    />
                  </FormControl>
                  <FormControl id="dateNaissance" isRequired>
                    <FormLabel>Date de naissance</FormLabel>
                    <Input
                      id="dateNaissance"
                      required
                      border={
                        isEmpty && values.dateNaissance === ""
                          ? setErrorBorder()
                          : "1px solid black"
                      }
                      onChange={(e) =>
                        setValues({ ...values, dateNaissance: e.target.value })
                      }
                      placeholder="Select Date and Time"
                      _placeholder={{ color: "#8c8c8c" }}
                      size="md"
                      bg={"white"}
                      h={50}
                      type="date"
                      max={minDate.toISOString().split("T")[0]}
                    />
                    {isEmpty && values.dateNaissance === "" && (
                      <Text color={"red"} fontSize={10} pr={130}>
                        Veuller selectionner une date
                      </Text>
                    )}
                  </FormControl>
                </Box>
              </HStack>

              {/* Formulaire suivant */}
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
                            !values.image_url
                              ? "/src/assets/no-image-placeholder.webp"
                              : `/src/assets/${values.image_url}`
                          }
                          alt="photo de l'employe"
                        />
                        <Text pl={50} pr={50}>
                          Photo l'employe
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
                        border={
                          isEmpty && values.idPoste === ""
                            ? setErrorBorder()
                            : "1px solid black"
                        }
                        onChange={(e) =>
                          setValues({ ...values, adresse: e.target.value })
                        }
                        placeholder="Adresse"
                        _placeholder={{ color: "#8c8c8c" }}
                      />
                      {isEmpty && values.adresse === "" && (
                        <Text color={"red"} fontSize={10} pr={130}>
                          Veuller inserer une adresse
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
                          isEmpty && values.email === ""
                            ? setErrorBorder()
                            : "1px solid black"
                        }
                        onChange={(e) =>
                          setValues({ ...values, email: e.target.value })
                        }
                        placeholder="Adresse email"
                        _placeholder={{ color: "#8c8c8c" }}
                      />
                      {isEmpty && values.email === "" && (
                        <Text color={"red"} fontSize={10} pr={130}>
                          Veuller selectionner une email
                        </Text>
                      )}
                    </FormControl>
                    <FormControl mt={3} id="tel" isRequired>
                      <FormLabel>Téléphone</FormLabel>
                      <InputGroup
                        h={50}
                        border={
                          isEmpty && values.tel === ""
                            ? setErrorBorder()
                            : "1px solid black"
                        }
                      >
                        <InputLeftAddon h={50}>+261</InputLeftAddon>
                        <Input
                          h={50}
                          type="tel"
                          required
                          maxLength={9} // Limiter la longueur du numéro à 11 chiffres
                          placeholder="XX-XX-XXX-XX"
                          _placeholder={{ color: "#8c8c8c" }}
                          onChange={(e) => {
                            const inputNumber = e.target.value.replace(
                              /\D/g,
                              ""
                            );
                            if (inputNumber.length <= 9) {
                              setValues({
                                ...values,
                                tel: "+261" + inputNumber,
                              });
                            }
                          }}
                        />
                      </InputGroup>
                      {isEmpty && values.tel === "" && (
                        <Text color={"red"} fontSize={10} pr={100}>
                          Veuillez insérer le numéro de téléphone
                        </Text>
                      )}
                    </FormControl>
                    <FormControl mt={1} id="dateEmbauche" isRequired>
                      <FormLabel>dateEmbauche</FormLabel>
                      <Input
                        id="dateEmbauche"
                        required
                        border={
                          isEmpty && values.dateEmbauche === ""
                            ? setErrorBorder()
                            : "1px solid black"
                        }
                        onChange={(e) =>
                          setValues({
                            ...values,
                            dateEmbauche: e.target.value,
                          })
                        }
                        placeholder="Select Date and Time"
                        _placeholder={{ color: "#8c8c8c" }}
                        size="md"
                        bg={"white"}
                        h={50}
                        type="date"
                        max={new Date().toISOString().split("T")[0]} // Bloquer les dates après aujourd'hui
                      />
                      {isEmpty && values.dateEmbauche === "" && (
                        <Text color={"red"} fontSize={10} pr={130}>
                          Veuller selectionner une date
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
                <Button p={6} onClick={() => checkCurrentInput()}>
                  suivant
                </Button>
              </Box>
            </Center>
          </ModalFooter>
        </form>
      </Box>
    </Container>
  );
};

export default EmployeeAdd;
