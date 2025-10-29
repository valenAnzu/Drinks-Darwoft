import React, { useState } from "react";
import { View, StyleSheet, Pressable} from "react-native";
import Ionicons from "../utils/Ionicons";
import ModalView from "./ModalView";

interface Props {
  actualValue: string;
  onFilterChange: (value: string) => void;
}

const HeaderFilter: React.FC<Props> = ({ actualValue, onFilterChange }) => {
  const [ modalVisible, setModalVisible ] = useState(false);

  const handleVisibleIcon = () => {
    if (actualValue.length > 0) {
      onFilterChange("");
    } else {
      setModalVisible(true);
    }
  }

  const showIcon = actualValue.length > 0 ? "close-outline" : "search-outline";

  return (
    <>
      <View style={styles.iconContainer}>
        <Pressable onPress={handleVisibleIcon}>
          <Ionicons name={showIcon} size={28} color="black" />
        </Pressable>
      </View>

      {/* Modal de búsqueda */}
      <ModalView
        modalVisible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setModalVisible(false)}
        actualValue={actualValue}
        onFilterChange={onFilterChange}
      />
    </>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
});

export default HeaderFilter;
