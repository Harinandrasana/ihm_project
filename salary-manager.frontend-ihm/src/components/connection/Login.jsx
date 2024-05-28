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
  Text,
  Center,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import useLogin from "../../hooks/useLogin";
import useRegister from "../../hooks/useRegister";
import apiClient from "../../services/api-client";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [values, setValues] = useState({
    identifiant: "",
    password: "",
  });
  const { login } = useLogin();
  const { register } = useRegister();

  const [isSignUp, setIsSignUp] = useState(false);

  const [isEmpty, setIsEmpty] = useState(false);
  const checkCurrentInput = () => {
    if (identifiant !== "" && password !== "") {
      setIsEmpty(!isEmpty);
    } else {
      setIsEmpty(true);
    }
  };

  // const [user, setUser]= useState([]);

  const getUser = async () => {
    const x = await apiClient.get("/getUsers");
    setUser(x.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  // Ajoutez une fonction pour vérifier les identifiants et les mots de passe
  const checkCredentials = () => {
    const user = user.find(
      (u) =>
        u.identifient === values.identifiant && u.passWord === values.password
    );
    if (user) {
      // Identifiant et mot de passe valides
      return true;
    } else {
      // Identifiant ou mot de passe incorrects
      return false;
    }
  };

  const [user, setUser] = useState([]);

  // const checkCredentials = () => {
  //   if (user.length > 0) {
  //     const userMatch = user.find(u => u.identifiant === values.identifiant && u.password === values.password);
  //     if (userMatch) {
  //       // Identifiant et mot de passe valides
  //       return true;
  //     } else {
  //       // Identifiant ou mot de passe incorrects
  //       return false;
  //     }
  //   } else {
  //     // Aucun utilisateur trouvé, retournez false ou gérer autrement
  //     return false;
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSignUp) {
      // if(checkCredentials()){
      login(values);
      // } else{
      //     // Affichez un message d'erreur
      //     alert("Identifiant ou mot de passe incorrect");
      // }
    } else {
      const success = register(values);
      if (success) {
        // if(checkCredentials()) {
        await login(values);
        // } else {
        //   // Affichez un message d'erreur
        //   alert("Identifiant ou mot de passe incorrect");
        // }
      } else {
      }
    }
  };

  return (
    <Container
      border="hidden"
      pt={2}
      pr={10}
      pl={10}
      pb={10}
      bg="white"
      color="black"
      rounded={21}
      mb={100}
    >
      <Center fontSize={30} border={"hidden"} mt={8} fontWeight="bold" mb={10}>
        {!isSignUp ? (
          <Text>Formulaire de connection</Text>
        ) : (
          <Text>Formulaire d'enregistrement</Text>
        )}
      </Center>
      <Box border="hidden" p={2}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <FormControl id="identifiant">
              <FormLabel fontSize={25}>Identiant</FormLabel>
              <Input
                bg="white"
                h={50}
                type="number"
                id="identifiant"
                placeholder="Votre identifiant"
                border="1px solid black"
                _active={{ border: "1px solid black" }}
                _placeholder={{ color: "#8c8c8c" }}
                required
                onChange={(e) =>
                  setValues({ ...values, identifiant: e.target.value })
                }
              />
              {
                isEmpty && values.identifiant === "" && (
                  <Text color={"red"} fontSize={14} pl="auto">
                    Veuiller remplire le formulaire
                  </Text>
                )
                // (user.map = (e => {
                //   (values.identifiant !== e.identifient) && (
                //     <Text color={"red"} fontSize={14} pl="auto" >
                //       identifiant incorrect!
                //     </Text>
                //   )
                // }))
              }
            </FormControl>
            <FormControl id="password">
              <FormLabel fontSize={25}>Mot de passe</FormLabel>
              <InputGroup>
                <Input
                  bg="white"
                  h={50}
                  border="1px solid black"
                  type={show ? "text" : "password"}
                  id="password"
                  required
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                  placeholder="Votre mot de passe"
                  _placeholder={{ color: "#8c8c8c" }}
                />

                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick} pt={2}>
                    {show ? (
                      <HiEyeOff color="black" size={18} />
                    ) : (
                      <HiEye color="black" size={18} />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {isEmpty && values.password === "" && (
                <Text color={"red"} fontSize={14} pl="auto">
                  Veuiller remplire le formulaire
                </Text>
              )}
            </FormControl>
            <Box mt={10}>
              <Stack>
                <FormControl>
                  <Button
                    type="submit"
                    bg="#22a5f6"
                    p={7}
                    w={"full"}
                    _hover={{ bg: "#004e7d" }}
                    _active={{ bg: "#004e7d" }}
                    // onClick={checkCurrentInput}
                  >
                    Valider
                  </Button>
                </FormControl>
                <HStack gap={0}>
                  <Text>Already have an account?</Text>
                  <Button
                    bg="none"
                    color={"blue.700"}
                    onClick={() => setIsSignUp(false)}
                    display={!isSignUp && "none"}
                    _hover={{
                      bg: "#d9d8d9",
                    }}
                  >
                    Se connecter
                  </Button>
                  <Button
                    bg={"none"}
                    color={"blue.700"}
                    onClick={() => setIsSignUp(true)}
                    display={isSignUp && "none"}
                    _hover={{
                      bg: "#d9d8d9",
                    }}
                  >
                    S'enregistrer
                  </Button>
                </HStack>
              </Stack>
            </Box>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
