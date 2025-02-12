import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,1)',
    },
    ContentContainer: {
        paddingTop: Platform.OS == 'ios' ? 70 : 40,
        width: '100%',
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    Header: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'rgba(0,0,0,1)',
        marginBottom: 10,
    },
});