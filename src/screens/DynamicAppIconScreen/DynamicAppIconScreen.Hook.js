import { changeIcon, getIcon } from 'react-native-change-icon';
import { getActiveIcon, setIcon, } from 'react-native-app-icon-changer';
import { Platform } from 'react-native';

const useScreenHooks = (props) => {

    // variables
    const navigation = props.navigation;
    const data = [
        {
            display: require('./assets/i1.png'),
            iconName: 'Default',
        },
        {
            display: require('./assets/i2.png'),
            iconName: 'IconA',
        },
        {
            display: require('./assets/i3.png'),
            iconName: 'IconB',
        },
        {
            display: require('./assets/i4.png'),
            iconName: 'IconC',
        },
    ]


    // useStates


    // useEffects


    // methods
    const handleIconSelection = async (icon) => {
        if (Platform.OS === 'android') try {
            const preIcon = await getIcon();
            if (preIcon !== icon?.iconName) changeIcon(icon?.iconName);
        } catch (error) {
            console.log(error);
        }
        if (Platform.OS === 'ios') try {
            const preIcon = await getActiveIcon();
            if (preIcon !== icon?.iconName) setIcon(icon?.iconName);
        } catch (error) {
            console.log(error);
        }
    }

    return {
        navigation,

        data,
        handleIconSelection,
    };
}

export default useScreenHooks