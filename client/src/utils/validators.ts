import MESSAGES from '@/constants/messages';
import rules from '@/utils/rules';

const validators: {
  [keys in string]: (...args: string[]) => string;
} = {
  myTilAddress: (value: string): string => {
    if (!value) {
      return MESSAGES.TIL_ADDRESS.DEFAULT;
    }
    if (!rules.address(value)) {
      return MESSAGES.WRONG_FORMAT;
    }
    return '';
  },
  nickname: (value: string): string => {
    if (!value) {
      return MESSAGES.NICKNAME.DEFAULT;
    }
    if (!rules.nickname(value)) {
      return MESSAGES.WRONG_FORMAT;
    }
    return '';
  },
  email: (value: string): string => {
    if (!value) {
      return MESSAGES.EMAIL.DEFAULT;
    }
    if (!rules.email(value)) {
      return MESSAGES.WRONG_FORMAT;
    }
    return '';
  },
  password: (value: string): string => {
    if (!value) {
      return MESSAGES.PASSWORD.DEFAULT;
    }
    if (!rules.password(value)) {
      return MESSAGES.WRONG_FORMAT;
    }
    return '';
  },
  passwordCheck: (value: string, password: string): string => {
    if (!value) {
      return MESSAGES.PASSWORD_CHECK.DEFAULT;
    }
    if (value !== password) {
      return MESSAGES.PASSWORD_CHECK.ERROR;
    }
    return '';
  },
};

export default validators;
