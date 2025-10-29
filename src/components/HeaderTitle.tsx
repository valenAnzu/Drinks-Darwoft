import React from "react";
import { View, StyleSheet, Text } from "react-native";
import HeaderFilter from "./HeaderFilter";

interface Props {
  actualFilter: string;
  onFilterChange: (value: string) => void;
}

const HeaderTitle: React.FC<Props> = ({ actualFilter, onFilterChange }) => {

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Cocktail List</Text>
        <View style={styles.filterContainer}>
            <HeaderFilter
                actualValue={actualFilter}
                onFilterChange={onFilterChange}
            />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
    title: {
        fontSize: 30,
        fontWeight: 600,
    },
    filterContainer: {
        flex: 1,
        marginLeft: 10,
    },
});

export default HeaderTitle;
