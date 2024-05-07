import { useDispatch } from "react-redux";
import { checkAuth } from "../store/slices/authSlice";

const useLoaderData = () => {
	const dispatch = useDispatch()

	async function loader() {
		if (localStorage.getItem("token")) {
			dispatch(checkAuth());
		}
	}

	return { loader }
}

export default useLoaderData;