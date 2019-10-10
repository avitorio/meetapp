import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;
  width: 100%;
  height: 300px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;

  label {
    cursor: pointer;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      opacity: 0.7;
    }

    img {
      max-width: 40px;

      &.banner {
        height: 100%;
        min-width: 100%;
        border-radius: 4px;
        background: #eee;
        object-fit: cover;
        object-position: center;
      }
    }

    input {
      display: none;
    }
  }
`;
