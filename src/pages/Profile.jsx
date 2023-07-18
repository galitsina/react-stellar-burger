import React, { useEffect } from 'react';
import profileStyles from './Profile.module.css';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { logout, updateUser, getUser } from '../utils/BurgerApi';
import { useSelector, useDispatch } from 'react-redux';
import { CLEAR_USER } from '../services/actions/autorization';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';

export const ProfilePage = () => {
  const {values, handleChange, setValues} = useForm({name: '', email: '', password: ''});
  const [isLoginInputDisabled, setLoginInputDisabled] = React.useState(true);
  const [isChangeInput, setChangeInput] = React.useState(false);
  const changeInput = (e) => {
    handleChange(e);
    setChangeInput(true);
  }

  const onIconClick = () => {
    setLoginInputDisabled(false)
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const exit = (e) => {
    e.preventDefault();
    logout()
      .then((res) => {
        dispatch({
          type: CLEAR_USER
        });
        //clear tokens
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate('/login');
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      })
  }

  useEffect(() => {
    let isMounted = true;
    getUser()
      .then((res) => {
        if (isMounted) {
          setValues({...values, name: res.user.name, email: res.user.email});
        }
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      })
    //clean up
    return () => { isMounted = false };
  }, [])

  const saveUser = (e) => {
    e.preventDefault();
    updateUser({ name: values.name, email: values.email, password: values.password })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      })
  }

  const cancelChanges = (e) => {
    e.preventDefault();
    getUser()
      .then((res) => {
        setValues({...values, name: res.user.name, email: res.user.email});
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
        <form name="profile" onSubmit={saveUser}>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={changeInput}
            icon={'EditIcon'}
            value={values.name}
            name={'name'}
            disabled={isLoginInputDisabled}
            error={false}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mb-6"
          />
          <EmailInput
            onChange={changeInput}
            value={values.email}
            name={'email'}
            placeholder="Логин"
            isIcon={true}
            extraClass="mb-6"
          />
          <PasswordInput
            onChange={changeInput}
            value={values.password}
            name={'password'}
            icon="EditIcon"
            placeholder={'Пароль'}
          />
          {isChangeInput && <div className={profileStyles.buttons}>
            <Button htmlType="button" type="secondary" size="medium" onClick={cancelChanges}>
              Отмена
            </Button>
            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
          </div>}
        </form>
      </div>
    </div>
  )
}
