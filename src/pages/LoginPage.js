import { Button } from "@chakra-ui/button";
import { Input, useToast } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Center, Heading, HStack, Stack } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Card } from "../components/Card";
import DividerWithText from "../components/DividerWithText";
import { Layout } from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import useMounted from "../hooks/useMounted";

export default function LoginPage(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isSubmitting, setisSubmitting] = useState(false);
  const toast = useToast();
  const { login, signInWithGoogle } = useAuth();
  const history = useHistory();
  const location = useLocation();
  const mounted = useMounted();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        description: "Credentials are not vaild",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    setisSubmitting(true);
    login(email, password)
      .then((res) => {
        history.push(location.state?.from ?? "/profile");
      })
      .catch((error) => {
        console.log(error);
        toast({
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      })
      .finally(() => {
        setTimeout(() => {
          mounted && setisSubmitting(false);
        }, 1000);
      });
  };
  return (
    <Layout>
      <Heading>Login</Heading>
      <Card my={4} mx="auto" MaxW="md">
        <chakra.form onSubmit={handleSubmit}>
          <Stack>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                required
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                required
                name="password"
                autoComplete="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              Sign In
            </Button>
          </Center>
        </chakra.form>
        <HStack justifyContent="space-between" my={4}>
          <Button varient="link">
            <Link to="./forgot-password">forgot Password</Link>
          </Button>
          <Button varient="link">
            <Link to="./register">Register</Link>
          </Button>
        </HStack>
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
