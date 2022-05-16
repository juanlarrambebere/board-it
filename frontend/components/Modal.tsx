import { FC, ReactElement } from 'react';
// import ReactModal from 'react-modal';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ReactModal = require('react-modal');

type Props = {
  isOpen: boolean;
  children: ReactElement;
  onClose: () => void;
};

const Modal: FC<Props> = ({ isOpen, children, onClose }: Props) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      closeTimeoutMS={200}
      className="absolute bottom-auto right-auto w-full p-4 transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-neutral-800 text-neutral-300 top-1/2 left-1/2 focus:outline-none md:w-3/4 lg:w-1/2"
      overlayClassName="fixed top-0 left-0 bottom-0 right-0 bg-neutral-300/50"
      appElement={document.getElementById('__next') as HTMLElement}
    >
      <div>{children}</div>
    </ReactModal>
  );
};

export default Modal;
