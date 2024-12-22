import { Screens } from "../../navigation/helper";

const data = [
    // {
    //     title: '',
    //     screen: Screens.MainScreen,
    // },
    {
        title: '3 Slide Image Flatlist',
        screen: Screens.SlideImageScreen,
    },
    {
        title: '3D Image Flip',
        screen: Screens.Image3DFlipScreen,
    },
]

data.sort((a, b) => {
    if (a.title < b.title)
        return -1;
    if (a.title > b.title)
        return 1;
    return 0
});

export default data;