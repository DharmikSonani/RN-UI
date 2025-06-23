import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { styles } from './styles'
import useScreenHooks from './StripePaymentScreen.Hook'
import { StripeProvider } from '@stripe/stripe-react-native'

const STRIPE_PUBLISHABLE_KEY = 'pk_test_51RdFPWFJNTrN01rKRf9iBf2eRhRQ1BMYFqUk9L2kl4ZupaVXg2DqLvyqwmzfwyLmbIz6aFRcV8rAz9XhUQV1BmU000PV3uCOvG';

const StripePaymentScreen = () => {

    const {
        loading,
        handleButtonPress,
    } = useScreenHooks()

    return (
        <StripeProvider
            publishableKey={STRIPE_PUBLISHABLE_KEY}
        >
            <View style={styles.Container}>
                <TouchableOpacity style={styles.Button} onPress={handleButtonPress} disabled={loading}>
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
        </StripeProvider>
    )
}

export default StripePaymentScreen