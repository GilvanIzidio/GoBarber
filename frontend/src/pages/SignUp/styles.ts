import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import signUpBackgroundImg from '../../assets/sign-up-background.png';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

const apperFromLeft = keyframes`
from{
opacity: 0;
transform: translateX(-50px);
}
to{
opacity: 1;
transform: translateX(0);
}
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${apperFromLeft} 1s;

  form {
    margin: 40px;
    width: 340px;
    text-align: center;
  }

  h1 {
    margin-bottom: 24px;
  }

  a {
    text-decoration: none;
    color: #f4edeb;
    display: block;
    margin-top: 20px;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#f4edeb')};
    }
  }

  > a {
    color: #ff9000;
    display: block;
    margin-top: 5px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  place-content: center;

  width: 100%;
  max-width: 700px;
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackgroundImg}) no-repeat center;
  background-size: cover;
`;
