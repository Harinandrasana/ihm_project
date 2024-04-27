import { Box, HStack, Image, Container, Text, Flex } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";
import React from "react";
import NavBarMenu from "./NavBarMenu";
import { getEnregistredUser } from "../../hooks/useUsers";
import logo from "../../assets/logo.webp";

const NavBar = () => {
  const user = getEnregistredUser();
  console.log(user);

  return (
    <HStack p={2}>
      <Link to="/">
        <Image src={logo} boxSize="60px" objectFit="cover" />
      </Link>
      <Text color="#e1fcfd" fontSize={40}>
        Wolf society
      </Text>
      <Flex ml={"auto"} mr={"auto"}>
        <SearchInput />
      </Flex>
      <Box>
        <NavBarMenu />
      </Box>
    </HStack>
  );
};

export default NavBar;
