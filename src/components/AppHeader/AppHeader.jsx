import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeaderStyles from './AppHeader.module.css';
import { Link, useLocation } from 'react-router-dom';
import { routeMain, routeFeed, routeProfile, routeOrdersHistory } from '../../utils/Data';

const AppHeader = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const isPatnameProfile = /profile.*/.test(pathname);

  return (
    <header className={`${AppHeaderStyles.header} pb-4 pt-4`}>
      <nav className={AppHeaderStyles.header__navigation}>
        <Link to={routeMain} className={`${AppHeaderStyles.header__item} pb-4 pt-4 pl-5 pr-5 mr-2`}>
          <BurgerIcon type={pathname === routeMain ? 'primary' : 'secondary'} />
          <p className={`${pathname === routeMain ? 'text_color_active' : 'text_color_inactive'} text text_type_main-default ml-2`}>Конструктор</p>
        </Link>
        <Link to='/feed' className={`${AppHeaderStyles.header__item} pb-4 pt-4 pl-5 pr-5`}>
          <ListIcon type={pathname === routeFeed ? 'primary' : 'secondary'} />
          <p className={`${pathname === routeFeed ? 'text_color_active' : 'text_color_inactive'} text text_type_main-default ml-2`}>Лента заказов</p>
        </Link>
      </nav>
      <Link to={routeMain}>
        <div className={AppHeaderStyles.header__logo}>
          <Logo />
        </div>
      </Link>
      <Link to='/profile' className={`${AppHeaderStyles.header__item} pb-4 pt-4 pl-5 pr-5`}>
        <ProfileIcon type={isPatnameProfile ? 'primary' : 'secondary'} />
        <p className={`${isPatnameProfile ? 'text_color_active' : 'text_color_inactive'} text text_type_main-default ml-2`}>Личный кабинет</p>
      </Link>
    </header>
  );
}

export default AppHeader;
