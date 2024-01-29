import style from "./modal-layout.module.scss";
import closeIcon from "../../assets/close.svg";

type TModalLayout = {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
};

function ModalLayout({ title, children, onClose }: TModalLayout) {
  return (
    <div className={style.ModalLayout}>
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
  );
}

export default ModalLayout;
