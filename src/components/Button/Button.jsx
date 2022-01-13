import s from './Button.module.css';

const Button = ({ children, type, onClick }) => (
  <div>
    <button type={type} onClick={onClick} className={s.button}>
      {children}
    </button>
  </div>
);

export default Button;
