import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeaderStyles from './AppHeader.module.css';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AppHeader = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <header className={`${AppHeaderStyles.header} pb-4 pt-4`}>
      <nav className={AppHeaderStyles.header__navigation}>
        <Link to='/' className={`${AppHeaderStyles.header__item} pb-4 pt-4 pl-5 pr-5 mr-2`}>
          <BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'} />
          <p className={`${pathname === '/' ? 'text_color_active' : 'text_color_inactive'} text text_type_main-default ml-2`}>Конструктор</p>
        </Link>
        <Link to='/feed' className={`${AppHeaderStyles.header__item} pb-4 pt-4 pl-5 pr-5`}>
          <ListIcon type={pathname === '/feed' ? 'primary' : 'secondary'} />
          <p className={`${pathname === '/feed' ? 'text_color_active' : 'text_color_inactive'} text text_type_main-default ml-2`}>Лента заказов</p>
        </Link>
      </nav>
      <div className={AppHeaderStyles.header__logo}>
        <Logo />
      </div>
      <Link to='/profile' className={`${AppHeaderStyles.header__item} pb-4 pt-4 pl-5 pr-5`}>
        <ProfileIcon type={pathname === '/profile' ? 'primary' : 'secondary'} />
        <p className={`${pathname === '/profile' ? 'text_color_active' : 'text_color_inactive'} text text_type_main-default ml-2`}>Личный кабинет</p>
      </Link>
    </header>
  );
}

export default AppHeader;
