import React from "react";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai"; // Importez l'icône d'utilisateur correctement
import { FaSignOutAlt } from "react-icons/fa";
import { MdSettings } from "react-icons/md";
import { signOut } from "../../hooks/useUsers";
import { Link } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";

const NavBarMenu = () => {
  const handleLogout = () => {
    signOut("users");
    const timeout = setTimeout(() => {
      window.location.reload();
    }, 0);
    return () => clearTimeout(timeout);
  };
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<AiOutlineUser color="white" />}
        variant="outline"
      />
      <MenuList position={"relative"} zIndex={3}>
        <Link to="/params">
          <MenuItem>
            <MdSettings />
            <Text ml={5}>Paramètres</Text>
          </MenuItem>
        </Link>
        <Link to="/help">
          <MenuItem>
            <FaInfoCircle />
            <Text ml={5}>Aide</Text>
          </MenuItem>
        </Link>
        <MenuItem onClick={() => handleLogout()}>
          <FaSignOutAlt />
          <Text ml={5}>Se deconnecter</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default NavBarMenu;
