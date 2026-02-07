import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
// import PhonePePaymentSDK from 'react-native-phonepe-pg'

const PhonePePaymentScreen = () => {

    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState('');

    const merchantId = `PRODTEST`;

    useEffect(() => {
        const flowId = `FLOW_TEST`;
        // PhonePePaymentSDK.init('SANDBOX', merchantId, flowId, false).then(console.log).catch(console.log)
    }, [merchantId])

    const getPhonePeOAuthToken = async () => {
        const clientId = 'TEST-M23Z3I3PR7ZSL_25062';
        const clientSecret = 'OGJkZTVjMGYtYWQzNC00Y2YzLWJiYTYtZjU0Mjc2NzY1Njhl';

        const formBody = new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            client_version: '1',
            grant_type: 'client_credentials',
        }).toString();

        try {
            const response = await fetch('https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formBody,
            });

            const result = await response.json();
            return result?.access_token;
        } catch (error) {
            console.log('Error fetching PhonePe token:', error);
        }
    };


    const createPhonePeOrder = async () => {
        const token = await getPhonePeOAuthToken();
        const merchantOrderId = `MERCHANT_${new Date().getTime()}`
        const payload = {
            "merchantOrderId": merchantOrderId,
            "amount": amount ? parseInt(amount) * 100 : 100,
            "paymentFlow": {
                "type": "PG_CHECKOUT",
            }
        }
        try {
            const response = await fetch(`https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/sdk/order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `O-Bearer ${token}`
                },
                body: JSON.stringify(payload),
            });
            return await response.json();
        } catch (err) {
            console.log('PhonePe API Error:', err);
        }
    };


    const handlePayNowPress = async () => {
        try {
            if (amount && parseInt(amount) > 200) {
                Alert.alert('Amount Limit', 'Amount must be between 1 to 199');
                return;
            }
            setLoading(true);
            const requestBody = await createPhonePeOrder();
            requestBody['merchantId'] = merchantId;
            requestBody['paymentMode'] = {
                type: 'PAY_PAGE'
            };
            Alert.alert('PhonePe Disabled', 'PhonePe integration is temporarily disabled due to repository issues.');
            // PhonePePaymentSDK.startTransaction(JSON.stringify(requestBody), 'iOSintentIntegration')
            //     .then((res) => {
            //         if (res?.status == "SUCCESS") {
            //             Alert.alert('Payment', `Payment successfully done.`)
            //         } else {
            //             Alert.alert('Payment', res?.error?.toString() ?? 'Payment Canceled')
            //         }
            //     })
            //     .catch(console.log);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.Container}>
            <TextInput
                value={amount}
                onChangeText={setAmount}
                keyboardType='number-pad'
                maxLength={3}
                style={styles.InputField}
                placeholder='Amount(Rs.)'
            />

            <TouchableOpacity
                style={styles.Button}
                onPress={handlePayNowPress}
                disabled={loading}
            >
                {
                    loading ?
                        <>
                            <Text style={styles.ButtonText}>Processing...</Text>
                            <ActivityIndicator size={'small'} color={'#FFF'} />
                        </>
                        :
                        <Text style={styles.ButtonText}>Pay Now</Text>
                }
            </TouchableOpacity>
        </View>
    )
}

export default PhonePePaymentScreen

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,1)',
        gap: 20,
        padding: 30,
    },
    Button: {
        width: '50%',
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        height: 60,
        flexDirection: 'row',
        gap: 10,
        marginTop: 10,
    },
    ButtonText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: '600',
    },
    InputField: {
        borderWidth: 1,
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 20,
        fontSize: 14,
        color: '#000',
        borderRadius: 20,
    },
})