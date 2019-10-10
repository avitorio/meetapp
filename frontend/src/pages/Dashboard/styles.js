import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 960px;
  margin: 50px auto;
  width: 90%;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      border: 0;
      background: #f94d6a;
      color: #fff;
      font-weight: bold;
      padding: 10px 20px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      transition: 0.5s background;

      svg {
        margin-right: 5px;
      }

      &:hover {
        background: ${darken(0.1, '#f94d6a')};
      }
    }

    strong {
      color: #fff;
      font-size: 24px;
      margin: 0 15px;
    }
  }

  ul {
    display: block;
    margin-top: 30px;
  }
`;

export const Meetup = styled.li`
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 20px;
  background: rgba(0, 0, 0, 0.1);
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  strong {
    display: block;
    font-size: 20px;
    font-weight: normal;
  }

  span {
    display: block;
    margin-top: 3px;
  }

  .time-container {
    display: flex;
    p {
      margin-right: 30px;
      color: #999;
    }
  }
`;
