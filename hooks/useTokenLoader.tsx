import { handleTokenPersistence } from "@/features/authSlice";
import { getValueFor } from "@/helpers/getToken";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Stack } from "expo-router";
import React, { useEffect } from "react";

const UseTokenLoader = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const restoreToken = async () => {
      let storedToken = await getValueFor("token");
      if (storedToken) {
        dispatch(handleTokenPersistence(storedToken));
      }
    };

    restoreToken();
  }, [dispatch]);

  return (
    <Stack>
      {isAuthenticated ? (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="screens/login" options={{ headerShown: false }} />
      )}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};

export { UseTokenLoader };
