import React, { useEffect } from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { HomePage, LoginPage, RegistrationPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, NotFoundPage } from '../../pages';
import { OnlyAuth, OnlyUnAuth } from '../ProtectedRoute';
import Modal from '../Modal/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { getItems } from '../../services/actions/allIngredients';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { Loader } from '../Loader/Loader';
import {CLEAR_CURRENT_ITEM} from '../../services/actions/currentIngredient';

const App = () => {
  const { itemsRequest } = useSelector(state => state.allIngredients);

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
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
            <Route path="/register" element={<OnlyUnAuth component={<RegistrationPage />} />} />
            <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
            <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
            <Route path="/ingredients/:ingredientId" element={<IngredientDetails />} />
            <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />} />
            <Route path="*" element={<NotFoundPage />} />
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
            </Routes>
          )}
        </>}
    </div>
  );
}

export default App;

