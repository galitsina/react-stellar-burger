import React from 'react';
import styles from './AutorizationForm.module.css';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../utils/BurgerApi';
import { useNavigate } from 'react-router-dom';

export const ForgotPasswordPage = () => {
  const [value, setValue] = React.useState('')
  const onChange = e => {
    setValue(e.target.value)
  }
  const navigate = useNavigate();

  const restorePassword =() => {
    forgotPassword(value)
    .then((res) => {
      console.log(res)
      if (res && res.success) {
        navigate ('/reset-password')
      } else {
        alert('Произошла ошибка при восстановлении пароля')
      }
    })
    .catch((err) => {
      console.log(`Произошла ошибка: ${err}`);
    })
  }

  return (
    <div className={styles.main}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <form name="forgot-password" className={styles.main}>
      <EmailInput
        onChange={onChange}
        value={value}
        name={'email'}
        placeholder="Укажите e-mail"
        isIcon={false}
        extraClass="mt-6"
      />
        <Button htmlType="button" type="primary" size="medium" extraClass="mt-6" onClick={restorePassword}>
          Восстановить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">Вспомнили пароль?
        <Link to="/login" className={`${styles.link} text text_type_main-default`}> Войти</Link>
      </p>
    </div>
  )
}
