import React from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { HomePage, LoginPage, RegistrationPage, ForgotPasswordPage, ResetPasswordPage, IngredientPage, ProfilePage, NotFoundPage } from '../../pages';
import { OnlyAuth, OnlyUnAuth } from '../ProtectedRoute';
import Modal from '../Modal/Modal';
import { useSelector, useDispatch } from 'react-redux';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { CLEAR_CURRENT_ITEM } from '../../services/actions/currentIngredient';

const App = () => {
  const { currentItem } = useSelector(state => state.currentIngredient);
  const { items } = useSelector(state => state.allIngredients);

  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleModalClose = () => {
    navigate(-1);
    setOpen(false);
    dispatch({
      type: CLEAR_CURRENT_ITEM,
    })
    console.log('Modal closed')
    // Возвращаемся к предыдущему пути при закрытии модалки
  };

  return (
    <div className={styles.app}>
        <AppHeader />
        <Routes location={background || location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
          <Route path="/register" element={<OnlyUnAuth component={<RegistrationPage />} />} />
          <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
          <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
          <Route path="/ingredients/:ingredientId" element={<IngredientDetails ingredient={currentItem} />} />
          <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {background && (
          <Routes>
            <Route
              path='/ingredients/:ingredientId'
              element={
                <Modal closeModal={handleModalClose} title='Детали ингредиента'>
                  <IngredientDetails ingredient={currentItem} />
                </Modal>
              }
            />
          </Routes>
        )}
    </div>
  );
}

export default App;

