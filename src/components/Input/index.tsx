import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from 'react';
import { InputProps } from 'react-native-elements';
import { useField } from '@unform/core';

import { colors } from '../../constants';
import { Input } from './styles';

interface CustomInputProps extends InputProps {
  type?: string;
  name: string;
  iconName?: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const CustomInput: React.ForwardRefRenderFunction<
  InputRef,
  CustomInputProps
> = ({ type = 'text', name, iconName, ...rest }, ref) => {
  // states
  const [hidePassword, setHidePassword] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  // hooks
  const { registerField, defaultValue, fieldName, error } = useField(name);

  // refs
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });
  const inputElementRef = useRef<any>(null);

  // functions
  const togglePasswordVisible = () => setHidePassword(!hidePassword);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({
          text: value,
        });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  return (
    <>
      {type === 'text' && (
        <Input
          {...rest}
          ref={inputElementRef}
          placeholderTextColor={colors.white}
          containerStyle={{ paddingHorizontal: 0 }}
          onChangeText={value => {
            inputValueRef.current.value = value;
          }}
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          inputContainerStyle={{
            borderBottomColor:
              isFocused || isFilled ? colors.primaryBlue : colors.white,
          }}
          leftIcon={
            iconName
              ? {
                  type: 'font-awesome-5',
                  name: iconName,
                  solid: true,
                  color:
                    isFocused || isFilled ? colors.primaryBlue : colors.white,
                  onPress: () => togglePasswordVisible(),
                }
              : {}
          }
          errorMessage={error}
        />
      )}
      {type === 'password' && (
        <Input
          {...rest}
          ref={inputElementRef}
          placeholderTextColor={colors.white}
          containerStyle={{
            paddingHorizontal: 0,
          }}
          inputContainerStyle={{
            borderBottomColor:
              isFocused || isFilled ? colors.primaryBlue : colors.white,
          }}
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChangeText={value => {
            inputValueRef.current.value = value;
          }}
          leftIcon={
            iconName
              ? {
                  type: 'font-awesome-5',
                  name: iconName,
                  solid: true,
                  color:
                    isFocused || isFilled ? colors.primaryBlue : colors.white,
                  onPress: () => togglePasswordVisible(),
                }
              : {}
          }
          errorMessage={error}
          rightIcon={{
            type: 'font-awesome-5',
            name: 'eye',
            solid: hidePassword,
            color: colors.white,
            onPress: () => togglePasswordVisible(),
          }}
          secureTextEntry={hidePassword}
        />
      )}
    </>
  );
};

export default forwardRef(CustomInput);
