import { Animated, Easing, LayoutAnimation, Platform, UIManager } from 'react-native';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

// Animation types
export type AnimationType = 'fade' | 'slide' | 'scale' | 'bounce' | 'spring';
export type AnimationDirection = 'up' | 'down' | 'left' | 'right';

// Animation configuration interface
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  useNativeDriver?: boolean;
  easing?: (value: number) => number;
}

// Default animation configurations
const DEFAULT_CONFIG = {
  duration: 300,
  delay: 0,
  useNativeDriver: true,
  easing: Easing.ease,
} as const;

/**
 * Fade animation
 */
export const fadeAnimation = (
  value: Animated.Value,
  toValue: number,
  config: AnimationConfig = {}
) => {
  return Animated.timing(value, {
    ...DEFAULT_CONFIG,
    ...config,
    toValue,
  });
};

/**
 * Slide animation
 */
export const slideAnimation = (
  value: Animated.Value,
  toValue: number,
  direction: AnimationDirection = 'up',
  config: AnimationConfig = {}
) => {
  const translateValue = direction === 'up' || direction === 'down' ? 'translateY' : 'translateX';
  const multiplier = direction === 'up' || direction === 'left' ? -1 : 1;

  return Animated.timing(value, {
    ...DEFAULT_CONFIG,
    ...config,
    toValue: toValue * multiplier,
  });
};

/**
 * Scale animation
 */
export const scaleAnimation = (
  value: Animated.Value,
  toValue: number,
  config: AnimationConfig = {}
) => {
  return Animated.timing(value, {
    ...DEFAULT_CONFIG,
    ...config,
    toValue,
  });
};

/**
 * Bounce animation
 */
export const bounceAnimation = (
  value: Animated.Value,
  toValue: number,
  config: AnimationConfig = {}
) => {
  return Animated.spring(value, {
    ...DEFAULT_CONFIG,
    ...config,
    toValue,
    friction: 8,
    tension: 40,
  });
};

/**
 * Spring animation
 */
export const springAnimation = (
  value: Animated.Value,
  toValue: number,
  config: AnimationConfig = {}
) => {
  return Animated.spring(value, {
    ...DEFAULT_CONFIG,
    ...config,
    toValue,
    friction: 7,
    tension: 40,
  });
};

/**
 * Layout animation for smooth transitions
 */
export const layoutAnimation = (
  type: 'spring' | 'linear' | 'easeInEaseOut' = 'spring',
  duration: number = 300
) => {
  LayoutAnimation.configureNext(
    LayoutAnimation.create(
      duration,
      LayoutAnimation.Types[type],
      LayoutAnimation.Properties.opacity
    )
  );
};

/**
 * Custom hook for fade animation
 */
export const useFadeAnimation = (initialValue: number = 0) => {
  const fadeAnim = new Animated.Value(initialValue);

  const fadeIn = (config?: AnimationConfig) => {
    fadeAnimation(fadeAnim, 1, config).start();
  };

  const fadeOut = (config?: AnimationConfig) => {
    fadeAnimation(fadeAnim, 0, config).start();
  };

  return { fadeAnim, fadeIn, fadeOut };
};

/**
 * Custom hook for slide animation
 */
export const useSlideAnimation = (
  initialValue: number = 0,
  direction: AnimationDirection = 'up'
) => {
  const slideAnim = new Animated.Value(initialValue);

  const slideIn = (config?: AnimationConfig) => {
    slideAnimation(slideAnim, 100, direction, config).start();
  };

  const slideOut = (config?: AnimationConfig) => {
    slideAnimation(slideAnim, 0, direction, config).start();
  };

  return { slideAnim, slideIn, slideOut };
};

/**
 * Custom hook for scale animation
 */
export const useScaleAnimation = (initialValue: number = 0) => {
  const scaleAnim = new Animated.Value(initialValue);

  const scaleIn = (config?: AnimationConfig) => {
    scaleAnimation(scaleAnim, 1, config).start();
  };

  const scaleOut = (config?: AnimationConfig) => {
    scaleAnimation(scaleAnim, 0, config).start();
  };

  return { scaleAnim, scaleIn, scaleOut };
};

/**
 * Custom hook for bounce animation
 */
export const useBounceAnimation = (initialValue: number = 0) => {
  const bounceAnim = new Animated.Value(initialValue);

  const bounce = (config?: AnimationConfig) => {
    bounceAnimation(bounceAnim, 1, config).start();
  };

  return { bounceAnim, bounce };
};

/**
 * Custom hook for spring animation
 */
export const useSpringAnimation = (initialValue: number = 0) => {
  const springAnim = new Animated.Value(initialValue);

  const spring = (toValue: number, config?: AnimationConfig) => {
    springAnimation(springAnim, toValue, config).start();
  };

  return { springAnim, spring };
}; 