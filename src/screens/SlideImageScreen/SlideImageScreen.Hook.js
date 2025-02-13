import { useCallback, useRef, useState } from "react";
import { Dimensions } from "react-native";
import { NatureImageList } from "../../helper/ImageData";

const width = Dimensions.get("window").width;

const useScreenHooks = () => {

    // variables
    const _scrollView = useRef();

    // useStates
    const [imageHeight, setImageHeight] = useState(0);

    // useEffects


    // methods
    const scrollTo = useCallback((value = 0) => {
        _scrollView?.current?.scrollTo({ x: ((NatureImageList.length - 1) * width) - value, animated: false })
    }, [_scrollView.current])

    return {
        _scrollView,
        width,
        NatureImageList,

        imageHeight, setImageHeight,

        scrollTo,
    };
}

export default useScreenHooks