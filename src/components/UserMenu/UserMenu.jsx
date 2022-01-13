import { useDispatch, useSelector } from 'react-redux';
import authSelectors from 'redux/auth/auth-selectors';
import { logOutUser } from 'redux/auth/auth-operations';
import avatar from 'helpers/images/avatar.jpg';
import Button from 'components/Button';
import s from './UserMenu.module.css';

function UserMenu() {
  const dispatch = useDispatch();
  const userName = useSelector(authSelectors.getUsername);

  return (
    <div className={s.container}>
      <img src={avatar} alt="" width="60" className={s.avatar} />
      <span className={s.name}>Welcome, {userName}</span>
      <Button type="button" onClick={() => dispatch(logOutUser())}>
        Log out
      </Button>
    </div>
  );
}

export default UserMenu;
