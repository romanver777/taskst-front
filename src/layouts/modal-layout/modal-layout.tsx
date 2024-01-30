import { CSSTransition } from "react-transition-group";
import { useRef } from "react";
import style from "./modal-layout.module.scss";
import closeIcon from "../../assets/close.svg";

type TModalLayout = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

function ModalLayout({ title, children, isOpen, onClose }: TModalLayout) {
  const modalRef = useRef(null);

  return (
    <CSSTransition
      in={isOpen}
      nodeRef={modalRef}
      timeout={300}
      classNames={{
        enter: style["ModalLayout_enter"],
        enterActive: style["ModalLayout_enterActive"],
        exit: style["ModalLayout_exit"],
        exitActive: style["ModalLayout_exitActive"],
      }}
      mountOnEnter
      unmountOnExit
    >
      <div ref={modalRef} className={style.ModalLayout}>
        <div className={style.ModalLayout__frame}>
          <div className={style.ModalLayout__head}>
            <h1 className={style.ModalLayout__title}>{title} задачу</h1>
            <button
              className={style.ModalLayout__button}
              onClick={onClose}
              data-title="Закрыть"
            >
              <img src={closeIcon} width={23} height={23} alt="Close icon" />
            </button>
          </div>
          <div className={style.ModalLayout__content}>{children}</div>
        </div>
      </div>
    </CSSTransition>
  );
}

export default ModalLayout;
