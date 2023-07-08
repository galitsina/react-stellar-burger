import React, { useEffect } from 'react';
import { Loader } from '../components/Loader/Loader';
import styles from './Home.module.css';
import BurgerIngredients from '../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../components/BurgerConstructor/BurgerConstructor';
import { useSelector, useDispatch } from 'react-redux';
import { getItems } from '../services/actions/allIngredients';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const HomePage = () => {
  const { itemsRequest } = useSelector(state => state.allIngredients);
  const dispatch = useDispatch();
  useEffect(
    () => {
      dispatch(getItems());
    },
    [dispatch]
  );

  return (
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
          {itemsRequest ? (<Loader />) : (<BurgerIngredients />)}
          <BurgerConstructor />
        </main>
      </DndProvider>
  );
}

