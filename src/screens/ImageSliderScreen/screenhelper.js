import { Screens } from "../../navigation/helper";

const data = [
    {
        title: 'Image Slider 1',
        screen: Screens.ImageSlider1Screen,
    },
    {
        title: 'Image Slider 2',
        screen: Screens.ImageSlider2Screen,
    },
    {
        title: 'Image Slider 3 (Window Effect)',
        screen: Screens.ImageSlider3Screen,
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