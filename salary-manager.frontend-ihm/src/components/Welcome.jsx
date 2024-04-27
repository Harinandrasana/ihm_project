import { Box, Center, Container, Stack, Text } from "@chakra-ui/react";
import React from "react";

const Welcome = () => {
  return (
    <>
      <Container
        bg="#2d3748"
        rounded={21}
        height="100%"
        gap={0}
        p={90}
        maxW="full"
        minH="50%"
      >
        <Center ml="auto" mr="auto" textAlign="center">
          <Stack mb={1}>
            <Text fontSize={50}>Bienvenu</Text>
            <Text fontSize={20}>
              Veuiller vous connecter pour atteindre l'interface d'admnistration
            </Text>
          </Stack>
        </Center>
      </Container>
    </>
  );
};

export default Welcome;
