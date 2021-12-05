import styled from '@emotion/styled';

export const Form = styled.form`
  height: 358px;

  button {
    margin: 0 auto;
  }
`;

export const CheckEmailReception = styled.div`
  margin: 8px 0 24px;

  label {
    .title {
      font-size: 10px;
      line-height: 16px;
      font-weight: bold;
      margin-right: 8px;
    }
    .description {
      font-size: 8px;
      line-height: 16px;
      color: #666666;
    }
  }

  .checkbox-wrap {
    margin-top: 8px;
    display: flex;
    align-items: center;

    .checkbox-desc {
      font-size: 10px;
      margin-left: 8px;
    }
  }
`;
