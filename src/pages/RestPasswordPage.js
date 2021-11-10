import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Heading, Stack } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import { Center, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Card } from "../components/Card";
import DividerWithText from "../components/DividerWithText";
import { Layout } from "../components/Layout";
import { useQuery } from "../hooks/useQuery";
import { useAuth } from "../context/AuthContext";
export default function LoginPage() {
  const [password, setPassword] = useState();
  const query = useQuery();
  const toast = useToast();
  const { resetPassword } = useAuth();
  const history = useHistory();
  // console.log(query.get("mode"), query.get("oobCode"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(query.get("oobCode"), password);
      toast({
        description: "Password has been changed, you can login now.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      history.push("/login");
    } catch (error) {
      toast({
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.log(error.message);
    }
  };

  return (
    <Layout>
      <Heading>Reset Password</Heading>
      <Card my={4} mx="auto" MaxW="lg">
        <chakra.form onSubmit={handleSubmit}>
          <Stack>
            <FormControl id="password">
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                name="password"
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
              Reset Password
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
