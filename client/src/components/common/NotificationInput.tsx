import React, { ChangeEvent, InputHTMLAttributes, useState } from 'react';
import * as Styled from './NotificationInput.styles';

import CheckBox from '@/components/common/CheckBox';

import { limitInputNumber } from '@/utils';
import { Notification } from '@/types/User';

export interface NotificationInputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value' | 'defaultValue'
  > {
  value?: Notification;
  defaultValue?: Notification;
  onChange: (value?: Notification) => void;
}

export default function NotificationInput(
  props: NotificationInputProps,
): JSX.Element {
  const { value, defaultValue, defaultChecked, checked, onChange } = props;
  const [check, setCheck] = useState<boolean>(
    checked || defaultChecked || false,
  );
  const [hour, setHour] = useState<number>(
    value?.hour || defaultValue?.hour || 0,
  );
  const [minute, setMinute] = useState<number>(
    value?.minute || defaultValue?.minute || 0,
  );

  const handleClick = () => {
    const newValue = !check;
    setCheck(newValue);
    onChange(newValue ? { hour, minute } : undefined);
  };

  const handleChangeHour = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = limitInputNumber(event.target.value, 0, 23);
    setHour(inputValue);
  };

  const handleChangeMinute = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = limitInputNumber(event.target.value, 0, 59);
    setMinute(inputValue);
  };

  const handleBlurInput = () => {
    onChange({
      hour: hour,
      minute: minute,
    });
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
            value={hour.toString().padStart(2, '0')}
            disabled={!check}
            onChange={handleChangeHour}
            onBlur={handleBlurInput}
          />
          :
          <Styled.TimeInput
            name="minute"
            value={minute.toString().padStart(2, '0')}
            disabled={!check}
            onChange={handleChangeMinute}
            onBlur={handleBlurInput}
          />
        </Styled.TimeInputContainer>
      </Styled.InputContainer>
    </div>
  );
}
