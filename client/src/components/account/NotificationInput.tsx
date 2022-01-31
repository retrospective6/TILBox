import React, { ChangeEvent, useState } from 'react';
import * as Styled from './NotificationInput.styles';
import CheckBox from '@/components/common/CheckBox';
import { limitInputNumber } from '@/utils';

export interface NotificationInputProps {
  value?: string;
  checked?: boolean;
  onChange: (value: string) => void;
}

export default function NotificationInput(
  props: NotificationInputProps,
): JSX.Element {
  const { value = '00:00', checked, onChange } = props;
  const [check, setCheck] = useState<boolean>(checked || false);
  const [hour, setHour] = useState<string>(value.split(':')[0]);
  const [minute, setMinute] = useState<string>(value.split(':')[1]);

  const handleClick = () => {
    setCheck(!check);
  };

  const handleChangeHour = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = limitInputNumber(event.target.value, 0, 23);
    setHour(inputValue);
    onChange(inputValue + ':' + minute);
  };

  const handleChangeMinute = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = limitInputNumber(event.target.value, 0, 59);
    setMinute(inputValue);
    onChange(hour + ':' + inputValue);
  };

  const handleBlurInput = () => {
    if (hour.length < 2) {
      setHour('0' + hour);
    }
    if (minute.length < 2) {
      setMinute('0' + minute);
    }
    onChange(hour + ':' + minute);
  };

  return (
    <div>
      <div>
        <Styled.Title>미작성 알림 이메일 수신</Styled.Title>
        <Styled.Description>정해진 시간에 메일을 보냅니다</Styled.Description>
      </div>
      <Styled.InputContainer>
        <CheckBox
          label="TIL 미작성 시 이메일 수신 동의 및 발송 설정"
          checked={check}
          onClick={handleClick}
        />
        <Styled.TimeInputContainer>
          <Styled.TimeInput
            name="hour"
            value={hour}
            disabled={!check}
            onChange={handleChangeHour}
            onBlur={handleBlurInput}
          />
          :
          <Styled.TimeInput
            name="minute"
            value={minute}
            disabled={!check}
            onChange={handleChangeMinute}
            onBlur={handleBlurInput}
          />
        </Styled.TimeInputContainer>
      </Styled.InputContainer>
    </div>
  );
}
