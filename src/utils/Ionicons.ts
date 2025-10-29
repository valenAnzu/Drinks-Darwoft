import { Platform } from "react-native";

let Ionicons: any;

if (Platform.OS === "ios") {
  // Scoped package

  Ionicons = require("@react-native-vector-icons/ionicons").default;
} else {
  // Android: keep using monolithic package to leverage fonts.gradle font copying

  Ionicons = require("react-native-vector-icons/Ionicons").default;
}

export default Ionicons;
