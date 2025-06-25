import {useEffect} from "react";
import {RouterProvider} from "react-router-dom";
import {useAppDispatch} from "./hooks/store";
import {auth} from "./actions/userActions";
import {router} from "./app/router";

export const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(auth())
  }, [])

  return (
    <RouterProvider router={router} />
  );
};
