import React from 'react';
import profileStyles from './Profile.module.css';
import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

export const ProfilePage = () => {
  const [value, setValue] = React.useState('')
  const [isLoginInputDisabled, setLoginInputDisabled] = React.useState(true)
  const inputRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    setLoginInputDisabled(false)
  }

  const [emailValue, setEmailValue] = React.useState('bob@example.com')
  const onChangeEmail = e => {
    setEmailValue(e.target.value)
  }

  const [passwordValue, setPasswordValue] = React.useState('password')
  const onChangePassword = e => {
    setPasswordValue(e.target.value)
  }

  return (
    <div className={profileStyles.main}>
      <div className={profileStyles.left_column}>
        <nav>
          <ul className={profileStyles.navigation}>
            <li><Link to="/profile" className={`${profileStyles.link} ${profileStyles.active_link} text text_type_main-medium`}>Профиль</Link></li>
            <li><Link to="/profile/orders" className={`${profileStyles.link} text text_type_main-medium text_color_inactive`}>История заказов</Link></li>
            <li><Link to="/login" className={`${profileStyles.link} text text_type_main-medium text_color_inactive`}>Выход</Link></li>
          </ul>
        </nav>
        <p className={`${profileStyles.parargraph} text text_type_main-default text_color_inactive mt-20`}>В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      <div>
        <form name="profile" >
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={e => setValue(e.target.value)}
            icon={'EditIcon'}
            value={'Марк'}
            name={'name'}
            disabled={isLoginInputDisabled}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mb-6"
          />
          <EmailInput
            onChange={onChangeEmail}
            value={emailValue}
            name={'email'}
            placeholder="Логин"
            isIcon={true}
            extraClass="mb-6"
          />
          <PasswordInput
            onChange={onChangePassword}
            value={passwordValue}
            name={'password'}
            icon="EditIcon"
          />
        </form>
      </div>
    </div>
  )
}
