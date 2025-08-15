import { ChevronLeftIcon, Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { useAppSelector } from "@/store/hooks";
import { FontAwesome6 } from "@react-native-vector-icons/fontawesome6";
import { usePathname, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const ReceiveNavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  const { user } = useAppSelector((state) => state.auth);

  //   const handleLogout = () => {
  //     console.log("greatness");
  //   };

  return (
    <View
      //   className="py-6 px-4 border-b border-border-300 bg-background-0 items-center"
      className="py-6 px-4 border-b border-border-100 bg-black items-center"
      style={styles.header}
    >
      <View style={styles.topView}>
        {!isHome && (
          <Pressable
            onPress={() => {
              router.back();
            }}
          >
            <Icon as={ChevronLeftIcon} style={styles.icons} color={"#eeeeee"} />
          </Pressable>
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.pageTitle}>DISPATCH TRACKING</Text>
        </View>
        <View style={styles.rightItems}>
          <View style={styles.account}>
            <FontAwesome6
              name="circle-user"
              style={styles.icons}
              color={"#eeeeee"}
              iconStyle="solid"
              size={15}
            />
            <Text style={styles.text} className="text-white">
              {user?.userName}
            </Text>
          </View>
          {/* <Pressable onPress={handleLogout}>
            <FontAwesome6
              name="power-off"
              style={styles.icons}
              color={"#e65100"}
              iconStyle="solid"
            />
          </Pressable> */}
        </View>
      </View>
      <View style={styles.topView}>
        <FontAwesome6
          name="building"
          style={styles.icons}
          color={"#eeeeee"}
          iconStyle="solid"
        />
        <Text className="text-white" style={styles.text}>
          {user?.companyName}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  account: {
    paddingTop: 2,
    flexDirection: "row",
  },
  header: {
    flexDirection: "column",
    height: 60,
    padding: 6,
    paddingHorizontal: 8,
    alignItems: "flex-start",
  },
  icons: {
    paddingHorizontal: 3,
  },
  businessIcons: {
    padding: 2,
    marginLeft: 32,
  },
  nightIcon: {
    marginHorizontal: 20,
  },
  titleContainer: {},
  pageTitle: {
    color: "#eeeeee",
    fontWeight: "bold",
    paddingHorizontal: 2,
  },
  rightItems: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  text: {
    paddingHorizontal: 2,
  },
  topView: {
    flexDirection: "row",
  },
});

export { ReceiveNavBar };
