import React from "react";
import {
  Box,
  HStack,
  IconButton,
  Spacer,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import NavLink from "./NavLink";
import { FaSun, FaMoon } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
export function Navbar() {
  const { toggleColorMode } = useColorMode();
  const { logout, currentUser } = useAuth();
  return (
    <Box
      borderBottom="2px"
      borderBottomColor={useColorModeValue("gray.100", "gray.700")}
      py={4}
      mb={4}
    >
      <HStack
        justifyContent="flex-end"
        maxW="container.lg"
        mx="auto"
        spacing={4}
      >
        <NavLink to="/" size="md" name="Firebse Auth" />
        <Spacer />
        {!currentUser && <NavLink to="/login" size="md" name="Login" />}
        {!currentUser && <NavLink to="/register" size="md" name="Register" />}
        {currentUser && <NavLink to="/profile" size="md" name="Profile" />}
        {currentUser && (
          <NavLink
            to="/logout"
            name="Logout"
            onClick={async (e) => {
              e.preventDefault();
              await logout();
            }}
          />
        )}
        <IconButton
          variant="ghost"
          icon={useColorModeValue(<FaSun />, <FaMoon />)}
          onClick={toggleColorMode}
          aria-label="toggle-dark-mode"
        />
      </HStack>
    </Box>
  );
}
