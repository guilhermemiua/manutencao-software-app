import React from 'react';
import { SafeAreaView, Platform, StatusBar } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Header: React.FC = ({ children }) => {
  return (
    <SafeAreaView
      style={{
        paddingTop:
          Platform.OS === 'android' ? StatusBar.currentHeight + hp(1) : hp(1),
      }}
    >
      {children}
    </SafeAreaView>
  );
};

export default Header;
