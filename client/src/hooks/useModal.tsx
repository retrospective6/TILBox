import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import LoginModal, {
  LoginFormProps,
} from '@/components/common/Modal/LoginModal';

import apis from '@/apis';
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
  const router = useRouter();

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
    try {
      const { accessToken } = await apis.users.login(values);
      if (accessToken) {
        auth.set(accessToken);
        await router.reload();
      }
    } catch (error) {
      return;
    }
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
