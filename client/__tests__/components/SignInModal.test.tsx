import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import SignInModal, { SignInModalProps } from '@/components/SignInModal';

const DEFAULT_ARGS: SignInModalProps = {
  onClose: jest.fn(),
  onSubmit: jest.fn(),
};

const renderLoginModal = (props: Partial<SignInModalProps>): RenderResult => {
  return render(<SignInModal {...DEFAULT_ARGS} {...props} />);
};

describe('with onSubmit method', () => {
  const onSubmit = jest.fn();

  beforeEach(() => {
    onSubmit.mockClear();
  });

  describe('with email, password', () => {
    const email = 'test@test.com';
    const password = 'testtest';

    test('run method with email, password on click button', () => {
      const { getByTestId } = renderLoginModal({ onSubmit });

      const emailInput = getByTestId('email-input');
      const passwordInput = getByTestId('password-input');
      const submitButton = getByTestId('submit-button');

      fireEvent.change(emailInput, {
        target: { value: email },
      });
      fireEvent.change(passwordInput, {
        target: { value: password },
      });
      fireEvent.click(submitButton);

      expect(onSubmit).toBeCalledWith({ email, password });
    });
  });
});
