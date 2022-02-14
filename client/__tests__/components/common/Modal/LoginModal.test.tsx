import React from 'react';
import renderWithProvider from '@tests/testUtils/renderWithProvider';
import { fireEvent, RenderResult } from '@testing-library/react';
import LoginModal, {
  LoginModalProps,
} from '@/components/common/Modal/LoginModal';
import waitForExpect from 'wait-for-expect';

const DEFAULT_ARGS: LoginModalProps = {
  onClose: jest.fn(),
};

const renderLoginModal = (props: Partial<LoginModalProps>): RenderResult => {
  return renderWithProvider(<LoginModal {...DEFAULT_ARGS} {...props} />);
};

describe('with onSubmit method', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    onClose.mockClear();
  });

  describe('with email, password', () => {
    const email = 'test@test.com';
    const password = 'testtest';

    test('run method when success login', async () => {
      const { getByTestId } = renderLoginModal({ onClose });

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

      await waitForExpect(() => expect(onClose).toBeCalled());
    });
  });
});
