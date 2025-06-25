import {CSSProperties, FC} from 'react';
import './style.css'

interface IInput {
  name?: string
  value?: any
  placeholder?: string
  style?: CSSProperties
  error?: string
  wrapperClassName?: string;
  wrapperStyle?: CSSProperties
}

export const Input: FC<IInput> = ({value, placeholder, name, style, error, wrapperStyle, wrapperClassName}) => {
  return (
    <div className={wrapperClassName} style={wrapperStyle}>
      <input
        className="input"
        value={value}
        placeholder={placeholder}
        name={name}
        style={style}
      />
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};
