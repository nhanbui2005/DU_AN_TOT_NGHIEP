import { useCallback } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import { 
  AnimationType,
  AnimationDirection,
  AnimationConfig,
  DEFAULT_CONFIG
} from '../../utils/animations';

interface UseAnimationOptions {
  type?: AnimationType;
  initialValue?: number;
  direction?: AnimationDirection;
  config?: AnimationConfig;
}

export function useAnimation({
  type = 'fade',
  initialValue = 0,
  direction = 'up',
  config = {},
}: UseAnimationOptions = {}) {
  const value = useSharedValue(initialValue);

  const animate = useCallback((toValue: number) => {
    switch (type) {
      case 'fade':
      case 'slide':
      case 'scale':
        value.value = withTiming(toValue, {
          duration: config.duration || DEFAULT_CONFIG.duration,
          easing: config.easing || DEFAULT_CONFIG.easing,
        });
        break;
      case 'bounce':
        value.value = withSequence(
          withSpring(1.2, {
            damping: 8,
            stiffness: 40,
          }),
          withSpring(1, {
            damping: 8,
            stiffness: 40,
          })
        );
        break;
      case 'spring':
        value.value = withSpring(toValue, {
          damping: 7,
          stiffness: 40,
        });
        break;
      default:
        value.value = withTiming(toValue, {
          duration: config.duration || DEFAULT_CONFIG.duration,
          easing: config.easing || DEFAULT_CONFIG.easing,
        });
    }
  }, [type, direction, config, value]);

  const animatedStyle = useAnimatedStyle(() => {
    switch (type) {
      case 'fade':
        return { opacity: value.value };
      case 'slide':
        const transforms = [];
        if (direction === 'left' || direction === 'right') {
          transforms.push({ translateX: value.value });
        } else {
          transforms.push({ translateY: value.value });
        }
        return { transform: transforms };
      case 'scale':
      case 'bounce':
      case 'spring':
        return { transform: [{ scale: value.value }] };
      default:
        return { opacity: value.value };
    }
  });

  // Predefined animations
  const fadeIn = useCallback(() => {
    animate(1);
  }, [animate]);

  const fadeOut = useCallback(() => {
    animate(0);
  }, [animate]);

  const slideIn = useCallback(() => {
    const toValue = direction === 'up' || direction === 'left' ? -100 : 100;
    animate(toValue);
  }, [animate, direction]);

  const slideOut = useCallback(() => {
    animate(0);
  }, [animate]);

  const scaleIn = useCallback(() => {
    animate(1);
  }, [animate]);

  const scaleOut = useCallback(() => {
    animate(0);
  }, [animate]);

  const bounce = useCallback(() => {
    animate(1);
  }, [animate]);

  const spring = useCallback((toValue: number) => {
    animate(toValue);
  }, [animate]);

  return {
    animatedStyle,
    animate,
    // Predefined animations
    fadeIn,
    fadeOut,
    slideIn,
    slideOut,
    scaleIn,
    scaleOut,
    bounce,
    spring,
  };
} 