import React, { useEffect } from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage, RegistrationPage, ForgotPasswordPage, ResetPasswordPage, IngredientPage, ProfilePage } from '../../pages';


const App = () => {

  return (
    <div className={styles.app}>
      <AppHeader />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/ingredients/:id" element={<IngredientPage />} />
          <Route path="/profile" element={<ProfilePage />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}
//<Routes location={background || location}/> is it needed for excepting errors?
export default App;

