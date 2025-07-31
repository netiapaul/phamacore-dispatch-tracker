import { handleTokenPersistence } from "@/features/authSlice";
import { getValueFor } from "@/helpers/getToken";
import { useAppDispatch } from "@/store/hooks";
import { useEffect } from "react";

const UseTokenLoader = () => {
  const dispatch = useAppDispatch();
  // const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const restoreToken = async () => {
      let storedToken = await getValueFor("token");
      if (storedToken) {
        dispatch(handleTokenPersistence(storedToken));
      }
    };

    restoreToken();
  }, [dispatch]);

  return null;

  // return (
  //   <Stack>
  //     {isAuthenticated ? (
  //       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  //     ) : (
  //       <Stack.Screen name="screens/login" options={{ headerShown: false }} />
  //     )}
  //     <Stack.Screen name="+not-found" />
  //   </Stack>
  // );
};

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

export { UseTokenLoader };
