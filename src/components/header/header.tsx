import style from "./header.module.scss";

type THeader = {
  title: string;
  children: React.ReactNode;
};

function Header({ title, children }: THeader) {
  return (
    <div className={style.Header}>
      <div className={style.Header__content}>
        <h2 className={style.Header__title}>{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default Header;
