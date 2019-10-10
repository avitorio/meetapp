import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  color: #fff;
  max-width: 960px;
  width: 90%;
  margin: 50px auto;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input,
    textarea {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      color: #fff;
      padding: 0 15px;
      margin: 0 0 15px;
      width: 100%;

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
    }

    textarea {
      padding: 15px;
      font-size: 15px;
      height: 150px;
    }

    span {
      color: #fbb6f6;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      margin: 10px 0 20px;
    }
  }
`;

export const Button = styled.button`
  height: 42px;
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  transition: background 0.2s;
  background: #f94d6a;
  min-width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 200px;
  margin-left: auto;
  padding: 0 20px;
  cursor: pointer;

  svg {
    margin-right: 5px;
  }

  &:hover {
    background: ${darken(0.03, '#F94D6A')};
  }
`;
