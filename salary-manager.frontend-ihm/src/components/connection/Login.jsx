import React, { useState } from "react";
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

const Login = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [values, setValues] = useState({
    userId: "",
    password: "",
  });
  const { login } = useLogin();
  const { register } = useRegister();

  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSignUp) {
      login(values);
    } else {
      const success = register(values);
      if (success) {
        await login(values);
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
            <FormControl id="userId">
              <FormLabel fontSize={25}>Identiant</FormLabel>
              <Input
                bg="white"
                h={50}
                type="number"
                id="userId"
                placeholder="Votre identifiant"
                border="1px solid black"
                _active={{ border: "1px solid black" }}
                _placeholder={{ color: "#8c8c8c" }}
                required
                onChange={(e) =>
                  setValues({ ...values, userId: e.target.value })
                }
              />
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
                  >
                    Valider
                  </Button>
                </FormControl>
                <HStack gap={0}>
                  <Text>Already have an account?</Text>
                  <Button
                    bg="none"
                    color={"#8ec4f1"}
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
                    color={"#8ec4f1"}
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
