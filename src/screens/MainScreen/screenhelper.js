import { Screens } from "../../navigation/helper";

const data = [
    {
        title: '3 Slide Image Flatlist',
        screen: Screens.SlideImageScreen,
    },
    {
        title: '3D Image Flip',
        screen: Screens.Image3DFlipScreen,
    },
    {
        title: '3D Card',
        screen: Screens.Card3DScreen,
    },
    {
        title: 'Analog Clock',
        screen: Screens.AnalogClockScreen,
    },
    {
        title: 'Add To Cart',
        screen: Screens.AddToCartScreen,
    },
    {
        title: 'Image Slider',
        screen: Screens.ImageSliderScreen,
    },
    {
        title: 'Draggable Demo',
        screen: Screens.DraggableScreen,
    },
    {
        title: 'Shape Image',
        screen: Screens.ShapeImageScreen,
    },
    {
        title: 'Toggle Button',
        screen: Screens.ToggleButtonScreen,
    },
    {
        title: 'Story Screen',
        screen: Screens.StoryScreen,
    },
    {
        title: 'Image Carousel',
        screen: Screens.ImageCarouselScreen,
    },
    {
        title: 'Bottom Tabs',
        screen: Screens.BottomTabScreen,
    },
    {
        title: 'Biometrics',
        screen: Screens.BiometricsScreen,
    },
    {
        title: 'Tinder Swipe',
        screen: Screens.TinderSwipeScreen,
    },
    {
        title: 'Save Files In Device',
        screen: Screens.SaveFileScreen,
    },
    {
        title: 'Dynamic App Icon',
        screen: Screens.DynamicAppIconScreen,
    },
    {
        title: 'Payment Gateways',
        screen: Screens.PaymentGatewayScreen,
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