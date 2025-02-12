import { ScrollView, Text, View, } from 'react-native'
import React from 'react'
import useScreenHooks from './ShapeImageScreen.Hook'
import { styles } from './styles'
import ShapedImage from './components/ShapedImage'
import CustomeMarkerShape from './components/CustomeMarkerShape'
import Ionicons from 'react-native-vector-icons/Ionicons';

const ShapeImageScreen = (props) => {

    const {

    } = useScreenHooks(props)

    return (
        <ScrollView
            style={styles.Container}
            contentContainerStyle={styles.ContentContainer}
            showsVerticalScrollIndicator={false}
        >
            <ShapedImage
                height={60}
                source={"https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_1536,h_975/https://assets.designhill.com/design-blog/wp-content/uploads/2017/08/colors.jpg"}
                shape={
                    <Text style={{
                        fontSize: 50,
                        fontWeight: 'bold',
                        color: '#000',
                    }}>
                        Shape Image
                    </Text>
                }
            />

            {/* Heart */}
            <View
                style={{ height: 200, width: 200, marginTop: 20, }}
            >
                <View
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <View
                        style={{
                            width: "55%",
                            aspectRatio: 1 / 1,
                            borderRadius: 100,
                            backgroundColor: '#fff',
                            elevation: 10,
                            shadowColor: '#000',
                            shadowOffset: { height: 5 },
                            shadowOpacity: 0.2,
                            shadowRadius: 10,
                        }}
                    />
                    <View
                        style={{
                            width: "55%",
                            aspectRatio: 1 / 1,
                            borderRadius: 100,
                            backgroundColor: '#fff',
                            position: 'absolute',
                            right: 0,
                            elevation: 10,
                            shadowColor: '#000',
                            shadowOffset: { height: 5 },
                            shadowOpacity: 0.2,
                            shadowRadius: 10,
                        }}
                    />
                    <View
                        style={{
                            width: "60%",
                            aspectRatio: 1 / 1,
                            backgroundColor: '#fff',
                            position: 'absolute',
                            transform: [{ rotate: "45deg" }],
                            left: 40,
                            elevation: 10,
                            shadowColor: '#000',
                            shadowOffset: { height: 5 },
                            shadowOpacity: 0.2,
                            shadowRadius: 10,
                            top: 33,
                            borderTopStartRadius: 90,
                        }}
                    />

                </View>
                <ShapedImage
                    shape={
                        <View
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                        >
                            <View
                                style={{
                                    width: "55%",
                                    aspectRatio: 1 / 1,
                                    borderRadius: 100,
                                    backgroundColor: '#fff',
                                }}
                            />
                            <View
                                style={{
                                    width: "55%",
                                    aspectRatio: 1 / 1,
                                    borderRadius: 100,
                                    backgroundColor: '#fff',
                                    position: 'absolute',
                                    right: 0,
                                }}
                            />
                            <View
                                style={{
                                    width: "60%",
                                    aspectRatio: 1 / 1,
                                    backgroundColor: '#fff',
                                    position: 'absolute',
                                    transform: [{ rotate: "45deg" }],
                                    left: 40,
                                    top: 33,
                                    borderTopStartRadius: 90,
                                }}
                            />

                        </View>}
                    source={"https://w0.peakpx.com/wallpaper/731/871/HD-wallpaper-radhakrishnan-vishnu-lord-ramayan-krishna-radha-arjun-mahabharat-god-geeta-ram.jpg"}
                    width={200}
                    height={200}
                    position={'absolute'}
                />
            </View>

            <CustomeMarkerShape
                source={"https://d23.com/app/uploads/2019/08/2019-disneylegend-rdj-1180x600.jpg"}
                size={1}
            />

            <CustomeMarkerShape
                source={"https://i0.wp.com/www.newdelhitimes.com/wp-content/uploads/2022/05/kiara-advani-stills-photos-pictures-382.webp?fit=700%2C700&ssl=1"}
                size={2}
            />

            <CustomeMarkerShape
                source={"https://d23.com/app/uploads/2019/08/2019-disneylegend-rdj-1180x600.jpg"}
                size={3}
            />

            {/* Vector Icon */}
            <ShapedImage
                height={100}
                width={220}
                source={"https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_1536,h_975/https://assets.designhill.com/design-blog/wp-content/uploads/2017/08/colors.jpg"}
                shape={
                    <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Ionicons name="home" size={100} color="#4F8EF7" />
                        <Ionicons name="home-outline" size={100} color="#4F8EF7" />
                    </View>
                }
            />

            <ShapedImage
                height={100}
                width={220}
                source={"https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_1536,h_975/https://assets.designhill.com/design-blog/wp-content/uploads/2017/08/colors.jpg"}
                shape={
                    <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Ionicons name="heart-outline" size={100} color="#4F8EF7" />
                        <Ionicons name="heart" size={100} color="#4F8EF7" />
                    </View>
                }
            />

            <ShapedImage
                height={100}
                width={220}
                source={"https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_1536,h_975/https://assets.designhill.com/design-blog/wp-content/uploads/2017/08/colors.jpg"}
                shape={
                    <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Ionicons name="person" size={100} color="#4F8EF7" />
                        <Ionicons name="person-outline" size={100} color="#4F8EF7" />
                    </View>
                }
            />

        </ScrollView>
    )
}

export default ShapeImageScreen