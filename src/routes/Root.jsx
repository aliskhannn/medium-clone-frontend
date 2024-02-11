import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { createContext, useRef, useState } from "react";

export const RootContext = createContext("");

const Root = () => {
  const [query, setQuery] = useState("");
  const [contentIsNotEmpty, setContentIsNotEmpty] = useState(false);
  const [title, setTitle] = useState("");

  const ejInstance = useRef();

  let data = useRef({});
  let postCreatedDate = useRef("");

  return (
    <RootContext.Provider
      value={{
        query,
        setQuery,
        ejInstance,
        data,
        postCreatedDate,
        title,
				setTitle,
        contentIsNotEmpty,
        setContentIsNotEmpty,
      }}
    >
      <div>
        <Header />
        <div>
          <div className="wrapper">
            <Outlet />
          </div>
        </div>
      </div>
    </RootContext.Provider>
  );
};

export default Root;
