import React, { useEffect } from 'react';
import styles from './AutorizationForm.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { resetPassword, createUser } from '../utils/BurgerApi';
import { useNavigate, useLocation } from 'react-router-dom';

export const ResetPasswordPage = () => {
  const [passwordValue, setPasswordValue] = React.useState('')
  const onChange = e => {
    setPasswordValue(e.target.value)
  }

  const [tokenValue, setTokenValue] = React.useState('')
  const inputRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }

  const navigate = useNavigate();
  let state = useLocation();
  console.log(state)

  const createNewPassword = () => {
    resetPassword(passwordValue, tokenValue)
      .then((res) => {
        if (res && res.success) {
          navigate('/login')
        } else {
          alert('Произошла ошибка при восстановлении пароля');
        }
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      })
  }

  //неавторизованный пользователь не может напрямую попасть на маршрут /reset-password
  //защищаем маршрут /reset-password от пользователей, которые не заходили на маршрут /forgot-password ранее и не вводили почту для восстановления пароля.
  useEffect(() => {
    if (state === null || state.state === null || !state.state.checkForgetToReset) {
      navigate('/forgot-password')
    }
  }, [state])

  return (
    <div className={styles.main}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <form name="reset-password" className={styles.main}>
        <PasswordInput
          onChange={onChange}
          value={passwordValue}
          name={'password'}
          extraClass="mt-6"
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={e => setTokenValue(e.target.value)}
          value={tokenValue}
          name={'code'}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mt-6"
        />
        <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6" onClick={createNewPassword}>
          Сохранить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">Вспомнили пароль?
        <Link to="/login" className={`${styles.link} text text_type_main-default`}> Войти</Link>
      </p>
    </div>
  )
}
