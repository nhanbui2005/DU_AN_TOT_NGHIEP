import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { Typography } from '../../components/Typography';
import { assets } from '../../theme/assets';
import { BORDER_RADIUS } from '../../theme/layout';
import { sizes } from '../../theme';

const products = [
  {
    id: '1',
    name: 'Premium Dog Food',
    price: '$22.9',
    rating: 5,
    image: 'https://cf.shopee.vn/file/a7e67cdcdfe21b7c9cad4b0ffbc9cf7f',
  },
  {
    id: '2',
    name: 'Premium Dog Food',
    price: '$22.9',
    rating: 5,
    image: 'https://cf.shopee.vn/file/a7e67cdcdfe21b7c9cad4b0ffbc9cf7f',
  }
];

export const FavouriteScreen: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const renderItem = ({ item }: { item: typeof products[0] }) => {
    const isSelected = selectedId === item.id;

    return (
      <TouchableOpacity
        style={[styles.box, isSelected && styles.selectedCard]}
        onPress={() => setSelectedId(item.id)}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <TouchableOpacity style={styles.heartt} >
          <Image source={assets.icons.details.heartinactive} />
        </TouchableOpacity>
        <Text style={styles.stars}>★★★★★ {item.rating}</Text>
        <Typography variant="h6" style={styles.title}>
          {item.name}
        </Typography>
        <Text style={styles.price}>{item.price}</Text>
        <TouchableOpacity style={styles.plusButton}>
          <View style={styles.iconpluss}>
            <Image source={assets.icons.search.pluss} />
          </View>

        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={assets.icons.back} />
        </TouchableOpacity>
        <Typography variant="h3" style={styles.headerTitle}>
        Favourite
        </Typography>
      </View>
      <FlatList
        data={products}
        numColumns={1}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: '10%',
  },
  headerTitle: {
    fontWeight: 'bold',
    marginLeft: '30%',
  },
  list: {
    paddingBottom: 30,
  },
  box: {
    width: '95%',
    margin: '1%',
    borderRadius: BORDER_RADIUS.S,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background.default,
    padding: 10,
    alignItems: 'center',
    position: 'relative',
  },
  selectedCard: {
    borderColor: colors.blue.light,
    borderWidth: 2,
  },
  image: {
    width: 80,
    height: 100,
    resizeMode: 'contain',
  },
  stars: {
    fontSize: 25,
    color: colors.yellow.dark,
    marginTop: 5,
    marginLeft: '-50%',
  },
  title: {
    fontWeight: '600',
    fontSize: 25,
    marginVertical: 5,
    marginLeft: '-25%',
  },
  price: {
    fontWeight: 'bold',
    color: colors.black,
    marginLeft: '-65%',
    fontSize:25,
  },
  plusButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  mau: {
    color: colors.blue.main
  },
  iconpluss: {
    backgroundColor: colors.blue.main,
    ...sizes.icon.md,
    borderRadius: BORDER_RADIUS.XL,
    alignItems: "center",
    justifyContent: "center"
  },
  heartt: {
    position: "absolute",
    right: '2%'
  },
});
