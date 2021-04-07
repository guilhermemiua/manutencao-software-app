import React, { useEffect } from 'react';
import { ActivityIndicator, View, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import {
  Container,
  Title,
  OrderImage,
  OrderDelivery,
  OrderStatus,
  OrderContainer,
  OrderCompanyName,
  OrderProductsItems,
  OrderProductsTitle,
} from './styles';
import Header from '../../components/Header';
import { useOrder, OrderProps } from '../../hooks/OrdersContext';
import { colors, metrics } from '../../constants';
import Placeholder from '../../assets/images/a.png';

const OrderItem = (item: OrderProps) => {
  const getStatus = () => {
    if (item.status === 'waiting') return 'Aguardando estabelecimento';
    if (item.status === 'confirmed') return 'Confirmado';
    if (item.status === 'cancelled') return 'Cancelado';
  };

  return (
    <OrderContainer status={item.status}>
      <OrderStatus>{getStatus()}</OrderStatus>
      <OrderCompanyName>{item.company.company_name}</OrderCompanyName>
      <OrderProductsTitle>Produtos:</OrderProductsTitle>
      {item.order_products.map(product => (
        <OrderProductsItems>{`- ${product.quantity} x ${product.product.name}`}</OrderProductsItems>
      ))}
      <OrderDelivery>
        {`R$ ${Number(item.total_price).toFixed(2)}`}
      </OrderDelivery>
      <View style={{ position: 'absolute', right: 10, bottom: 10 }}>
        <Icon
          name={item.payment_type === 'money' ? 'dollar-sign' : 'credit-card'}
          type="feather"
          color={colors.white}
        />
      </View>
      <OrderImage
        source={
          item.company.profileImages?.path
            ? { uri: item.company.profileImages?.path }
            : Placeholder
        }
      />
    </OrderContainer>
  );
};

const ListOrder: React.FC = () => {
  const { getAll, loading, orders } = useOrder();
  useEffect(() => {
    getAll();
    const getOrderEveryMinute = setInterval(() => {
      getAll();
    }, 10000);

    return () => clearInterval(getOrderEveryMinute);
  }, []);

  return (
    <Container>
      <Header>
        <Title>Pedidos</Title>
      </Header>

      {loading && <ActivityIndicator color="white" />}

      <FlatList
        style={{ flexGrow: 1, marginTop: metrics.margin }}
        data={orders}
        extraData={orders}
        renderItem={({ item }) => <OrderItem {...item} />}
        keyExtractor={item => String(item?.id)}
        onRefresh={() => getAll()}
        refreshing={loading}
      />
    </Container>
  );
};

export default ListOrder;
