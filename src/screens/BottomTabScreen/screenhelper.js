import { Screens } from "../../navigation/helper";

const data = [
    {
        title: 'Style 1 (Animated)',
        screen: Screens.BottomTabStyle1Screen,
    },
    {
        title: 'Style 2 (Animated)',
        screen: Screens.BottomTabStyle2Screen,
    },
    {
        title: 'Style 3 (Animated)',
        screen: Screens.BottomTabStyle3Screen,
    },
    {
        title: 'Style 4 (Animated)',
        screen: Screens.BottomTabStyle4Screen,
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