import { ConfirmationDetails } from "@/components/ConfirmationDetails";
import { ReceiveNavBar } from "@/components/ReceiveNavBar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReceiveScreen() {
  return (
    <SafeAreaView>
      <ReceiveNavBar />
      <ConfirmationDetails />
    </SafeAreaView>
  );
}
