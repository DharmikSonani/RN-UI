import { changeIcon, getIcon } from 'react-native-change-icon';

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
        try {
            const preIcon = await getIcon();
            if (preIcon !== icon?.iconName) changeIcon(icon?.iconName);
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