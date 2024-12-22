import { useIsFocused } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import { NatureImageList } from "../../helper/ImageData";

const width = Dimensions.get("window").width;

const useScreenHooks = (props) => {

    // variables
    const _scrollView = useRef();
    const isFocused = useIsFocused();

    // useStates
    const [imageHeight, setImageHeight] = useState(0);

    // useEffects
    useEffect(() => {
        setTimeout(() => {
            _scrollView.current.scrollTo({ x: NatureImageList.length * width, animated: false })
        }, 1);
    }, [])

    // methods


    return {
        _scrollView,
        isFocused,
        width,
        NatureImageList,

        imageHeight, setImageHeight,
    };
}

export default useScreenHooks