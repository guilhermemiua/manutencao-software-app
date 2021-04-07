import React from 'react';
import styled, { css } from 'styled-components/native';
import { Platform, StatusBar } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../../constants';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${colors.primaryDark};
  padding-top: ${Platform.OS === 'android' ? StatusBar.currentHeight : 0}px;
  padding-horizontal: 20px;
`;

export const Title = styled.Text`
  text-align: center;
  font-weight: bold;
  color: ${colors.white};
  font-size: 18px;
`;

export const OrderStatus = styled.Text`
  color: ${colors.white};
  font-size: ${wp(3)}px;
  line-height: ${wp(3) * 1.3}px;
`;

export const OrderDelivery = styled.Text`
  color: ${colors.white};
  font-size: ${wp(5)}px;
  margin-top: 20px;
`;

export const OrderImage = styled.Image`
  height: ${wp(20)}px;
  width: ${wp(20)}px;
  border-radius: ${wp(20) * 2}px;
  position: absolute;
  right: 10px;
`;

export const OrderContainer = styled.View`
  padding: 10px;
  background-color: #212121;
  justify-content: center;
  margin-bottom: 10px;
  border-radius: 5px;
  border-width: 2px
    ${props =>
      props.status === 'waiting' &&
      css`
        border-color: ${colors.yellow};
      `};
  ${props =>
    props.status === 'confirmed' &&
    css`
      border-color: ${colors.green};
    `};
  ${props =>
    props.status === 'cancelled' &&
    css`
      border-color: ${colors.red};
    `};
`;

export const OrderCompanyName = styled.Text`
  font-weight: bold;
  color: ${colors.white};
  font-size: ${wp(5)};
  margin: 10px 0;
`;

export const OrderProductsTitle = styled.Text`
  color: ${colors.white};
  font-size: ${wp(4)};
`;

export const OrderProductsItems = styled.Text`
  color: ${colors.white};
  font-size: ${wp(3.5)};
`;
