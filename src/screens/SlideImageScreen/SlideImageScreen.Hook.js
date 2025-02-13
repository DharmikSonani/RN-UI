import { useCallback, useRef, useState } from "react";
import { Dimensions } from "react-native";
import { NatureImageList } from "../../helper/ImageData";

const width = Dimensions.get("window").width;

const useScreenHooks = () => {

    // variables
    const _scrollView = useRef();
    const data = NatureImageList;

    // useStates
    const [imageHeight, setImageHeight] = useState(0);

    // useEffects


    // methods
    const scrollTo = useCallback((value = 0) => {
        _scrollView?.current?.scrollTo({ x: ((data.length - 1) * width) - value, animated: false })
    }, [_scrollView, data.length])

    return {
        _scrollView,
        width,
        data,

        imageHeight, setImageHeight,

        scrollTo,
    };
}

export default useScreenHooks