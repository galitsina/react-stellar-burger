import React from 'react';
import styles from './AutorizationForm.module.css';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  const [emailValue, setEmailValue] = React.useState('')
  const onChangeEmail = e => {
    setEmailValue(e.target.value)
  }

  const [passwordValue, setPasswordValue] = React.useState('')
  const onChangePassword = e => {
    setPasswordValue(e.target.value)
  }

  return (

    <div className={styles.main}>
      <h1 className="text text_type_main-medium">Вход</h1>
      <form name="login" className={styles.main}>
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
        <Button htmlType="button" type="primary" size="medium" extraClass="mt-6">
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
