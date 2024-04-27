import { Box, useMediaQuery } from "@chakra-ui/react";
import React, { useState } from "react";
import SideMenuDisplayer from "./SideMenuDisplayer";
import SideMenu from "./SideMenu";

const SideBar = () => {
  const [visible, setVisible] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 1000px)");

  return (
    <Box width="auto" height="auto" color="white" mt={2} zIndex={3} bg={"none"}>
      {isMobile ? <SideMenuDisplayer /> : <SideMenu setVisible={setVisible} />}
    </Box>
  );
};

export default SideBar;
