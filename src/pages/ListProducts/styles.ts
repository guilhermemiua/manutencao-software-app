import React from 'react';
import styled from 'styled-components/native';
import { Platform, StatusBar } from 'react-native';
import { colors } from '../../constants';

export const ProductName = styled.Text`
  text-align: center;
  color: #fff;
  font-size: 18px;
`;

export const ProductDelivery = styled.Text`
  text-align: center;
  color: #ffffffe2;
  font-size: 12px;
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

export const ProductImage = styled.Image`
  height: 64px;
  width: 64px;
  background-color: #ffffff03;
`;

export const ProductContainer = styled.View`
  padding: 10px;
  background-color: #212121;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-horizontal: 20px;
  margin-vertical: 5px;
`;

export const SeparatorSection = styled.View`
  background-color: ${colors.primaryDark};
  padding: 10px;
  border-bottom-width: 0.5;
  border-color: #ffffff42;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-horizontal: 20px;
`;

export const SeparatorTitle = styled.Text`
  text-align: left;
  color: #ffffffe2;
  font-size: 16px;
  font-weight: 200;
  align-self: flex-end;
`;
