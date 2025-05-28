import {FC} from 'react';
import {Input} from "../../ui/Input";
import {Button} from "../../ui/Button";

type Props = {

};

export const Header: FC<Props> = ({}) => {
  return (
    <header className="flex justify-between items-center px-4 py-3">
      <h1 className="font-semibold flex items-center gap-2">
        <img src="/imgs/logo.svg" alt="cloud" />
        Облачное хранилище
      </h1>

      <Input placeholder="Поиск" style={{maxWidth: 540, height: 32, width: '100%'}} />

      <div>
        <Button>
          <span className="inline-flex gap-2 items-center">
            <img src="/imgs/upload-icon.svg" alt="upload" />
            Загрузить файл
          </span>
        </Button>
      </div>
    </header>
  );
};