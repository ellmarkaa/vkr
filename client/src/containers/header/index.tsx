import {FC} from 'react';
import {Input} from "../../ui/Input";
import {Button} from "../../ui/Button";
import {Container} from "../container";
import {NavLink} from "react-router-dom";

type Props = {

};

export const Header: FC<Props> = ({}) => {
  return (
    <Container>
      <header className="flex justify-between items-center px-4 py-3">
        <h1 className="font-semibold ">
          <NavLink to="/" className="flex items-center gap-2">
            <img src="/imgs/logo.svg" alt="cloud" />
            Облачное хранилище
          </NavLink>
        </h1>

        <Input placeholder="Поиск" wrapperStyle={{maxWidth: 540, width: '100%'}} />

        <div>
          <Button>
          <span className="inline-flex gap-2 items-center">
            <img src="/imgs/upload-icon.svg" alt="upload" />
            Загрузить файл
          </span>
          </Button>
        </div>
      </header>
    </Container>
  );
};
