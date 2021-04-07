import React, { useCallback, useRef } from 'react';
import {
  Platform,
  TextInput,
  ScrollView,
  Alert,
  TouchableNativeFeedback,
} from 'react-native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { Input as InputElements } from 'react-native-elements';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';

import getValidationErrors from '../../utils/getValidationErrors';

import { useAuth } from '../../hooks/AuthContext';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Container, Logo, InnerContainer } from './styles';
import { metrics } from '../../constants';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  // hooks
  const navigation = useNavigation();

  // refs
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  // functions
  const { signIn, loading } = useAuth();

  const handleSignIn = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      signIn({
        email: data.email,
        password: data.password,
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        console.log(errors);

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer login, cheque as credenciais.',
      );
    }
  }, []);

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <InnerContainer>
          <Header />
          <Logo>Deliverie</Logo>
          <Form
            ref={formRef}
            style={{ width: '100%' }}
            onSubmit={handleSignIn}
            initialData={{
              email: 'guilhermeteste@gmail.com',
              password: 'admin',
            }}
          >
            <Input
              placeholder="Usuário"
              name="email"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              iconName="user"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />
            <Input
              ref={passwordInputRef}
              placeholder="Senha"
              type="password"
              name="password"
              returnKeyType="send"
              iconName="lock"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />
            <Button
              title="Entrar"
              type="solid"
              loading={loading}
              onPress={() => formRef.current?.submitForm()}
            />
            <Button
              background={TouchableNativeFeedback.Ripple(
                'ThemeAttrAndroid',
                false,
              )}
              title="Quero me cadastrar"
              type="clear"
              buttonStyle={{ marginTop: metrics.margin }}
              onPress={() => navigation.navigate('SignUp')}
            />
          </Form>
        </InnerContainer>
      </ScrollView>
    </Container>
  );
};

export default SignIn;
