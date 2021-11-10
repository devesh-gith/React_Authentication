import { Button } from "@chakra-ui/button";
import { FaGoogle } from "react-icons/fa";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Heading, HStack, Stack } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import React from "react";
import { Input, Center, useToast } from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import { Card } from "../components/Card";
import DividerWithText from "../components/DividerWithText";
import { Layout } from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { useState } from "react/cjs/react.development";

export default function LoginPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isSubmitting, setisSubmitting] = useState(false);
  const toast = useToast();
  const { register, signInWithGoogle } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        description: "Credentials are not vaild",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setisSubmitting(true);
    register(email, password)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.message);
        toast({
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        setTimeout(() => {
          setisSubmitting(false);
        }, 1000);
      });
  };

  return (
    <Layout>
      <Heading>Register</Heading>
      <Card my={4} mx="auto" MaxW="md">
        <chakra.form onSubmit={handleSubmit}>
          <Stack>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              ></Input>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                required
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="password"
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
              isLoading={isSubmitting}
            >
              Register
            </Button>
          </Center>
        </chakra.form>

        <DividerWithText my={6}>OR</DividerWithText>
        <Button
          variant="outline"
          colorScheme="pink"
          isFullWidth
          leftIcon={<FaGoogle />}
          onClick={() =>
            signInWithGoogle()
              .then((user) => console.log(user))
              .catch((error) => {
                console.log(error);
              })
          }
        >
          Sign in with Google
        </Button>
      </Card>
    </Layout>
  );
}
