import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { Typography } from '../../components/Typography';

export const ShopScreen = () => {
  return (
    <View style={styles.container}>
      <Typography variant="h4">Cửa hàng</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.default,
  },
}); 