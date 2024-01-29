import style from "./content.module.scss";

type TContent = {
  loading: boolean;
  children: React.ReactNode;
};

function Content({ loading, children }: TContent) {
  return (
    <div
      className={
        loading ? style.Content + " " + style.Content_opacity : style.Content
      }
    >
      {children}
    </div>
  );
}

export default Content;
