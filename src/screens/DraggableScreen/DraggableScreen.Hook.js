import { useState } from "react";

const useScreenHooks = (props) => {

    // variables
    const navigation = props.navigation;

    // useStates
    const [bounceHorizontal, setBounceHorizontal] = useState(true);
    const [bounceVertical, setBounceVertical] = useState(true);

    // useEffects


    // methods


    return {
        navigation,

        bounceHorizontal, setBounceHorizontal,
        bounceVertical, setBounceVertical
    };
}

export default useScreenHooks