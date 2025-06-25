import * as React from 'react';
import {FC, ReactNode} from 'react';

type Props = {
  children: ReactNode;
  className?: string;
}

export const Container: FC<Props> = ({children, className = ''}) => {
  return (
    <div className={`container mx-auto ${className}`}>
      {children}
    </div>
  );
};
