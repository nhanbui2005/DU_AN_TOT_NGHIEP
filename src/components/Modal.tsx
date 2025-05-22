import React from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { theme } from '../theme';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  animationType?: 'none' | 'slide' | 'fade';
  transparent?: boolean;
  containerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  overlayStyle?: ViewStyle;
  closeOnOverlayPress?: boolean;
  showCloseButton?: boolean;
  closeButtonStyle?: ViewStyle;
  closeButtonTextStyle?: TextStyle;
  closeButtonText?: string;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  children,
  animationType = 'fade',
  transparent = true,
  containerStyle,
  contentStyle,
  overlayStyle,
  closeOnOverlayPress = true,
  showCloseButton = true,
  closeButtonStyle,
  closeButtonTextStyle,
  closeButtonText = '×',
}) => {
  return (
    <RNModal
      visible={visible}
      transparent={transparent}
      animationType={animationType}
      onRequestClose={onClose}
    >
      <View style={[styles.overlay, overlayStyle]}>
        <TouchableOpacity
          style={styles.overlayTouchable}
          activeOpacity={1}
          onPress={closeOnOverlayPress ? onClose : undefined}
        >
          <View style={[styles.container, containerStyle]}>
            <View style={[styles.content, contentStyle]}>
              {showCloseButton && (
                <TouchableOpacity
                  style={[styles.closeButton, closeButtonStyle]}
                  onPress={onClose}
                >
                  <Text style={[styles.closeButtonText, closeButtonTextStyle]}>
                    {closeButtonText}
                  </Text>
                </TouchableOpacity>
              )}
              {children}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayTouchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: SCREEN_WIDTH * 0.9,
    maxHeight: SCREEN_HEIGHT * 0.8,
    backgroundColor: theme.colors.background.default,
    borderRadius: 12,
    padding: theme.spacing.md,
    shadowColor: theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.sm,
    top: theme.spacing.sm,
    width: theme.sizes.icon.md.width,
    height: theme.sizes.icon.md.height,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: theme.typography.fontSize.xl,
    color: theme.colors.text.secondary,
    fontWeight: theme.typography.fontWeight.bold,
  },
}); 