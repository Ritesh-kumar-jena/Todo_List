import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
function Home() {
  return (
    <>
     <Box textAlign="center" mt={10}>
      <Heading>Welcome to Todo App</Heading>
      <Text fontSize="xl" mt={4}>Manage your tasks effectively!</Text>
    </Box>
    </>
  );
}

export default Home;