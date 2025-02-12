import { Screens } from "../../navigation/helper";

const data = [
    {
        title: 'Image Carousel 1',
        screen: Screens.ImageCarousel1Screen,
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