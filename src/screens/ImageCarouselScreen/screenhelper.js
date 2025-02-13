import { Screens } from "../../navigation/helper";

const data = [
    {
        title: 'Image Carousel 1',
        screen: Screens.ImageCarousel1Screen,
    },
    {
        title: 'Image Carousel 2',
        screen: Screens.ImageCarousel2Screen,
    },
    {
        title: 'Image Carousel 3',
        screen: Screens.ImageCarousel3Screen,
    },
    {
        title: 'Image Carousel 4',
        screen: Screens.ImageCarousel4Screen,
    },
    {
        title: 'Image Carousel 5',
        screen: Screens.ImageCarousel5Screen,
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