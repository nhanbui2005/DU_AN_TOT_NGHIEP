import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { colors } from "../../theme/colors";
import { Typography } from "../../components/Typography";

type OrderItem = {
  id: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
};

const orderData: OrderItem[] = [
  {
    id: "1",
    name: "Woven Semi Formal Blazer",
    variant: "Broken White",
    price: 874000,
    quantity: 1,
    image:
      "https://i.pinimg.com/236x/04/e6/34/04e634239b846c236975140a0811cf7c.jpg",
  },
  {
    id: "2",
    name: "Gold Earring from EXECUTIVELY",
    variant: "",
    price: 400000,
    quantity: 2,
    image:
      "https://i.pinimg.com/236x/04/e6/34/04e634239b846c236975140a0811cf7c.jpg",
  },
];

export const CheckoutScreen = () => {
  const renderOrderItem = (item: OrderItem) => (
    <View style={styles.orderItemContainer} key={item.id}>
      <Image source={{ uri: item.image }} style={styles.orderItemImage} />
      <View style={styles.orderItemDetails}>
        <Typography variant="body1">{item.name}</Typography>
        {item.variant ? (
          <Typography variant="caption" style={styles.variantText}>
            {item.variant}
          </Typography>
        ) : null}
        <Typography variant="body2" style={styles.priceText}>
          Rp{(item.price * item.quantity).toLocaleString()}
        </Typography>
        <Typography variant="caption" style={styles.quantityText}>
          x {item.quantity}
        </Typography>
      </View>
    </View>
  );

  const subtotal = orderData.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingFee = 10000;
  const voucherDiscount = 20000;
  const total = subtotal + shippingFee - voucherDiscount;

  return (
    <View style={styles.container}>
      <Typography variant="h4" style={styles.header}>
        Check Out
      </Typography>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Order Summary */}
        <View style={styles.section}>
          <Typography variant="h4" style={styles.sectionTitle}>
            Order Summary
          </Typography>
          {orderData.map(renderOrderItem)}
        </View>

        {/* Delivery Address */}
        <View style={styles.section}>
          <Typography variant="h4" style={styles.sectionTitle}>
            Delivery Address
          </Typography>
          <TouchableOpacity style={styles.optionContainer}>
            <View style={styles.optionDetails}>
              <Typography variant="body1">
                Jean Doe • (+62 812 3456 7890)
              </Typography>
              <Typography variant="caption" style={styles.optionText}>
                Maxie Orchard 35858 Block 2, Kertzmanfort, Wyoming, 75926-5541
              </Typography>
            </View>
            <Typography variant="body2" style={styles.optionArrow}>
              {">"}
            </Typography>
          </TouchableOpacity>
        </View>

        {/* Shipping Option */}
        <View style={styles.section}>
          <Typography variant="h4" style={styles.sectionTitle}>
            Shipping Option
          </Typography>
          <TouchableOpacity style={styles.optionContainer}>
            <View style={styles.optionDetails}>
              <Typography variant="body1">RAX Speed Delivery</Typography>
              <Typography variant="caption" style={styles.optionText}>
                Receive in 2-3 days
              </Typography>
            </View>
            <Typography variant="body2" style={styles.optionArrow}>
              {">"}
            </Typography>
          </TouchableOpacity>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Typography variant="h4" style={styles.sectionTitle}>
            Payment Method
          </Typography>
          <TouchableOpacity style={styles.optionContainer}>
            <View style={styles.optionDetails}>
              <Typography variant="body1">BANK Virtual Account</Typography>
            </View>
            <Typography variant="body2" style={styles.optionArrow}>
              {">"}
            </Typography>
          </TouchableOpacity>
        </View>

        {/* Voucher */}
        <View style={styles.section}>
          <View style={styles.voucherContainer}>
            <Typography variant="body1">ZOKPROMOCODE ✅</Typography>
            <TouchableOpacity>
              <Typography variant="body2" style={styles.removeText}>
                Remove
              </Typography>
            </TouchableOpacity>
          </View>
        </View>

        {/* Subtotal */}
        <View style={styles.section}>
          <View style={styles.subtotalRow}>
            <Typography variant="body1">Subtotal</Typography>
            <Typography variant="body1">
              Rp{subtotal.toLocaleString()}
            </Typography>
          </View>
          <View style={styles.subtotalRow}>
            <Typography variant="body1">Shipping Fee</Typography>
            <Typography variant="body1">
              Rp{shippingFee.toLocaleString()}
            </Typography>
          </View>
          <View style={styles.subtotalRow}>
            <Typography variant="body1">Admin Fee</Typography>
            <Typography variant="body1">Rp0</Typography>
          </View>
          <View style={styles.subtotalRow}>
            <Typography variant="body1">Voucher Code</Typography>
            <Typography variant="body1" style={styles.discountText}>
              -Rp{voucherDiscount.toLocaleString()}
            </Typography>
          </View>
          <View style={styles.totalRow}>
            <Typography variant="h4">Total</Typography>
            <Typography variant="h4" style={styles.totalText}>
              Rp{total.toLocaleString()}
            </Typography>
          </View>
        </View>
      </ScrollView>

      {/* Create Order Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.createOrderButton}>
          <Typography variant="body1" style={styles.createOrderText}>
            Create Order
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
  scrollContent: {
    paddingBottom: 100,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  orderItemContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  orderItemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
  orderItemDetails: {
    flex: 1,
  },
  variantText: {
    color: colors.text.secondary,
    marginVertical: 4,
  },
  priceText: {
    color: colors.text.primary,
    fontWeight: "bold",
  },
  quantityText: {
    color: colors.text.secondary,
    marginTop: 4,
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionDetails: {
    flex: 1,
  },
  optionText: {
    color: colors.text.secondary,
    marginTop: 4,
  },
  optionArrow: {
    color: colors.text.primary,
    fontSize: 18,
  },
  voucherContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    backgroundColor: colors.background.light,
    borderRadius: 8,
  },
  removeText: {
    color: colors.error,
  },
  subtotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  totalText: {
    color: colors.text.primary,
    fontWeight: "bold",
  },
  discountText: {
    color: colors.error,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: colors.background.default,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  createOrderButton: {
    backgroundColor: colors.background.paper,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  createOrderText: {
    color: colors.text.primary,
    fontWeight: "bold",
  },
});
