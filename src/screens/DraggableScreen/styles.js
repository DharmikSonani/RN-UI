import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,1)',
    },
    DragContainer: {
        width: 300,
        height: 400,
        backgroundColor: 'rgba(0,0,0,1)',
        borderRadius: 30,
    },
    ObjectImage: {
        height: 70,
        aspectRatio: 1 / 1,
        borderRadius: 35,
        resizeMode: 'contain',
        margin: 5,
    },
    BounceButton: {
        width: 300,
        alignItems: 'center',
        padding: 10,
        marginTop: 20,
        borderRadius: 30,
    },
    BounceButtonText: {
        color: 'rgba(255,255,255,1)',
        fontSize: 14,
        fontWeight: '700',
    },
});