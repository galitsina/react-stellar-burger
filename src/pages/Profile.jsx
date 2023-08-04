import React, { useEffect } from 'react';
import profileStyles from './Profile.module.css';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from '../hooks/useForm';
import Navigation from '../components/Navigation/Navigation';
import { useSelector, useDispatch } from 'react-redux';
import { getUserState } from '../utils/Data';
import { getUserData, patchUserData } from '../services/actions/autorization';

export const ProfilePage = () => {
  const { values, handleChange, setValues } = useForm({ name: '', email: '', password: '' });
  const [isLoginInputDisabled, setLoginInputDisabled] = React.useState(true);
  const [isChangeInput, setChangeInput] = React.useState(false);
  const { user, isAuthChecked, wasLoggedOut} = useSelector(getUserState);
  const dispatch = useDispatch();
  const changeInput = (e) => {
    handleChange(e);
    setChangeInput(true);
  }

  const onIconClick = () => {
    setLoginInputDisabled(false)
  }

  useEffect(() => {
    if (isAuthChecked && !user && !wasLoggedOut) {
      dispatch(getUserData())
    } else if (user) {
      setValues({ ...values, name: user.name, email: user.email });
    }
  }, [user, isAuthChecked])

  const saveUser = (e) => {
    e.preventDefault();
    if (isAuthChecked) {
      dispatch(patchUserData({ name: values.name, email: values.email, password: values.password }));
    }
  }

  const cancelChanges = (e) => {
    e.preventDefault();
    if (isAuthChecked) {
      dispatch(getUserData())
    } else if (user) {
      setValues({ ...values, name: user.name, email: user.email });
    }
  }

  return (
    <div className={profileStyles.main}>
      <Navigation description='В этом разделе вы можете изменить свои персональные данные' />
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
