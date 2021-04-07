import React, { useCallback, useRef, useState } from 'react';
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

import { useAuth } from '../../hooks/AuthContext';

import config from './config';

import Header from '../../components/Header';
import Button from '../../components/Button';
import UserForm from '../../components/UserForm';
import AddressForm from '../../components/AddressForm';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Logo, InnerContainer } from './styles';
import { metrics } from '../../constants';

export interface UserFormData {
  user: string;
  password: string;
  email: string;
  phonDdd: number;
  phoneNumber: number;
  cpf: string;
}

const SignIn: React.FC = () => {
  // states
  const [user, setUser] = useState<UserFormData>({} as UserFormData);
  const [step, setStep] = useState<number>(1);

  // item
  const item = config[step];
  const navigation = useNavigation();

  // refs
  const formRef = useRef<FormHandles>(null);

  // functions
  const { signUp, loading } = useAuth();

  const redirectToLogin = () => {
    navigation.goBack();
  };

  const handleSignUp = useCallback(
    async (data: UserFormData) => {
      try {
        formRef.current?.setErrors({});
        let schema: any;

        if (step === 1) {
          schema = Yup.object().shape({
            username: Yup.string().required('Campo obrigatório'),
            password: Yup.string().required('Campo obrigatório'),
            email: Yup.string()
              .email('Insira o e-mail corretamente')
              .required('Campo obrigatório'),
            phoneDdd: Yup.number().required('Campo obrigatório'),
            phoneNumber: Yup.number().required('Campo obrigatório'),
            cpf: Yup.string().required('Campo obrigatório'),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          setUser(data);
          setStep(2);
          return;
        }

        schema = Yup.object().shape({
          zipCode: Yup.number().required('Campo obrigatório'),
          street: Yup.string().required('Campo obrigatório'),
          number: Yup.number().required('Campo obrigatório'),
          district: Yup.string().required('Campo obrigatório'),
          city: Yup.string().required('Campo obrigatório'),
          state: Yup.string().required('Campo obrigatório'),
          complement: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const request = {
          ...user,
          ...data,
        };

        signUp(request, redirectToLogin);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, cheque as credenciais.',
        );
      }
    },
    [redirectToLogin, signUp, step, user],
  );

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <InnerContainer>
          <Header />
          <Logo>Deliverie</Logo>
          <Form ref={formRef} onSubmit={handleSignUp} style={{ width: '100%' }}>
            <item.form />
            <Button
              background={TouchableNativeFeedback.Ripple(
                'ThemeAttrAndroid',
                false,
              )}
              title="Próximo"
              loading={loading}
              buttonStyle={{ marginVertical: metrics.margin }}
              onPress={() => formRef.current?.submitForm()}
            />
          </Form>
        </InnerContainer>
      </ScrollView>
    </Container>
  );
};

export default SignIn;
