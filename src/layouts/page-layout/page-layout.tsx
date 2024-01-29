import style from "./page-layout.module.scss";

type TPageLayout = {
  children: React.ReactNode;
}

function PageLayout({ children }: TPageLayout) {
  return <div className={style.PageLayout}>{children}</div>;
}

export default PageLayout;
