import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 92px;
  background: rgba(0, 0, 0, 0.3);
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 92px;
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      max-width: 30px;
    }

    a {
      font-weight: bold;
      color: #fff;
    }
  }

  aside {
    display: flex;
    align-items: center;

    button {
      width: 100%;
      min-width: 100px;
      height: 42px;
      background: #f64c75;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.08, '#f64c75')};
      }
    }
  }
`;

export const Profile = styled.div`
  display: flex;

  div {
    text-align: right;
    margin-right: 30px;
    width: 100px;

    strong {
      display: block;
      color: #fff;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }
  }
`;
