import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  Stack,
  Text,
  HStack,
  Divider,
  Button,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { AiOutlineHome } from "react-icons/ai";
import {
  FaBriefcase,
  FaMoneyCheckAlt,
  FaMinusCircle,
  FaBars,
} from "react-icons/fa";
import { BiGroup } from "react-icons/bi";
import { Link } from "react-router-dom";

const SideMenu = () => {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  return (
    <Box
      color="white"
      border="hidden"
      mb={2}
      minH={850}
      zIndex={2}
      shadow="md"
      mr={1}
      ml="0"
      pl={3}
      roundedRight={21}
      pr={3}
      alignItems="center"
      bg={"#1e2530"}
    >
      <Stack mt={0} mx="auto">
        {/* <HStack textAlign="center" mt={10} pl={9}>
          <Icon as={FaBars} boxSize={10} />
          <Text fontSize={30}>Menu</Text>
        </HStack> */}
        {/* <Divider textAlign="center" pl={5} /> */}
        <List>
          <ListItem
            mt={10}
            mb={6}
            border="hidden"
            rounded={15}
            onMouseDown={() => handleItemClick("Accueil")}
          >
            <Link to="/">
              <Button
                bg="none"
                verticalAlign="middle"
                mt={20}
                color="white"
                fontSize={22}
                {...(activeItem === "Accueil" && {
                  color: "#bcc0c3",
                  fontWeight: 500,
                })}
                _hover={{
                  transform: "scale(1.3)",
                  transition: "transform .15s ease-in",
                }}
              >
                <Icon as={AiOutlineHome} boxSize={10} />
                {/* <Text ml={6} mt={2}>
                  Accueil
                </Text> */}
              </Button>
            </Link>
          </ListItem>
          <ListItem
            mt={8}
            mb={6}
            onMouseDown={() => handleItemClick("Employes")}
          >
            <Link to="/employees">
              <Button
                bg="none"
                verticalAlign="middle"
                color="white"
                fontSize={22}
                {...(activeItem === "Accueil" && {
                  color: "#bcc0c3",
                  fontWeight: 500,
                })}
                _hover={{
                  transform: "scale(1.3)",
                  transition: "transform .15s ease-in",
                }}
              >
                <Icon as={BiGroup} boxSize={10} />
                {/* <Text ml={6} mt={2}>
                  Employes
                </Text> */}
              </Button>
            </Link>
          </ListItem>
          <ListItem mt={8} mb={6} onMouseDown={() => handleItemClick("Postes")}>
            <Link to="/postes">
              <Button
                bg="none"
                verticalAlign="middle"
                color="white"
                fontSize={22}
                {...(activeItem === "Accueil" && {
                  color: "#bcc0c3",
                  fontWeight: 500,
                })}
                _hover={{
                  transform: "scale(1.3)",
                  transition: "transform .15s ease-in",
                }}
              >
                <Icon as={FaBriefcase} boxSize={10} />
                {/* <Text ml={6} mt={2}>
                  Postes
                </Text> */}
              </Button>
            </Link>
          </ListItem>
          <ListItem
            mt={8}
            mb={6}
            onMouseDown={() => handleItemClick("Deductions")}
          >
            <Link to="/deductions">
              <Button
                bg="none"
                verticalAlign="middle"
                color="white"
                fontSize={22}
                {...(activeItem === "Accueil" && {
                  color: "#bcc0c3",
                  fontWeight: 500,
                })}
                _hover={{
                  transform: "scale(1.3)",
                  transition: "transform .15s ease-in",
                }}
              >
                <Icon as={FaMinusCircle} boxSize={10} />
                {/* <Text ml={6} mt={2}>
                  Deductions
                </Text> */}
              </Button>
            </Link>
          </ListItem>
          <ListItem mt={8} mb={6} onMouseDown={() => handleItemClick("Paies")}>
            <Link to="/paies">
              <Button
                bg="none"
                verticalAlign="middle"
                color="white"
                fontSize={22}
                {...(activeItem === "Accueil" && {
                  color: "#bcc0c3",
                  fontWeight: 500,
                })}
                _hover={{
                  transform: "scale(1.3)",
                  transition: "transform .15s ease-in",
                }}
              >
                <Icon as={FaMoneyCheckAlt} boxSize={10} />
                {/* <Text ml={6} mt={2}>
                  Paies
                </Text> */}
              </Button>
            </Link>
          </ListItem>
        </List>
      </Stack>
    </Box>
  );
};

export default SideMenu;
