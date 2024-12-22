import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,1)',
    },
    BackImageStyle: {
        height: '100%',
        overflow: 'hidden',
        resizeMode: 'cover',
    },
    ImageBack: {
        justifyContent: 'center',
        overflow: 'hidden',
    },
    FrontContainer: {
        position: 'absolute',
        zIndex: 1,
    },
    FrontContentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});