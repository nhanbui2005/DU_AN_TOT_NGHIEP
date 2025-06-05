import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { CategoryRespondDto } from '@/src/api/dto/category-dto/category-respond.dto';
import { CategoryService } from '@/src/api/services/category-services/category.services';
import { colors } from '@/src/theme';

interface CategoryType {
  id: string;
  name: string;
  value: string;
}

const data: CategoryType[] = [
  { id: '1', name: 'Chó', value: 'DOG' },
  { id: '2', name: 'Mèo', value: 'CAT' },
];



export default function AllCategoriesScreen() {
  const [selectedCategoryType, setSelectedCategoryType] = useState('DOG');
  const [currentCategoryId, setCurrentCategoryId] = useState<string>("");


  const [categoryList, setCategoryList] = useState<CategoryRespondDto[]>([]);
  useEffect(() => {

    const fetch = async () => {
      const data = await CategoryService.getCategoriesByType(selectedCategoryType)
      console.log(data);

      setCategoryList(data);
    }
    fetch();
  }, [selectedCategoryType])

  useEffect(() => {
    console.log(currentCategoryId);
  }, [])
  const renderItem = ({ item }: { item: CategoryType }) => {
    const isSelected = item.value === selectedCategoryType;
    return (
      <TouchableOpacity
        onPress={() => setSelectedCategoryType(item.value)}
        style={[styles.button, isSelected && styles.selectedButton]}
      >
        <Text style={[styles.buttonText, isSelected && styles.selectedText]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  //childeren
  const renderItemChilderen = ({ item }: { item: CategoryRespondDto }) => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          setCurrentCategoryId(item._id);
        }}
      >
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };



  const renderItemCategory = ({ item }: { item: CategoryRespondDto }) => {

    return (
      <TouchableOpacity onPress={() => {
        setCurrentCategoryId(item._id)

      }}>
        <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc', minWidth: 320 }}>
          <Text style={{ fontSize: 18 }}>{item.name}</Text>

          <Image
            source={require('../../../assets/icons/icondowarrow.png')}
            style={{ position: 'absolute', right: '2%', top: 15 }}
          />

          {item._id == currentCategoryId && (
            <View>

              {/*todo: lam cai flastlist con*/}
              <FlashList<CategoryRespondDto>
                data={item.children}
                renderItem={renderItemChilderen}
                keyExtractor={(item) => item._id}
                numColumns={2}
                estimatedItemSize={100}
                extraData={currentCategoryId}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        {/* header */}
        <Text style={styles.headerTitle}>Tất Cả Danh Mục</Text>
        <TouchableOpacity style={styles.icontitle}>
          <Image source={require('../../../assets/icons/Close.png')} />
        </TouchableOpacity>

        {/* loai danh muc */}
        <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center', width: '100%' }}>
          <FlashList
            data={data}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            extraData={selectedCategoryType}
            estimatedItemSize={100}
          />
        </View>

        {/* danh muc goc */}
        <FlashList<CategoryRespondDto>
          data={categoryList}
          renderItem={renderItemCategory}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          estimatedItemSize={100}
          extraData={currentCategoryId}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    position: 'relative',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  icontitle: {
    position: 'absolute',
    right: '2%',
    top: '15%',
  },
  button: {
    height: 30,
    width: 100,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginRight: 20,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#e6f0ff',
    borderWidth: 1,
    borderColor: '#007aff',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
  selectedText: {
    color: '#007aff',
    fontWeight: 'bold',
  },
  itemContainer: {
    width: 150,
    paddingVertical: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.blue.dark,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.blue.dark,
  },
});
