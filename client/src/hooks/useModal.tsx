import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

import LoginModal from '@/components/common/Modal/LoginModal';

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

  return (
    <Context.Provider value={{ openModal, closeModal }}>
      {props.children}
      {loginModal && <LoginModal onClose={() => closeModal('login')} />}
    </Context.Provider>
  );
}

export default useModal;
