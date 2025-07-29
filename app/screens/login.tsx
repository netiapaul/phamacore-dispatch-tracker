import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "tailwindcss/colors";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Heading style={styles.title} size="3xl">
          Dispatch Tracking
        </Heading>
        <FormControl className="p-5 border rounded-lg border-outline-300">
          <VStack space="md" className="py-2">
            <Text className="text-typography-500">Email</Text>
            <Input
              className="min-w-[250px]"
              variant="outline"
              size="xl"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
            >
              <InputField type="text" placeholder="username" />
            </Input>
          </VStack>
          <VStack space="md" className="py-2">
            <Text className="text-typography-500">Password</Text>
            <Input
              className="text-center min-w-[250px]"
              variant="outline"
              size="xl"
            >
              <InputField type={showPassword ? "text" : "password"} />
              <InputSlot className="pr-3" onPress={handleState}>
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            </Input>
          </VStack>
          <VStack space="lg" className="pt-4">
            <Button size="xl" disabled>
              <ButtonSpinner color={colors.gray[400]} />
              <ButtonText>Submit</ButtonText>
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
