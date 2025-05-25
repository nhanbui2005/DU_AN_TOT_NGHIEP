import React, { useState } from 'react';
import { View, StyleSheet , TouchableOpacity, Image} from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { Typography } from '../../components/Typography';
import { FlashList } from '@shopify/flash-list';

type Props = BottomTabScreenProps<MainStackParamList, 'Card'>;

type CartItem = {
  id: string;
  name: string;
  color: string;
  price: number;
  quantity: number;
  image: string; // Giả sử bạn có URL hình ảnh
  selected: boolean; // Thêm thuộc tính để theo dõi trạng thái checkbox
};


const initialCartData: CartItem[] = [
  {
    id: '1',
    name: 'Woven Semi Formal Blazer',
    color: 'Brown',
    price: 874000,
    quantity: 1,
    image: 'https://i.pinimg.com/236x/04/e6/34/04e634239b846c236975140a0811cf7c.jpg', // Thay bằng URL hình ảnh thực tế
    selected: false,
  },
  {
    id: '2',
    name: 'Gold Earring from EXECUTIVELY',
    color: 'Modern Nobuko Outer - Nora',
    price: 400000,
    quantity: 2,
    image: 'https://i.pinimg.com/236x/04/e6/34/04e634239b846c236975140a0811cf7c.jpg',
    selected: false,
  },
  {
    id: '3',
    name: 'Modern Nobuko Outer - Nora',
    color: '',
    price: 784000,
    quantity: 1,
    image: 'https://i.pinimg.com/236x/04/e6/34/04e634239b846c236975140a0811cf7c.jpg',
    selected: false,
  },
];
export const CardScreen = () => {
  const [cartData, setCartData] = useState<CartItem[]>(initialCartData);

  // Hàm xử lý khi checkbox được nhấn
  const toggleCheckbox = (id: string) => {
    setCartData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  // Hàm tăng số lượng
  const increaseQuantity = (id: string) => {
    setCartData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Hàm giảm số lượng (không cho giảm xuống dưới 1)
  const decreaseQuantity = (id: string) => {
    setCartData((prevData) =>
      prevData.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };


  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => toggleCheckbox(item.id)}>
        <View style={[styles.checkbox, item.selected && styles.checkboxSelected]} />
      </TouchableOpacity>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Typography variant="body1">{item.name}</Typography>
        {item.color ? (
          <Typography variant="caption" style={styles.colorText}>
            {item.color}
          </Typography>
        ) : null}
        <Typography variant="body2" style={styles.priceText}>
          Rp{(item.price * item.quantity).toLocaleString()}
        </Typography>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => decreaseQuantity(item.id)}
          >
            <Typography variant="body2">-</Typography>
          </TouchableOpacity>
          <Typography variant="body2" style={styles.quantityText}>
            {item.quantity}
          </Typography>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => increaseQuantity(item.id)}
          >
            <Typography variant="body2">+</Typography>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // Tính tổng giá tiền và số lượng sản phẩm đã chọn
  const selectedItems = cartData.filter((item) => item.selected);
  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return (
    <View style={styles.container}>
      <FlashList
        data={cartData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        estimatedItemSize={100} // Thêm để tối ưu FlashList
        ListHeaderComponent={
          <Typography variant="h4" style={styles.header}>
            Shopping Cart
          </Typography>
        }
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.footer}>
        <Typography variant="body1" style={styles.totalText}>
          {selectedItems.length} selected • Rp{totalPrice.toLocaleString()}
        </Typography>
        <TouchableOpacity style={styles.checkoutButton}>
          <Typography variant="body1" style={styles.checkoutText}>
            Check Out
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: colors.background.default,
  },
  header: {
    marginVertical: 16,
    marginHorizontal: 16,
  },
  listContent: {
    paddingBottom: 100, // Để không bị chồng lấp với footer
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: colors.text.primary,
    borderRadius: 4,
    marginRight: 16,
  },
  checkboxSelected: {
    backgroundColor: colors.text.primary,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  colorText: {
    color: colors.text.secondary,
    marginVertical: 4,
  },
  priceText: {
    color: colors.text.primary,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  quantityText: {
    marginHorizontal: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.background.default,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  totalText: {
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: colors.text.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  checkoutText: {
    color: colors.text.hint,
    fontWeight: 'bold',
  },
}); 