import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  SectionList,
  View,
  RefreshControl,
} from 'react-native';

import CartButton from '../../components/CartButton';
import { Title, ScreenName, Container } from '../ListCompanies/styles';
import Header from '../../components/Header';
import {
  ProductContainer,
  ProductImage,
  ProductDelivery,
  ProductName,
  SeparatorSection,
  SeparatorTitle,
} from './styles';
import { useProduct, Product } from '../../hooks/ProductsContext';
import { useCart } from '../../hooks/CartContext';
import Placeholder from '../../assets/images/a.png';
import { colors } from '../../constants';

const ProductItem = ({ productImages, name, price, onPress }: Product) => (
  <TouchableOpacity onPress={onPress}>
    <ProductContainer>
      <ProductImage
        source={
          productImages?.path ? { uri: productImages?.path } : Placeholder
        }
      />
      <ProductName ellipsizeMode="tail" numberOfLines={1}>
        {name}
      </ProductName>
      <ProductDelivery>
        R$
        {price}
      </ProductDelivery>
    </ProductContainer>
  </TouchableOpacity>
);

const ListCompanies: React.FC = ({ route }) => {
  const {
    getProducts,
    loading,
    products,
    categories,
    updateProducts,
  } = useProduct();
  const { addProduct, clearList } = useCart();
  const { params } = route;

  useEffect(() => {
    if (params?.company?.id) {
      getProducts(params?.company?.id);
    }
    return () => clearList();
  }, [params?.company]);

  return (
    <Container>
      <Header>
        <Title>Delivery</Title>
        <ScreenName>{`${params?.company?.trading_name}`}</ScreenName>
      </Header>

      {loading && <ActivityIndicator color="white" />}

      <SectionList
        data={products}
        sections={categories}
        style={{
          flex: 1,
        }}
        extraData={products}
        refreshControl={
          <RefreshControl
            onRefresh={() => updateProducts()}
            refreshing={loading}
            tintColor={colors.white}
          />
        }
        renderSectionHeader={({ section: { title } }) => (
          <SeparatorSection>
            <SeparatorTitle>{title}</SeparatorTitle>
          </SeparatorSection>
        )}
        renderItem={({ item }) => (
          <ProductItem {...item} onPress={() => addProduct(item)} />
        )}
        keyExtractor={item => String(item?.id)}
        ListFooterComponent={() => <></>}
        ListFooterComponentStyle={{ marginBottom: 60 }}
      />
      <CartButton />
    </Container>
  );
};

export default ListCompanies;
