import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

import LoginModal, {
  LoginFormProps,
} from '@/components/common/Modal/LoginModal';

import useLogin from '@/hooks/queries/user/useLogin';
import auth from '@/utils/auth';

type ModalKeys = 'login';

export interface ModalContext {
  openModal: (key: ModalKeys) => void;
  closeModal: (key: ModalKeys) => void;
}
const Context = createContext({} as ModalContext);

const useModal = (): ModalContext => useContext<ModalContext>(Context);

export interface ModalProviderProps {
  children: ReactNode | ReactNode[];
}

export function ModalProvider(props: ModalProviderProps): JSX.Element {
  const { login } = useLogin({
    onSuccess: ({ accessToken }) => {
      auth.set(accessToken);
      closeModal('login');
    },
  });

  const [loginModal, setLoginModal] = useState<boolean>(false);

  const modalHandlers: {
    [key in ModalKeys]: Dispatch<SetStateAction<boolean>>;
  } = {
    login: setLoginModal,
  };

  const openModal = (key: ModalKeys): void => {
    modalHandlers[key](true);
  };

  const closeModal = (key: ModalKeys): void => {
    modalHandlers[key](false);
  };

  const handleLogin = async (values: LoginFormProps): Promise<void> => {
    await login(values);
  };

  return (
    <Context.Provider value={{ openModal, closeModal }}>
      {props.children}
      {loginModal && (
        <LoginModal
          onClose={() => closeModal('login')}
          onSubmit={handleLogin}
        />
      )}
    </Context.Provider>
  );
}

export default useModal;
