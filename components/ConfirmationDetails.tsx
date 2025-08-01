import { useAppSelector } from "@/store/hooks";
import Moment from "moment";
import React, { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const ConfirmationDetails = () => {
  const { isLoading, selectedInvoice } = useAppSelector(
    (state) => state.invoice
  );
  const [deliverstarttime] = useState(new Date());
  const [trackdeliver, setTrackdeliver] = useState({});
  const [paymentDetail, setPaymentDetail] = useState({});
  const [isValidated, setisValidated] = useState(false);
  const [isComplete, setIsComplete] = useState("unchecked");
  //   DARK THEME #424242
  //   LIGHT THEME #fff9c4

  return (
    <ScrollView style={styles.scrollView}>
      {isLoading && <ActivityIndicator />}
      {Boolean(Object.keys(selectedInvoice).length) && (
        <>
          <View style={[styles.section]}>
            <Text style={styles.sectionTitle}>Invoice Details</Text>
            <View style={styles.detailRow}>
              <Text style={[styles.label, styles.contentLeft]}>
                Invoice No:
              </Text>
              <Text style={[styles.label, styles.contentRight]}>
                {selectedInvoice.docnumber}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={[styles.text, styles.contentLeft]}>Items:</Text>
              <Text style={[styles.text, styles.contentRight]}>
                {selectedInvoice.docitems}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={[styles.text, styles.contentLeft]}>Salesman:</Text>
              <Text style={[styles.text, styles.contentRight]}>
                {selectedInvoice.salesmanname}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={[styles.text, styles.contentLeft]}>
                Invoice Date:
              </Text>
              <Text style={styles.text}>{`${Moment(
                selectedInvoice.saledate
              ).format("DD/MM/YY")} ${Moment(
                selectedInvoice.saletime.ticks / 10000
              ).format("hh:mm A")}`}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={[styles.text, styles.contentLeft]}>
                Delivered By:
              </Text>
              <Text style={styles.text}>{selectedInvoice.drivername}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={[styles.text, styles.contentLeft]}>Vehicle:</Text>
              <Text style={styles.text}>{`${selectedInvoice.carname}`}</Text>
            </View>
          </View>
          {/* <View style={[styles.section]}>
            <Text style={styles.sectionTitle}>Delivery Details</Text>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Ref Id:</Text>
              <TextInput
                defaultValue={deliveryInvoice.receivedid}
                onChangeText={(receivedid) =>
                  setTrackdeliver({ ...trackdeliver, receivedid })
                }
                style={[styles.input]}
                value={trackdeliver.receivedid}
              />
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Total Weight:</Text>
              <TextInput
                defaultValue={"" + (deliveryInvoice.deliverweight || "")}
                onChangeText={(deliverweight) =>
                  setTrackdeliver({ ...trackdeliver, deliverweight })
                }
                style={[styles.input, sectionBackground]}
                value={trackdeliver.deliverweight}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Packages:</Text>
              <TextInput
                defaultValue={"" + (deliveryInvoice.deliverpackages || "")}
                onChangeText={(deliverpackages) =>
                  setTrackdeliver({ ...trackdeliver, deliverpackages })
                }
                style={[styles.input, sectionBackground]}
                value={trackdeliver.deliverpackages}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Delivery Status:</Text>
              <View>
                <Picker
                  onValueChange={(dstaT_CODE, itemIndex) =>
                    setTrackdeliver({
                      ...trackdeliver,
                      ...{
                        dstaT_CODE,
                        dstaT_NAME:
                          deliveryStatusList[itemIndex].deliveryStatusName,
                      },
                    })
                  }
                  prompt="Delivery Status"
                  selectedValue={trackdeliver.dstaT_CODE}
                  style={styles.picker}
                >
                  <Picker.Item
                    color={Colors.orangeA700}
                    label="--------------Select--------------"
                    value=""
                  />
                  {deliveryStatusList.map((stat) => (
                    <Picker.Item
                      key={stat.deliveryStatusId}
                      color={Colors.orangeA700}
                      label={stat.deliveryStatusName.toUpperCase()}
                      value={stat.deliveryStatusId}
                    />
                  ))}
                </Picker>
                {isValidated && isNull(trackdeliver.dstaT_CODE) && (
                  <HelperText style={styles.help} type="error">
                    Select an option
                  </HelperText>
                )}
              </View>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Delivery Mode:</Text>
              <View>
                <Picker
                  onValueChange={(deL_CODE, itemIndex) =>
                    setTrackdeliver({
                      ...trackdeliver,
                      ...{
                        deL_CODE,
                        deL_NAME: deliveryModeList[itemIndex].deliveryModeName,
                      },
                    })
                  }
                  prompt="Delivery Mode"
                  selectedValue={trackdeliver.deL_CODE}
                  style={styles.picker}
                >
                  <Picker.Item
                    color={Colors.orangeA700}
                    label="--------------Select--------------"
                    value=""
                  />
                  {deliveryModeList.map((stat) => (
                    <Picker.Item
                      key={stat.deliveryModeId}
                      color={Colors.orangeA700}
                      label={stat.deliveryModeName.toUpperCase()}
                      value={stat.deliveryModeId}
                    />
                  ))}
                </Picker>
                {isValidated && isNull(trackdeliver.deL_CODE) && (
                  <HelperText style={styles.help} type="error">
                    Select an option
                  </HelperText>
                )}
              </View>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsLabel}>Remarks:</Text>
              <TextInput
                defaultValue={deliveryInvoice.remarks}
                mode="outlined"
                multiline={true}
                onChangeText={(remarks) =>
                  setTrackdeliver({ ...trackdeliver, remarks })
                }
                style={[styles.textBox, sectionBackground]}
                value={trackdeliver.remarks}
              />
            </View>
          </View> */}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: { margin: 10, marginBottom: 90 },
  contentLeft: { width: 90 },
  contentRight: {},
  detailRow: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  detailsRow: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginVertical: 2,
  },
  scrollView: {
    opacity: 0.6,
  },
  section: {
    marginVertical: 5,
    paddingBottom: 10,
  },
  sectionTitle: {
    color: "#e64a19",
    marginHorizontal: 5,
  },
  label: {
    fontWeight: "bold",
    fontStyle: "italic",
    marginHorizontal: 2,
  },
  detailsLabel: {
    marginHorizontal: 2,
    width: 115,
  },
  input: {
    height: 23,
    width: 220,
  },
  textBox: {
    marginHorizontal: 2,
    width: 220,
  },
  picker: { height: 23, width: 235 },
  text: {
    marginHorizontal: 2,
    fontStyle: "italic",
  },
});

export { ConfirmationDetails };
