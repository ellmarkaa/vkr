import {FC, ReactNode} from 'react';
import {useAppSelector} from "../../hooks/store";
import {Navigate} from "react-router-dom";

type Props = {
    children: ReactNode;
};

export const ProtectedRoute: FC<Props> = ({ children }) => {
    const isAuth = useAppSelector(state => state.user.isAuth); // Use typed selector

    if (!isAuth) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};