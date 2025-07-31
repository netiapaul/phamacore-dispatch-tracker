import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { EyeIcon, EyeOffIcon, InfoIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { hasError, loginUser } from "@/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { useSelector } from "react-redux";
import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { router } from "expo-router";
import colors from "tailwindcss/colors";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  const handleSubmit = async () => {
    if (!username || !password) {
      dispatch(hasError("please fill in the blanks"));
      return;
    }
    const results = await dispatch(loginUser({ username, password }));
    if (loginUser.fulfilled.match(results)) {
      router.replace("/(tabs)");
      return;
    }
    return;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Heading style={styles.title} size="3xl">
          Dispatch Tracking
        </Heading>
        <FormControl className="p-5">
          <VStack className="md:items-center mb-5" space="md">
            <Heading className="md:text-center" size="3xl">
              Log in
            </Heading>
            <Text>Login to start using Dipatch Tracking</Text>
          </VStack>
          {error && (
            <Alert className="items-start" action="error">
              <AlertIcon
                as={InfoIcon}
                size="md"
                //   className="stroke-background-500"
              />
              <AlertText size="md">{error}</AlertText>
            </Alert>
          )}
          <VStack space="md" className="py-2">
            {/* <Text className="text-gray-950">Email</Text> */}
            <FormControlLabel>
              <FormControlLabelText>Username</FormControlLabelText>
            </FormControlLabel>
            <Input
              className="min-w-[250px]"
              variant="outline"
              size="xl"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
            >
              <InputField
                type="text"
                placeholder="username"
                value={username}
                onChangeText={(value) => setUsername(value)}
              />
            </Input>
          </VStack>
          <VStack space="md" className="py-2">
            {/* <Text className="text-gray-950">Password</Text> */}
            <FormControlLabel>
              <FormControlLabelText>Password</FormControlLabelText>
            </FormControlLabel>
            <Input
              className="text-center min-w-[250px]"
              variant="outline"
              size="xl"
            >
              <InputField
                type={showPassword ? "text" : "password"}
                value={password}
                onChangeText={(value) => setPassword(value)}
              />
              <InputSlot className="pr-3" onPress={handleState}>
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            </Input>
          </VStack>
          <VStack space="lg" className="pt-4">
            <Button
              size="xl"
              disabled={isLoading}
              className="w-full"
              onPress={handleSubmit}
            >
              {isLoading && <ButtonSpinner color={colors.gray[400]} />}
              <ButtonText className="font-medium">Log in</ButtonText>
            </Button>
          </VStack>
        </FormControl>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: { marginVertical: 35, opacity: 0.9 },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // opacity: 0.7,
    backgroundColor: "#eeeeee",
  },
  help: {
    textAlign: "center",
  },
  innerContainer: {
    flex: 1,
    marginHorizontal: 15,
  },
  input: {
    opacity: 0.7,
  },
  title: {
    // fontSize: 27,
    color: "#ffb74d",
    textAlign: "center",
    marginBottom: 20,
  },
});
