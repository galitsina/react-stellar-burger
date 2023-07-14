import React, { useEffect } from 'react';
import profileStyles from './Profile.module.css';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { logout, updateUser, getUser } from '../utils/BurgerApi';
import { useSelector, useDispatch } from 'react-redux';
import { CLEAR_USER } from '../services/actions/autorization';

export const ProfilePage = () => {
  const [nameValue, setNameValue] = React.useState('')
  const [isLoginInputDisabled, setLoginInputDisabled] = React.useState(true)
  const onIconClick = () => {
    setLoginInputDisabled(false)
  }

  const [emailValue, setEmailValue] = React.useState('bob@example.com')
  const onChangeEmail = e => {
    setEmailValue(e.target.value)
  }

  const [passwordValue, setPasswordValue] = React.useState('******')
  const onChangePassword = e => {
    setPasswordValue(e.target.value)
  }

  const dispatch = useDispatch();

  const exit = (e) => {
    e.preventDefault();
    logout()
      .then(() => {
        dispatch({
          type: CLEAR_USER
        });
        //clear tokens
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      })
  }

  useEffect(() => {
    getUser()
      .then((res) => {
        console.log(res);
        setNameValue(res.user.name);
        setEmailValue(res.user.email);
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      })
  }, [])

  const saveUser = (e) => {
    e.preventDefault();
    updateUser({name: nameValue, email: emailValue, password: passwordValue})
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      })
  }

  const cancelChanges = (e) => {
    e.preventDefault();
    getUser()
    .then((res) => {
      console.log(res);
      setNameValue(res.user.name);
      setEmailValue(res.user.email);
    })
    .catch((err) => {
      console.log(`Произошла ошибка: ${err}`);
    })
  }

  return (
    <div className={profileStyles.main}>
      <div className={profileStyles.left_column}>
        <nav>
          <ul className={profileStyles.navigation}>
            <li><Link to="/profile" className={`${profileStyles.link} ${profileStyles.active_link} text text_type_main-medium`}>Профиль</Link></li>
            <li><Link to="/profile/orders" className={`${profileStyles.link} text text_type_main-medium text_color_inactive`}>История заказов</Link></li>
            <li><a className={`${profileStyles.link} text text_type_main-medium text_color_inactive`} onClick={exit}>Выход</a></li>
          </ul>
        </nav>
        <p className={`${profileStyles.parargraph} text text_type_main-default text_color_inactive mt-20`}>В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      <div>
        <form name="profile" >
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={e => setNameValue(e.target.value)}
            icon={'EditIcon'}
            value={nameValue}
            name={'name'}
            disabled={isLoginInputDisabled}
            error={false}
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
          <div className={profileStyles.buttons}>
            <Button htmlType="button" type="secondary" size="medium" onClick={cancelChanges}>
              Отмена
            </Button>
            <Button htmlType="submit" type="primary" size="medium" onClick={saveUser}>
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
