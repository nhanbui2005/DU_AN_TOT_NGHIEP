import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import { colors } from '../../theme/colors';
import { Typography } from '../../components/Typography';
import { assets } from '../../theme/assets';
import { BORDER_RADIUS } from '../../theme/layout';
import { sizes } from '../../theme';
import { SearchParams } from '@/src/api/dto/search-dto/search-param.dto';
import { SearchService } from '@/src/api/services/search-service/search.service';
import { ProductSearchDto, SearchRespondDto } from '@/src/api/dto/search-dto/search-respond.dto';

export const ProductSearch: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating' | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const [searchParam, setSearchParam] = useState<SearchParams>({
    limit: 10,
  });

  const [pages, setPages] = useState<SearchRespondDto>();

  useEffect(() => {
    const getData = async () => {
      const pages = await SearchService.search(searchParam);
      setPages(pages);
    };
    getData();
  }, [searchParam.search]);

  const handleSort = (criteria: 'name' | 'price' | 'rating') => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(criteria);
      setSortOrder('asc');
    }
  };

  const getSortedProducts = (): ProductSearchDto[] => {
    if (!pages?.data) return [];

    return [...pages.data].sort((a, b) => {
      if (sortBy === 'price') {
        return sortOrder === 'asc'
          ? a.minPromotionalPrice - b.minPromotionalPrice
          : b.minPromotionalPrice - a.minPromotionalPrice;
      }
      return 0;
    });
  };

  const renderItem = ({ item }: { item: ProductSearchDto }) => {
    const isSelected = selectedId === item._id;

    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.selectedCard]}
        onPress={() => setSelectedId(item._id)}
      >
        <Image source={{ uri: item.images[0] }} style={styles.image} />
        <Text style={styles.stars}>★★★★★</Text>
        <Typography variant="h6" style={styles.title}>
          {item.name}
        </Typography>
        <Text style={styles.price}>
          {item.minPromotionalPrice < item.maxPromotionalPrice
            ? `$${(item.minPromotionalPrice / 1000).toFixed(1)} - $${(item.maxPromotionalPrice / 1000).toFixed(1)}`
            : `$${(item.minPromotionalPrice / 1000).toFixed(1)}`}
        </Text>
        <TouchableOpacity style={styles.plusButton}>
          <View style={styles.iconpluss}>
            <Image source={assets.icons.search.pluss as ImageSourcePropType} />
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image source={assets.icons.back as ImageSourcePropType} />
        </TouchableOpacity>
        <Typography variant="h5" style={styles.headerTitle}>
          Pet Food
        </Typography>
      </View>

      <View style={styles.searchContainer}>
        <Image
          source={assets.icons.search.search as ImageSourcePropType}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search in Pet Shop...."
          value={searchParam.search || ''}
          onChangeText={(text) =>
            setSearchParam((prev) => ({
              ...prev,
              search: text,
            }))
          }
        />
      </View>

      <View style={styles.filters}>
        <TouchableOpacity style={styles.filterButton}>
          <Image source={assets.icons.search.vecter as ImageSourcePropType} />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dropdown} onPress={() => handleSort('price')}>
          <Text style={styles.dropdownText}>
            Price {sortBy === 'price' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dropdown} onPress={() => handleSort('rating')}>
          <Text style={styles.dropdownText}>
            Rating {sortBy === 'rating' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList<ProductSearchDto>
        data={getSortedProducts()}
        numColumns={2}
        keyExtractor={(item: ProductSearchDto) => item._id}
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
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.grey[200],
    borderRadius: BORDER_RADIUS.S,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
  },
  filters: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.grey[200],
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.S,
  },
  filterText: {
    marginLeft: 5,
  },
  dropdown: {
    backgroundColor: colors.grey[200],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.S,
  },
  dropdownText: {
    fontSize: 14,
  },
  list: {
    paddingBottom: 30,
  },
  card: {
    width: '48%',
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
    fontSize: 14,
    color: colors.yellow.dark,
    marginTop: 5,
    marginLeft: '-40%',
  },
  title: {
    fontWeight: '600',
    marginVertical: 5,
    marginLeft: '0%',
  },
  price: {
    fontWeight: 'bold',
    color: colors.black,
    marginLeft: '-40%',
  },
  plusButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  iconpluss: {
    backgroundColor: colors.blue.main,
    ...sizes.icon.md,
    borderRadius: BORDER_RADIUS.XL,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
