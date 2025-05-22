import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet, ActivityIndicator, View, Image, ImageSourcePropType } from 'react-native';
import { colors } from '../theme/colors';
import { Typography } from './Typography';

type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';
type IconPosition = 'left' | 'right' | 'only';

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  title?: string;
  icon?: ImageSourcePropType;
  iconPosition?: IconPosition;
  iconSize?: number;
  iconColor?: string;
  textColor?: string;
  textVariant?: 'button' | 'body1' | 'body2';
  textBold?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  title,
  icon,
  iconPosition = 'left',
  iconSize = 20,
  iconColor,
  textColor,
  textVariant = 'button',
  textBold = false,
  style,
  disabled,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: colors.blue.main,
          borderWidth: 0,
        };
      case 'secondary':
        return {
          backgroundColor: colors.pink.main,
          borderWidth: 0,
        };
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: colors.blue.main,
        };
      case 'text':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
        };
      default:
        return {};
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: 8,
          paddingHorizontal: 12,
          minHeight: 36,
        };
      case 'medium':
        return {
          paddingVertical: 12,
          paddingHorizontal: 16,
          minHeight: 44,
        };
      case 'large':
        return {
          paddingVertical: 16,
          paddingHorizontal: 24,
          minHeight: 52,
        };
      default:
        return {};
    }
  };

  const getTextColor = () => {
    if (textColor) return textColor;
    
    switch (variant) {
      case 'primary':
      case 'secondary':
        return colors.background.default;
      case 'outlined':
      case 'text':
        return colors.blue.main;
      default:
        return colors.text.primary;
    }
  };

  const renderIcon = () => {
    if (!icon) return null;
    
    return (
      <Image 
        source={icon} 
        style={[
          styles.icon,
          { width: iconSize, height: iconSize }
        ]} 
        resizeMode="contain"
      />
    );
  };

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator color={getTextColor()} />;
    }

    if (iconPosition === 'only' && icon) {
      return renderIcon();
    }

    if (!title && !icon) return null;

    return (
      <View style={styles.contentContainer}>
        {icon && iconPosition === 'left' && (
          <View style={styles.leftIcon}>
            {renderIcon()}
          </View>
        )}
        
        {title && (
          <Typography
            variant={textVariant}
            color={variant === 'primary' || variant === 'secondary' ? 'textPrimary' : 'primary'}
            bold={textBold}
            center
          >
            {title}
          </Typography>
        )}

        {icon && iconPosition === 'right' && (
          <View style={styles.rightIcon}>
            {renderIcon()}
          </View>
        )}
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getVariantStyles(),
        getSizeStyles(),
        disabled && styles.disabled,
        style,
      ]}
      disabled={disabled || loading}
      {...props}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
  icon: {
    width: 20,
    height: 20,
  },
}); 