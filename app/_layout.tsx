import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { useColorScheme } from "@/hooks/useColorScheme";
import { UseTokenLoader } from "@/hooks/useTokenLoader";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Provider } from "react-redux";
import { store } from "../store/store";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <GluestackUIProvider mode="light">
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Provider store={store}>
          <UseTokenLoader />
          {/* <UseTokenLoader>
            <Stack>
              {isAuthenticated ? (
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              ) : (
                <Stack.Screen
                  name="screens/login"
                  options={{ headerShown: false }}
                />
              )}

              <Stack.Screen name="+not-found" />
            </Stack>
          </UseTokenLoader> */}
        </Provider>

        <StatusBar style="auto" />
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
