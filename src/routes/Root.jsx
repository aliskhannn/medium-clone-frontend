import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Root = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Root;
