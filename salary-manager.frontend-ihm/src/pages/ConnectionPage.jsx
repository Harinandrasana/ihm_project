import React from "react";
import Login from "../components/connection/Login";
import Welcome from "../components/Welcome";
import { Box, Container, Stack } from "@chakra-ui/react";

const ConnectionPage = () => {
  return (
    <Container maxW={"full"} textAlign="center">
      <Stack>
        <Box>
          <Welcome />
        </Box>
        <Box zIndex={3} position="relative" top={-20}>
          <Login />
        </Box>
      </Stack>
    </Container>
  );
};

export default ConnectionPage;
