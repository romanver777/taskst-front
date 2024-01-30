import { Routes, Route } from "react-router-dom";
import { useAppSelector } from "./../store/hooks";
import Main from "./main/main";
import EditTask from "./edit-task/edit-task";

function App() {
  const openModal = useAppSelector((state) => state.modal.modal);

  return (
    <>
      <Routes>
        <Route path={""} element={<Main />} />
      </Routes>
      {<EditTask isOpen={!!openModal} />}
    </>
  );
}

export default App;
