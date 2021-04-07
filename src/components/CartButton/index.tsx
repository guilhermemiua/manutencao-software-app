import React, { useRef, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Picker } from '@react-native-community/picker';
import { useNavigation, StackActions } from '@react-navigation/native';

import { useCart } from '../../hooks/CartContext';
import { useOrder } from '../../hooks/OrdersContext';
import { Product } from '../../hooks/ProductsContext';

import Placeholder from '../../assets/images/a.png';
import { colors, metrics } from '../../constants';
import Button from '../Button';
import {
  Container,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ListContainer,
  ProductContainer,
  ProductDelivery,
  ProductImage,
  ProductName,
  ProductTextContainer,
  CountContainer,
  ProductCounter,
  ProductTextButtons,
  ModalFooter,
  TotalPrice,
  RowContainer,
  DeliveryPrice,
} from './styles';

const CartButton: React.FC = () => {
  // states
  const [paymentType, setPaymentType] = useState(1);

  // refs
  const modalRef = useRef<any>(null);

  // hooks
  const { products, company, checkoutOrder, isLoading } = useCart();
  const { getAll } = useOrder();
  const navigation = useNavigation();

  const getTotalPrice = () => {
    return products.reduce(
      (sum, obj) => sum + Number(obj.price) * obj.quantity,
      Number(company.delivery_price),
    );
  };

  const closeModalAndRedirect = () => {
    modalRef.current.close();
    navigation.dispatch(StackActions.popToTop());
    navigation.navigate('Pedidos');
    getAll();
  };

  return (
    <>
      <Container>
        {products.length > 0 && (
          <Button title="Carrinho" onPress={() => modalRef.current.open()} />
        )}
      </Container>
      <RBSheet
        ref={modalRef}
        height={hp(90)}
        openDuration={250}
        closeOnDragDown
        closeOnPressBack
        dragFromTopOnly
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            backgroundColor: colors.primaryDark,
          },
        }}
      >
        <ModalContainer>
          <ModalHeader>
            <ModalTitle>{`Pedidos - ${company.company_name}`}</ModalTitle>
          </ModalHeader>
          <ListContainer>
            <FlatList
              data={products}
              keyExtractor={item => item.id?.toString()}
              renderItem={({ item }) => <CartProduct item={item} {...item} />}
            />
          </ListContainer>
          <ModalFooter>
            <RowContainer>
              <DeliveryPrice>Frete</DeliveryPrice>
              {/* eslint-disable-next-line prettier/prettier */}
              <DeliveryPrice>{`R$ ${Number(company.delivery_price).toFixed(2)}`}</DeliveryPrice>
            </RowContainer>
            <RowContainer>
              <TotalPrice>Total</TotalPrice>
              <TotalPrice>{`R$ ${getTotalPrice().toFixed(2)}`}</TotalPrice>
            </RowContainer>
            <Picker
              style={{
                width: '100%',
                height: '40%',
                color: colors.white,
                margin: 0,
                padding: 0,
              }}
              itemStyle={{ color: colors.white }}
              selectedValue={paymentType}
              onValueChange={value => setPaymentType(value)}
            >
              <Picker.Item label="Cartão" value={1} />
              <Picker.Item label="Dinheiro" value={2} />
            </Picker>
            <Button
              title="Bora que eu to com fome!"
              containerStyle={{ width: '100%' }}
              loading={isLoading}
              onPress={() => checkoutOrder(paymentType, closeModalAndRedirect)}
            />
          </ModalFooter>
        </ModalContainer>
      </RBSheet>
    </>
  );
};

const CartProduct: React.FC<any> = ({
  name,
  productImages,
  price,
  quantity,
  id,
  item,
}: Partial<Product>) => {
  // hooks
  const { addProduct, removeProduct } = useCart();
  return (
    <ProductContainer>
      <ProductImage
        source={
          productImages?.path ? { uri: productImages?.path } : Placeholder
        }
      />
      <ProductTextContainer>
        <ProductName>{name}</ProductName>
        <ProductDelivery>
          R$
          {(Number(price) * quantity).toFixed(2)}
        </ProductDelivery>
      </ProductTextContainer>
      <CountContainer>
        <TouchableOpacity onPress={() => removeProduct(id)}>
          <ProductTextButtons>-</ProductTextButtons>
        </TouchableOpacity>

        <ProductCounter>{quantity}</ProductCounter>

        <TouchableOpacity onPress={() => addProduct(item)}>
          <ProductTextButtons>+</ProductTextButtons>
        </TouchableOpacity>
      </CountContainer>
    </ProductContainer>
  );
};

export default CartButton;
