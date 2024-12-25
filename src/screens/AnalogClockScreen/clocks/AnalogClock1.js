import { Animated, StyleSheet, View } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs';

const tick_interval = 1000;

const AnalogClock1 = ({
    size,
}) => {

    const index = useRef(new Animated.Value(0)).current;
    const tick = useRef(new Animated.Value(0)).current;
    const scale = [...Array(6).keys()].map(() => { return useRef(new Animated.Value(0)).current });

    const [width, setWidth] = useState(size ?? 0);

    var _timer = 0;

    useEffect(() => {
        const current = dayjs();
        const diff = current.endOf('day').diff(current, 'seconds');
        const oneDay = 24 * 60 * 60;
        _timer = oneDay - diff;
        tick.setValue(_timer);
        StartAnimation();
        const _id = setInterval(() => {
            _timer += 1;
            tick.setValue(_timer);
        }, tick_interval);

        return () => { clearInterval(_id); }
    }, [])

    const interpolated = {
        inputRange: [0, 360],
        outputRange: ["0deg", "360deg"]
    }

    const bigCircleScale = { transform: [{ scale: scale[0] }] }
    const midCircleScale = { transform: [{ scale: scale[1] }] }
    const smallCircleScale = { transform: [{ scale: scale[2] }] }

    const rotateSeconds = Animated.multiply(
        index,
        6
    );
    const transformSeconds = {
        transform: [
            { rotate: rotateSeconds.interpolate(interpolated) },
            { scale: scale[3] }
        ]
    };

    const rotateMinutes = Animated.divide(
        rotateSeconds,
        new Animated.Value(60),
    );
    const transformMinutes = {
        transform: [
            { rotate: rotateMinutes.interpolate(interpolated) },
            { scale: scale[4] }
        ]
    };

    const rotateHours = Animated.divide(
        rotateMinutes,
        new Animated.Value(12),
    );
    const transformHours = {
        transform: [
            { rotate: rotateHours.interpolate(interpolated) },
            { scale: scale[5] }
        ]
    };

    const StartAnimation = () => {
        const scaleStaggerAnimation = scale.map(animated => {
            return Animated.spring(animated, {
                toValue: 1,
                tension: 18,
                useNativeDriver: true,
                friction: 3,
            })
        })

        Animated.parallel([
            Animated.stagger(tick_interval / scale.length, scaleStaggerAnimation).start(),
            Animated.timing(index, {
                toValue: tick,
                duration: tick_interval / 2,
                useNativeDriver: true,
            }).start()
        ])
    }

    return (
        <View
            style={[styles.Container, {
                width: size ?? '100%'
            }]}
            onLayout={layout => width == 0 && setWidth(layout.nativeEvent.layout.width)}
        >
            <Animated.View
                style={[styles.BigCircle, {
                    borderRadius: width * 0.4,
                    width: width * 0.8
                }, bigCircleScale]}
            />

            <Animated.View
                style={[styles.MidCircle, {
                    width: width * 0.5,
                    borderRadius: width * 0.25,
                }, midCircleScale]}
            />

            <Animated.View style={[styles.Mover, transformHours]}>
                <View style={[styles.Hours]} />
            </Animated.View>

            <Animated.View style={[styles.Mover, transformMinutes]}>
                <View style={[styles.Minutes]} />
            </Animated.View>

            <Animated.View style={[styles.Mover, transformSeconds]}>
                <View style={[styles.Seconds]} />
            </Animated.View>

            <Animated.View style={[styles.SmallCircle, smallCircleScale]} />
        </View>
    )
}

export default memo(AnalogClock1)

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 1 / 1,
    },
    Mover: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    Hours: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        height: '35%',
        marginTop: '15%',
        width: 4,
        borderRadius: 4,
    },
    Minutes: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        height: '45%',
        marginTop: '5%',
        width: 3,
        borderRadius: 3,
    },
    Seconds: {
        width: 2,
        borderRadius: 2,
        backgroundColor: 'rgba(227,71,134,1)',
        height: '50%',
    },
    BigCircle: {
        aspectRatio: 1 / 1,
        backgroundColor: 'rgba(200,200,200,0.2)',
        position: 'absolute',
    },
    MidCircle: {
        aspectRatio: 1 / 1,
        backgroundColor: 'rgba(200,200,200,0.4)',
        position: 'absolute',
    },
    SmallCircle: {
        aspectRatio: 1 / 1,
        backgroundColor: 'rgba(227,71,134,1)',
        position: 'absolute',
        width: 10,
        borderRadius: 5,
    },
})