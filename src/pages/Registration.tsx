import React, { useEffect, useRef, FC, FormEvent, ChangeEvent } from 'react';
import styles from './AutorizationForm.module.css';
import { Button, Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createUser } from '../services/actions/autorization';
import { routeMain } from '../utils/Data';
import { getUserState } from '../utils/Data';

export const RegistrationPage: FC = () => {
  const [nameValue, setNameValue] = React.useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current?.focus(), 0)
    alert('Icon Click Callback')
  }

  const [emailValue, setEmailValue] = React.useState('')

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value)
  }

  const [passwordValue, setPasswordValue] = React.useState('')
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value)
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthChecked, refreshToken, accessToken } = useSelector(getUserState);
  useEffect(() => {
    if (isAuthChecked && refreshToken && accessToken) {
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("accessToken", accessToken);
      navigate(routeMain);
    }
  }, [refreshToken, accessToken, isAuthChecked])
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isAuthChecked && !refreshToken && !accessToken) {
      console.log("dispatch registration")
      dispatch(createUser({ email: emailValue, password: passwordValue, name: nameValue }))
    }
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
