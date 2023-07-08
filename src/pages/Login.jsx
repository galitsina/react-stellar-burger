import React from 'react';
import styles from './AutorizationForm.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  const [value, setValue] = React.useState('')
  const inputRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }
  return (

    <div className={styles.main}>
      <h1 className="text text_type_main-medium">Вход</h1>
      <form name="login" className={styles.main}>
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={e => setValue(e.target.value)}
          value={value}
          name={'email'}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mt-6"
        />
        <Input
          type={'password'}
          placeholder={'Пароль'}
          onChange={e => setValue(e.target.value)}
          icon={'ShowIcon'}
          value={value}
          name={'password'}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
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
