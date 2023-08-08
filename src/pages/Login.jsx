import { useEffect } from 'react';
import styles from './AutorizationForm.module.css';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { RESET } from '../services/actions/autorization';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";
import { routeMain } from '../utils/Data';
import { useForm } from '../hooks/useForm';
import { getUserState } from '../utils/Data';
import { loginUser } from '../services/actions/autorization';

export const LoginPage = () => {
  const { values, handleChange } = useForm({ email: '', password: '' });
  const { user, userFailed, accessToken, refreshToken, isAuthChecked } = useSelector(getUserState);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (user && !userFailed) {
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("accessToken", accessToken);
      let pathroute;
      if (location.state === null || location.state.from === null) {
        pathroute = routeMain;
      } else {
        pathroute = location.state.from.pathname;
      }
      navigate(pathroute);
    } else if (userFailed) {
      alert('Возникла ошибка при попытке входа')
      dispatch({ type: RESET })
    }
  }, [user, userFailed])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user && isAuthChecked) {
      dispatch(loginUser({ email: values.email, password: values.password }))
    }
  }

  return (
    <div className={styles.main}>
      <h1 className="text text_type_main-medium">Вход</h1>
      <form name="login" className={styles.main} onSubmit={handleSubmit}>
        <EmailInput
          onChange={handleChange}
          value={values.email}
          name={'email'}
          placeholder="E-mail"
          isIcon={false}
          extraClass="mt-6"
        />
        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={'password'}
          extraClass="mt-6"
        />
        <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">
          Войти
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">Вы — новый пользователь?
        <Link to="/register" className={`${styles.link} text text_type_main-default`}> Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-default text_color_inactive mt-4">Забыли пароль?
        <Link to="/forgot-password" className={`${styles.link} text text_type_main-default`}> Восстановить пароль</Link>
      </p>
    </div>
  )
}
