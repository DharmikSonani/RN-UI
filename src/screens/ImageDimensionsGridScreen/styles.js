import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,1)',
    },
    contentContainer: {
        paddingHorizontal: 15,
        paddingTop: 50,
        paddingBottom: 30 + 60,
        gap: 15,
    },
    gridWrapper: {
        width: '100%',
        flexDirection: 'row',
        gap: 10,
    },
    gridContainer: {
        flex: 1,
        gap: 10,
    },
    floatingButton: {
        backgroundColor: 'rgba(0,0,0,1)',
        width: 60,
        aspectRatio: 1 / 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 10,
        bottom: 20,
        right: 20,
        elevation: 5,
        borderColor: 'rgba(255,255,255,1)',
        borderWidth: 2,
        shadowColor: 'rgba(0,0,0,1)',
        shadowOpacity: 0.3,
        shadowOffset: { height: 3, width: 0 },
        shadowRadius: 5,
    },
});