import AppRouter from "./components/AppRouter";
import "./assets/styles/styles.scss";
import { createContext, useEffect } from "react";
import { checkAuth } from "./store/slices/authSlice";
import { useDispatch } from "react-redux";
import { message } from "antd";

export const AppContext = createContext();

function App() {
  const dispatch = useDispatch();

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(checkAuth());
    }
  }, []);

  return (
    <AppContext.Provider value={{}}>
      {contextHolder}
      <AppRouter />
    </AppContext.Provider>
  );
}

export default App;
