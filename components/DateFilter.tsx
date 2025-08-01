import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { CloseIcon, Icon } from "@/components/ui/icon";
import Moment from "moment";

import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import { useAppSelector } from "@/store/hooks";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { AppDatePicker } from "./AppDatePicker";

export function DateFilter() {
  const [showModal, setShowModal] = useState(false);
  const { startDate, endDate } = useAppSelector((state) => state.invoice);

  return (
    <>
      <TouchableHighlight
        onPress={() => setShowModal(true)}
        underlayColor={"#ffe0b2"}
        className="px-5"
      >
        <View style={styles.container}>
          <Text style={styles.date}>
            {/* {`From: ${new Intl.DateTimeFormat("en-GB").format(
              new Date()
            )} To: ${new Intl.DateTimeFormat("en-GB").format(new Date())}`} */}
            {`From: ${Moment(startDate).format("DD/MM/YYYY")}  To: ${Moment(
              endDate
            ).format("DD/MM/YYYY")}`}
          </Text>
          <View style={styles.selectText}>
            <Text>Select Date &gt;&gt;</Text>
          </View>
        </View>
      </TouchableHighlight>
      <Modal
        isOpen={showModal}
        avoidKeyboard={true}
        closeOnOverlayClick={false}
        onClose={() => {
          setShowModal(false);
        }}
        size="md"
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="md" className="text-typography-950">
              Date Filter
            </Heading>
            <ModalCloseButton>
              <Icon
                as={CloseIcon}
                size="md"
                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
              />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <AppDatePicker />
          </ModalBody>
          <ModalFooter>
            <Button
              onPress={() => {
                setShowModal(false);
              }}
            >
              <ButtonText>Apply</ButtonText>
            </Button>
            <Button
              variant="outline"
              action="secondary"
              onPress={() => {
                setShowModal(false);
              }}
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", marginHorizontal: 2 },
  selectText: {
    marginLeft: "auto",
  },
  date: {
    color: "#f57c00",
  },
});
