import React, { useEffect } from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { HomePage, LoginPage, RegistrationPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, NotFoundPage, OrderListPage, OrderHistoryPage } from '../../pages';
import { OnlyAuth, OnlyUnAuth } from '../ProtectedRoute';
import Modal from '../Modal/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { getItems } from '../../services/actions/allIngredients';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import SingleOrder from '../SingleOrder/SingleOrder';
import { Loader } from '../Loader/Loader';
import {CLEAR_CURRENT_ITEM} from '../../services/actions/currentIngredient';
import {LIVE_ORDER_WS_OPEN} from '../../services/actions/wsOrders';
import {
  routeMain,
  routeLogin,
  routeRegister,
  routeForgotPassword,
  routeResetPassword,
  routeIngredients,
  routeIngredientId,
  routeProfile,
  route404,
  routeFeed,
  routeFeedId,
  routeOrdersHistory,
  routeOrderId,
  getAllIngredients
} from '../../utils/Data';

const App = () => {
  const { itemsRequest } = useSelector(getAllIngredients);

  const dispatch = useDispatch();
  useEffect(
    () => {
      //TODO: delete it afret WS integration
    dispatch({type: LIVE_ORDER_WS_OPEN})
      dispatch(getItems());
    },
    [dispatch]
  );

  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    navigate(-1);
    dispatch({
      type: CLEAR_CURRENT_ITEM,
    })
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      {itemsRequest ? (<Loader />) :
        <>
          <Routes location={background || location}>
            <Route path={routeMain} element={<HomePage />} />
            <Route path={routeLogin} element={<OnlyUnAuth component={<LoginPage />} />} />
            <Route path={routeRegister} element={<OnlyUnAuth component={<RegistrationPage />} />} />
            <Route path={routeForgotPassword} element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
            <Route path={routeResetPassword} element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
            <Route path={`${routeIngredients}${routeIngredientId}`} element={<IngredientDetails />} />
            <Route path={routeProfile} element={<OnlyAuth component={<ProfilePage />} />} />
            <Route path={route404} element={<NotFoundPage />} />
            <Route path={routeFeed} element={<OrderListPage />} />
            <Route path={`${routeFeed}${routeFeedId}`} element={<SingleOrder />} />
            <Route path={`${routeProfile}${routeOrdersHistory}`} element={<OnlyAuth component={<OrderHistoryPage />} />} />
            <Route path={`${routeProfile}${routeOrdersHistory}${routeOrderId}`} element={<OnlyAuth component={<SingleOrder />} />} />
          </Routes>

          {background && (
            <Routes>
              <Route
                path='/ingredients/:ingredientId'
                element={
                  <Modal closeModal={handleModalClose} title='Детали ингредиента'>
                    <IngredientDetails />
                  </Modal>
                }
              />
              {/* TODO: wrap up SingleOrder in the OrderHistoryPage in OnlyAuth! */}
              <Route
                path={`${routeFeed}${routeFeedId}`}
                element={
                  <Modal closeModal={handleModalClose} title=''>
                    <SingleOrder />
                  </Modal>
                }
              />
            </Routes>
          )}
        </>}
    </div>
  );
}

export default App;

