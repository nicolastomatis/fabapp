import { Animated } from 'react-native';

export const animateModal = (scaleValue, opacityValue, show) => {
  Animated.timing(scaleValue, {
    toValue: show ? 1 : 0,
    duration: 200,
    useNativeDriver: true,
  }).start();
  Animated.timing(opacityValue, {
    toValue: show ? 1 : 0,
    duration: 200,
    useNativeDriver: true,
  }).start();
};
