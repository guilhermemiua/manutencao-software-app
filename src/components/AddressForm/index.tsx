import React from 'react';
import Input from '../Input';

const AddressForm: React.FC<any> = () => {
  return (
    <>
      <Input placeholder="CEP" name="zipCode" />
      <Input placeholder="Rua" name="street" />
      <Input placeholder="Número" name="number" />
      <Input placeholder="Bairro" name="district" />
      <Input placeholder="Cidade" name="city" />
      <Input placeholder="Estado" name="state" />
      <Input placeholder="Complemento" name="complement" />
    </>
  );
};

export default AddressForm;
