import styled from '@emotion/styled';

export const Form = styled.form`
  width: 268px;
  height: 358px;

  .check-email-reception {
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
      display: flex;
      align-items: center;

      .checkbox-desc {
        font-size: 10px;
        margin-left: 8px;
      }
    }
  }
`;
