// import { ActivityIndicator, Alert, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React, { useCallback, useEffect, useState } from 'react'
// // import { handleURLCallback, StripeProvider, useStripe } from '@stripe/stripe-react-native'

// const API_URL = `https://rnui-server.vercel.app/stripe`

// const STRIPE_PUBLISHABLE_KEY = 'pk_test_51RdFPWFJNTrN01rKRf9iBf2eRhRQ1BMYFqUk9L2kl4ZupaVXg2DqLvyqwmzfwyLmbIz6aFRcV8rAz9XhUQV1BmU000PV3uCOvG';

// const StripePaymentScreen = () => {

//     // const { initPaymentSheet, presentPaymentSheet } = useStripe();

//     // const [loading, setLoading] = useState(false);

//     // useEffect(() => {
//     //     const getUrlAsync = async () => {
//     //         const initialUrl = await Linking.getInitialURL();
//     //         handleDeepLink(initialUrl);
//     //     };

//     //     getUrlAsync();

//     //     const deepLinkListener = Linking.addEventListener('url', (event) => {
//     //         handleDeepLink(event.url);
//     //     });

//     //     return () => deepLinkListener.remove();
//     // }, [handleDeepLink]);

//     // const handleDeepLink = useCallback(async (url) => {
//     //     if (url) {
//     //         const stripeHandled = await handleURLCallback(url);
//     //         if (stripeHandled) {
//     //             // This was a Stripe URL - you can return or add extra handling here as you see fit
//     //         } else {
//     //             // This was NOT a Stripe URL – handle as you normally would
//     //         }
//     //     }
//     // }, [handleURLCallback]);

//     // //  ---------- For iOS only end ----------

//     // // methods
//     // const fetchCustomerId = async (email) => {
//     //     const response = await fetch(`${API_URL}/createCustomer`, {
//     //         method: 'POST',
//     //         headers: {
//     //             'Content-Type': 'application/json',
//     //         },
//     //         body: JSON.stringify({ email }),
//     //     });
//     //     const { customerId } = await response.json();

//     //     return { customerId, };
//     // };

//     // const fetchPaymentSheetParams = async (customerId) => {
//     //     const response = await fetch(`${API_URL}/payment-sheet`, {
//     //         method: 'POST',
//     //         headers: {
//     //             'Content-Type': 'application/json',
//     //         },
//     //         body: JSON.stringify({ customerId }),
//     //     });
//     //     const { paymentIntent, ephemeralKey, customer } = await response.json();

//     //     return {
//     //         paymentIntent,
//     //         ephemeralKey,
//     //         customer,
//     //     };
//     // };

//     // const initializePaymentSheet = async () => {
//     //     try {
//     //         const { customerId } = await fetchCustomerId('mds@gmail.com');

//     //         const {
//     //             paymentIntent,
//     //             ephemeralKey,
//     //             customer,
//     //         } = await fetchPaymentSheetParams(customerId);

//     //         const { error } = await initPaymentSheet({
//     //             merchantDisplayName: "MDS",
//     //             customerId: customer,
//     //             customerEphemeralKeySecret: ephemeralKey,
//     //             paymentIntentClientSecret: paymentIntent,
//     //             allowsDelayedPaymentMethods: false,
//     //             paymentMethodOrder: ['card'],
//     //             defaultBillingDetails: {
//     //                 name: 'MDS',
//     //             },
//     //             applePay: false,
//     //         });
//     //     } catch (error) {
//     //         console.log(error);
//     //     }
//     // };

//     // const handleButtonPress = useCallback(async () => {
//     //     setLoading(true);
//     //     await initializePaymentSheet();
//     //     const { error } = await presentPaymentSheet();
//     //     if (error) {
//     //         Alert.alert(`Error code: ${error.code}`, error.message);
//     //     } else {
//     //         Alert.alert('Success', 'Your order is confirmed!');
//     //     }
//     //     setLoading(false);
//     // }, [])

//     // return (
//     //     <StripeProvider
//     //         publishableKey={STRIPE_PUBLISHABLE_KEY}
//     //     >
//     //         <View style={styles.Container}>
//     //             <TouchableOpacity style={styles.Button} onPress={handleButtonPress} disabled={loading}>
//     //                 {
//     //                     loading ?
//     //                         <>
//     //                             <Text style={styles.ButtonText}>Processing...</Text>
//     //                             <ActivityIndicator size={'small'} color={'#FFF'} />
//     //                         </>
//     //                         :
//     //                         <Text style={styles.ButtonText}>Pay Now</Text>
//     //                 }
//     //             </TouchableOpacity>
//     //         </View>
//     //     </StripeProvider>
//     // )
//     return null
// }

// export default StripePaymentScreen

// export const styles = StyleSheet.create({
//     Container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(255,255,255,1)',
//     },
//     Button: {
//         width: '50%',
//         backgroundColor: '#000',
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderRadius: 20,
//         height: 60,
//         flexDirection: 'row',
//         gap: 10,
//     },
//     ButtonText: {
//         color: '#FFF',
//         fontSize: 15,
//         fontWeight: '600',
//     },
// });

import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const StripePaymentScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Stripe Payment is temporarily disabled.</Text>
        </View>
    );
};

export default StripePaymentScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        color: 'gray',
    },
});