import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  color: #fff;
  max-width: 960px;
  width: 90%;
  margin: 50px auto;
`;

export const Details = styled.div`
  color: #fff;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .buttons {
      display: flex;
    }

    a,
    button {
      height: 42px;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
      min-width: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      svg {
        margin-right: 5px;
      }

      & + button {
        margin-left: 20px;
      }

      &.edit {
        background: #4dbaf9;

        &:hover {
          background: ${darken(0.03, '#4dbaf9')};
        }
      }

      &.cancel {
        background: #f94d6a;

        &:hover {
          background: ${darken(0.03, '#F94D6A')};
        }
      }
    }
  }
`;

export const Description = styled.div`
  margin-top: 20px;
  img {
    height: 300px;
    width: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 4px;
    margin-bottom: 20px;
  }

  div {
    margin-top: 20px;
    display: flex;

    svg {
      margin-right: 5px;
    }

    span {
      display: flex;
      align-items: center;

      & + span {
        margin-left: 30px;
      }
    }
  }
`;
