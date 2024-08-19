import { useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { apiSlice } from "./reducers/apiSlice/apiSlice";
import { Provider as Wrapper } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { saveUser, deleteUser } from "./reducers/userSlice";
import Menu from "./pages/Menu";
import Home from "./pages/Home";
import axios from "axios";
import Cart from "./pages/Cart";
import store from "./reducers";

const App = () => {
  const Routes = () => {
    const storedUser = localStorage.getItem("user");
    const authUser = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    useEffect(() => {
      if (storedUser) {
        const user = JSON.parse(storedUser);
        apiSlice.defaults.headers.common["Authorization"] = user.access_token;
        dispatch(saveUser(JSON.parse(storedUser)));
      }
    }, [storedUser]);

    const checkExpiry = () => {
      setInterval(async () => {
        const isLogin = await verifyToken();
        if (!isLogin) {
          localStorage.removeItem("user");
          dispatch(deleteUser());
        }
      }, [60000]);
    };

    const verifyToken = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${authUser?.access_token}`
        );
        if (response.data.access_type !== "online") {
          return false;
        }
        return true;
      } catch (error) {
        console.error("Token verification failed:", error);
        return false;
      }
    };
    useEffect(() => {
      let intervalId = null;
      if (authUser && storedUser) {
        intervalId = checkExpiry();
      } else {
        if (intervalId) {
          clearInterval(intervalId);
        }
      }
      return () => clearInterval(intervalId);
    }, [authUser, storedUser]);

    const router = createBrowserRouter(
      createRoutesFromElements(
        <>
          <Route path="*" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          {authUser ? <Route path="/cart" element={<Cart />} /> : null}
        </>
      )
    );
    return (
      <>
        <RouterProvider router={router}></RouterProvider>
      </>
    );
  };

  return (
    <GoogleOAuthProvider clientId={process.env.CLIENTID}>
      <Wrapper store={store}>
        <Routes />
      </Wrapper>
    </GoogleOAuthProvider>
  );
};

export default App;
