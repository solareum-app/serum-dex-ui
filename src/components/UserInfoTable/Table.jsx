import styled from 'styled-components';

export const Section = styled.div`
  margin-bottom: 36px;

  .title {
    font-weight: bold;
  }

  .message {
    color: #6e6c6c;
  }
`;

export const Item = styled.div`
  margin-bottom: 12px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #121010;

  &:last-child {
    border-bottom: none;
  }

  .itemRow {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  .label {
  }
  .label {
  }
  .value {
    text-transform: capitalize;
    font-weight: bold;

    &.buy {
      color: #ff0000;
    }
    &.sell {
      color: #22c38e;
    }
  }
`;
