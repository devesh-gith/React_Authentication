import { Button } from "@chakra-ui/button";
import { FaGoogle } from "react-icons/fa";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useToast } from "@chakra-ui/react";
import { Heading, HStack, Stack } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import { chakra } from "@chakra-ui/system";
import React, { useState } from "react";
import { Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Card } from "../components/Card";
import DividerWithText from "../components/DividerWithText";
import { Layout } from "../components/Layout";
import { useAuth } from "../context/AuthContext";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const toast = useToast();
  const { forgotPassword } = useAuth();
  return (
    <Layout>
      <Heading>Forgot Password</Heading>
      <Card my={4} mx="auto" MaxW="md">
        <chakra.form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await forgotPassword(email);
              toast({
                description: "Email has been send Successfully! Thank You",
                status: "error",
                duration: 4000,
                isClosable: true,
              });
            } catch (error) {
              console.log(error);
              toast({
                description: "Please Enter the Valid Email",
                status: "status",
                duration: 4000,
                isClosable: true,
              });
            }
          }}
        >
          <Stack>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                name="email"
                autoComplete="email"
              ></Input>
            </FormControl>
          </Stack>
          <Center>
            <Button
              type="submit"
              colorScheme="pink"
              size="md"
              fontSize="lg"
              mt={4}
            >
              Submit
            </Button>
          </Center>
        </chakra.form>
        <DividerWithText my={6}>OR</DividerWithText>
        <Center>
          <Button variant="link" fontSize={22}>
            <Link to="/login">Login</Link>
          </Button>
        </Center>
      </Card>
    </Layout>
  );
}
