import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {
  Container,
  Title,
  CompanyImage,
  CompanyDelivery,
  CompanyName,
  CompanyContainer,
  ScreenName,
  CategoryName,
  CategoryContainer,
} from './styles';
import Header from '../../components/Header';
import { useCompany, Company } from '../../hooks/CompanyContext';
import { useCart } from '../../hooks/CartContext';
import Placeholder from '../../assets/images/a.png';
import { colors } from '../../constants';

const CompanyItem = ({
  profileImages,
  trading_name,
  delivery_price,
  onPress,
}: Company) => (
  <TouchableOpacity onPress={onPress}>
    <CompanyContainer>
      <CompanyImage
        source={
          profileImages?.path ? { uri: profileImages?.path } : Placeholder
        }
      />
      <CompanyName>{trading_name}</CompanyName>
      <CompanyDelivery>
        R$
        {delivery_price}
      </CompanyDelivery>
    </CompanyContainer>
  </TouchableOpacity>
);

const CategoryItem = ({ name, isActive = false, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <CategoryContainer>
      <CategoryName isActive={isActive}>
        {`${String(name).toUpperCase()}`}
      </CategoryName>
    </CategoryContainer>
  </TouchableOpacity>
);

const ListCompanies: React.FC = ({ navigation }) => {
  const {
    get,
    loading,
    companies,
    getCategories,
    categories,
    loadingCategories,
    setSelected,
  } = useCompany();
  const { addCompany } = useCart();
  const [active, setActive] = useState<number>(0);

  useEffect(() => {
    get();
    getCategories();
  }, []);

  useEffect(() => {
    if (active > 0) {
      get(active);
    }
  }, [active]);

  return (
    <Container>
      <Header>
        <Title>Delivery</Title>
        <ScreenName>Estabelecimentos</ScreenName>
      </Header>

      {loading && <ActivityIndicator color="white" />}

      <FlatList
        data={categories}
        style={{
          flexGrow: 0,
          marginBottom: 20,
        }}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        horizontal
        extraData={categories}
        renderItem={({ item }) => (
          <CategoryItem
            {...item}
            isActive={active === item?.id}
            onPress={() => setActive(item.id)}
          />
        )}
        keyExtractor={item => String(item?.id)}
        refreshControl={
          <RefreshControl
            onRefresh={() => getCategories()}
            refreshing={loadingCategories}
            tintColor={colors.white}
          />
        }
      />

      <FlatList
        style={{ flex: 1 }}
        data={companies}
        onRefresh={() => get()}
        refreshing={loading}
        extraData={companies}
        refreshControl={
          <RefreshControl
            onRefresh={() => get()}
            refreshing={loading}
            tintColor={colors.white}
          />
        }
        renderItem={({ item }) => (
          <CompanyItem
            {...item}
            onPress={() => {
              navigation.navigate('ListProducts', {
                screen: 'ListProducts',
                params: { company: item },
              });
              const { products, ...restCompany }: Partial<Company> = item;
              addCompany(restCompany);
            }}
          />
        )}
        keyExtractor={item => String(item?.id)}
      />
    </Container>
  );
};

export default ListCompanies;
