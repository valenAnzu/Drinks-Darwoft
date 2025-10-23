import { Platform } from "react-native";
import { Dimensions, PixelRatio } from "react-native";

//Calculate Ratio font FontSize
const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width;
const scale = SCREEN_WIDTH / 375;

const normalize = (size: number) => {
  const newSize = size * scale;
  if (Platform.OS == "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

export default normalize;
