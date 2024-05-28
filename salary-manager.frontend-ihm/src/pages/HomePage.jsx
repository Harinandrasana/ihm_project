import { Text, Center, Box, Button } from "@chakra-ui/react";
import * as React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HomePage = () => {
  const text = "Bienvenue, cliquer sur le bouton ci-joint pour commencer".split(
    ""
  );

  // Durée pour chaque caractère
  const durationPerChar = 0.25;
  // Nombre de caractères
  const charCount = text.length;
  // Délai total pour l'apparition de tout le texte
  const totalDelay = (charCount * durationPerChar) / 10;

  return (
    <Center mt={"20%"}>
      <Box textAlign="center">
        {text.map((el, i) => (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: durationPerChar,
              delay: i * (durationPerChar / 10),
            }}
            key={i}
          >
            <Text fontSize={30} color="black" display="inline">
              {el}
            </Text>
          </motion.span>
        ))}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: durationPerChar,
            delay: totalDelay,
          }}
        >
          <Box>
            <Link to={"/postes"}>
              <Button mt={4} py={5} color="white" colorScheme="red">
                <Text fontSize={20}>Commencer</Text>
              </Button>
            </Link>
          </Box>
        </motion.div>
      </Box>
    </Center>
  );
};

export default HomePage;
