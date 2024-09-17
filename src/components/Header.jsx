import { useContext, useRef } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Link,
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { RootContext } from "../routes/Root";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../store/slices/postsSlice";
import UserPanel from "./UserPanel";
import { selectIsAuth } from "../store/slices/authSlice";

const Header = () => {
  const { query, setQuery } = useContext(RootContext);

  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const inputRef = useRef();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (location.pathname !== "/search")
        navigate({
          pathname: "search",
          search: createSearchParams({
            q: query,
          }).toString(),
        });
      if (location.pathname === "/search") {
        dispatch(getPosts(query));
        setSearchParams({ q: query });
      }
    }
  };

  return (
    <header className='sm:h-16 w-full bg-white border-b-2 border-bg-gray-800'>
      <div className='h-full px-4 py-4 sm:w-3/4 mx-auto'>
        <div className='flex flex-wrap sm:flex-nowrap gap-5 sm:flex-row items-center h-full'>
          <Link to='/' className='shrink-0'>
            <img
              className='h-8 w-auto'
              src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
              alt='Your Company'
            />
          </Link>
          <div
            className={`order-3 sm:ml-6 sm:order-none relative w-full ${
              location.pathname === `/edit` ||
              location.pathname === `/${params.id}/edit`
                ? "hidden"
                : ""
            }`}
          >
            <MagnifyingGlassIcon className='h-5 w-5 absolute top-2.5 left-3 text-gray-500' />
            <input
              name='search'
              type='text'
              placeholder='Search'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              ref={inputRef}
              className='search-input h-10 w-full sm:w-96 rounded pl-10 text-black bg-gray-100 border-none placeholder:text-gray-500 outline-none ease-in duration-100'
            />
          </div>
          {!isAuth ? (
            <div className='ml-auto flex gap-5 items-center'>
              <Link
                to={"/signup"}
                className='text-indigo-600 hover:text-indigo-500 ease-in duration-100'
              >
                <span>Sign up</span>
              </Link>
              <Link to={"/login"}>
                <button className='flex items-center justify-center gap-1 h-10 w-28 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-base ease-in duration-100'>
                  Log in
                </button>
              </Link>
            </div>
          ) : (
            <UserPanel />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
