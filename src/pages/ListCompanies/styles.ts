import React from 'react';
import styled from 'styled-components/native';
import { Platform, StatusBar } from 'react-native';
import { colors } from '../../constants';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${colors.primaryDark};
  padding-top: ${Platform.OS === 'android' ? StatusBar.currentHeight : 24}px;
`;

export const Header = styled.View`
  width: 100%;
`;

export const Title = styled.Text`
  text-align: center;
  font-weight: bold;
  color: #fff;
  font-size: 18px;
`;

export const ScreenName = styled.Text`
  text-align: center;
  font-weight: 200;
  margin-vertical: 10px;
  color: #ffffffb2;
  font-size: 16px;
`;

export const CompanyName = styled.Text`
  text-align: center;
  color: #fff;
  font-size: 18px;
`;

export const CompanyDelivery = styled.Text`
  text-align: center;
  color: #ffffffe2;
  font-size: 12px;
  align-self: flex-end;
`;

export const CompanyImage = styled.Image`
  height: 64px;
  width: 64px;
  background-color: #ffffff03;
`;

export const CompanyContainer = styled.View`
  padding: 10px;
  background-color: #212121;
  flex-direction: row;
  margin-vertical: 5px;
  align-items: center;
  justify-content: space-between;
  margin-horizontal: 20px;
`;

export const CategoryContainer = styled.View`
  border-width: 1px;
  margin-top: 10px;
  border-color: #ffffff52;
  ${({ isActive }) => isActive && `{ background-color: #ffffff03; }`};
`;

export const CategoryName = styled.Text`
  font-weight: 200;
  color: #fff;
  font-size: 18px;
  padding: 15px;
  ${({ isActive }) => isActive && `font-weight: bold`}
`;
