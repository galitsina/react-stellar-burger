import React from 'react';
import styles from './AutorizationForm.module.css';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../utils/BurgerApi';
import { GET_USER_SUCCESS } from '../services/actions/autorization';
import { useSelector, useDispatch } from 'react-redux';

export const LoginPage = () => {
  const [emailValue, setEmailValue] = React.useState('')
  const onChangeEmail = e => {
    setEmailValue(e.target.value)
  }

  const [passwordValue, setPasswordValue] = React.useState('')
  const onChangePassword = e => {
    setPasswordValue(e.target.value)
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit')
    login({ email: emailValue, password: passwordValue })
      .then(res => {
        localStorage.setItem("refreshToken", res.refreshToken);
        localStorage.setItem("accessToken", res.accessToken);
        navigate('/');
        dispatch({
          type: GET_USER_SUCCESS,
          user: res.user
        })
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      })
  }

  return (

    <div className={styles.main}>
      <h1 className="text text_type_main-medium">Вход</h1>
      <form name="login" className={styles.main} onSubmit={handleSubmit}>
        <EmailInput
          onChange={onChangeEmail}
          value={emailValue}
          name={'email'}
          placeholder="E-mail"
          isIcon={false}
          extraClass="mt-6"
        />
        <PasswordInput
          onChange={onChangePassword}
          value={passwordValue}
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
