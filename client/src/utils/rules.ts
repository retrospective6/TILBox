const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

const rules = {
  nickname: (value: string): boolean =>
    [...value].length >= 2 && [...value].length <= 8,
  password: (value: string): boolean => PASSWORD_REGEX.test(value),
};

export default rules;
