import * as React from 'react';
import {FC, ReactNode} from 'react';
import {Header} from "../header";

type Props = {
  children: ReactNode
};
export const Layout: FC<Props> = ({children}) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
