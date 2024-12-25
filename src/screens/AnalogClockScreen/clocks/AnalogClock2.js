import { Animated, StyleSheet, Text, View } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs';

const tick_interval = 1000;

const timeSpots = [
    {
        text: '0',
        initialDeg: '90deg',
        outputRange: ['-90deg', '270deg']
    },
    {
        text: '5',
        initialDeg: '120deg',
        outputRange: ['-120deg', '240deg']
    },
    {
        text: '10',
        initialDeg: '150deg',
        outputRange: ['-150deg', '210deg']
    },
    {
        text: '15',
        initialDeg: '180deg',
        outputRange: ['-180deg', '180deg']
    },
    {
        text: '20',
        initialDeg: '210deg',
        outputRange: ['-210deg', '150deg']
    },
    {
        text: '25',
        initialDeg: '240deg',
        outputRange: ['-240deg', '120deg']
    },
    {
        text: '30',
        initialDeg: '270deg',
        outputRange: ['-270deg', '90deg']
    },
    {
        text: '35',
        initialDeg: '300deg',
        outputRange: ['-300deg', '60deg']
    },
    {
        text: '40',
        initialDeg: '330deg',
        outputRange: ['-330deg', '30deg']
    },
    {
        text: '45',
        initialDeg: '360deg',
        outputRange: ['-360deg', '0deg']
    },
    {
        text: '50',
        initialDeg: '30deg',
        outputRange: ['-30deg', '330deg']
    },
    {
        text: '55',
        initialDeg: '60deg',
        outputRange: ['-60deg', '300deg']
    },
]

const Circle = memo(({
    rotate = "0deg",
    size = 0,
    children,
}) => {

    const tickSize = size * 0.04;
    const smallTickSize = size * 0.025;

    return (
        <View style={[styles.Spike, { alignItems: 'center', }]}>
            <View style={[styles.Spike, { alignItems: 'center', transform: [{ rotate }] }]}>
                {children}
            </View>
            <View style={[styles.Spike, { transform: [{ rotate }] }]}>
                <View style={styles.InnerSpike}>
                    <View style={[styles.Tick, { height: tickSize ?? 12 }]} />
                </View>
                <View style={[styles.InnerSpike, { transform: [{ rotate: '6deg' }] }]}>
                    <View style={[styles.SmallTick, { height: smallTickSize ?? 6 }]} />
                </View>
                <View style={[styles.InnerSpike, { transform: [{ rotate: '12deg' }] }]}>
                    <View style={[styles.SmallTick, { height: smallTickSize ?? 6 }]} />
                </View>
                <View style={[styles.InnerSpike, { transform: [{ rotate: '18deg' }] }]}>
                    <View style={[styles.SmallTick, { height: smallTickSize ?? 6 }]} />
                </View>
                <View style={[styles.InnerSpike, { transform: [{ rotate: '24deg' }] }]}>
                    <View style={[styles.SmallTick, { height: smallTickSize ?? 6 }]} />
                </View>
            </View>
        </View>
    )
})

const AnalogClock2 = ({
    size
}) => {

    const index = useRef(new Animated.Value(0)).current;
    const tick = useRef(new Animated.Value(0)).current;

    const [width, setWidth] = useState(size ?? 0);
    const [hour, setHour] = useState(dayjs().hour() > 12 ? dayjs().hour() - 12 : dayjs().hour());

    var _timer;

    useEffect(() => {
        const current = dayjs();
        const diff = current.endOf('day').diff(current, 'seconds');
        const oneDay = 24 * 60 * 60;
        _timer = oneDay - diff;
        tick.setValue(_timer);

        StartAnimation();

        const interval = setInterval(() => {
            _timer += 1;
            tick.setValue(_timer);
            setHour(dayjs().hour() > 12 ? dayjs().hour() - 12 : dayjs().hour())
        }, tick_interval);

        return () => { clearInterval(interval); }
    }, [])

    const StartAnimation = () => {
        Animated.timing(index, {
            toValue: tick,
            duration: tick_interval / 2,
            useNativeDriver: true,
        }).start()
    }

    const interpolated = {
        inputRange: [0, 360],
        outputRange: ["360deg", "0deg"]
    }

    const rotateSeconds = Animated.multiply(index, 6);

    const transformSeconds = {
        transform: [
            { rotate: rotateSeconds.interpolate(interpolated) },
        ]
    };

    const rotateMinutes = Animated.divide(
        rotateSeconds,
        new Animated.Value(60),
    );
    const transformMinutes = {
        transform: [
            { rotate: rotateMinutes.interpolate(interpolated) },
        ]
    };

    return (
        <View
            style={[styles.Container, {
                width: size ?? '100%',
            }]}
            onLayout={layout => width == 0 && setWidth(layout.nativeEvent.layout.width)}
        >
            {
                width > 0 &&
                <>
                    <Animated.View
                        style={[styles.SecondsCircle, {
                            width: width,
                        }, transformSeconds]}
                    >
                        {
                            timeSpots.map((time, i) =>
                                <Circle
                                    rotate={time.initialDeg}
                                    size={width}
                                    key={i}
                                >
                                    <Animated.Text style={[styles.DigitText, {
                                        fontSize: width * 0.04,
                                        top: width * 0.05,
                                        transform: [{
                                            rotate: rotateSeconds.interpolate({
                                                inputRange: [0, 360],
                                                outputRange: time.outputRange
                                            })
                                        }]
                                    }]}>
                                        {time.text}
                                    </Animated.Text>
                                </Circle>
                            )
                        }
                    </Animated.View>

                    <Animated.View
                        style={[styles.MinutesCircle, {
                            width: width * 0.67,
                        }, transformMinutes]}
                    >
                        {
                            timeSpots.map((time, i) =>
                                <Circle
                                    rotate={time.initialDeg}
                                    size={width}
                                    key={i}
                                >
                                    <Animated.Text style={[styles.DigitText, {
                                        fontSize: width * 0.04,
                                        top: width * 0.05,
                                        transform: [{
                                            rotate: rotateMinutes.interpolate({
                                                inputRange: [0, 360],
                                                outputRange: time.outputRange
                                            })
                                        }]
                                    }]}>
                                        {time.text}
                                    </Animated.Text>
                                </Circle>
                            )
                        }
                    </Animated.View>

                    <View
                        style={{
                            width: width * 0.35,
                            aspectRatio: 3.5 / 1,
                            borderTopWidth: width * 0.005,
                            borderLeftWidth: width * 0.005,
                            borderBottomWidth: width * 0.005,
                            borderTopLeftRadius: width * 0.05,
                            borderBottomLeftRadius: width * 0.05,
                            borderColor: 'rgba(255,255,255,1)',
                            justifyContent: 'center',
                            position: 'absolute',
                            right: 0,
                        }}
                    />

                    <Text style={[styles.HourText, { fontSize: width * 0.2 }]}>
                        {hour}
                    </Text>
                </>
            }
        </View>
    )
}

export default memo(AnalogClock2);

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        aspectRatio: 1 / 1,
        backgroundColor: 'rgba(0,0,0,1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
    },
    SecondsCircle: {
        aspectRatio: 1 / 1,
        position: 'absolute',
        borderRadius: '50%',
    },
    MinutesCircle: {
        aspectRatio: 1 / 1,
        position: 'absolute',
        borderRadius: '50%'
    },
    Spike: {
        width: '100%',
        height: '100%',
        aspectRatio: 1 / 1,
        position: 'absolute',
        borderRadius: '50%',
    },
    InnerSpike: {
        width: '100%',
        height: '100%',
        aspectRatio: 1 / 1,
        alignItems: 'center',
        position: 'absolute',
    },
    Tick: {
        width: 2,
        borderRadius: 2,
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    SmallTick: {
        width: 1.2,
        borderRadius: 2,
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    DigitText: {
        color: 'rgba(255,255,255,1)',
    },
    HourText: {
        color: 'rgba(255,255,255,1)',
        position: 'absolute',
    },

})