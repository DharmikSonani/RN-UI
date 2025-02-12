import { useState } from "react";

const useScreenHooks = (props) => {

    // variables
    const navigation = props.navigation;

    // useStates
    const [selectedStory, setSelectedStory] = useState({});


    // useEffects


    // methods
    const onProfilePress = (story) => {
        setSelectedStory(story);
    }

    return {
        navigation,

        selectedStory, setSelectedStory,
    };
}

export default useScreenHooks