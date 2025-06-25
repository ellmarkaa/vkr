import * as React from 'react';
import {Input} from "../../ui/Input";
import {Button} from "../../ui/Button";
import './style.css'

type Props = {

};
export const Login = (props: Props) => {

  return (
    <main className="login">
      <div className="login-wrapper">
        <h2 className="login-title">Авторизация</h2>
        <Input placeholder="Введите адрес электронной почты" />
        <Input placeholder="Введите пароль" error="asdfa" />
        <Button>Войти</Button>
      </div>
    </main>
  );
};
