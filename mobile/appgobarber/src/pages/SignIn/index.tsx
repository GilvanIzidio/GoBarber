import React from 'react';
import { Image } from 'react-native';
import { Container, Title } from './styles';
import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logoImg} />
      <Title>Faça seu login</Title>

      <Input name="email" icon="mail" placeholder="Email" />
      <Input name="password" icon="lock" placeholder="Senha" />

      <Button>Entrar</Button>
    </Container>
  );
};

export default SignIn;
