import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeaderStyles from './AppHeader.module.css';

function AppHeader() {
  return (
    <header className={`${AppHeaderStyles.header} pb-4 pt-4`}>
      <nav className={AppHeaderStyles.header__navigation}>
        <a className={`${AppHeaderStyles.header__item} pb-4 pt-4 pl-5 pr-5 mr-2`}>
          <BurgerIcon type="primary" />
          <p className="text text_type_main-default ml-2">Конструктор</p>
        </a>
        <a className={`${AppHeaderStyles.header__item} pb-4 pt-4 pl-5 pr-5`}>
          <ListIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive ml-2">Лента заказов</p>
        </a>
      </nav>
      <div className={AppHeaderStyles.header__logo}>
        <Logo />
      </div>
      <a className={`${AppHeaderStyles.header__item} pb-4 pt-4 pl-5 pr-5`}>
        <ProfileIcon type="secondary" />
        <p className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</p>
      </a>
    </header>
  );
}

export default AppHeader;
