import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import {
  useFadeAnimation,
  useSlideAnimation,
  useScaleAnimation,
  useBounceAnimation,
  useSpringAnimation,
  layoutAnimation,
  AnimationDirection,
} from './index';
import { colors } from '../../theme/colors';

/**
 * AnimationSample Component
 * 
 * Hướng dẫn sử dụng các loại animation trong React Native (dòng 190)
 */
const AnimationSample: React.FC = () => {
  // Fade Animation
  const { fadeAnim, fadeIn, fadeOut } = useFadeAnimation();
  
  // Slide Animation
  const { slideAnim, slideIn, slideOut } = useSlideAnimation(0, 'up');
  
  // Scale Animation
  const { scaleAnim, scaleIn, scaleOut } = useScaleAnimation(0);
  
  // Bounce Animation
  const { bounceAnim, bounce } = useBounceAnimation(0);
  
  // Spring Animation
  const { springAnim, spring } = useSpringAnimation(0);
  
  // Layout Animation
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    layoutAnimation('spring', 300);
    setExpanded(!expanded);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Fade Animation Example */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Fade Animation</Text>
        <Animated.View style={[styles.box, { opacity: fadeAnim }]}>
          <Text style={styles.boxText}>Fade Box</Text>
        </Animated.View>
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => fadeIn({ duration: 500 })}
          >
            <Text style={styles.buttonText}>Fade In</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => fadeOut({ duration: 500 })}
          >
            <Text style={styles.buttonText}>Fade Out</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Slide Animation Example */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Slide Animation</Text>
        <Animated.View 
          style={[
            styles.box, 
            { transform: [{ translateY: slideAnim }] }
          ]}
        >
          <Text style={styles.boxText}>Slide Box</Text>
        </Animated.View>
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => slideIn({ duration: 500 })}
          >
            <Text style={styles.buttonText}>Slide In</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => slideOut({ duration: 500 })}
          >
            <Text style={styles.buttonText}>Slide Out</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Scale Animation Example */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Scale Animation</Text>
        <Animated.View 
          style={[
            styles.box, 
            { transform: [{ scale: scaleAnim }] }
          ]}
        >
          <Text style={styles.boxText}>Scale Box</Text>
        </Animated.View>
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => scaleIn({ duration: 500 })}
          >
            <Text style={styles.buttonText}>Scale In</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => scaleOut({ duration: 500 })}
          >
            <Text style={styles.buttonText}>Scale Out</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bounce Animation Example */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Bounce Animation</Text>
        <Animated.View 
          style={[
            styles.box, 
            { transform: [{ scale: bounceAnim }] }
          ]}
        >
          <Text style={styles.boxText}>Bounce Box</Text>
        </Animated.View>
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => bounce({ duration: 500 })}
          >
            <Text style={styles.buttonText}>Bounce!</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Spring Animation Example */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. Spring Animation</Text>
        <Animated.View 
          style={[
            styles.box, 
            { transform: [{ translateY: springAnim }] }
          ]}
        >
          <Text style={styles.boxText}>Spring Box</Text>
        </Animated.View>
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => spring(100, { duration: 500 })}
          >
            <Text style={styles.buttonText}>Spring!</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Layout Animation Example */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>6. Layout Animation</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={toggleExpand}
        >
          <Text style={styles.buttonText}>Toggle Expand</Text>
        </TouchableOpacity>
        {expanded && (
          <View style={styles.expandedContent}>
            <Text style={styles.boxText}>Expanded Content</Text>
          </View>
        )}
      </View>

      {/* Usage Instructions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hướng dẫn sử dụng</Text>
        <Text style={styles.instructionText}>
          1. Import các hooks cần thiết từ utils/animation{'\n\n'}
          2. Sử dụng các hooks trong component:{'\n'}
          - useFadeAnimation() cho hiệu ứng mờ dần{'\n'}
          - useSlideAnimation() cho hiệu ứng trượt{'\n'}
          - useScaleAnimation() cho hiệu ứng phóng to/thu nhỏ{'\n'}
          - useBounceAnimation() cho hiệu ứng nảy{'\n'}
          - useSpringAnimation() cho hiệu ứng lò xo{'\n\n'}
          3. Tùy chỉnh animation:{'\n'}
          - duration: thời gian animation (ms){'\n'}
          - easing: kiểu easing{'\n'}
          - useNativeDriver: sử dụng native driver{'\n\n'}
          4. Sử dụng Animated.View để áp dụng animation{'\n\n'}
          5. Gọi các hàm animation (fadeIn, slideOut, etc.) để kích hoạt{'\n\n'}
          
          Tips:{'\n'}
          - Sử dụng useNativeDriver khi có thể để tăng hiệu năng{'\n'}
          - Kết hợp nhiều animation để tạo hiệu ứng phức tạp{'\n'}
          - Sử dụng LayoutAnimation cho các thay đổi layout{'\n'}
          - Tránh animation quá phức tạp có thể gây lag{'\n'}
          - Test kỹ trên cả iOS và Android
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16,
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: colors.blue.main,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  boxText: {
    color: colors.background.default,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: colors.blue.main,
    padding: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.background.default,
    fontWeight: 'bold',
  },
  expandedContent: {
    backgroundColor: colors.blue.light,
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  instructionText: {
    color: colors.text.secondary,
    lineHeight: 24,
  },
});

export default AnimationSample; 