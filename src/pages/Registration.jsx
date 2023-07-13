import React from 'react';
import styles from './AutorizationForm.module.css';
import { Button, Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import {createUser} from '../utils/BurgerApi';
import { useNavigate, useLocation } from 'react-router-dom';

export const RegistrationPage = () => {
  const [nameValue, setNameValue] = React.useState('')
  const inputRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }

  const [emailValue, setEmailValue] = React.useState('')
  const onChangeEmail = e => {
    setEmailValue(e.target.value)
  }

  const [passwordValue, setPasswordValue] = React.useState('')
  const onChangePassword = e => {
    setPasswordValue(e.target.value)
  }

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser({email: emailValue, password: passwordValue, username: nameValue}).then(res => {
      console.log(res);
      localStorage.setItem("refreshToken", res.refreshToken);
      localStorage.setItem("accessToken", res.accessToken);
      navigate('/');
    })
  }

  return (

    <div className={styles.main}>
      <h1 className="text text_type_main-medium">Регистрация</h1>
      <form name="registration" className={styles.main} onSubmit={handleSubmit}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={e => setNameValue(e.target.value)}
          value={nameValue}
          name={'name'}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mt-6"
        />
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
          Зарегистрироваться
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">Уже зарегистрированы?
        <Link to="/login" className={`${styles.link} text text_type_main-default`}> Войти</Link>
      </p>
    </div>
  )
}
