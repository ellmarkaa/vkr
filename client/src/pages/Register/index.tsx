import * as React from 'react';
import {Input} from "../../ui/Input";
import {Button} from "../../ui/Button";
import './style.css'

type Props = {

};
export const Register = (props: Props) => {

  return (
    <main className="register">
      <div className="register-wrapper">
        <h2 className="register-title">Регистрация</h2>
        <Input placeholder="Введите имя" />
        <Input placeholder="Введите фамилию" />
        <Input placeholder="Введите адрес электронной почты" />
        <Input placeholder="Введите пароль" error="asdfa" />
        <Button>Войти</Button>
      </div>
    </main>
  );
};
