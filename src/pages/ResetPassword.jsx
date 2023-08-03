import React, { useEffect } from 'react';
import styles from './AutorizationForm.module.css';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { resetPassword } from '../utils/BurgerApi';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { resetUserPassword } from '../services/actions/autorization';
import { getUserState } from '../utils/Data';
import { useSelector, useDispatch } from 'react-redux';

export const ResetPasswordPage = () => {
  const {values, handleChange} = useForm({password: '', code: ''});
  const { resetPassword, resetPasswordFailed } = useSelector(getUserState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let state = useLocation();

  const createNewPassword = (e) => {
    e.preventDefault();
    if (!resetPassword && !resetPasswordFailed) {
      dispatch(resetUserPassword(values.password, values.code));
    }
    if (resetPassword && !resetPasswordFailed) {
      navigate('/login');
    } else if (resetPasswordFailed) {
      alert('Произошла ошибка при восстановлении пароля');
    }

    // resetPassword(values.password, values.code)
    //   .then((res) => {
    //     if (res && res.success) {
    //       navigate('/login')
    //     } else {
    //       alert('Произошла ошибка при восстановлении пароля');
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(`Произошла ошибка: ${err}`);
    //   })
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
      <form name="reset-password" className={styles.main} onSubmit={createNewPassword}>
        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={'password'}
          extraClass="mt-6"
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={handleChange}
          value={values.code}
          name={'code'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="mt-6"
        />
        <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">
          Сохранить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">Вспомнили пароль?
        <Link to="/login" className={`${styles.link} text text_type_main-default`}> Войти</Link>
      </p>
    </div>
  )
}
