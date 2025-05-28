import {FC} from 'react';

type Props = {

};

export const Header: FC<Props> = ({}) => {
  return (
    <header className="flex justify-between items-center">
      <h1 className="font-semibold flex items-center gap-2">
        <img src="/imgs/logo.svg" alt="cloud" />
        Облачное хранилище
      </h1>


    </header>
  );
};