import { Screens } from "../../navigation/helper";

const data = [
    {
        title: 'Stripe',
        screen: Screens.StripePaymentScreen,
    },
    {
        title: 'Phone Pe',
        screen: Screens.PhonePePaymentScreen,
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