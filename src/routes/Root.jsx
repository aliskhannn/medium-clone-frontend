import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { createContext, useRef, useState } from "react";

export const RootContext = createContext("");

const Root = () => {
  const [query, setQuery] = useState("");
  const [contentIsNotEmpty, setContentIsNotEmpty] = useState(false);
  const [title, setTitle] = useState("");
  const [userData, setUserData] = useState({
    id: null,
    username: "",
    fullName: "",
    email: "",
    bio: "",
    avatarUrl: "",
  });

  const ejInstance = useRef();
  const titleEl = useRef();

  return (
    <RootContext.Provider
      value={{
        query,
        setQuery,
        ejInstance,
        title,
        setTitle,
        titleEl,
        contentIsNotEmpty,
        setContentIsNotEmpty,
        userData,
        setUserData,
      }}
    >
      <div className='h-full'>
        <Header />
        <div className='h-full'>
          <div className='wrapper h-full'>
            <Outlet />
          </div>
        </div>
      </div>
    </RootContext.Provider>
  );
};

export default Root;
