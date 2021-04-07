import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import { colors, metrics } from '../../constants';

export const Container = styled.View`
  width: 100%;
  position: absolute;
  bottom: 10px;
  padding: 0 20px;
`;

export const ModalContainer = styled.View`
  background-color: ${colors.primaryDark};
  width: 100%;
  flex-grow: 1;
  padding: ${metrics.margin}px;
`;

export const ModalHeader = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: ${metrics.margin}px;
`;

export const ModalTitle = styled.Text`
  font-size: ${wp(5)}px;
  color: ${colors.white};
  font-weight: bold;
`;

export const ListContainer = styled.View`
  flex: 1;
`;

export const ProductName = styled.Text`
  color: #fff;
  font-size: ${wp(4)}px;
`;

export const ProductDelivery = styled.Text`
  color: #ffffffe2;
  font-size: ${wp(3)}px;
`;

export const ProductImage = styled.Image`
  height: ${wp(15)}px;
  width: ${wp(15)}px;
  background-color: #ffffff03;
  margin-right: 10px;
`;

export const ProductTextContainer = styled.View`
  flex: 1;
`;

export const ProductContainer = styled.View`
  padding: 10px;
  background-color: #212121;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-vertical: 5px;
`;

export const CountContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ProductTextButtons = styled.Text`
  color: ${colors.white};
  font-size: ${wp(8)}px;
`;

export const ProductCounter = styled.Text`
  color: ${colors.white};
  font-size: ${wp(8)}px;
  margin: 0 20px;
`;

export const ModalFooter = styled.View`
  width: 100%;
  align-items: flex-end;
  justify-content: center;
`;

export const TotalPrice = styled.Text`
  color: ${colors.white};
  font-size: ${wp(8)}px;
  margin-bottom: 10px;
`;

export const DeliveryPrice = styled.Text`
  color: ${colors.white};
  font-size: ${wp(4)}px;
`;

export const RowContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
