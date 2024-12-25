import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,1)',
    },
    ContentContainer: {
        padding: 50,
        paddingTop: Platform.OS == 'ios' ? 80 : 60,
        gap: 20,
    }
});