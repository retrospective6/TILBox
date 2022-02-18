const TIL_ADDRESS_REGEX = /^[\w]*$/;

const EMAIL_REGEX = /^[\w+-.]+@([\w-]+\.[a-zA-Z\d]+)+$/;

const PASSWORD_REGEX =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*])[\w~!@#$%^&*]{8,}$/;

const rules = {
  address: (value: string): boolean => TIL_ADDRESS_REGEX.test(value),
  email: (value: string): boolean => EMAIL_REGEX.test(value),
  nickname: (value: string): boolean =>
    [...value].length >= 2 && [...value].length <= 8,
  password: (value: string): boolean => PASSWORD_REGEX.test(value),
};

export default rules;
