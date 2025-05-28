import {CSSProperties, FC} from 'react';
import './style.css'

interface IInput {
  name?: string
  value?: any
  placeholder?: string
  style?: CSSProperties
}

export const Input: FC<IInput> = ({value, placeholder, name, style}) => {
  return (
    <input
      className="input"
      value={value}
      placeholder={placeholder}
      name={name}
      style={style}
    />
  );
};