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
import { Stack } from "expo-router";
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
          <Stack>
            <Stack.Screen
              name="screens/login"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            <Stack.Screen name="+not-found" />
          </Stack>
        </Provider>

        <StatusBar style="auto" />
      </ThemeProvider>
    </GluestackUIProvider>
  );
}

// function TokenInitializer() {
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     const restoreToken = async () => {
//       const storedToken = await getValueFor("token");
//       if (storedToken) {
//         dispatch(handleTokenPersistence(storedToken));
//       }
//     };
//     restoreToken();
//   }, [dispatch]);

//   return null; // Nothing rendered, just runs effect
// }

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const { isAuthenticated } = useAppSelector((state) => state.auth);

//   return (
//     <GluestackUIProvider mode="light">
//       <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
//         <Provider store={store}>
//           <TokenInitializer />

//           <Stack>
//             {isAuthenticated ? (
//               <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//             ) : (
//               <Stack.Screen
//                 name="screens/login"
//                 options={{ headerShown: false }}
//               />
//             )}
//             <Stack.Screen name="+not-found" />
//           </Stack>
//         </Provider>

//         <StatusBar style="auto" />
//       </ThemeProvider>
//     </GluestackUIProvider>
//   );
// }
