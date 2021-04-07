import styled from 'styled-components/native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors, metrics } from '../../constants';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${colors.primaryDark};
`;

export const Logo = styled.Text`
  font-size: ${wp(10)}px;
  color: ${colors.white};
`;

export const InnerContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 ${metrics.padding * 2}px;
`;
