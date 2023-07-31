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
  getAllIngredients,
} from '../../utils/Data';

const App = () => {
  const { itemsRequest } = useSelector(getAllIngredients);

  const dispatch = useDispatch();
  useEffect(
    () => {
      dispatch(getItems());
    },
    [dispatch]
  );

  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    navigate(-1);
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
            <Route path={`${routeProfile}${routeOrdersHistory}${routeFeedId}`} element={<OnlyAuth component={<SingleOrder />} />} />
          </Routes>

          {background && (
            <Routes>
              <Route
                path={`${routeIngredients}${routeIngredientId}`}
                element={
                  <Modal closeModal={handleModalClose} title='Детали ингредиента'>
                    <IngredientDetails />
                  </Modal>
                }
              />
              <Route
                path={`${routeFeed}${routeFeedId}`}
                element={
                  <Modal closeModal={handleModalClose} title=''>
                    <SingleOrder />
                  </Modal>
                }
              />
              <Route
                path={`${routeProfile}${routeOrdersHistory}${routeFeedId}`}
                element={
                  <OnlyAuth component={
                    <Modal closeModal={handleModalClose} title=''>
                      <SingleOrder />
                    </Modal>} />
                }
              />
            </Routes>
          )}
        </>}
    </div>
  );
}

export default App;

