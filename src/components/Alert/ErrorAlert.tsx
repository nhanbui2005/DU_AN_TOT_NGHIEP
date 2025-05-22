import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AppError } from '../../types/error';
import { colors, spacing } from '../../theme';

interface ErrorAlertProps {
  error: AppError;
  onDismiss?: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ error, onDismiss }) => {
  if (!error) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{error.message}</Text>
      {onDismiss && (
        <TouchableOpacity onPress={onDismiss} style={styles.dismissButton}>
          <Text style={styles.dismissText}>Đóng</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.error,
    padding: spacing.md,
    borderRadius: 8,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  message: {
    color: colors.white,
    flex: 1,
    marginRight: spacing.sm,
  },
  dismissButton: {
    padding: spacing.xs,
  },
  dismissText: {
    color: colors.white,
    fontWeight: 'bold',
  },
}); 