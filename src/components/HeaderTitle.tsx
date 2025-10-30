import React from "react";
import { View, StyleSheet, Text } from "react-native";
import HeaderFilter from "./HeaderFilter";
import { colors } from "../theme/colors";

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
        alignItems: 'center',
        color: colors.txtBars,
        textAlign: 'center',
    },
    filterContainer: {
        flex: 1,
        marginLeft: 10,
        position: 'relative',
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        paddingRight: 4,
    },
});

export default HeaderTitle;
