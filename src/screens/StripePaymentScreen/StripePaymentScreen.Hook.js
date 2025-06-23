import { useNavigation } from "@react-navigation/native";
import { handleURLCallback, useStripe } from "@stripe/stripe-react-native";
import { useCallback, useEffect, useState } from "react";
import { Alert, Linking } from "react-native";

const API_URL = `https://rnui-server.vercel.app/stripe`

const useScreenHooks = () => {

    // variables
    const navigation = useNavigation();
    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    // useStates
    const [loading, setLoading] = useState(false);

    // useEffects

    //  ---------- For iOS only start ----------
    useEffect(() => {
        const getUrlAsync = async () => {
            const initialUrl = await Linking.getInitialURL();
            handleDeepLink(initialUrl);
        };

        getUrlAsync();

        const deepLinkListener = Linking.addEventListener('url', (event) => {
            handleDeepLink(event.url);
        });

        return () => deepLinkListener.remove();
    }, [handleDeepLink]);

    const handleDeepLink = useCallback(async (url) => {
        if (url) {
            const stripeHandled = await handleURLCallback(url);
            if (stripeHandled) {
                // This was a Stripe URL - you can return or add extra handling here as you see fit
            } else {
                // This was NOT a Stripe URL – handle as you normally would
            }
        }
    }, [handleURLCallback]);

    //  ---------- For iOS only end ----------

    // methods
    const fetchCustomerId = async (email) => {
        const response = await fetch(`${API_URL}/createCustomer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        const { customerId } = await response.json();

        return { customerId, };
    };

    const fetchPaymentSheetParams = async (customerId) => {
        const response = await fetch(`${API_URL}/payment-sheet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ customerId }),
        });
        const { paymentIntent, ephemeralKey, customer } = await response.json();

        return {
            paymentIntent,
            ephemeralKey,
            customer,
        };
    };

    const initializePaymentSheet = async () => {
        try {
            const { customerId } = await fetchCustomerId('mds@gmail.com');

            const {
                paymentIntent,
                ephemeralKey,
                customer,
            } = await fetchPaymentSheetParams(customerId);

            const { error } = await initPaymentSheet({
                merchantDisplayName: "MDS",
                customerId: customer,
                customerEphemeralKeySecret: ephemeralKey,
                paymentIntentClientSecret: paymentIntent,
                allowsDelayedPaymentMethods: false,
                paymentMethodOrder: ['card'],
                defaultBillingDetails: {
                    name: 'MDS',
                },
                // googlePay: {
                //     merchantCountryCode: 'US',
                //     currencyCode: 'USD',
                //     testEnv: true,
                // },
                applePay: false,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleButtonPress = useCallback(async () => {
        setLoading(true);
        await initializePaymentSheet();
        const { error } = await presentPaymentSheet();
        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            Alert.alert('Success', 'Your order is confirmed!');
        }
        setLoading(false);
    }, [])

    return {
        navigation,
        loading,
        handleButtonPress
    };
}

export default useScreenHooks