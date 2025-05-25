import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    FlatList
} from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainStackParamList } from '../../navigation/types';
import { colors } from '../../theme/colors';
import { assets } from '../../theme/assets';
import { BORDER_RADIUS } from '../../theme/layout';

type Props = BottomTabScreenProps<MainStackParamList, 'Home'>;

export const ProductDetails = () => {
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedColor, setSelectedColor] = useState('Broken White');
    const [quantity, setQuantity] = useState(1);

    const sizes = ['5kg', '10kg', '200kg', '300kg'];
    const huongvi = ['Gà Đen Thả Vườn', 'Bò Wagyu', 'Bò Dát Vàng'];

    const relatedProducts = [
        { id: '1', name: 'Gold Earring from Executive', price: '$1.400.000', image: 'http://www.vanhoanggroup.com/Portals/28054/Hoan/Hoan1/bo-bit-tet-dat-vang-7.jpg' },
        { id: '2', name: 'Modern Kebaya Outer - Nona Rara', price: '$980.000', image: 'https://tse3.mm.bing.net/th?id=OIP.pkhaiWA4PfscbrLvCzejrAHaHa&pid=Api&P=0&h=180' },
        { id: '3', name: 'Modern Kebaya Outer - Nona Rara', price: '$980.000', image: 'https://i.ytimg.com/vi/Ko5NyQ1lMLs/maxresdefault.jpg' },
        { id: '4', name: 'Modern Kebaya Outer - Nona Rara', price: '$980.000', image: 'https://tse3.mm.bing.net/th?id=OIP.pkhaiWA4PfscbrLvCzejrAHaHa&pid=Api&P=0&h=180' },
        { id: '5', name: 'Modern Kebaya Outer - Nona Rara', price: '$980.000', image: 'https://i.ytimg.com/vi/Ko5NyQ1lMLs/maxresdefault.jpg' }
    ];

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: 'https://www.lottemart.vn/media/catalog/product/cache/0x0/8/8/8853301130974.jpg.webp' }}
                        style={styles.image}
                    />
                    <TouchableOpacity style={styles.backButton}>
                        <Image source={assets.icons.back} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.heartButton}>
                        <Image source={assets.icons.details.heartinactive} />
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <Text style={styles.brand}>EXECUTIVELY</Text>
                    <Text style={styles.name}>Pedigree Puppy - Nutri Defense</Text>

                    <View style={styles.priceRow}>
                        <Text style={styles.price}>$784.000</Text>
                    </View>

                    <Text style={styles.sectionTitle}>SIZE</Text>
                    <View style={styles.optionRow}>
                        {sizes.map(size => (
                            <TouchableOpacity
                                key={size}
                                style={[
                                    styles.optionButton,
                                    selectedSize === size && styles.selectedOption
                                ]}
                                onPress={() => setSelectedSize(size)}
                            >
                                <Text>{size}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.sectionTitle}>HƯƠNG VỊ</Text>
                    <View style={styles.optionRow}>
                        {huongvi.map(color => (
                            <TouchableOpacity
                                key={color}
                                style={[
                                    styles.optionButton,
                                    selectedColor === color && styles.selectedOption
                                ]}
                                onPress={() => setSelectedColor(color)}
                            >
                                <Text>{color}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.sectionTitle}>QUANTITY</Text>
                    <View style={styles.quantityRow}>
                        <TouchableOpacity
                            onPress={() => setQuantity(prev => Math.max(1, prev - 1))}
                        >
                            <Image source={assets.icons.details.linear} />
                        </TouchableOpacity>
                        <Text style={styles.quantity}>{quantity}</Text>
                        <TouchableOpacity
                            onPress={() => setQuantity(prev => prev + 1)}
                        >
                            <Image source={assets.icons.details.Stylelinearplusss} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.sectionTitle}>PRODUCT DESCRIPTION</Text>
                    <Text style={styles.description}>
                        Giúp chó con phát triển toàn diện về trí não, hệ xương,
                        răng và hệ tiêu hóa trong giai đoạn tăng trưởng quan trọng.
                    </Text>
                    <Text style={styles.readMore}>Read more</Text>

                    <Text style={styles.sectionTitle}>RELATED PRODUCT</Text>
                    <FlatList
                        data={relatedProducts}
                        horizontal
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.relatedItem}>
                                <Image source={{ uri: item.image }} style={styles.relatedImage} />
                                <Text style={styles.relatedName}>{item.name}</Text>
                                <Text style={styles.relatedPrice}>{item.price}</Text>
                            </View>
                        )}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.cartButton}>
                <Text style={styles.cartText}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    imageContainer: {
        position: 'relative'
    },
    image: {
        width: '100%',
        height: 300
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20
    },
    heartButton: {
        position: 'absolute',
        top: 40,
        right: 20
    },
    content: {
        padding: 16
    },
    brand: {
        color: 'gray',
        fontSize: 12,
        marginBottom: 4
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10
    },
    sectionTitle: {
        marginTop: 20,
        fontWeight: 'bold'
    },
    optionRow: {
        flexDirection: 'row',
        marginTop: 10,
        gap: 10
    },
    optionButton: {
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        marginRight: 10
    },
    selectedOption: {
        borderColor: colors.grey[1000],
        backgroundColor: colors.grey[1100]
    },
    quantityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        gap: 20
    },
    quantity: {
        fontSize: 16
    },
    description: {
        marginTop: 10,
        color: colors.grey[700]
    },
    readMore: {
        color: colors.blue.dark,
        marginTop: 4
    },
    relatedItem: {
        width: 120,
        marginRight: 16
    },
    relatedImage: {
        width: 100,
        height: 100,
        borderRadius: BORDER_RADIUS.S
    },
    relatedName: {
        fontSize: 12,
        marginTop: 5
    },
    relatedPrice: {
        fontWeight: 'bold'
    },
    cartButton: {
        backgroundColor: colors.blue.main
        , padding: 16,
        alignItems: 'center',
        borderRadius: BORDER_RADIUS.S
    },
    cartText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16
    }
});
