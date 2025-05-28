import {FC, ReactNode} from 'react';
import {useAppSelector} from "../../hooks/store";
import {Navigate} from "react-router-dom";

type Props = {
    children: ReactNode;
};

export const PublicRoute: FC<Props> = ({children}) => {
    const isAuth = useAppSelector(state => state.user.isAuth); // Use typed selector
    if (isAuth) {
        // Redirect to disk if authenticated and trying to access auth pages
        return <Navigate to="/" replace />;
    }
    return <>{children}</>;
};