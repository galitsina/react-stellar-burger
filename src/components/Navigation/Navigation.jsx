import navigationStyles from './Navigation.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RESET, logoutUser } from '../../services/actions/autorization';
import { useNavigate, useLocation } from 'react-router-dom';
import { routeOrdersHistory, routeProfile } from '../../utils/Data';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { getUserState } from '../../utils/Data';

export const Navigation = ({description}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const {user, wasLoggedOut} = useSelector(getUserState);

  useEffect(() => {
    if (wasLoggedOut){
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        navigate('/login');
        dispatch({type: RESET})
      }
  }, [wasLoggedOut, user])

  const exit = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  }

  return (
      <div className={navigationStyles.main}>
        <nav>
          <ul className={navigationStyles.navigation}>
            <li><Link to="/profile" className={`${navigationStyles.link}  ${pathname === routeProfile ? `${navigationStyles.active_link} text_color_active` : 'text_color_inactive'} text text_type_main-medium`}>Профиль</Link></li>
            <li><Link to="/profile/orders" className={`${navigationStyles.link} ${pathname === `${routeProfile}${routeOrdersHistory}` ? `${navigationStyles.active_link} text_color_active` : 'text_color_inactive'} text text_type_main-medium`}>История заказов</Link></li>
            <li><a className={`${navigationStyles.link} text text_type_main-medium text_color_inactive`} onClick={exit}>Выход</a></li>
          </ul>
        </nav>
        <p className={`${navigationStyles.parargraph} text text_type_main-default text_color_inactive mt-20`}>{description}</p>
      </div>
  )
}

Navigation.propTypes = {
  description: PropTypes.string
}

export default Navigation;
