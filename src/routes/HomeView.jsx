import { createContext } from "react";
import PostsList from "../components/PostsList";

export const HomeContext = createContext();

const HomeView = () => {

  return (
    <HomeContext.Provider value={{ }}>
      <div className="pt-16 pb-16">
        <PostsList />
      </div>
    </HomeContext.Provider>
  );
};

export default HomeView;
