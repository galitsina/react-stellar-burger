import React from 'react';
import profileStyles from './Profile.module.css';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

export const ProfilePage = () => {
  const [value, setValue] = React.useState('')
  const inputRef = React.useRef(null)
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
    alert('Icon Click Callback')
  }

  return (
    <div className={profileStyles.main}>
      <div className={profileStyles.left_column}>
        <nav>
          <ul className={profileStyles.navigation}>
            <li><a className="text text_type_main-medium">Профиль</a></li>
            <li><a className="text text_type_main-medium text_color_inactive">История заказов</a></li>
            <li><a className="text text_type_main-medium text_color_inactive">Выход</a></li>
          </ul>
        </nav>
        <p className="text text_type_main-small text_color_inactive mt-20">В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      <div>
        <form name="profile" >
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={e => setValue(e.target.value)}
            icon={'CurrencyIcon'}
            value={'Марк'}
            name={'name'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="mb-6"
          />

        </form>
      </div>
    </div>
  )
}
