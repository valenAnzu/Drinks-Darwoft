import { Platform } from "react-native";

let IoniconsComponent: any;

if (Platform.OS === "ios") {
  // Scoped package

  IoniconsComponent = require("@react-native-vector-icons/ionicons").default;
} else {
  // Android: keep using monolithic package to leverage fonts.gradle font copying

  IoniconsComponent = require("react-native-vector-icons/Ionicons").default;
}

export default IoniconsComponent;
