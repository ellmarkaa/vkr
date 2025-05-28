import {FC, ReactNode} from 'react';

type Props = {
  children: ReactNode
};

export const Button: FC<Props> = ({children}) => {
  return (
    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
      {children}
    </button>
  );
};