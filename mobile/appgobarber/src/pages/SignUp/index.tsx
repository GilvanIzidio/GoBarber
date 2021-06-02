import React from 'react';
import { Image, KeyboardAvoidingView, Platform, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Container, Title, BackToLogin, BackToLoginText } from './styles';
import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }}>
          <Container>
            <Image source={logoImg} />
            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Input name="name" icon="user" placeholder="Nome" />
            <Input name="email" icon="mail" placeholder="Email" />
            <Input name="password" icon="lock" placeholder="Senha" secureTextEntry />

            <Button>Cadastrar</Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToLogin
        onPress={() => {
          navigation.navigate('SignIn');
        }}
      >
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToLoginText>Voltar para o Login</BackToLoginText>
      </BackToLogin>
    </>
  );
};

export default SignUp;
