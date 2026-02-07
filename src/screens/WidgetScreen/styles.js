import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,1)',
    },
    HeaderContainer: {
        width: '100%',
        borderBottomWidth: 1,
        borderColor: `rgba(200,200,200,1)`,
        paddingTop: Platform.OS == 'ios' ? 70 : 40,
        paddingBottom: 10,
    },
    Header: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'rgba(0,0,0,1)',
    },
});