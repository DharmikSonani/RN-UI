import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,1)',
    },
    ContentContainer: {
        paddingTop: Platform.OS == 'ios' ? 80 : 60,
        paddingBottom: 50,
        gap: 70,
    },
});