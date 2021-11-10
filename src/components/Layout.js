import { Box, Container } from "@chakra-ui/react";
import React from "react";
import { Navbar } from "./Navbar";

export function Layout({ children }) {
  return (
    <Box mb={14}>
      <Navbar />
      <Container maxW="container.md">{children}</Container>
    </Box>
  );
}
