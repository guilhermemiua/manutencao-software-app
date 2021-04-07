import React from 'react';
import { TouchableNativeFeedback } from 'react-native';
import { ButtonProps, Button } from 'react-native-elements';
import { colors } from '../../constants';
import styles from './styles';

const CustomButton: React.FC<ButtonProps> = props => {
  return (
    <Button
      background={TouchableNativeFeedback.Ripple('ThemeAttrAndroid', false)}
      containerStyle={{ width: '100%' }}
      {...props}
    />
  );
};

export default CustomButton;
