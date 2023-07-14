import React from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage, RegistrationPage, ForgotPasswordPage, ResetPasswordPage, IngredientPage, ProfilePage, NotFoundPage } from '../../pages';
import { OnlyAuth, OnlyUnAuth} from '../ProtectedRoute';

const App = () => {

  return (
    <div className={styles.app}>
      <BrowserRouter>
      <AppHeader />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<OnlyUnAuth component={<LoginPage/>} />} />
          <Route path="/register" element={<OnlyUnAuth component={<RegistrationPage />} /> } />
          <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage />} /> } />
          <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage />} /> } />
          <Route path="/ingredients/:id" element={<IngredientPage />} />
          <Route path="/profile" element={<OnlyAuth component={<ProfilePage/>} />} />
          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}
//<Routes location={background || location}/> is it needed for excepting errors?
export default App;

