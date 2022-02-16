const TIL_ADDRESS_REGEX = /^[a-zA-Z0-9]*$/;

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

const rules = {
  address: (value: string): boolean => TIL_ADDRESS_REGEX.test(value),
  email: (value: string): boolean => EMAIL_REGEX.test(value),
  nickname: (value: string): boolean =>
    [...value].length >= 2 && [...value].length <= 8,
  password: (value: string): boolean => PASSWORD_REGEX.test(value),
};

export default rules;
