import { useRef, useCallback } from 'react';
import { Animated, LayoutAnimation } from 'react-native';
import { 
  fadeAnimation, 
  slideAnimation, 
  scaleAnimation, 
  bounceAnimation, 
  springAnimation,
  layoutAnimation,
  AnimationType,
  AnimationDirection,
  AnimationConfig
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
  const animatedValue = useRef(new Animated.Value(initialValue)).current;

  const animate = useCallback((toValue: number) => {
    let animation;

    switch (type) {
      case 'fade':
        animation = fadeAnimation(animatedValue, toValue, config);
        break;
      case 'slide':
        animation = slideAnimation(animatedValue, toValue, direction, config);
        break;
      case 'scale':
        animation = scaleAnimation(animatedValue, toValue, config);
        break;
      case 'bounce':
        animation = bounceAnimation(animatedValue, toValue, config);
        break;
      case 'spring':
        animation = springAnimation(animatedValue, toValue, config);
        break;
      default:
        animation = fadeAnimation(animatedValue, toValue, config);
    }

    animation.start();
  }, [type, direction, config, animatedValue]);

  const animateLayout = useCallback((
    type: 'spring' | 'linear' | 'easeInEaseOut' = 'spring',
    duration: number = 300
  ) => {
    layoutAnimation(type, duration);
  }, []);

  // Predefined animations
  const fadeIn = useCallback(() => {
    animate(1);
  }, [animate]);

  const fadeOut = useCallback(() => {
    animate(0);
  }, [animate]);

  const slideIn = useCallback(() => {
    animate(100);
  }, [animate]);

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
    animatedValue,
    animate,
    animateLayout,
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