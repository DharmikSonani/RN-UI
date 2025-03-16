import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,1)',
        gap: 30,
        paddingHorizontal: 30,
    },
    RowContainer: {
        width: '100%',
        flexDirection: 'row',
        gap: 15,
    },
    Button: {
        backgroundColor: 'rgba(0,0,0,1)',
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ButtonText: {
        color: 'rgba(255,255,255,1)',
        fontWeight: 'bold',
    },
    InputStyle: {
        flex: 1,
        color: 'rgba(0,0,0,1)',
        paddingVertical: 15,
        fontSize: 14,
        borderBottomWidth: 2,
    },
    ItemStyle: {
        width: '100%',
        backgroundColor: 'rgba(250,250,250,1)',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
    },
    DownloadText: {
        color: 'rgba(0,0,0,1)',
        fontSize: 14,
        fontWeight: 'bold',
    },
});