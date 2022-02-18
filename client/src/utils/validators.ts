import MESSAGE from '@/constants/messages';
import rules from '@/utils/rules';

const validators: {
  [keys in string]: (...args: string[]) => string;
} = {
  myTilAddress: (value: string): string => {
    if (!value) {
      return MESSAGE.TIL_ADDRESS.DEFAULT;
    }
    if (!rules.address(value)) {
      return MESSAGE.WRONG_FORMAT;
    }
    return '';
  },
  nickname: (value: string): string => {
    if (!value) {
      return MESSAGE.NICKNAME.DEFAULT;
    }
    if (!rules.nickname(value)) {
      return MESSAGE.WRONG_FORMAT;
    }
    return '';
  },
  email: (value: string): string => {
    if (!value) {
      return MESSAGE.EMAIL.DEFAULT;
    }
    if (!rules.email(value)) {
      return MESSAGE.WRONG_FORMAT;
    }
    return '';
  },
  password: (value: string): string => {
    if (!value) {
      return MESSAGE.PASSWORD.DEFAULT;
    }
    if (!rules.password(value)) {
      return MESSAGE.WRONG_FORMAT;
    }
    return '';
  },
  passwordCheck: (value: string, password: string): string => {
    if (!value) {
      return MESSAGE.PASSWORD_CHECK.DEFAULT;
    }
    if (value !== password) {
      return MESSAGE.PASSWORD_CHECK.ERROR;
    }
    return '';
  },
};

export default validators;
