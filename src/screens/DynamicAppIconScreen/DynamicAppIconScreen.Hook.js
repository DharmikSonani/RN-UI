import { useDefaultIcon, useIconA, useIconB, useIconC } from './hooks/useAppIcons';

const useScreenHooks = () => {

    // variables
    const data = [
        {
            display: require('./assets/i1.png'),
            icon: useDefaultIcon,
        },
        {
            display: require('./assets/i2.png'),
            icon: useIconA,
        },
        {
            display: require('./assets/i3.png'),
            icon: useIconB,
        },
        {
            display: require('./assets/i4.png'),
            icon: useIconC,
        },
    ]


    // useStates


    // useEffects


    // methods


    return {
        data,
    };
}

export default useScreenHooks