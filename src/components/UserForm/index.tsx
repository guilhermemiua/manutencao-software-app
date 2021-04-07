import React, { useRef } from 'react';
import { TextInput } from 'react-native';
import Input from '../Input';

const UserForm: React.FC<any> = () => {
  // refs
  const passwordInputRef = useRef<TextInput>(null);

  return (
    <>
      <Input
        placeholder="Usuário"
        name="username"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        ref={passwordInputRef}
        placeholder="Senha"
        type="password"
        name="password"
      />
      <Input
        placeholder="E-mail"
        name="email"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
      />
      <Input
        placeholder="DDD Celular"
        name="phoneDdd"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        placeholder="Numero Celular"
        name="phoneNumber"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        placeholder="CPF"
        name="cpf"
        autoCapitalize="none"
        autoCorrect={false}
      />
    </>
  );
};

export default UserForm;
