import React from 'react';
import styles from './AutorizationForm.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

export const ResetPasswordPage = () => {
  const [passwordValue, setPasswordValue] = React.useState('')
  const onChange = e => {
    setPasswordValue(e.target.value)
  }

  const [value, setValue] = React.useState('')
  const inputRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }

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
          onChange={e => setValue(e.target.value)}
          value={value}
          name={'code'}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mt-6"
        />
        <Button htmlType="button" type="primary" size="medium" extraClass="mt-6">
          Сохранить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">Вспомнили пароль?
        <Link to="/login" className={`${styles.link} text text_type_main-default`}> Войти</Link>
      </p>
    </div>
  )
}
