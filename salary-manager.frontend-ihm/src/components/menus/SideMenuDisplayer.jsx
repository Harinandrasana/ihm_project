import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  HStack,
  Text,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon,
} from "@chakra-ui/icons";
import { Icon, createIcon } from "@chakra-ui/react";
import { MdSettings } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  FaBriefcase,
  FaMoneyCheckAlt,
  FaMinusCircle,
  FaBars,
} from "react-icons/fa";
import { BiGroup } from "react-icons/bi";

const SideMenuDisplayer = () => {
  return (
    <Box textAlign="center">
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
        />
        <MenuList>
          <Link to="/">
            <MenuItem>
              <HStack>
                <Icon as={AiOutlineHome} boxSize={7} />
                <Text ml={6} mt={2}>
                  Accueil
                </Text>
              </HStack>
            </MenuItem>
          </Link>
          <Link to="/employees">
            <MenuItem>
              <HStack>
                <Icon as={BiGroup} boxSize={7} />
                <Text ml={6} mt={2}>
                  Employes
                </Text>
              </HStack>
            </MenuItem>
          </Link>
          <Link to="/postes">
            <MenuItem>
              <HStack>
                <Icon as={FaBriefcase} boxSize={7} />
                <Text ml={6} mt={2}>
                  Postes
                </Text>
              </HStack>
            </MenuItem>
          </Link>
          <Link to="/deductions">
            <MenuItem>
              <HStack>
                <Icon as={FaMinusCircle} boxSize={7} />
                <Text ml={6} mt={2}>
                  Deductions
                </Text>
              </HStack>
            </MenuItem>
          </Link>
          <Link to="/paies">
            <MenuItem>
              <HStack>
                <Icon as={FaMoneyCheckAlt} boxSize={7} />
                <Text ml={6} mt={2}>
                  Paies
                </Text>
              </HStack>
            </MenuItem>
          </Link>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default SideMenuDisplayer;
