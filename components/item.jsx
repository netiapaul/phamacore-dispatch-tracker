import { FontAwesome6 } from "@react-native-vector-icons/fontawesome6";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

function Item({ item: any }) {
  return (
    <TouchableHighlight
      activeOpacity={0.8}
      underlayColor={"#ffe0b2"}
      delayPressIn={50}
      //   onPress={() => (item.stat === 'transit' ? navToDetails() : {})}
    >
      <View style={styles.item}>
        <View style={styles.itemAvatar}>
          <FontAwesome6
            name={statusIcons[item.stat]}
            style={styles.statusIcon}
            color={statusColors[item.stat]}
            iconStyle="solid"
            size={20}
          />
        </View>
        <View style={styles.itemRight}>
          <View style={styles.itemText}>
            <Text style={styles.title}>{item.docNumber}</Text>
            <Text
              style={[styles.itemTextRight, { color: statusColors[item.stat] }]}
            >
              {item.stage}
            </Text>
          </View>
          <View style={styles.itemText}>
            <Text style={styles.itemTextLeft}>{item.itms} items</Text>
            <Text style={styles.itemTextRight}>
              {`${new Intl.DateTimeFormat("en-GB").format(new Date())}`}
              {/* {`${Moment(item.docDate).format("DD/MM/YY")} ${Moment(
                item.docTime.ticks / 10000
              ).format("hh:mm A")}`} */}
            </Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const statusColors = {
  pending: "#1e88e5",
  transit: "#f4511e",
  complete: "#43a047",
  returned: "#e53935",
};

const statusIcons = {
  //   pending: "widgets",
  //   transit: "local-shipping",
  //   complete: "verified",
  //   returned: "assignment-return",
  pending: "hourglass-half",
  transit: "truck-fast",
  complete: "circle-check",
  returned: "arrow-rotate-left",
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    marginVertical: 1,
    marginHorizontal: 4,
    padding: 4,
    paddingBottom: 0,
    opacity: 0.6,
  },
  itemAvatar: {
    margin: 3,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fffcf5",
    borderRadius: 50,
  },
  itemText: {
    flexDirection: "row",
  },
  itemRight: {
    flex: 1,
  },
  itemTextRight: {
    fontSize: 10,
    flex: 1,
    textAlign: "right",
  },
  itemTextLeft: {
    fontSize: 10,
    fontStyle: "italic",
  },
  statusIcon: {
    margin: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "500",
    paddingLeft: 2,
  },
});

export { Item };
