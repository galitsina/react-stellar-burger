import React, { useEffect, FC, FormEvent } from 'react';
import styles from './AutorizationForm.module.css';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { forgotUserPassword } from '../services/actions/autorization';
import { useSelector, useDispatch } from 'react-redux';
import { getUserState } from '../utils/Data';

export const ForgotPasswordPage: FC = () => {
  const { values, handleChange } = useForm({ email: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { forgotPassword, forgotPasswordFailed } = useSelector(getUserState);
  useEffect(() => {
    if (forgotPassword && !forgotPasswordFailed) {
      navigate('/reset-password', { state: { checkForgetToReset: true } });
    } else if (forgotPasswordFailed) {
      alert('Произошла ошибка при восстановлении пароля');
    }
  }, [forgotPassword, forgotPasswordFailed]);
  const restorePassword = (e: FormEvent) => {
    e.preventDefault();
    if (!forgotPassword) {
      dispatch(forgotUserPassword(values.email));
    }
  }
  return (
    <div className={styles.main}>
      <h1 className="text text_type_main-medium">Восстановление пароля</h1>
      <form name="forgot-password" className={styles.main} onSubmit={restorePassword}>
        <EmailInput
          onChange={handleChange}
          value={values.email}
          name={'email'}
          placeholder="Укажите e-mail"
          isIcon={false}
          extraClass="mt-6"
        />
        <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6">
          Восстановить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">Вспомнили пароль?
        <Link to="/login" className={`${styles.link} text text_type_main-default`}> Войти</Link>
      </p>
    </div>
  )
}
