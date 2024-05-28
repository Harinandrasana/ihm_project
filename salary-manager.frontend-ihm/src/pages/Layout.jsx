import { useState } from "react";
import { Box, useMediaQuery } from "@chakra-ui/react";
import NavBar from "../components/Navigation/NavBar";
import { Outlet } from "react-router-dom";
import SideMenu from "../components/menus/SideMenu";
import { Grid, GridItem, Container } from "@chakra-ui/react";
import SideBar from "../components/menus/SideBar";
import SideMenuDisplayer from "../components/menus/SideMenuDisplayer";
import RouteBar from "../components/Navigation/RouteBar";

const Layout = () => {
  const [visible, setVisible] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 767px)");
  return (
    <Box>
      <Grid
        templateAreas={{
          base: `"header header"
                  "nav nav"
                  "main main"`,
          md: `"header header"
                  "nav nav"
                  "main main"`,
          xl: `"header header"
                  "nav main"
                  "footer footer"`,
          lg: `"header header"
                  "nav main"
                  "nav footer"`,
        }}
        gridTemplateRows={"65px 1fr 30px"}
        gridTemplateColumns={"120px 1fr"}
        h="200px"
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem
          p={2}
          h={82}
          verticalAlign="middle"
          bg="#1e2530"
          area={"header"}
          position="fixed"
          width={"full"}
          zIndex={3}
        >
          <NavBar />
        </GridItem>
        <GridItem area={"nav"} mt={20} position="fixed" zIndex={3}>
          {/* {isMobile && <RouteBar />} */}
          <Box ml={isMobile && "90%"}>
            <SideBar />
          </Box>
        </GridItem>
        <GridItem
          alignItems={"center"}
          mr={0}
          p={2}
          ml={-2}
          rounded={21}
          area={"main"}
        >
          <Grid
            templateAreas={{
              base: `"route route"
                  "content content"`,
              md: `"route route"
                  "content content"`,
              xl: `"route route"
                  "content content"`,
              lg: `"route route"
                  "content content"`,
            }}
            gridTemplateRows={"65px 1fr 30px"}
            gridTemplateColumns={"120px 1fr"}
            h="200px"
            gap="1"
            color="blackAlpha.700"
            fontWeight="bold"
          >
            <GridItem
              area={"route"}
              position={"fixed"}
              minW={"92.5%"}
              zIndex={1}
              mb={2}
            >
              <RouteBar />
            </GridItem>
            <GridItem area={"content"} mt={2}>
              {" "}
              <Outlet />
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem
          alignItems={"center"}
          mr={2}
          p={2}
          rounded={21}
          area={"main"}
        ></GridItem>
      </Grid>
    </Box>
  );
};

export default Layout;
