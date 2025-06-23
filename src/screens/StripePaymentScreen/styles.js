import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,1)',
    },
    Button: {
        width: '50%',
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        height: 60,
        flexDirection: 'row',
        gap: 10,
    },
    ButtonText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: '600',
    },
});