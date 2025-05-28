import {useEffect} from "react";
import {BrowserRouter, RouterProvider} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "./hooks/store";
import {auth} from "./actions/userActions";
import {router} from "./app/router";
import {Header} from "./containers/header";

export const App = () => {
    const isAuth = useAppSelector(state => state.user.isAuth)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(auth())
    }, [])

  return (
      <BrowserRouter>
          <div className='app'>
              <Header />
          </div>
      </BrowserRouter>
  );
};