import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,1)',
        gap: 30,
    },
    Button: {
        backgroundColor: 'rgba(0,0,0,1)',
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 30,
    },
    ButtonText: {
        color: 'rgba(255,255,255,1)',
        fontWeight: 'bold',
    },
    InputStyle: {
        width: '90%',
        color: 'rgba(255,255,255,1)',
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(0,0,0,1)',
        fontSize: 14,
    },
});